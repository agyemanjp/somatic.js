/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable brace-style */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cuid from 'cuid'
import * as Request from "request"
import { String } from "@agyemanjp/standard"
import { createElement, propsToCSS } from '../../core'
import { Component, Props, Icon } from '../../types'
import { config } from '../../utils'

export interface Props extends Props.Html {
	explicitTooltip?: string
	definitions?: Record<string, string>
	icons: { externalLink: Icon }
}

/** The extracts from wikipedia will be stored here, so that we don't have to query it every time a tooltip is hovered */
const tooltipsStorage = {}

export const TooltipArea: Component<Props> = async (props) => {
	/** What was received, with tooltips inside if there was any matched expression */
	const tooltippedChildren: HTMLElement[] = []
	const defaultProps = { definitions: {} }
	const definitions = props.definitions || defaultProps.definitions

	const attachToolTipsIfNeeded = (el: HTMLElement) => {
		// If the element contains children, we process them
		[...el.childNodes].forEach((child, index) => {
			attachToolTipsIfNeeded(child as HTMLElement)
		})

		// Otherwise, we process the element if it's text
		if (el.nodeName === "#text") {
			// eslint-disable-next-line fp/no-let
			let originalStringElem = el.textContent
			if (originalStringElem === null) {
				throw new Error(`A text node didn't have a textContent attribute`)
			}

			// We find the replacements in the children, or in the case of explicit tooltips, the whole string is replaced
			const replacements = props.explicitTooltip !== undefined
				? [{
					position: 0,
					length: props.explicitTooltip.length,
					node: createToolTip(el.textContent!)
				}]
				// : Object.keys(statTermDefinitions).reduce((arr: ReplacementEntry[], term: string) => {
				: Object.keys(definitions).reduce((arr: ReplacementEntry[], term: string) => {
					const position = (originalStringElem!.toLowerCase()).search(term)
					if (position > -1 && !partOfAnotherTerm(position, arr)) { // We add that term to the replacement, only if it was found, and not part of another replacement ("range" inside of "interquartile range")
						// eslint-disable-next-line fp/no-mutating-methods
						arr.push({
							position: position,
							length: term.length,
							node: createToolTip(originalStringElem!.substr(position, term.length))
						})
						return arr
					}
					return arr
				}, [])

			// We sort the replacements by position: the first in the sentence will be processed first.
			replacements.sort((a, b) => a.position - b.position)

			const newElements: unknown[] = []
			// For every replacement entry, we add the previous string & the stored tooltip to the "toolTipElems" array.
			replacements.forEach((replacement, i) => {
				const prev: ReplacementEntry | undefined = replacements[i - 1]
				const positionFromStart = replacement.position - ((prev ? prev.position : 0) + (prev ? prev.length : 0))
				const previousText = originalStringElem!.slice(0, positionFromStart)
				originalStringElem = originalStringElem!.slice(positionFromStart + replacement.length) // Removing the text before the term + the term itself

				// We push the text that came before
				newElements.push(previousText)
				newElements.push(replacement.node)
			})
			newElements.push(originalStringElem)

			if (newElements.length > 1) {
				// hydrate a new one with the tooltips
				const newNode = <span>{newElements}</span>
				// to-do: hydrate(newNode, el.parentElement)
				// We remove the existing node
				el.remove()
			}

		}
	}

	const createToolTip = (word: string) => {
		const className__ = cuid()
		const lowerCasedWord = word.toLowerCase()
		// eslint-disable-next-line fp/no-let, init-declarations
		let hidingTimer: number
		const boxWidth = 600
		const boxHeight = 180
		// const isUrl = statTermDefinitions[lowerCasedWord] && statTermDefinitions[lowerCasedWord].slice(0, 4) === "http"
		const isUrl = definitions[lowerCasedWord] && definitions[lowerCasedWord].slice(0, 4) === "http"

		const tooltipBoxStyle = {
			all: "initial" as const,
			display: "none",
			flexDirection: "column" as const,
			position: "fixed" as const,
			color: config.theme.colors.blackish,
			border: `solid 1px ${config.theme.colors.whitish}`,
			padding: "1em",
			background: "#f0f6ff",
			textAlign: "left" as const,
			borderRadius: ".25em",
			zIndex: 1,
			maxWidth: `${boxWidth}px`,
			maxHeight: `${boxHeight}px`,
			width: isUrl ? `${boxWidth}px` : undefined,
			height: isUrl ? `${boxHeight}px` : undefined
		}

		const handleMouseLeave = async () => {
			// We hide the tooltip after half a second
			// eslint-disable-next-line fp/no-mutation
			hidingTimer = setTimeout(() => {
				const tooltipBox = document.getElementsByClassName(`${className__}-tooltip`)
				// eslint-disable-next-line fp/no-loops
				for (const item of tooltipBox) {
					item.setAttribute("style", propsToCSS({
						...tooltipBoxStyle,
						display: "none",
					}))
				}
			}, 200) as unknown as number
		}

		return <span style={{ position: "relative" }}>
			<span
				className={className__}
				style={{ borderBottom: "1px dotted", cursor: "help" }}
				onMouseEnter={async ev => {
					// We cancel the hiding timer, if any
					clearTimeout(hidingTimer)

					// We immediately hide all tooltip boxes (we'll re-show that one immediately)
					const allTooltipBoxes = document.getElementsByClassName("tooltipBox")
					// eslint-disable-next-line fp/no-loops
					for (const item of allTooltipBoxes) {
						item.setAttribute("style", propsToCSS({
							display: "none",
						}))
					}

					// We show the tooltip
					const tooltipBox = document.getElementsByClassName(`${className__}-tooltip`)
					// eslint-disable-next-line fp/no-loops
					for (const item of tooltipBox) {
						const proposedLeftPos = getOffset(ev.target as HTMLElement).left + (ev.target as HTMLElement).offsetWidth
						const proposedTopPos = getOffset(ev.target as HTMLElement).top + (ev.target as HTMLElement).offsetHeight
						const actualLeftPos = proposedLeftPos + (boxWidth + 34) > window.innerWidth
							? proposedLeftPos - ((proposedLeftPos + (boxWidth + 34)) - window.innerWidth)
							: proposedLeftPos
						const actualTopPos = proposedTopPos + (boxHeight + 34) > window.innerHeight
							? proposedTopPos - ((proposedTopPos + (boxHeight + 34)) - window.innerHeight)
							: proposedTopPos

						item.setAttribute("style", propsToCSS({
							...tooltipBoxStyle,
							display: "flex",
							left: `${actualLeftPos}px`,
							top: `${actualTopPos}px`
						}))
					}

					// We insert the content, if it's not already present
					const tooltipContents = document.getElementsByClassName(`tooltip-${lowerCasedWord}-content`)

					if (tooltipsStorage[lowerCasedWord] === undefined && isUrl) { // We only fetch the tooltip if it's not yet stored, and is a URL
						// await getTooltipFromUrl(statTermDefinitions[lowerCasedWord]).then(response => {
						await getTooltipFromUrl(definitions[lowerCasedWord]).then(response => {
							const foundPages = JSON.parse(response).query.pages
							tooltipsStorage[lowerCasedWord] = foundPages[Object.keys(foundPages)[0]].extract
						}).catch(err => { tooltipsStorage[lowerCasedWord] = err })

					}
					for (const item of tooltipContents) {
						item.innerHTML = props.explicitTooltip
							? props.explicitTooltip
							: tooltipsStorage[lowerCasedWord]
					}
				}}
				onMouseLeave={handleMouseLeave}>
				{word}
			</span>
			<div
				style={tooltipBoxStyle}
				className={`tooltipBox tooltip-${lowerCasedWord} ${className__}-tooltip`}
				onClick={e => { e.stopPropagation() }}
				onMouseEnter={() => { clearTimeout(hidingTimer) }}
				onMouseLeave={handleMouseLeave}>
				{
					isUrl
						? <div className="tooltip-title" style={{ marginBottom: "0.5em" }}>
							<span style={{ fontWeight: 700 }}>
								{new String(word).toTitleCase().toString()}
							</span>
							<span style={{ float: "right" }}>From Wikipedia
							<a style={{ marginLeft: "0.5em" }} target="_blank"
									// href={`https://en.wikipedia.org/wiki/${statTermDefinitions[lowerCasedWord].split("=").pop()}`}>
									href={`https://en.wikipedia.org/wiki/${definitions[lowerCasedWord].split("=").pop()}`}>
									<props.icons.externalLink style={{ height: "1em", cursor: "pointer" }} />
								</a>
							</span>
						</div>
						: null
				}
				<span className={`tooltip-${lowerCasedWord}-content`} style={{ overflow: "auto", paddingRight: ".5em" }}>{
					isUrl
						? "Loading definition..."
						: props.explicitTooltip !== undefined
							? props.explicitTooltip
							// : statTermDefinitions[lowerCasedWord]
							: definitions[lowerCasedWord]
				}
				</span>
			</div>
		</span>
	}

	// Turn the element and its children into elements + tooltips
	const assignTooltips = (id: string) => {
		const elementToProcess = document.getElementById(id)
		if (elementToProcess === undefined || elementToProcess === null) {
			return <div />
		}

		[...elementToProcess.childNodes].forEach((child) => {
			attachToolTipsIfNeeded(child as HTMLElement)
		})
	}

	// componentDidMount() {
	// 	setTimeout(() => { this.assignTooltips(this.tooltipId) }, 0)
	// }

	const {
		children,
		style,
		...htmlProps
	} = props



	return (<div
		style={{
			...style,
			display: "contents",
			width: "100%",
			height: "100%"
		}}>
		{children}
	</div>)
}

const getTooltipFromUrl = async (url: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		Request.get({ uri: url }, (err, response, body) => {
			if (err) {
				reject(err.message)
			}
			else {
				resolve(response.body)
			}
		})
	})
}
type ReplacementEntry = {
	position: number,
	length: number,
	node: JSX.Element
}

/** Indicates if that term is already tolltiped as being part of another term ("quartile" when "interquartile range" has already been tooltiped) */
const partOfAnotherTerm = (index: number, replacements: ReplacementEntry[]) => {
	return replacements.some(replacement =>
		index >= replacement.position && index <= replacement.position + replacement.length
	)
}

function getOffset(el: HTMLElement) {
	// eslint-disable-next-line fp/no-let
	let _x = 0, _y = 0
	// eslint-disable-next-line fp/no-loops
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		// eslint-disable-next-line fp/no-mutation
		_x += el.offsetLeft - el.scrollLeft
		// eslint-disable-next-line fp/no-mutation
		_y += el.offsetTop - el.scrollTop
		// eslint-disable-next-line fp/no-mutation
		el = el.offsetParent as HTMLElement
	}
	return { top: _y, left: _x }
}