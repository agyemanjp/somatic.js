/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/ban-types */
import { String, hasValue, take, skip } from "@agyemanjp/standard"
import { getApexElementIds, createDOMShallow, updateDomShallow, isTextDOM, truncateChildNodes, emptyContainer } from "./dom"
import { stringifyAttributes } from "./html"
import { isComponentElt, isIntrinsicElt, isEltProper, traceToLeafAsync, updateTraceAsync } from "./element"
import { Component, RenderingTrace, UIElement, DOMAugmented, } from "./types"
import { selfClosingTags, UPDATE_INTERVAL_MILLISECONDS } from "./common"


/** Render a UI element into a DOM node (which is augmented with information used for subsequent updates) */
export async function renderAsync(elt: JSX.Element): Promise<DOMAugmented | Text> {
	if (isComponentElt(elt) || isIntrinsicElt(elt)) {
		const trace: RenderingTrace = await traceToLeafAsync(elt)
		const nodeDOM = createDOMShallow(trace.leafElement)
		return isTextDOM(nodeDOM)
			? nodeDOM
			// eslint-disable-next-line fp/no-mutating-assign
			: updateChildrenAsync(Object.assign(nodeDOM, { renderTrace: trace }))
	}
	else {
		return document.createTextNode(globalThis.String(elt ?? ""))
	}
}

export async function renderToStringAsync(elt?: JSX.Element): Promise<string> {
	// console.log(`Rendering element ${stringify(elt)} to string`)
	if (hasValue(elt) && isEltProper(elt)) {
		const trace = (await traceToLeafAsync(elt))
		// console.log(`Trace to leaf: ${stringify(trace)}`)

		const leafElt = trace.leafElement
		if (hasValue(leafElt) && isIntrinsicElt(leafElt)) {
			const attributesHtml = new String(stringifyAttributes(leafElt.props)).prependSpaceIfNotEmpty().toString()
			const childrenHtml = () => Promise.all(leafElt.children.flat().map(renderToStringAsync))
				.then(arr => (/*console.log(`Rendered children array: ${arr}`),*/ arr.join("")))
			return selfClosingTags.includes(leafElt.type.toUpperCase()) && leafElt.children.length === 0
				? `<${leafElt.type}${attributesHtml} />`
				: `<${leafElt.type}${attributesHtml}>${await childrenHtml()}</${leafElt.type}>`
		}
		else {
			return globalThis.String(leafElt ?? "")
		}
	}
	else {
		return globalThis.String(elt ?? "")
	}
}

/** Convenience method to mount the entry point dom node of a client app */
export async function mountElement(element: UIElement, container: Node) {
	emptyContainer(container)
	container.appendChild(await renderAsync(element))

	const invalidatedElementIds: string[] = []
	// eslint-disable-next-line fp/no-let
	let daemon: NodeJS.Timeout | undefined = undefined

	document.addEventListener('UIInvalidated', async (eventInfo) => {
		// eslint-disable-next-line fp/no-mutating-methods, @typescript-eslint/no-explicit-any
		invalidatedElementIds.push(...(eventInfo as any).detail.invalidatedElementIds as string[])
		// eslint-disable-next-line fp/no-mutation
		if (daemon === undefined) daemon = setInterval(async () => {
			if (invalidatedElementIds.length === 0 && daemon) {
				clearInterval(daemon)
				// eslint-disable-next-line fp/no-mutation
				daemon = undefined
			}
			// eslint-disable-next-line fp/no-mutating-methods
			const idsToProcess = invalidatedElementIds.splice(0, invalidatedElementIds.length)
			const topmostElementIds = getApexElementIds(idsToProcess)
			await Promise.all(topmostElementIds.map(id => updateAsync(document.getElementById(id) as DOMAugmented)))

		}, UPDATE_INTERVAL_MILLISECONDS)
	})
}

/** JSX is transformed into calls of this function */
export function createElement(type: string | Component, props: unknown, ...children: unknown[]) {
	return { type, props: props ?? {}, children: (children ?? []).flat() }
}

/** Update the rendering of an existing DOM element (because the data on which its rendering was based has changed)
 * @param dom The DOM element whose rendering is to be updated
 * @param elt A UI (JSX) element that is used as the overriding starting point of the re-render, if passed
 */
export async function updateAsync(dom: DOMAugmented | Text, elt?: UIElement): Promise<DOMAugmented | Text> {
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
		return elt
			? renderAsync(elt).then(domNew => (dom.replaceWith(domNew), domNew))
			: dom
	}
	else { // DOM elt is augmented
		if (elt) {
			if (areCompatible(dom, elt)) { // implies dom is not Text, elt is not a value, and they have the same type/tag
				const trace = isComponentElt(elt)
					? await updateTraceAsync(dom.renderTrace, elt /* ToDo: assimilate to 1st comp elt */)
					: { componentElts: [], leafElement: elt }

				return applyTraceAsync(dom, trace), dom

			}
			else {
				return (dom.replaceWith(await renderAsync(elt))), dom
			}
		}
		else {
			return applyTraceAsync(dom, await updateTraceAsync(dom.renderTrace)), dom
		}
	}
}

/** Update children of an DOM element */
export async function updateChildrenAsync(eltDOM: DOMAugmented): Promise<DOMAugmented> {
	if ("children" in eltDOM.renderTrace.leafElement) {
		// Update or replace existing existing DOM children that are matched with leaf elt's children
		const childrenWithMatchingNodes = [...take(eltDOM.renderTrace.leafElement.children, eltDOM.children.length)]
		await Promise.all(childrenWithMatchingNodes.map((child: UIElement, index) => {
			return updateAsync((eltDOM.children.item(index) as DOMAugmented), child)
		}))
		const childrenWithoutMatchingNodes = [...skip(eltDOM.renderTrace.leafElement.children, eltDOM.children.length)]

		// Add any new children
		const newChildren = await Promise.all(childrenWithoutMatchingNodes.map((child) => renderAsync(child)))
		newChildren.forEach(dom => eltDOM.appendChild(dom))

		// Remove any existing DOM children that have no matches in leaf elt's children
		truncateChildNodes(eltDOM, eltDOM.renderTrace.leafElement.children.length)
	}
	return eltDOM
}

/** Update a DOM node to reflect an existing (already updated) render trace
 * Mutates the passed node
 */
export async function applyTraceAsync(nodeDOM: HTMLElement | SVGElement, trace: RenderingTrace): Promise<DOMAugmented> {
	// eslint-disable-next-line fp/no-mutating-assign
	const augmentedNode = Object.assign(nodeDOM, { renderTrace: trace })
	updateDomShallow(augmentedNode, trace.leafElement)
	return updateChildrenAsync(augmentedNode)
}

export * from "./types"
export * from "./html"
export * from "./dom"
export * from "./element"