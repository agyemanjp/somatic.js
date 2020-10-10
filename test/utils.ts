/* eslint-disable brace-style */
/* eslint-disable camelcase */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable init-declarations */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-mutation */

// import { map, forEach } from "@sparkwave/standard/collections/iterable"
import { getComparer, getRanker } from "@sparkwave/standard/functional"



/* See https://www.w3schools.com/jsref/prop_node_nodetype.asp */
enum NodeType {
	Text = 3,
	Element = 1,
	Attribute = 2,
	Comment = 8
}

function isTextNode(node: Node): node is Text { return node.nodeType === NodeType.Text }
// function isCommentNode(node: Node): node is Comment { return node.nodeType === Node.COMMENT_NODE }
// function isHtmlElementNode(node: Node): node is HTMLElement { return node.nodeType === Node.ELEMENT_NODE }
// function isCDataNode(node: Node): node is CDATASection { return node.nodeType === Node.CDATA_SECTION_NODE }
// function isProccessingNode(node: Node): node is ProcessingInstruction { return node.nodeType === Node.PROCESSING_INSTRUCTION_NODE }
// function isDocumentNode(node: Node): node is Document { return node.nodeType === Node.DOCUMENT_NODE }
// function isDocFragmentNode(node: Node): node is DocumentFragment { return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE }
// function isDocTypeNode(node: Node): node is DocumentType { return node.nodeType === Node.DOCUMENT_TYPE_NODE }


type AnyNode = (Node | Text | Comment | HTMLElement | SVGElement)

/** Check two elements for equivalence */
export function isEquivalent(node1: Node | HTMLElement, node2: Node | HTMLElement, options?: { excludeAttribs?: string[] }): boolean {
	if (node1.nodeType !== node2.nodeType)
		return false
	else if (isTextNode(node1)) {
		return node1.textContent === node2.textContent
	}
	// else if (isDocumentNode(node1)) {
	// 	return node1.textContent === node2.textContent
	// }
	else {
		const excludedAttribs = (options?.excludeAttribs ?? []).map(a => a.toUpperCase())
		const attributes1 = ("attributes" in node1)
			? [...node1.attributes].filter(a => excludedAttribs
				.includes(a.name.toUpperCase()))
				.sort(getRanker({ projector: x => x.name }))
			: []
		const attributes2 = ("attributes" in node2)
			? [...node2.attributes]
				.filter(a => excludedAttribs.includes(a.name.toUpperCase()))
				.sort(getRanker({ projector: x => x.name }))
			: []

		if (attributes1.map(a => a.name).join(",") !== attributes2.map(a => a.name).join(","))
			return false

		if (attributes1.some((a, i) => a.value !== attributes2[i].value))
			return false

		const children1 = [...node1.childNodes]
		const children2 = [...node2.childNodes]

		if (children1.length !== children2.length)
			return false

		return children1.every((child, index) => isEquivalent(child, children2[index]))
	}

}

/** Create html element from html string; Requires <document> object to exist */
export function constructElement(html: string): HTMLElement {
	const div = document.createElement("div")
	div.innerHTML = html.trim()
	return div
}

/** Remove some attributes from an html element ot string */
export function excludeAttributes(target: string, attributes: string[]): string
export function excludeAttributes(target: HTMLElement, attributes: string[]): HTMLElement
export function excludeAttributes(target: HTMLElement | string, attributes: string[]): string | HTMLElement {
	const div = constructElement(typeof target === "string" ? target : target.innerHTML)
	attributes.forEach(a => div.removeAttribute(a))
	return typeof target === "string" ? div.innerHTML : div
}

export function normalizeHTML(html: string) {
	return html //excludeAttributes(html, ["id"])
		.replace(/( \w*="undefined")/, "") // remove atributes set to the string "undefined"
		.replace(/ class="(\w*)"/, ' className="$1"')
		.replace(/ for="(\w*)"/, ' htmlFor="$1"')
}