/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { skip, hasValue, toCamelCase } from "@agyemanjp/standard"
import { DOMAugmented, IntrinsicElement, ValueElement } from "./types"
import { stringifyStyle } from "./html"
import { isEltProper, isIntrinsicElt } from "./element"
import { svgTags, isEventKey, eventNames, booleanAttributes } from "./common"

export const isAugmentedDOM = (node: Node): node is DOMAugmented => node.nodeType === Node.ELEMENT_NODE && "renderTrace" in node
export const isTextDOM = (node: Node): node is Text => node.nodeType === Node.TEXT_NODE

/** Set a property on a DOM element to a value, in a DOM-idiomatic way.
 * The input property key must already be in the correct case 
 */
export function setAttribute(element: HTMLElement | SVGElement, key: string, value: any) {
	if (["preserveaspectratio", "viewbox"].includes(key.toLowerCase()))
		console.log(`SetAttribute starting for "${key}" on <${element.tagName}> to "${JSON.stringify(value, undefined, 2)}`)

	try {
		if (["CLASSNAME", "CLASS"].includes(key.toUpperCase())) {
			if (typeof value === "string") {
				// The class attribute is set with setAttribute(). This approach:
				// avoids manipulating classList, which is cumbersome to reset, and not fully supported in all browsers
				// avoids setting className directly, since that works better for SVG elements,
				// avoids a type error, since Typescript (incorrectly) types className as read-only 
				element.setAttribute('class', value)
				//ToDo: Check if setAttributeNS is better to use above and in similar calls

				// console.log(`Class property on <${element.tagName}> set to '${stringifyStyle(value ?? {})}'`)
			}
			else {
				console.warn(`Ignored setting class on <${element.tagName}> to non-string value ${value}`)
			}
		}
		else if (key.toUpperCase() === 'STYLE') {
			if (typeof value === 'object') {
				// The style (replaced with {} if null) is set with setAttribute(). This approach:
				// avoids a type error with setting style directly, since Typescript (incorrectly) types style as a read-only 
				// avoids updating individual style properties directly, since the value argument should entirely replace any previous styles, and it is cumbersome to remove existing syle properties 
				// avoids merging the incoming value with existing styles, since the value argument should entirely replace any previous styles
				element.setAttribute('style', stringifyStyle(value ?? {}))
				// console.log(`Style property on <${element.tagName}> set to '${stringifyStyle(value ?? {})}'`)
			}
			else {
				console.warn(`Ignored setting style on <${element.tagName}> to non-object value ${value}`)
			}
		}
		else if (typeof value === 'function' && isEventKey(key)) {
			const eventName = eventNames[key.toUpperCase() as keyof typeof eventNames]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			element.addEventListener(eventName, value as any)
			element.addEventListener("unload", () => {
				console.warn(`onloading element ${element}...`)
				element.removeEventListener(eventName, value)
			})
		}
		else {
			const effectiveVal = booleanAttributes.includes(key.toUpperCase())
				? [undefined, null, false].includes(value)
					? false
					: true
				: value

			// The camelcase of <key> property on the element is set directly to <effectiveVal>. This approach works:
			// for setting 'CHECKED', 'VALUE', and 'HTMLFOR' properties;
			// for setting the property to a value of <null>; and
			// for setting function values with are not event handlers.
			// It also avoids using setAttribute to set the property to a string form of the value

			const effectiveKey = key.toUpperCase() === "READONLY" ? "readOnly" : toCamelCase(key)
			// eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-explicit-any
			if (["preserveaspectratio", "viewbox"].includes(effectiveKey.toLowerCase()))
				console.log(`Set "${effectiveKey}" on <${element.tagName}> to "${JSON.stringify(value, undefined, 2)}`)

			try {
				(element as any)[effectiveKey] = effectiveVal
			}
			catch (err) {
				element.setAttribute(effectiveKey, effectiveVal)
			}
			// console.log(`Style property on <${element.tagName}> set to '${stringifyStyle(value ?? {})}'`)
		}
	}
	catch (e) {
		console.error(`Error setting "${key}" on <${element.tagName}> to "${JSON.stringify(value, undefined, 2)}:\n${e}`)
	}
}

