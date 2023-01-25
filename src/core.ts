/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */


// import * as cuid from "cuid"
import { stringifyAttributes } from "./html"
import { createDOMShallow, updateDomShallow, isTextDOM, isAugmentedDOM, emptyContainer } from "./dom"
import { isComponentElt, isIntrinsicElt, isEltProper, getChildren, getLeafAsync, traceToLeafAsync, updateTraceAsync } from "./element"
import { Component, DOMElement, UIElement, ValueElement, IntrinsicElement, DOMAugmented } from "./types"
import { selfClosingTags } from "./common"
import { hasValue, prependSpaceIfNotEmpty } from "@agyemanjp/standard"

export const Fragment = ""
export type Fragment = typeof Fragment

/** JSX is transformed into calls of this function */
export function createElement<T extends string | Component>(type: T, props: (typeof type) extends Component<infer P> ? P : unknown, ...children: unknown[]) {
	if (typeof type !== "string" && typeof type !== "function")
		console.trace(`Type argument has invalid type ${typeof type}`)

	return { type, props: props ?? {}, children: (children ?? []).flat() }
}

/** Render a UI element into a DOM node (augmented with information used for subsequent updates) */
export async function renderAsync(elt: UIElement): Promise<(DOMAugmented | DocumentFragment | Text)> {
	if (hasValue(elt)
		&& typeof elt === "object"
		&& "props" in elt &&
		"children" in elt &&
		typeof elt.type === "undefined") {
		console.warn(`Object appearing to represent proper element has no type member\n
			This is likely an error arising from creating an element with an undefined component`)
		// return createDOMShallow(JSON.stringify(elt)) as Text
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
		return globalThis.String(elt)
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
		return globalThis.String(leaf ?? "")
	}
}

/** Update the rendering of an existing DOM element (because the data on which its rendering was based has changed)
 * @param dom The DOM element whose rendering is to be updated
 * @param elt A UI (JSX) element that is used as the overriding starting point of the re-render, if passed
 * @returns The updated DOM element, which is updated in-place
 */
export async function updateAsync(dom: DOMAugmented | Text, elt?: UIElement): Promise<(DOMAugmented | DocumentFragment | Text)> {
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

	if (isTextDOM(dom)) {
		// don't use hasValue here because that will flag null, "", etc, which are valid value elements
		return elt !== undefined
			? renderAsync(elt).then(domNew => (dom.replaceWith(domNew), domNew))
			: dom
	}
	else { // DOM elt is augmented
		if (elt !== undefined) { // don't use hasValue here because that will flag null, "", etc, which are valid value elements
			if (areCompatible(dom, elt)) { // dom is not Text, elt is not a value, and they have the same type/tag
				const trace = isComponentElt(elt)
					? await updateTraceAsync(dom.renderTrace, elt)
					: { componentElts: [], leafElement: elt }

				return await (isIntrinsicElt(trace.leafElement)
					? applyLeafElementAsync(dom, trace.leafElement)
						.then(_ => Object.assign(_ as DOMElement, { renderTrace: trace }))
					: (() => {
						updateDomShallow(dom, trace.leafElement)
						return Promise.resolve(dom as any as Text)
					})()
				)
			}
			else {
				const replacement = await renderAsync(elt)
				return (dom.replaceWith(replacement)), replacement
			}
		}
		else {
			const newTrace = await updateTraceAsync(dom.renderTrace)
			if (isIntrinsicElt(newTrace.leafElement))
				applyLeafElementAsync(dom, newTrace.leafElement)
			else
				updateDomShallow(dom, newTrace.leafElement)
			return Object.assign(dom, { renderTrace: newTrace } as Pick<DOMAugmented, "renderTrace">)
		}
	}
}

