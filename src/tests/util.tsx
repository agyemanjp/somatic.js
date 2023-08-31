import * as cuid from "@paralleldrive/cuid2"

/** Create html element from html string; Requires <document> object to exist */
export function constructElement(html: string): HTMLElement {
	const div = document.createElement("div")
	div.innerHTML = html.trim()
	return div
}

export function excludeAttributes(target: string, attributes: string[]): string
export function excludeAttributes(target: HTMLElement, attributes: string[]): HTMLElement
/** Remove some attributes from an html element string */
export function excludeAttributes(target: HTMLElement | string, attributes: string[]): string | HTMLElement {
	const div = constructElement(typeof target === "string" ? target : target.innerHTML)
	attributes.forEach(a => div.removeAttribute(a))
	return typeof target === "string" ? div.innerHTML : div
}

/** Normalize HTML */
export function normalizeHTML(html: string) {
	return html //excludeAttributes(html, ["id"])
		.replace(/( \w*="undefined")/, "") // remove atributes set to the string "undefined"
		.replace(/ class="(\w*)"/, ' className="$1"')
		.replace(/ for="(\w*)"/, ' htmlFor="$1"')
}

class IdProvider {
	private cache: string[]
	private pointer: number

	/** */
	constructor() {
		this.cache = []
		this.pointer = 0
	}

	/** */
	next() {
		if (this.pointer >= this.cache.length) {
			// console.log(`pushing to id provider cache`)
			this.cache.push(cuid.createId())
		}
		return this.cache[this.pointer++]
	}

	/** */
	reset() {
		this.pointer = 0
	}
}
export const idProvider = new IdProvider()


