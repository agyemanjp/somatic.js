import { keys, skip, first, indexesOf } from "@agyemanjp/standard"

import { stringifyStyle } from "./html"
import { isIntrinsicElt } from "./element"
import { svgTags, isEventKey, booleanAttributes, attributeConversions } from "./common"
import { DOMAugmented, DOMElement, IntrinsicElement, ValueElement } from "./types"

export type LeafElement = IntrinsicElement | ValueElement

export const isAugmentedDOM = (node: Node): node is DOMAugmented => node.nodeType === Node.ELEMENT_NODE && "renderTrace" in node
export const isTextDOM = (node: Node): node is Text => node.nodeType === Node.TEXT_NODE

/** Set a property on a DOM element to a value, in a DOM-idiomatic way. */
export function setAttribute(element: DOMElement, attribName: string, attribVal: any) {
	// if (typeof value === "string" && value.toUpperCase() === "UNDEFINED") console.log(`Setting ${key} to ${value}`)
	try {
		if (attribVal === undefined && !booleanAttributes.includes(attribName.toUpperCase())) {
			// console.warn(`Ignored setting ${attributeName} on <${element.tagName}> to undefined`)
			return
		}

		if (["CLASSNAME", "CLASS"].includes(attribName.toUpperCase())) {
			if (typeof attribVal === "string") {
				// The class attribute is set with setAttribute(). This approach:
				// avoids manipulating classList, which is cumbersome to reset, and not fully supported in all browsers
				// avoids setting className directly, since that works better for SVG elements,
				// avoids a type error, since Typescript (incorrectly) types className as read-only 
				element.setAttribute('class', attribVal)
			}
			else {
				console.warn(`Ignored setting class on <${element.tagName}> to non-string value ${attribVal}`)
			}
		}
		else if (attribName.toUpperCase() === 'STYLE') {
			if (typeof attribVal === 'object') {
				// The style (replaced with {} if null) is set with setAttribute(). This approach:
				// avoids a type error with setting style directly, since Typescript (incorrectly) types style as a read-only 
				// avoids updating individual style properties directly, since the value argument should entirely replace any previous styles, and it is cumbersome to remove existing syle properties 
				// avoids merging the incoming value with existing styles, since the value argument should entirely replace any previous styles
				element.setAttribute('style', stringifyStyle(attribVal ?? {}))
				// console.log(`Style property on <${element.tagName}> set to '${stringifyStyle(value ?? {})}'`)
			}
			else {
				console.trace(`Ignored setting style on <${element.tagName}> to non-object value ${attribVal}`)
			}
		}
		else if (typeof attribVal === 'function' && isEventKey(attribName)) {
			// const eventName = eventNames[key.toUpperCase() as keyof typeof eventNames];
			(element as any)[attribName.toLowerCase()] = attribVal
		}
		else {
			const effectiveVal = booleanAttributes.includes(attribName.toUpperCase())
				? [undefined, null, false].includes(attribVal) ? false : true
				: attribVal

			try {
				if (svgTags.includes(element.tagName.toUpperCase()) && !["function", "object"].includes(typeof effectiveVal)) {
					const effectiveKey = keys(attributeConversions).includes(attribName.toLowerCase())
						? attributeConversions[attribName.toLowerCase()]
						: attribName
					// if (key.toUpperCase() === "ID") console.log(`Setting ${effectiveKey} to ${effectiveVal}`)
					element.setAttribute(effectiveKey, effectiveVal)
				}
				else {
					// For string or true values, first set attribute using setAttribute, 
					// for a few cases not handled properly by the assignment that follows
					if (typeof effectiveVal === "string" || effectiveVal === true) {
						element.setAttribute(attribName, effectiveVal)
					}

					// The <key> property on the element is set directly to <effectiveVal>. This approach works:
					// for setting 'CHECKED', 'VALUE', and 'HTMLFOR' properties;
					// for setting the property to a value of <null>; and
					// for setting function values which are not event handlers.
					// It also avoids using setAttribute to set the property to a string form of the value
					// We assume the input property key is in the correct case as specified in the typings, * E.g., preserveAspectRatio, viewBox, fillRule, readOnly, etc

					// if (effectiveVal !== undefined)
					(element as any)[attribName] = effectiveVal
				}
			}
			catch (err) {
				console.trace(`Error setting ${attribName} on <${element.tagName}> to ${attribVal}\n{err}`)
			}
		}
	}
	catch (e) {
		console.trace(`Error setting "${attribName}" on <${element.tagName}> to "${JSON.stringify(attribVal, undefined, 2)}:\n${e}`)
	}
}

