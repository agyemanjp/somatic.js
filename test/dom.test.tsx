/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')()
import * as assert from "assert"
import {
	createDOMShallow,
	updateDomShallow,
	getApexElementIds,
	setAttribute,
	truncateChildNodes,
	emptyContainer,
	isAugmentedDOM,
	isTextDOM,

} from '../dist/core/index'
// import { StackPanel } from '../dist/components'


/*describe("isAugmentedDOM", () => {
	it("should return true for a normal DOM node", async () => {
		assert.strictEqual(isAugmentedDOM(document.createTextNode("")), false)
	})
	it("should return true for a normal DOM element", async () => {
		assert.strictEqual(isAugmentedDOM(document.createElement("div")), false)
	})
	it("should return true for a normal DOM element with attributes", async () => {
		const elt = document.createElement("div")
		elt.style.backgroundColor = "gray"
		elt.title = "title"
		assert.strictEqual(elt, false)
	})

	it("should return true for a normal DOM element", async () => {
		assert.strictEqual(isAugmentedDOM(Object.assign(document.createElement("div"), { renderingTrace: [] })), true)
	})
})*/


describe("isTextDOM", () => {
	it("should return true for a text DOM node", async () => {
		assert.strictEqual(isTextDOM(document.createTextNode("")), true)
	})
	it("should be false for a DOM element", async () => {
		assert.strictEqual(isTextDOM(document.createElement("div")), false)
	})
	it("should be false for an SVG Text element", async () => {
		assert.strictEqual(isTextDOM(document.createElementNS('http://www.w3.org/2000/svg', "text")), false)
	})
	it("should be false for a DOM element with attributes", async () => {
		const elt = document.createElement("div")
		elt.style.backgroundColor = "gray"
		elt.title = "title"
		assert.strictEqual(isTextDOM(elt), false)
	})
})

describe("emptyContainer", () => {
	it("should leave a non-container DOM element empty", async () => {
		const elt = document.createElement("input")
		elt.type = "email"
		emptyContainer(elt)
		assert.strictEqual(elt.childNodes.length, 0)
	})
	it("should leave an empty DOM element empty", async () => {
		const elt = document.createElement("span")
		emptyContainer(elt)
		assert.strictEqual(elt.childNodes.length, 0)
	})
	it("should work for a DOM text node", async () => {
		const node = document.createTextNode("")
		assert.doesNotThrow(() => {
			emptyContainer(node)
		})
		assert.strictEqual(isTextDOM(node), true)
	})
	it("should empty a DOM element with nested children", async () => {
		const elt = document.createElement("div")
		elt.style.backgroundColor = "gray"
		elt.title = "title"
		const child = document.createElement("table")
		child.appendChild(document.createElement("tr"))

		elt.appendChild(child)
		elt.appendChild(document.createTextNode("ahoy"))

		assert.strictEqual(elt.childNodes.length, 2)

		emptyContainer(elt)
		assert.strictEqual(elt.childNodes.length, 0)
	})
})

describe("truncateChildNodes", () => {
	it("should leave a non-container DOM element empty", async () => {
		const elt = document.createElement("input")
		elt.type = "email"
		truncateChildNodes(elt, 7)
		assert.strictEqual(elt.childNodes.length, 0)
	})
	it("should leave an empty DOM element empty", async () => {
		const elt = document.createElement("span")
		truncateChildNodes(elt, 4)
		assert.strictEqual(elt.childNodes.length, 0)
	})
	it("should work for a DOM text node", async () => {
		const node = document.createTextNode("")
		assert.doesNotThrow(() => { truncateChildNodes(node, 1) })
		assert.strictEqual(isTextDOM(node), true)
	})
	it("should remove the correct position and number of child nodes from DOM element with nested children", async () => {
		const elt = document.createElement("div")
		elt.style.backgroundColor = "gray"
		elt.title = "title"
		const child = document.createElement("table")
		child.appendChild(document.createElement("tr"))

		elt.appendChild(child)
		elt.appendChild(document.createTextNode("ahoy"))

		assert.strictEqual(elt.childNodes.length, 2)

		truncateChildNodes(elt, 1)
		assert.strictEqual(elt.childNodes.length, 1)
		assert.strictEqual((elt.childNodes.item(0) as Element).tagName.toUpperCase(), "TABLE")
	})
	it("should empty a DOM element if the new children length passed is zero", async () => {
		const elt = document.createElement("div")
		elt.style.backgroundColor = "gray"
		elt.title = "title"
		const child = document.createElement("table")
		child.appendChild(document.createElement("tr"))

		elt.appendChild(child)
		elt.appendChild(document.createTextNode("ahoy"))

		assert.strictEqual(elt.childNodes.length, 2)

		truncateChildNodes(elt, 0)
		assert.strictEqual(elt.childNodes.length, 0)
	})
})
