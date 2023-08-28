import { ArgsType, deepMerge, mergeDeep } from "@agyemanjp/standard"
import * as cuid from "@paralleldrive/cuid2"
import { createElement } from "../core"
import { normalizeChildren } from "../element"
import { Component, PanelProps, HtmlProps, CSSProperties, ButtonHTMLAttributes, SVGAttributes, UIElement } from "../types"
import { stringifyStyle } from "../"

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




