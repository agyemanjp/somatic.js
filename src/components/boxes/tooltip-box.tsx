/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable brace-style */
import { String, Obj, ExtractOptional } from "@sparkwave/standard"
import { getAsync } from "@sparkwave/standard/web"
import { keys } from "@sparkwave/standard/collections"
import { isKeyOf } from "@sparkwave/standard/utility"
import { createElement, render, stringifyStyle } from '../../core'
import { Component, HtmlProps, Icon, CSSProperties, MouseEvent } from '../../types'
import { idProvider } from '../../utils'
import { mergeProps } from '../../core'

export type Props = HtmlProps & {
	/** If defined, this will be the content of the tooltip pop-up, rather than a definition from the "definitions" property */
	explicitTooltip?: JSX.Element | string | undefined

	/** True if we know that only the first element has to be tool-tipped */
	noRecursion?: boolean

	/** The dimensions of the tooltip pop-up */
	width?: CSSProperties["width"]
	height?: CSSProperties["height"]

	/** Dictionary: each key is a string we will search in the DOM and enrich with a tooltip, 
	 * the corresponding value will be the content of the tooltip. 
	 */
	definitions?: Obj<string, string>
}

type ReplacementEntry = {
	position: number,
	length: number,
	node: JSX.Element
}

const defaultProps: Props = {
	explicitTooltip: undefined,
	noRecursion: false,
	width: "600px",
	height: "180px",
	definitions: {}
}

// const ExternalLinkIcon: Icon = () => <svg />

/** The content of the tooltips will be stored here, 
 * so that we don't have to query it from a URL every time a tooltip is hovered 
 */
const tooltips: Record<string, string> = {}

