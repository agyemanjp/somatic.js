/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable init-declarations */
import * as assert from "assert"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, createElement, render, renderToString, hydrate } from '../dist/index.js'
import { equivElms } from './utils'
import { describe, it, beforeEach, afterEach } from 'mocha'
const jsdom = require('mocha-jsdom')
jsdom({ url: 'http://localhost', skipWindowCheck: true })

// eslint-disable-next-line @typescript-eslint/no-unused-vars

describe("Somatic", () => {

	describe("render", () => {

		/** @type { HTMLDivElement } */
		// eslint-disable-next-line fp/no-let
		let container: HTMLElement | null
		beforeEach(() => {
			container = document.createElement('div')
			document.body.appendChild(container)
		})
		afterEach(() => {
			container?.remove()
			container = null
		})

		it("should render element with the same text content", async () => {
			// We create a small div element with className and background color and pass it to the render function
			const node = <div className={'test'} style={{ backgroundColor: "blue" }}>{`test`}</div>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			assert.equal(container?.children[0].textContent, 'test')
		})

		it("should render the element with its corresponding attributes", async () => {
			// We create a small div element with className and background color and pass it to the render function
			const node = <div className={'test-class'} style={{ backgroundColor: "blue" }}>{`test`}</div>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			assert.equal(container?.children[0].getAttribute("class"), 'test-class')
		})
	})

	describe('renderToString', () => {
		it("should return element with same html as renderToString", async () => {
			const vNode = <div className='test' style={{ background: 'blue' }}>
				<span> Some render </span> <i> test </i>
			</div>

			// Generating an element through render
			const renderNode = await render(vNode)
			const fakeDivRender = document.createElement("div")
			while (fakeDivRender.firstChild) fakeDivRender.removeChild(fakeDivRender.firstChild)
			fakeDivRender.appendChild(renderNode)

			// Generating an element through renderToString
			const renderString = await renderToString(vNode)
			const fakeDivRenderToString = document.createElement("div")
			fakeDivRenderToString.innerHTML = renderString
			hydrate(fakeDivRenderToString)

			assert.ok(equivElms(fakeDivRender, fakeDivRenderToString))
		})

		it("should have the element with the events listeners attached to it", async () => {
			const vNode = <div className='test' onClick={() => console.log('')}>
				<span> Some render</span>
				<i>test</i>
			</div>

			// Generating an element through render
			const renderNode = await render(vNode)
			const fakeDivRender = document.createElement("div")
			while (fakeDivRender.firstChild) fakeDivRender.removeChild(fakeDivRender.firstChild)
			fakeDivRender.appendChild(renderNode)

			// Generating an element through renderToString
			const renderString = await renderToString(vNode)
			const fakeDivRenderToString = document.createElement("div")
			fakeDivRenderToString.innerHTML = renderString
			hydrate(fakeDivRenderToString)

			assert.ok(equivElms(fakeDivRender, fakeDivRenderToString))
		})
	})
})

