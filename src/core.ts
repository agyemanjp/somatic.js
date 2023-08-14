import { hasValue, prependSpaceIfNotEmpty, stringify } from "@agyemanjp/standard"
import * as cuid from "@paralleldrive/cuid2"

import { stringifyAttributes } from "./html"
import { createDOMShallow, updateDomShallow, isTextDOM, isAugmentedDOM, emptyContainer } from "./dom"
import { isComponentElt, isIntrinsicElt, isEltProper, getChildren, getLeafAsync, traceToLeafAsync, updateTraceAsync, isFragmentElt } from "./element"
import { Component, DOMElement, UIElement, ValueElement, IntrinsicElement, DOMAugmented } from "./types"
import { selfClosingTags } from "./common"


/** JSX is transformed into calls of this function
 * @returns UI Element corresponding to input
 */
export function createElement<T extends string | Component>(type: T, props: (typeof type) extends Component<infer P> ? P : unknown, ...children: unknown[]) {
	if (typeof type !== "string" && typeof type !== "function") { console.warn(`Type argument has invalid type ${typeof type}`) }

	return { type, props: props ?? {}, children: children.flat() }
}

/** Render a UI element into a DOM node (augmented with information used for subsequent updates) */
export async function renderAsync(elt: UIElement): Promise<(DOMAugmented | DocumentFragment | Text)> {
	// console.assert(!isFragmentElt(elt))

	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`renderAsync: Object appearing to represent proper element has no type member. This is likely an error arising from creating an element with an undefined component`)
	}

	const trace = await traceToLeafAsync(elt)
	const leaf = trace.leafElement
	const dom = createDOMShallow(leaf)

	if (!isTextDOM(dom)) {
		const domWithChildren = await updateChildrenAsync(dom, getChildren(leaf))
		return domWithChildren instanceof DocumentFragment
			? domWithChildren
			: Object.assign(domWithChildren, { renderTrace: trace })
	}
	else {
		return dom
	}
}
/** Render a UI element into a tree of intrinsic elements, optionally injecting some props in the root element */
export async function renderToIntrinsicAsync(elt: UIElement/*, injectedProps?: Obj*/): Promise<IntrinsicElement | ValueElement> {
	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`Object appearing to represent proper element has no type member\nThis is likely an error due to creating an element with an undefined component`)
		return (elt)
	}

	const leaf = await getLeafAsync(elt)

	// console.log(`Leaf from render to intrinsic: ${JSON.stringify(leaf)}`)
	return (isIntrinsicElt(leaf))
		? {
			...leaf,
			// props: injectedProps ? mergeProps(leaf.props, injectedProps) : leaf.props,
			children: await Promise.all(getChildren(leaf).map(c => renderToIntrinsicAsync(c)))
		}

		: (leaf)
}
/** Render a UI element into its HTML string representation */
export async function renderToStringAsync(elt: UIElement): Promise<string> {
	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`Object appearing to represent proper element has no type member\nThis is likely an error arising from creating an element with an undefined component`)
		return String(elt)
	}

	const trace = await traceToLeafAsync(elt)
	const leaf = trace.leafElement
	if (isIntrinsicElt(leaf)) {
		const children = getChildren(leaf)
		const attributesHtml = prependSpaceIfNotEmpty(stringifyAttributes(leaf.props)).toString()
		const childrenHtml = () => Promise.all(children.map(renderToStringAsync)).then(arr => arr.join(""))
		return hasValue(leaf.type)
			? selfClosingTags.includes(leaf.type.toUpperCase()) && children.length === 0
				? `<${leaf.type}${attributesHtml} />`
				: `<${leaf.type}${attributesHtml}>${await childrenHtml()}</${leaf.type}>`
			: `${await childrenHtml()}`

	}
	else {
		return String(leaf ?? "")
	}
}

/** Update the rendering of an existing DOM element (because the data on which its rendering was based has changed)
 * @param dom The DOM element whose rendering is to be updated
 * @param elt A UI (JSX) element that is used as the overriding starting point of the re-render, if passed
 * @returns The updated DOM element, which is updated in-place
 */
export async function updateAsync(dom: DOMAugmented/* | Text*/, elt?: UIElement): Promise<(DOMAugmented | DocumentFragment | Text)> {
	if (isTextDOM(dom)) { throw `UpdateAsync: Dom ${dom} is text` }
	const newTrace = elt === undefined
		? await updateTraceAsync(dom.renderTrace)
		: areCompatible(dom, elt)
			? isComponentElt(elt)
				? await updateTraceAsync(dom.renderTrace, elt)
				: { componentElts: [], leafElement: elt }
			: undefined
	if (newTrace) {
		const updatedDOM = updateDomShallow(dom, newTrace.leafElement)
		if (updatedDOM !== dom) { throw `UpdateAsync: updatedDOM !== dom` }
		if (isIntrinsicElt(newTrace.leafElement) && !isTextDOM(updatedDOM)) {
			const _children = getChildren(newTrace.leafElement)
			const domWithChildren = await updateChildrenAsync(updatedDOM, _children)
			if (domWithChildren !== updatedDOM) { throw `UpdateAsync: domWithChildren !== updatedDOM` }
		}
		return (updatedDOM instanceof DocumentFragment) || (updatedDOM instanceof Text)
			? updatedDOM
			: Object.assign(updatedDOM, { renderTrace: newTrace }) as DOMAugmented
	}
	else {
		if (elt === undefined) { throw `UpdateAsync: elt !== undefined` }
		const replacement = await renderAsync(elt)
		return (dom.replaceWith(replacement)), replacement
	}

	/** Checks for compatibility between a DOM and UI element */
	function areCompatible(_dom: DOMAugmented | Text, _elt: UIElement) {
		if (isTextDOM(_dom)) return false // DOM element is just a text element

		switch (true) {
			case (!isEltProper(_elt)):
				return false
			case (isIntrinsicElt(_elt) && _dom.renderTrace.componentElts.length > 0):
				return false
			case (isComponentElt(_elt) && _dom.renderTrace.componentElts.length === 0):
				return false
			case isComponentElt(_elt) && _elt.type === _dom.renderTrace.componentElts[0].type:
				return true
			case isIntrinsicElt(_elt) && _elt.type.toUpperCase() === _dom.tagName.toUpperCase():
				return true
			default:
				return false
		}
	}
}