/** Invalidate UI */
export function invalidateUI(invalidatedElementIds?: string[], reason?: string) {
	// if (reason)
	// 	console.log(`Invalidated ids ${invalidatedElementIds} due to ${reason}`)
	const ev = new CustomEvent('UIInvalidated', { detail: { invalidatedElementIds } })
	if (document.readyState === "complete") {
		document.dispatchEvent(ev)
	}
	else {
		// console.log(`\ndocument.readyState: ${document.readyState}`)
		document.onreadystatechange = async (event) => {
			// console.log(`\ndocument.readyState changed to: ${document.readyState}`)
			if (document.readyState === "complete") {
				console.log(`\nDispatching UIInvalidated event for ids "${ev.detail.invalidatedElementIds}" after document loading complete\n`)
				document.dispatchEvent(ev)
			}
		}
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
async function invalidationHandlerAsync(eventInfo: Event) {
	const invalidatedElementIds: string[] = []
	let daemon: NodeJS.Timeout | undefined = undefined

	// console.log(`UIInvalidated fired with detail: ${stringify((eventInfo as any).detail)}`)
	const _invalidatedElementIds = (eventInfo as any).detail?.invalidatedElementIds ?? []
	invalidatedElementIds.push(..._invalidatedElementIds)
	if (daemon === undefined) daemon = setInterval(async () => {
		if (invalidatedElementIds.length === 0 && daemon) {
			clearInterval(daemon)
			daemon = undefined
		}
		const idsToProcess = invalidatedElementIds.splice(0, invalidatedElementIds.length)
		// const topmostElementIds = getApexElementIds(idsToProcess)
		await Promise.all(/*topmostElementIds*/idsToProcess.map(id => {
			// console.log(`Updating "${id}" dom element...`)
			const elt = document.getElementById(id)
			if (elt)
				updateAsync(elt as DOMAugmented)
			else {
				console.warn(`DOM element to update (id ${id}) not found`)
				// invalidatedElementIds.push(id)
			}
		}))

	}, DEFAULT_UPDATE_INTERVAL_MILLISECONDS)
}

/** Update children of an DOM element; has side effects */
export async function updateChildrenAsync(eltDOM: DOMElement | DocumentFragment, children: UIElement[])/*: Promise<typeof eltDOM>*/ {
	const eltDomChildren = [...eltDOM.childNodes]
	const matching = (dom: Node, elt: UIElement, sameIndex: boolean) => {
		const domKey = isAugmentedDOM(dom) && isIntrinsicElt(dom.renderTrace.leafElement)
			? dom.renderTrace?.leafElement?.props?.key
			: undefined
		const eltKey = isEltProper(elt)
			? elt?.props?.key
			: undefined

		return sameIndex
			? domKey === eltKey
			: domKey && eltKey && domKey === eltKey
	}

	const newChildren = await Promise.all(children.map((child, index) => {
		const matchingNode = (index < eltDomChildren.length && matching(eltDomChildren[index], child, true))
			? eltDomChildren[index]
			: eltDomChildren.find((c, i) => matching(c, child, i === index))
		const updated = matchingNode && isAugmentedDOM(matchingNode)
			? updateAsync(matchingNode as DOMAugmented, child)
			: renderAsync(child)

		return updated
	}))

	emptyContainer(eltDOM)
	newChildren.forEach(child => {
		eltDOM.append(child)
	})
	return eltDOM

	// const fragment = new DocumentFragment()
	// fragment.append(...newChildren)
	// eltDOM.replaceChildren(fragment)

	// return eltDOM
}

/** Update input DOM element to reflect input leaf UI element (type, props, and children)
 * Posibly mutates the input node
 */
export async function applyLeafElementAsync(nodeDOM: DOMElement, eltLeaf: IntrinsicElement)/*: Promise<DOMAugmented | Text>*/ {
	// const augmentedNode = Object.assign(nodeDOM, { renderTrace: trace })
	const updatedDOM = updateDomShallow(nodeDOM, eltLeaf)

	return isTextDOM(updatedDOM)
		? updatedDOM
		: isIntrinsicElt(eltLeaf) && "children" in eltLeaf
			? updateChildrenAsync(updatedDOM, getChildren(eltLeaf))
			: updatedDOM
}

/** DOM update/refresh interval. This value seems to work best when tested; Don't change without a good reason */
const DEFAULT_UPDATE_INTERVAL_MILLISECONDS = 14