export const TooltipBox: Component<Props> = async (props) => {
	const { children, style, explicitTooltip, noRecursion, width, height, definitions } = mergeProps(defaultProps, props)

	const tooltipId = idProvider.next()
	// eslint-disable-next-line fp/no-let, init-declarations
	let hidingTimer: NodeJS.Timeout | number

	const attachToolTipsIfNeeded = async (el: HTMLElement) => {
		// If the element contains children, we process them
		[...el.childNodes].forEach((child, index) => attachToolTipsIfNeeded(child as HTMLElement))

		// Otherwise, we process the element if it's text
		if (el.nodeName === "#text") {
			// eslint-disable-next-line fp/no-let
			let originalStringElem = el.textContent
			if (originalStringElem === null) throw new Error(`A text node didn't have a textContent attribute`)

			// We find the replacements in the children, or in the case of explicit tooltips, the whole string is replaced
			const replacements = typeof explicitTooltip === "string"
				? [{ position: 0, length: explicitTooltip.length, node: createToolTip(originalStringElem) }]

				// eslint-disable-next-line fp/no-mutating-methods
				: Object.keys(definitions || {})
					.reduce((accum, currTerm) => {
						const position = ((originalStringElem ?? "").toLowerCase()).search(currTerm)
						// We add that term to the replacement, only if it was found, and not part of another replacement ("range" inside of "interquartile range")
						if (position > -1 && !partOfAnotherTerm(position, accum)) {
							return [...accum, {
								position: position,
								length: currTerm.length,
								node: createToolTip((originalStringElem ?? "").substr(position, currTerm.length))
							}]
						}
						return accum
					}, [] as ReplacementEntry[])

					// sort the replacements by position: the first in the sentence will be processed first.
					.sort((a, b) => a.position - b.position)

			const newElements: unknown[] = []
			// For every replacement entry, we add the previous string & the stored tooltip to the "toolTipElems" array.
			replacements.forEach((replacement, i) => {
				const prev: ReplacementEntry | undefined = replacements[i - 1]
				const positionFromStart = replacement.position - ((prev ? prev.position : 0) + (prev ? prev.length : 0))
				const previousText = (originalStringElem ?? "").slice(0, positionFromStart)

				// eslint-disable-next-line fp/no-mutation
				originalStringElem = (originalStringElem ?? "").slice(positionFromStart + replacement.length) // Removing the text before the term + the term itself

				// eslint-disable-next-line fp/no-mutating-methods
				newElements.push(previousText) // We push the text that came before

				// eslint-disable-next-line fp/no-mutating-methods
				newElements.push(replacement.node)
			})
			// eslint-disable-next-line fp/no-mutating-methods
			newElements.push(originalStringElem)

			if (newElements.length > 1) {
				// Add an element with the tooltip to the DOM
				const span = document.createElement("span")
				const node = await render(<span>{newElements}</span>)
				el.parentNode?.appendChild(span)
				span.appendChild(node)

				// We remove the existing node
				el.remove()
			}

		}
	}

	const tooltipBoxStyle = {
		all: "initial" as const,
		display: "none",
		flexDirection: "column" as const,
		position: "fixed" as const,
		padding: "1em",
		background: 'blue',
		border: `solid 1px black`,
		textAlign: "left" as const,
		borderRadius: ".25em",
		zIndex: 1,
		maxWidth: `600px`,
		maxHeight: `180px`,
		width: width,
		height: height,
		...style
	}

	const handleMouseLeave = async (className: string) => {
		// eslint-disable-next-line fp/no-mutation
		hidingTimer = setTimeout(() => { // We hide the tooltip after half a second
			[...document.getElementsByClassName(`${className}-tooltip`)]
				.forEach(item => item.setAttribute("style", stringifyStyle({ ...tooltipBoxStyle, display: "none", })))
		}, 300) //as unknown as number
	}

	const handleMouseEnter = async (ev: MouseEvent, className: string, wordToReplace?: string) => {
		// We cancel the hiding timer, if any
		clearTimer(hidingTimer);

		// We immediately hide all tooltip boxes (we'll re-show that one immediately)
		[...document.getElementsByClassName("tooltipBox")]
			.forEach(item => item.setAttribute("style", stringifyStyle({ display: "none" })));

		// We show the tooltip
		[...document.getElementsByClassName(`${className}-tooltip`)]
			.forEach(item => {
				const proposedLeftPos = (ev.target as HTMLElement).getBoundingClientRect().x + (ev.target as HTMLElement).getBoundingClientRect().width
				const proposedTopPos = (ev.target as HTMLElement).getBoundingClientRect().y + (ev.target as HTMLElement).getBoundingClientRect().height
				const actualLeftPos = proposedLeftPos + (item.clientWidth + 34) > window.innerWidth
					? proposedLeftPos - ((proposedLeftPos + (item.clientWidth + 34)) - window.innerWidth)
					: proposedLeftPos
				const actualTopPos = proposedTopPos + (item.clientHeight + 34) > window.innerHeight
					? proposedTopPos - ((proposedTopPos + (item.clientHeight + 34)) - window.innerHeight)
					: proposedTopPos

				item.setAttribute("style", stringifyStyle({
					...tooltipBoxStyle,
					display: "flex",
					left: `${actualLeftPos}px`,
					top: `${actualTopPos}px`
				}))
			})

		if (wordToReplace) {
			const isUrl = (definitions as Obj)[wordToReplace] && (definitions as Obj<string>)[wordToReplace].slice(0, 4) === "http"

			if (tooltips[wordToReplace] === undefined && isUrl) { // We only fetch the tooltip if it's not yet stored, and is a URL
				await getAsync({ uri: (definitions as Obj<string>)[wordToReplace] }).then(response => {
					const foundPages = JSON.parse(response.body).query.pages
					// eslint-disable-next-line fp/no-mutation
					tooltips[wordToReplace] = foundPages[Object.keys(foundPages)[0]].extract
				}).catch(err => {
					// eslint-disable-next-line fp/no-mutation
					tooltips[wordToReplace] = err
				})

			}

			// We insert the content, if it's not already present
			[...document.getElementsByClassName(`tooltip-${wordToReplace}-content`)]
				.forEach(item => {
					// eslint-disable-next-line fp/no-mutation
					item.innerHTML = explicitTooltip
						? explicitTooltip.toString()
						: tooltips[wordToReplace]
				})
		}
	}

	const createToolTip = (contentReplaced: string) => {
		const className__ = idProvider.next()
		const lowerCasedWord = contentReplaced.toLowerCase()

		const isUrl = isKeyOf(lowerCasedWord, definitions || {}) && definitions && definitions[lowerCasedWord] && definitions[lowerCasedWord].slice(0, 4) === "http"

		return <span style={{ position: "relative" }}>
			<span
				className={className__}
				style={{ borderBottom: "1px dotted", cursor: "help" }}
				onMouseEnter={ev => handleMouseEnter(ev, className__, lowerCasedWord)}
				onMouseLeave={() => handleMouseLeave(className__)}>
				{contentReplaced}
			</span>

			<div
				style={tooltipBoxStyle}
				className={`tooltipBox ${className__}-tooltip`}
				onClick={e => { e.stopPropagation() }}
				onMouseEnter={() => { clearTimer(hidingTimer) }}
				onMouseLeave={() => { handleMouseLeave(className__) }}>
				{
					isUrl
						? <div className="tooltip-title" style={{ marginBottom: "0.5em" }}>
							<span style={{ fontWeight: 700 }}>
								{new String(contentReplaced).toTitleCase().toString()}
							</span>
							<span style={{ float: "right" }}> From Wikipedia
								<a style={{ marginLeft: "0.5em" }}
									// eslint-disable-next-line fp/no-mutating-methods
									target="_blank" href={`https://en.wikipedia.org/wiki/${(definitions || {})[lowerCasedWord].split("=").pop()}`}>
									{/* {<ExternalLinkIcon style={{ height: "1em", cursor: "pointer" }} />} */}
								</a>
							</span>
						</div>
						: null
				}
				<span className={`tooltip-${lowerCasedWord}-content`} style={{ overflow: "auto", paddingRight: ".5em" }}>
					{isUrl
						? "Loading definition..."
						: explicitTooltip !== undefined
							? explicitTooltip
							: (definitions || {})[lowerCasedWord]
					}
				</span>
			</div>
		</span>
	}

	// Turn the element and its children into elements + tooltips
	const assignTooltips = async (id: string) => {
		const elementToProcess = document.getElementById(id)
		if (elementToProcess === undefined || elementToProcess === null) { return <div /> }
		[...elementToProcess.children]
			.forEach((child) => { attachToolTipsIfNeeded(child as HTMLElement) })
	}

	if (noRecursion === true) {
		const className__ = idProvider.next()
		return <span
			className={className__}
			style={{ ...style }}
			onClick={e => e.stopPropagation()}
			onMouseEnter={ev => { clearTimer(hidingTimer); handleMouseEnter(ev, className__) }}
			onMouseLeave={ev => handleMouseLeave(className__)}>

			{children}

			<div
				style={{ ...tooltipBoxStyle, width: "auto", height: "auto" }}
				className={`tooltipBox ${className__}-tooltip`}>
				{explicitTooltip}
			</div>
		</span>
	}
	else { // We indicate that on element load, we need to apply tooltips
		return <span id={tooltipId} style={{ ...style }}>
			<style onLoad={() => { assignTooltips(tooltipId) }} />
			{children}
		</span>
	}
}


/** Determine if a term is already tool-tipped as being part of another term */
function partOfAnotherTerm(index: number, replacements: ReplacementEntry[]) {
	return replacements.some(replacement =>
		index >= replacement.position && index <= replacement.position + replacement.length
	)
}

function clearTimer(timer: NodeJS.Timeout | number) {
	// eslint-disable-next-line no-unused-expressions
	typeof timer === "number" ? clearTimeout(timer) : clearTimeout(timer)
}