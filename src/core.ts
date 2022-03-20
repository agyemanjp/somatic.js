/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/ban-types */
// import * as chalk from "chalk"
// eslint-disable-next-line @typescript-eslint/no-var-requires

// import *  as morphdom from "morphdom"
// const morphdom = require("morphdom")
// const x = import("morpdom")

// import * as cuid from "cuid"
import { String, Obj, hasValue, deepMerge } from "@agyemanjp/standard"
import { stringifyAttributes } from "./html"
import { getApexElementIds, createDOMShallow, updateDomShallow, isTextDOM, isAugmentedDOM, emptyContainer } from "./dom"
import { isComponentElt, isIntrinsicElt, isEltProper, getChildren, getLeafAsync, traceToLeafAsync, updateTraceAsync } from "./element"
import { Component, DOMElement, UIElement, ValueElement, IntrinsicElement, DOMAugmented, Children } from "./types"
import { stringify, selfClosingTags, isEventKey } from "./common"


/** JSX is transformed into calls of this function */
export function createElement<T extends string | Component>(type: T, props: (typeof type) extends Component<infer P> ? P : unknown, ...children: unknown[]) {
	if (!type) console.warn(`Type arguemnt mising in call to createElement`)
	return { type, props: Object.assign({ /*id: cuid()*/ }, props), children: (children ?? []).flat()/*, extra: {}*/ }
}

/** Render a UI element into a DOM node (augmented with information used for subsequent updates) */
export async function renderAsync(elt: UIElement): Promise<DOMAugmented | Text> {
	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`Object appearing to represent proper element has no type member\nThis is likely an error arising from creating an element with an undefined component`)
		return createDOMShallow(JSON.stringify(elt)) as Text
	}

	const trace = await traceToLeafAsync(elt)
	const leaf = trace.leafElement
	const dom = createDOMShallow(leaf)

	return isTextDOM(dom)
		? dom
		: await updateChildrenAsync(dom, getChildren(leaf)),
		Object.assign(dom, { renderTrace: trace })
}

/** Render a UI element into a tree of intrinsic elements, optionally injecting some props in the root element */
export async function renderToIntrinsicAsync(elt: UIElement, injectedProps?: Obj): Promise<IntrinsicElement> {
	const valueToIntrinsic = (val: ValueElement) => ({
		type: "div",
		props: { ...injectedProps },
		children: [globalThis.String(val)]
	})
	const mergeProps = (oldProps: Obj, newProps: Obj) => {
		const props = { ...oldProps }
		Object.keys(newProps).forEach(key => {
			const oldVal = oldProps[key]
			const newVal = newProps[key]
			if (isEventKey(key) && (oldVal === undefined || typeof oldVal === "function") && typeof newVal === 'function') {
				// eslint-disable-next-line fp/no-mutation
				props[key] = () => {
					if (oldVal) oldVal()
					newVal()
				}
			}
			else {
				props[key] = deepMerge(oldVal, newVal)
			}
		})
		return props
	}

	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`Object appearing to represent proper element has no type member\nThis is likely an error due to creating an element with an undefined component`)
		return valueToIntrinsic(elt)
	}

	const leaf = await getLeafAsync(elt)
	return (isIntrinsicElt(leaf))
		? {
			type: leaf.type,
			props: injectedProps ? mergeProps(leaf.props, injectedProps) : leaf.props,
			children: await Promise.all(getChildren(leaf).map(c => renderToIntrinsicAsync(c)))
		}

		: valueToIntrinsic(leaf)
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
		const attributesHtml = new String(stringifyAttributes(leaf.props)).prependSpaceIfNotEmpty().toString()
		const childrenHtml = () => Promise.all(children.map(renderToStringAsync)).then(arr => arr.join(""))
		return selfClosingTags.includes(leaf.type.toUpperCase()) && children.length === 0
			? `<${leaf.type}${attributesHtml} />`
			: `<${leaf.type}${attributesHtml}>${await childrenHtml()}</${leaf.type}>`
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
		return elt !== undefined // don't use hasValue here because that will flag null, "", etc, which are valid value elements
			? renderAsync(elt).then(domNew => (dom.replaceWith(domNew), domNew))
			: dom
	}
	else { // DOM elt is augmented
		if (elt !== undefined) { // don't use hasValue here because that will flag null, "", etc, which are valid value elements
			if (areCompatible(dom, elt)) { // dom is not Text, elt is not a value, and they have the same type/tag
				const trace = isComponentElt(elt)
					? await updateTraceAsync(dom.renderTrace, elt)
					: { componentElts: [], leafElement: elt }

				return isIntrinsicElt(trace.leafElement)
					? applyLeafElementAsync(dom, trace.leafElement)
					: updateDomShallow(dom, trace.leafElement),
					dom

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
			return Object.assign(dom, { renderingTrace: newTrace })
		}
	}
}

