/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import { PropsExtended, Message } from "./types"
import { eventNames } from "./constants"
import { default as cuid } from "cuid"
import { deepMerge } from "@sparkwave/standard/collections/object"
import { Obj } from "@sparkwave/standard/utility"


/** Calculates a lighter or darker color of a base color in Hex representation.
 * @param hexColor a hex color value such as “#abc” or “#123456” (the hash is optional)
 * @param luminosity the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc
 */
export function colorLuminance(hexColor: string, luminosity: number) {
	// Validate hex string
	// eslint-disable-next-line fp/no-let
	let _hexColor = String(hexColor).replace(/[^0-9a-f]/gi, '')
	if (_hexColor.length < 6) {
		// eslint-disable-next-line fp/no-mutation
		_hexColor = _hexColor[0] + _hexColor[0] + _hexColor[1] + _hexColor[1] + _hexColor[2] + _hexColor[2]
	}
	const _luminosity = luminosity || 0

	// Convert to decimal and change luminosity
	// eslint-disable-next-line fp/no-let, init-declarations
	let rgb = "#", c, i
	// eslint-disable-next-line fp/no-loops, fp/no-mutation
	for (i = 0; i < 3; i++) {
		// eslint-disable-next-line fp/no-mutation
		c = parseInt(_hexColor.substr(i * 2, 2), 16)
		// eslint-disable-next-line fp/no-mutation
		c = Math.round(Math.min(Math.max(0, c + (c * _luminosity)), 255)).toString(16)
		// eslint-disable-next-line fp/no-mutation
		rgb += ("00" + c).substr(c.length)
	}

	return rgb
}

/** Merge default props with actual props of renderer */
export function mergeProps<P extends Obj, D extends Partial<P>>(defaults: D, props: P): D & P & Partial<P> {
	return deepMerge(defaults, props) as D & P & Partial<P>
}

export function setAttribute(dom: HTMLElement | SVGElement, key: string, value: string | ((e: Event) => unknown)) {
	// if (typeof value === "function") {
	// 	if (key === "ref") {
	// 		value(dom)
	// 	}
	// }
	// else
	if (['checked', 'value', 'htmlFor'].includes(key)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, fp/no-mutation
		(dom as any)[key] = value
	}
	else if (key === 'className') { // We turn the 'className' property into the HTML class attribute
		const classes = (value as string).split(/\s/)
		classes.forEach(cl => {
			dom.classList.add(cl)
		})
	}
	else if (key == 'style' && typeof value == 'object') {
		// console.log(`Somatic set ${key} attribute to value: ${JSON.stringify(value)}`)
		// eslint-disable-next-line fp/no-mutating-assign
		Object.assign(dom.style, value)
		//dom.innerHTML
	}
	else if (typeof value !== 'object' && typeof value !== 'function') {
		dom.setAttribute(key, value)
	}
}

/** Checks if a string corresponds to one of the (uppercase) event names keys */
export function isEventKey(key: string): key is keyof typeof eventNames {
	const keyUpper = key.toUpperCase()
	return keyUpper.startsWith("ON") // this condition is simply to prevent useless searches through the events list.
		&& Object.keys(eventNames).includes(keyUpper)
}

export function camelCaseToDash(str: string) {
	return str
		.replace(/[^a-zA-Z0-9]+/g, '-')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/([0-9])([^0-9])/g, '$1-$2')
		.replace(/([^0-9])([0-9])/g, '$1-$2')
		.replace(/-+/g, '-')
		.toLowerCase()
}

/** Encode html string */
export function encodeHTML(str: string) {
	return str.replace(/[&<>"']/g, (match) => {
		switch (match) {
			case "&":
				return "&amp;"
			case "<":
				return "&lt;"
			case ">":
				return "&gt;"
			case '"':
				return "&quot;"
			case "'":
				return "&#039;"
			default:
				return ""
		}
	})
}

/*class IdProvider {
	private cache: string[]
	private pointer: number
	constructor() {
		this.cache = []
		this.pointer = 0
	}
	next() {
		if (this.pointer >= this.cache.length) {
			this.cache.push(`id_${this.cache.length.toString()}`)
		}
		return this.cache[this.pointer++]
	}
	reset() {
		this.pointer = 0
	}
}
export const idProvider = new IdProvider()
*/

class IdProvider {
	private cache: string[]
	private pointer: number
	constructor() {
		this.cache = []
		this.pointer = 0
	}
	next() {
		if (this.pointer >= this.cache.length) {
			this.cache.push(cuid())
		}
		return this.cache[this.pointer++]
	}
	reset() {
		this.pointer = 0
	}
}
export const idProvider = new IdProvider()


export const config = {
	theme: {
		colors: {
			primary: { // navy
				light: "#86a1bc",
				dark: "#34495e"
			},
			secondary: { // purple
				light: "#d477b0",
				dark: "#C64B97"
			},

			error: "#cd5e5e",
			warning: "#fcc169",
			info: "#ccc",

			whitish: "#f5f5f5",
			blackish: "#555555",
			grayish: "#808080",
			blueish: "#f0f6ff"
		},
		fonts: {
			text: "normal normal 12px serif",
			textAlt: "italics normal 12px serif",
			link: "normal normal 12px sans-serif",
			titleBig: "normal bold 24px sans-serif",
			titleMedium: "normal normal 20px sans-serif",
			titleSmall: "normal bold 12px sans-serif",
			tiny: "normal normal 10 serif"
		},
		thickness: 1
	}
}