/** Create a shallow DOM element based on the passed intrinsic element or primitive value.
 * @returns A non-text DOM element (without children) when passed an intrinsic element (that possibly has children)
 * @returns A text DOM element when passed a primitive value
 */
export function createDOMShallow(eltUI?: IntrinsicElement | ValueElement): HTMLElement | SVGElement | Text {
	if (hasValue(eltUI) && isEltProper(eltUI)) {
		const dom = svgTags.includes(eltUI.type.toUpperCase())
			? document.createElementNS('http://www.w3.org/2000/svg', eltUI.type)
			: document.createElement(eltUI.type)
		const props = eltUI.props ?? {}
		Object.keys(props).forEach(key => setAttribute(dom, key, props[key]))

		return dom
	}
	else {
		return document.createTextNode(globalThis.String(eltUI ?? ""))
	}
}

/** Update or create a DOM element based on the passed intrinsic element or primitive value. 
 * If passed an intrinsic element with the same tag as the existing DOM, the DOM is updated to match the intrinsic element
 * Else the existing DOM is replaced (with respect ot its parent) with a new shallow DOM based on the intrinsic element
 * If passed a primitive value, the original DOM is replaced with a new text element with content set to the value
 * @returns: The original or new DOM element according to the above rules
 */
export function updateDomShallow(eltDOM: HTMLElement | SVGElement, eltUI: IntrinsicElement | ValueElement) {
	if ("attributes" in eltDOM && isIntrinsicElt(eltUI) && eltUI.type.toUpperCase() === eltDOM.tagName.toUpperCase()) {
		[...eltDOM.attributes].forEach(attrib => eltDOM.removeAttribute(attrib.name))
		const props = eltUI.props ?? {}
		Object.keys(props).forEach(key => setAttribute(eltDOM, key, props[key]))
		return eltDOM
	}
	else {
		if (isIntrinsicElt(eltUI))
			console.log(`updateDOMShallow: ${eltUI.type.toUpperCase()} not compatible with ${eltDOM.tagName.toUpperCase()}, so creating new DOM`)

		const newDom = createDOMShallow(eltUI)
		eltDOM.replaceWith(newDom)
		return newDom
	}
}

/** Remove child nodes beyond a certain index */
export function truncateChildNodes(node: Node, newLength: number) {
	[...skip([...node.childNodes], newLength)].forEach(child => node.removeChild(child))
}

/** Empty a node of child nodes */
export function emptyContainer(container: Node) {
	// eslint-disable-next-line fp/no-loops
	while (container.lastChild) {
		container.removeChild(container.lastChild)
	}

	// while (container.firstChild) {
	// 	console.log(`Removing container's first child...`)
	// 	container.firstChild.remove()
	// }
}

/** Get ids of peak DOM elements among a list of elements in a tree */
export function getApexElementIds(elementIds: string[]): string[] {
	return elementIds.filter(id => {
		// eslint-disable-next-line fp/no-let
		let parent = document.getElementById(id)?.parentElement
		// eslint-disable-next-line fp/no-loops
		while (parent) {
			if (elementIds.includes(parent.id))
				return false
			// eslint-disable-next-line fp/no-mutation
			parent = parent.parentElement
		}
		return true
	})
}
export function getApexElements(elements: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement)[] {
	return elements.filter(elt => {
		// eslint-disable-next-line fp/no-let
		let parent = elt.parentElement
		// eslint-disable-next-line fp/no-loops
		while (parent) {
			if (elements.includes(parent))
				return false
			// eslint-disable-next-line fp/no-mutation
			parent = parent.parentElement
		}
		return true
	})
}