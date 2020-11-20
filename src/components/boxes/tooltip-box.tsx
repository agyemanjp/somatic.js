// /* eslint-disable fp/no-mutation */
// /* eslint-disable require-atomic-updates */
// /* eslint-disable fp/no-mutating-methods */
// /* eslint-disable fp/no-let */
// /* eslint-disable init-declarations */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable brace-style */

// import { Obj, entries, values } from "@sparkwave/standard"
// import { createElement, render, stringifyStyle, mergeProps } from '../../core'
// import { Component, HtmlProps, MouseEvent, PropsExtended } from '../../types'
// import { idProvider } from '../../utils'

// export type Props<T = string> = HtmlProps & {
// 	/** The content of the tooltip pop-up: text or JSX element (if a more advanced layout is desired) */
// 	tooltip: JSX.Element | string | {
// 		/** Dictionary of replacement tooltip infos indexed by their (DOM) search keys */
// 		dictionary: Obj<T>,

// 		/** Function that generates the actual tooltip content based on tooltip info */
// 		contentGenerator: (entry: T) => Promise<JSX.Element | string>,

// 		/** True if we know that only the first element has to be tool-tipped */
// 		noRecursion?: boolean
// 	}
// }

// type ReplacementEntry = { position: number, length: number, node: JSX.Element }

// /** The content of the tooltips will be stored here, 
//  * so that we don't have to query it from a URL every time a tooltip is hovered 
//  */
// const tooltips: Obj<JSX.Element | string> = {}

// export async function TooltipBox<T>(props: PropsExtended<Props<T>>): JSX.Element {
// 	const { children, style, tooltip } = props

// 	const tooltipId = idProvider.next()
// 	let hidingTimer: NodeJS.Timeout | number

// 	const attachToolTips = async (args: {
// 		el: HTMLElement,
// 		dict: Obj<T>,
// 		generator: (entry: T) => Promise<JSX.Element | string>
// 	}) => {

// 		const { el, dict, generator } = args;

// 		// If the element contains children, we process them recursively
// 		[...el.childNodes].forEach((child, index) => attachToolTips({ el: child as HTMLElement, dict, generator }))

// 		// Otherwise, we process the element if it's text
// 		if (el.nodeName === "#text") {
// 			// eslint-disable-next-line fp/no-let
// 			let originalStringElem = el.textContent
// 			if (originalStringElem === null) throw new Error(`A text node didn't have a textContent attribute`)

// 			// We find the replacements in the children, or in the case of explicit tooltips, the whole string is replaced
// 			const replacements = entries(dict)
// 				.reduce((accum, currEntry) => {
// 					const position = ((originalStringElem ?? "").toLowerCase()).search(currEntry[0].toLowerCase())
// 					// We add that term to the replacement, only if it was found, and not part of another replacement ("range" inside of "interquartile range")
// 					if (position > -1 && !partOfAnotherTerm(position, accum)) {
// 						return [...accum, {
// 							position: position,
// 							length: currEntry[0].length,
// 							node: createToolTip({
// 								wordToReplace: (originalStringElem ?? "").substr(position, currEntry[0].length),
// 								dict, generator
// 							})
// 						}]
// 					}
// 					return accum
// 				}, [] as ReplacementEntry[])

// 				// sort the replacements by position: the first in the sentence will be processed first.
// 				.sort((a, b) => a.position - b.position)

// 			const newElements: unknown[] = []

// 			// For every replacement entry, we add the previous string & the stored tooltip to the "toolTipElems" array.
// 			replacements.forEach((replacement, i) => {
// 				const prev: ReplacementEntry | undefined = replacements[i - 1]
// 				const positionFromStart = replacement.position - ((prev ? prev.position : 0) + (prev ? prev.length : 0))
// 				const previousText = (originalStringElem ?? "").slice(0, positionFromStart)

// 				// eslint-disable-next-line fp/no-mutation
// 				originalStringElem = (originalStringElem ?? "").slice(positionFromStart + replacement.length) // Removing the text before the term + the term itself