/** Update children of an DOM element and return it; has side effects */
export async function updateChildrenAsync(eltDOM: DOMElement | DocumentFragment, children: UIElement[])/*: Promise<typeof eltDOM>*/ {
	const eltDomChildren = [...eltDOM.childNodes]
	const newDomChildren = await Promise.all(children.map((child, index) => {
		const matchingNode = (index < eltDomChildren.length && matching(eltDomChildren[index], child, true))
			? eltDomChildren[index]
			: eltDomChildren.find((c, i) => matching(c, child, i === index))
		const updated = matchingNode && isAugmentedDOM(matchingNode)
			? updateAsync(matchingNode as DOMAugmented, child)
			: renderAsync(child)

		return updated
	}))

	emptyContainer(eltDOM)
	newDomChildren.forEach(child => { eltDOM.append(child) })

	if (eltDOM.childNodes.length !== newDomChildren.length) {
		throw `updateChildrenAsync: eltDOM.childNodes.length (${eltDOM.childNodes.length}) !== newDomChildren.length (${newDomChildren.length})`
	}

	return eltDOM

	/** Determine if an element matches a node for the purpose of reconciliation */
	function matching(dom: Node, elt: UIElement, sameIndex: boolean) {
		const domKey = isAugmentedDOM(dom) && isIntrinsicElt(dom.renderTrace.leafElement)
			? dom.renderTrace.leafElement.props.key
			: undefined
		const eltKey = isEltProper(elt)
			? elt.props.key
			: undefined

		return sameIndex
			? domKey === eltKey
			: domKey !== undefined && eltKey !== undefined && domKey === eltKey
	}
}


/** Invalidate UI */
export function invalidateUI(invalidatedElementIds?: string[], reason?: string) {
	const ev = new CustomEvent('UIInvalidated', { detail: { invalidatedElementIds } })
	if (document.readyState === "complete") {
		document.dispatchEvent(ev)
	}
	else {
		// console.log(`\ndocument.readyState: ${document.readyState}`)
		document.onreadystatechange = async event => {
			// console.log(`\ndocument.readyState changed to: ${document.readyState}`)
			if (document.readyState === "complete") {
				console.log(`\nDispatching UIInvalidated event for ids "${ev.detail.invalidatedElementIds}" after document loading complete\n`)
				document.dispatchEvent(ev)
			}
		}
	}
}

/** Handler for invalidateUI event, as a separate fn to avoid problems with creating a new fn reference each time is it used */
async function invalidationHandlerAsync(eventInfo: Event) {
	const invalidatedElementIds: string[] = []
	let daemon = undefined as NodeJS.Timeout | undefined

	// console.log(`UIInvalidated fired with detail: ${stringify((eventInfo as any).detail)}`)
	const _invalidatedElementIds = (eventInfo as any).detail?.invalidatedElementIds ?? []
	invalidatedElementIds.push(..._invalidatedElementIds)
	if (typeof daemon === "undefined") {
		daemon = setInterval(async () => {
			if (invalidatedElementIds.length === 0 && daemon) {
				clearInterval(daemon)
				daemon = undefined
			}
			const idsToProcess = invalidatedElementIds.splice(0, invalidatedElementIds.length)
			// const topmostElementIds = getApexElementIds(idsToProcess)
			await Promise.all(/*topmostElementIds*/idsToProcess.map(id => {
				// console.log(`Updating "${id}" dom element...`)
				const elt = document.getElementById(id)
				if (elt) {
					// console.assert(isAugmentedDOM(elt))
					if (!isAugmentedDOM(elt)) {
						throw `invalidationHandlerAsync: elt ${elt} is not augmented`
					}

					updateAsync(elt as DOMAugmented)
				}
				else {
					console.warn(`DOM element to update (id ${id}) not found`)
					// invalidatedElementIds.push(id)
				}
				return void (0)
			}))

		}, DEFAULT_UPDATE_INTERVAL_MILLISECONDS)
	}
}

/** Convenience method to mount the entry point dom node of a client app */
export async function mountElement(element: UIElement, container: Element) {
	// console.log(`Mounting element ${stringify(element)} on container ${container}...`)

	// console.log(`Setting up UIInvalidated event listener on document`)
	document.addEventListener('UIInvalidated', invalidationHandlerAsync)

	// console.log(`Rendering element ${stringify(element)} in container ${container}...`)
	container.replaceChildren(await renderAsync(element))
}

/** DOM update/refresh interval. This value seems to work best when tested; Don't change without a good reason */
const DEFAULT_UPDATE_INTERVAL_MILLISECONDS = 14
export const fragment = ""
