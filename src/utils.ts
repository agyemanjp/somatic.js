/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import { PropsExtended, Message } from "./types"
import { eventNames } from "./constants"
import { default as cuid } from "cuid"


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


class IdProvider {
	private cache: string[]
	private pointer: number
	constructor() {
		this.cache = []
		this.pointer = 0
	}
	next() {
		if (this.pointer >= this.cache.length) {
			// console.log(`pushing to id provider cache`)
			this.cache.push(cuid())
		}
		return this.cache[this.pointer++]
	}
	reset() {
		this.pointer = 0
	}
}
export const idProvider = new IdProvider()