// 				// eslint-disable-next-line fp/no-mutating-methods
// 				newElements.push(previousText) // We push the text that came before

// 				// eslint-disable-next-line fp/no-mutating-methods
// 				newElements.push(replacement.node)
// 			})
// 			// eslint-disable-next-line fp/no-mutating-methods
// 			newElements.push(originalStringElem)

// 			if (newElements.length > 1) {
// 				// Add an element with the tooltip to the DOM
// 				const span = document.createElement("span")
// 				const node = await render(<span>{newElements}</span>)
// 				el.parentNode?.appendChild(span)
// 				span.appendChild(node)

// 				// We remove the existing node
// 				el.remove()
// 			}
// 		}
// 	}

// 	const tooltipBoxStyle = {
// 		all: "initial" as const,
// 		display: "none",
// 		flexDirection: "column" as const,
// 		position: "fixed" as const,
// 		padding: "1em",
// 		background: 'blue',
// 		border: `solid 1px black`,
// 		textAlign: "left" as const,
// 		borderRadius: ".25em",
// 		zIndex: 1,
// 		maxWidth: `600px`,
// 		maxHeight: `180px`,
// 		...style
// 	}

// 	const handleMouseLeave = async (ev: MouseEvent, className: string) => {
// 		ev.stopPropagation()
// 		// eslint-disable-next-line fp/no-mutation
// 		hidingTimer = setTimeout(() => { // We hide the tooltip after half a second
// 			[...document.getElementsByClassName(`${className}-tooltip`)]
// 				.forEach(item => item.setAttribute("style", stringifyStyle({ ...tooltipBoxStyle, display: "none", })))
// 		}, 300) //as unknown as number
// 	}

// 	const handleMouseEnter = async (args:
// 		{
// 			ev: MouseEvent,
// 			className: string,
// 			replacement?: { word: string, generator: () => Promise<JSX.Element | string> }
// 		}) => {

// 		const { ev, replacement, className } = args

// 		ev.stopPropagation()

// 		// We cancel the hiding timer, if any
// 		clearTimer(hidingTimer);

// 		// We immediately hide all tooltip boxes (we'll re-show that one immediately)
// 		[...document.getElementsByClassName("tooltipBox")]
// 			.forEach(item => item.setAttribute("style", stringifyStyle({ display: "none" })));

// 		// We show the tooltip
// 		[...document.getElementsByClassName(`${className}-tooltip`)].forEach(item => {
// 			const proposedLeftPos = (ev.target as HTMLElement).getBoundingClientRect().x + (ev.target as HTMLElement).getBoundingClientRect().width
// 			const proposedTopPos = (ev.target as HTMLElement).getBoundingClientRect().y + (ev.target as HTMLElement).getBoundingClientRect().height
// 			const actualLeftPos = proposedLeftPos + (item.clientWidth + 34) > window.innerWidth
// 				? proposedLeftPos - ((proposedLeftPos + (item.clientWidth + 34)) - window.innerWidth)
// 				: proposedLeftPos
// 			const actualTopPos = proposedTopPos + (item.clientHeight + 34) > window.innerHeight
// 				? proposedTopPos - ((proposedTopPos + (item.clientHeight + 34)) - window.innerHeight)
// 				: proposedTopPos

// 			item.setAttribute("style", stringifyStyle({
// 				...tooltipBoxStyle,
// 				display: "flex",
// 				left: `${actualLeftPos}px`,
// 				top: `${actualTopPos}px`
// 			}))
// 		})

// 		if (replacement) {
// 			const keyWord = replacement.word.toLowerCase()
// 			if (tooltips[keyWord] === undefined) { // We only fetch the tooltip if it's not yet stored
// 				const generatedContent = await replacement.generator()
// 				tooltips[keyWord] = typeof generatedContent === "string" ? generatedContent : Promise.resolve(generatedContent)
// 			}