/** Invalidate UI */
export function invalidateUI(invalidatedElementIds?: string[]) {
	document.dispatchEvent(new CustomEvent('UIInvalidated', { detail: { invalidatedElementIds } }))
}

type MountOptions = {
	updateMode?: "continuous-from-top" | "on-event-from-invalidated",
	updateInterval?: number
}
/** Convenience method to mount the entry point dom node of a client app */
export async function mountElement(element: UIElement, container: Node, options?: MountOptions) {
	/** Library-specific DOM update/refresh interval */
	const DEFAULT_UPDATE_INTERVAL_MILLISECONDS = 14

	// console.log(`Mounting element ${stringify(element)} on container ${container}...`)

	if (options?.updateMode === "continuous-from-top") {
		setInterval(async () => {
			// console.log(`Updating mounted dom element ${dom}...`)
			if (container.firstChild)
				await updateAsync(container.firstChild as DOMAugmented)
		}, options.updateInterval ?? DEFAULT_UPDATE_INTERVAL_MILLISECONDS)
	}
	else {
		const invalidatedElementIds: string[] = []
		// eslint-disable-next-line fp/no-let
		let daemon: NodeJS.Timeout | undefined = undefined

		// console.log(`Setting up UIInvalidated event listener on document`)
		document.addEventListener('UIInvalidated', async (eventInfo) => {
			// console.log(`UIInvalidated fired with detail: ${stringify((eventInfo as any).detail)}`)
			const _invalidatedElementIds = (eventInfo as any).detail?.invalidatedElementIds ?? []
			// eslint-disable-next-line fp/no-mutating-methods, @typescript-eslint/no-explicit-any
			invalidatedElementIds.push(..._invalidatedElementIds)
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
				await Promise.all(topmostElementIds.map(id => {
					// console.log(`Updating "${id}" dom element...`)
					updateAsync(document.getElementById(id) as any as DOMAugmented)
				}))

			}, options?.updateInterval ?? DEFAULT_UPDATE_INTERVAL_MILLISECONDS)
		})
	}

	emptyContainer(container)
	container.appendChild(await renderAsync(element))
}

/** Update children of an DOM element; has side effects */
export async function updateChildrenAsync(eltDOM: DOMElement, children: UIElement[]): Promise<typeof eltDOM> {
	const eltDomChildren = [...eltDOM.childNodes]
	const matching = (dom: Node, elt: UIElement) => {
		return isAugmentedDOM(dom)
			&& isIntrinsicElt(dom.renderTrace.leafElement)
			&& "key" in dom.renderTrace.leafElement.props
			&& isEltProper(elt)
			&& "key" in elt.props
			&& dom.renderTrace.leafElement.props.key === elt.props.key
	}

	const newChildren = await Promise.all(children.map((child, index) => {
		const matchingNode = (index < eltDomChildren.length && matching(eltDomChildren[index], child))
			? eltDomChildren[index]
			: eltDomChildren.find(c => matching(c, child)) ?? eltDomChildren[index]
		const updated = matchingNode
			? updateAsync(matchingNode as DOMAugmented, child)
			: renderAsync(child)

		return updated
	}))

	const fragment = new DocumentFragment()
	newChildren.forEach(dom => fragment.appendChild(dom))
	eltDOM.replaceChildren(fragment)

	return eltDOM
}

/** Update input DOM element to reflect input leaf UI element (type, props, and children)
 * Posibly mutates the input node
 */
export async function applyLeafElementAsync(nodeDOM: DOMElement, eltLeaf: IntrinsicElement)/*: Promise<DOMAugmented | Text>*/ {
	// eslint-disable-next-line fp/no-mutating-assign
	// const augmentedNode = Object.assign(nodeDOM, { renderTrace: trace })
	const updatedDOM = updateDomShallow(nodeDOM, eltLeaf)

	return isTextDOM(updatedDOM)
		? updatedDOM
		: isIntrinsicElt(eltLeaf) && "children" in eltLeaf
			? updateChildrenAsync(updatedDOM, getChildren(eltLeaf))
			: updatedDOM
}
