/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { skip, hasValue } from "@agyemanjp/standard"
import { DOMAugmented, IntrinsicElement } from "./types"
import { stringifyStyle } from "./html"
import { isEltProper, isIntrinsicElt } from "./element"
import { svgTags, isEventKey, eventNames } from "./common"

export const isAugmentedDOM = (node: Node): node is DOMAugmented => node.nodeType === Node.ELEMENT_NODE && "renderTrace" in node
export const isTextDOM = (node: Node): node is Text => node.nodeType === Node.TEXT_NODE

export function createDOMShallow(eltUI?: IntrinsicElement | {}) {
	if (hasValue(eltUI) && isEltProper(eltUI)) {
		const dom = svgTags.includes(eltUI.type.toUpperCase())
			? document.createElementNS('http://www.w3.org/2000/svg', eltUI.type)
			: document.createElement(eltUI.type)

		Object.keys(eltUI.props)
			.forEach(key => setAttribute(dom, key, eltUI.props[key]))

		return dom
	}
	else {
		return document.createTextNode(globalThis.String(eltUI ?? ""))
	}
}
export function updateDomShallow(eltDOM: DOMAugmented, eltUI: IntrinsicElement | {}) {
	if ("attributes" in eltDOM && isIntrinsicElt(eltUI) && eltUI.type.toUpperCase() === eltDOM.tagName.toUpperCase()) {
		[...eltDOM.attributes].forEach(attrib => eltDOM.removeAttribute(attrib.name))
		Object.keys(eltUI.props).forEach(key => setAttribute(eltDOM, key, eltUI.props[key]))
	}
	else {
		eltDOM.replaceWith(createDOMShallow(eltUI))
	}
	return eltDOM
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

/** Set a property on a DOM element to a value, in a DOM-idiomatic way */
export function setAttribute(element: HTMLElement | SVGElement, key: string, value: unknown) {
	try {
		if (key.toUpperCase() === 'CLASSNAME') {
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
				// The style (replaced with {} is null) is set with setAttribute(). This approach:
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
		else if (typeof value === 'function' && isEventKey(key.toUpperCase())) {
			const eventName = eventNames[key.toUpperCase() as keyof typeof eventNames]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			element.addEventListener(eventName, value as any)
		}
		else {
			// The <key> property on the element is directly to the <value> argument. This approach works:
			// for setting 'CHECKED', 'VALUE', and 'HTMLFOR' properties;
			// for setting the property to a vlaue of <null>; and
			// for setting function values with are not event handlers.
			// It also avoids using setAttribute to set the property to a string form of the value

			// eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-explicit-any
			(element as any)[key] = value
			// console.log(`Set "${key}" on <${element.tagName}> to "${JSON.stringify(value, undefined, 2)}`)
			// console.log(`Style property on <${element.tagName}> set to '${stringifyStyle(value ?? {})}'`)
		}
	}
	catch (e) {
		console.error(`Error setting "${key}" on <${element.tagName}> to "${JSON.stringify(value, undefined, 2)}:\n${e}`)
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