// 			// We insert the content, if it's not already present
// 			const tooltipsMatchingKeyword = [...document.getElementsByClassName(`tooltip-${keyWord}-content`)]
// 			tooltipsMatchingKeyword.forEach((item, i) => {
// 				const possiblyGeneratedContent = tooltips[keyWord]
// 				const content = possiblyGeneratedContent !== undefined
// 					? possiblyGeneratedContent
// 					: ""

// 				// eslint-disable-next-line fp/no-mutation
// 				item.innerHTML = typeof (content) === "string"
// 					? content
// 					: (content as unknown as HTMLElement).outerHTML
// 			})
// 		}
// 	}

// 	const createToolTip = (args: { wordToReplace: string, dict: Obj<T>, generator: (entry: T) => Promise<JSX.Element | string> }) => {
// 		const { wordToReplace, dict, generator } = args

// 		const className__ = idProvider.next()
// 		return <span style={{ position: "relative" }}>
// 			<span
// 				className={className__}
// 				style={{ borderBottom: "1px dotted", cursor: "help" }}
// 				onMouseEnter={ev => handleMouseEnter({ ev, className: className__, ...args })}
// 				onMouseLeave={ev => handleMouseLeave(ev, className__)}>
// 				{args.wordToReplace}
// 			</span>

// 			<div
// 				style={tooltipBoxStyle}
// 				className={`tooltipBox ${className__}-tooltip`}
// 				onClick={e => { e.stopPropagation() }}
// 				onMouseEnter={() => { clearTimer(hidingTimer) }}
// 				onMouseLeave={ev => { handleMouseLeave(ev, className__) }}>

// 				<span
// 					className={`tooltip-${wordToReplace.toLowerCase()}-content`}
// 					style={{ overflow: "auto", paddingRight: ".5em" }}>

// 					{"Loading definition..."}
// 				</span>
// 			</div>
// 		</span>
// 	}

// 	// Turn the element and its children into elements + tooltips
// 	const assignTooltips = async (args: {
// 		dict: Obj<T>,
// 		generator: (entry: T) => Promise<JSX.Element | string>
// 		id: string
// 	}) => {
// 		const elementToProcess = document.getElementById(args.id)
// 		if (elementToProcess === undefined || elementToProcess === null) { return <div /> }
// 		[...elementToProcess.children].forEach((child) => attachToolTips({ el: child as HTMLElement, ...args }))
// 	}


// 	if (typeof tooltip === "object" && "dictionary" in tooltip) { // We indicate that on element load, we need to apply tooltips
// 		return <span id={tooltipId}>
// 			<style onLoad={() => {
// 				assignTooltips({
// 					id: tooltipId,
// 					dict: tooltip.dictionary,
// 					generator: tooltip.contentGenerator
// 				})
// 			}} />
// 			{children}
// 		</span>
// 	}
// 	else {
// 		const className__ = idProvider.next()
// 		return <span
// 			className={className__}
// 			style={{ ...style }}
// 			onClick={e => e.stopPropagation()}
// 			onMouseEnter={ev => {
// 				clearTimer(hidingTimer)
// 				handleMouseEnter({
// 					ev,
// 					className: className__,

// 				})
// 			}}
// 			onMouseLeave={ev => handleMouseLeave(ev, className__)}>

// 			{children}

// 			<div
// 				style={{ ...tooltipBoxStyle, width: "auto", height: "auto" }}
// 				className={`tooltipBox ${className__}-tooltip`}>
// 				{tooltip}
// 			</div>
// 		</span>
// 	}
// }

// /** Determine if a term is already tool-tipped as being part of another term */
// function partOfAnotherTerm(index: number, replacements: ReplacementEntry[]) {
// 	return replacements.some(replacement =>
// 		index >= replacement.position && index <= replacement.position + replacement.length
// 	)
// }
// function clearTimer(timer: NodeJS.Timeout | number) {
// 	// eslint-disable-next-line no-unused-expressions
// 	typeof timer === "number" ? clearTimeout(timer) : clearTimeout(timer)
// }