/** Create a shallow DOM element based on the passed intrinsic element or primitive value.
 * @returns A non-text DOM element (without children) when passed an intrinsic element (that possibly has children)
 * @returns A text DOM element when passed a primitive value
 */
export function createDOMShallow(eltUI: LeafElement): DOMElement | DocumentFragment | Text {
	if (isIntrinsicElt(eltUI)) {
		const dom = (svgTags.includes(eltUI.type.toUpperCase())
			? document.createElementNS('http://www.w3.org/2000/svg', eltUI.type)
			: eltUI.type === ""
				? document.createDocumentFragment()
				: document.createElement(eltUI.type)
		)

		const props = eltUI.props ?? {}
		if (dom instanceof DocumentFragment) {
			console.assert(Object.keys(props).length === 0)
		}
		else {
			Object.keys(props).forEach(key => setAttribute(dom, key, props[key]))
		}

		return dom
	}
	else {
		return document.createTextNode(globalThis.String(eltUI ?? ""))
	}
}

/** Update or create a DOM element based on the passed intrinsic element or primitive value. 
 * If passed an intrinsic element with the same tag as the existing DOM, the DOM is updated to match the intrinsic element
 * Else the existing DOM is replaced (with respect to its parent) with a new shallow DOM based on the intrinsic element
 * If passed a primitive value, the original DOM is replaced with a new text element with content set to the value
 * @returns: The original or new DOM element according to the above rules
 */
export function updateDomShallow(eltDOM: DOMElement, eltUI: LeafElement) {
	if ("attributes" in eltDOM && isIntrinsicElt(eltUI) && eltUI.type.toUpperCase() === eltDOM.tagName.toUpperCase()) {
		// console.log(`updateDomShallow: Removing all existing attributes of ${eltDOM}`);

		[...eltDOM.attributes].forEach(attrib => eltDOM.removeAttribute(attrib.name))
		const props = eltUI.props ?? {}

		// console.log(`updateDomShallow: Setting props ${stringify(props)} on ${eltDOM}`)
		Object.keys(props).forEach(key => setAttribute(eltDOM, key, props[key]))
		return eltDOM
	}
	else {
		const newDom = createDOMShallow(eltUI)
		// console.log(`updateDomShallow: New dom ${newDom} create to replace ${eltDOM}`)

		if (newDom instanceof DocumentFragment) {
			eltDOM.replaceWith(...newDom.childNodes)
		}
		else {
			eltDOM.replaceWith(newDom)
		}

		return newDom
	}
}

/** Remove child nodes beyond a certain index */
export function truncateChildNodes(node: Node, newLength: number) {
	[...skip([...node.childNodes], newLength)].forEach(child => node.removeChild(child))
}

/** Empty a node of child nodes */
export function emptyContainer(container: Node) {
	container.textContent = ""
}

/*function detachedUpdate(dom: Node, fn: (dom: Node) => any) {
	const parent = dom.parentNode
	if (parent) {
		const index = first(indexesOf(parent.childNodes.entries(), { value: dom }))
		parent.removeChild(dom)
		fn(dom)
		parent.insertBefore(dom, parent.childNodes.item(index))
	}
}*/

/** Get ids of peak DOM elements among a list of elements in a tree */
export function getApexElementIds(elementIds: string[]): string[] {
	return elementIds.filter(id => {
		let parent = document.getElementById(id)?.parentElement
		while (parent) {
			if (elementIds.includes(parent.id)) { return false }
			parent = parent.parentElement
		}
		return true
	})
}
/** Get peak DOM elements among a list of elements in a tree */
export function getApexElements(elements: DOMElement[]): DOMElement[] {
	return elements.filter(elt => {
		let parent = elt.parentElement
		while (parent) {
			if (elements.includes(parent)) { return false }
			parent = parent.parentElement
		}
		return true
	})
}
