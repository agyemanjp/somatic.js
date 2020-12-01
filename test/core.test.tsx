/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable init-declarations */

import * as assert from "assert"
import { createElement, render, renderToString, hydrate } from '../dist/index.js'
import { ToggleInput } from '../dist/components'
import { idProvider } from '../dist/utils'
import { constructElement, normalizeHTML } from './utils'
const jsdom = require('mocha-jsdom')
jsdom({ url: 'http://localhost', skipWindowCheck: true })


describe("Somatic", () => {
	describe("render", () => {
		it("should return element with same html as renderToString", async () => {
			try {
				//console.log(`Starting 'should return element with same html as renderToString' test`)
				const vNode = <ToggleInput
					icons={{ on: <span>On</span>, off: <span>Off</span> }}
					style={{ height: "auto", width: "auto", fontSize: "14px" }}
					postMsgAsync={async (msg) => { console.log('Message received' + msg.type) }}>
				</ToggleInput>

				const renderedHTML = (await render(vNode) as Element).outerHTML
				//console.log(`renderedNodeHTML: ${renderedHTML}`)

				idProvider.reset()
				const renderedString = await renderToString(vNode)
				//console.log(`renderedString: ${renderedString}`)

				assert.equal(normalizeHTML(renderedHTML), normalizeHTML(renderedString))

			}
			catch (e) {
				console.error(e)
			}
		})

		/*it("should render element with the same text content", async () => {
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
		})*/
	})

	/*describe('render', () => {
		it('renders correctly', () => {
			const tree = testRenderer
				.create(<a href="http://www.facebook.com" />)
				.toJSON()
			expect(tree).toMatchSnapshot()
		})

		test("simple", () => {
			expect(renderer.render(<h1>Hello world</h1>)).toEqual(
				"<h1>Hello world</h1>",
			)
		})

		test("multiple children", () => {
			expect(
				renderer.render(
					<div>
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
					</div>,
				),
			).toEqual(
				"<div><span>1</span><span>2</span><span>3</span><span>4</span></div>",
			)
		})

		test("nested children", () => {
			expect(
				renderer.render(
					<div id="1">
						<div id="2">
							<div id="3">Hi</div>
						</div>
					</div>,
				),
			).toEqual('<div id="1"><div id="2"><div id="3">Hi</div></div></div>')
		})

		test("boolean replaces nested children", () => {
			expect(
				renderer.render(
					<div id="1">
						<div id="2">
							<div id="3">Hi</div>
						</div>
					</div>,
				),
			).toEqual('<div id="1"><div id="2"><div id="3">Hi</div></div></div>')
		})

		test("attrs", () => {
			expect(
				renderer.render(
					<Fragment>
						<input id="toggle" type="checkbox" checked data-checked foo={false} />
						<label for="toggle" />
					</Fragment>,
				),
			).toEqual(
				'<input id="toggle" type="checkbox" checked data-checked><label for="toggle"></label>',
			)
		})

		test("styles", () => {
			expect(
				renderer.render(
					<Fragment>
						<div style={{ color: "red" }} />
						<img
							src="x"
							style={{ xss: 'foo;" onerror="alert(\'hack\')" other="' }}
						/>
					</Fragment>,
				),
			).toEqual(
				'<div style="color:red;"></div><img src="x" style="xss:foo;&quot; onerror=&quot;alert(&#039;hack&#039;)&quot; other=&quot;;">',
			)
		})

		test("null", () => {
			expect(renderer.render(null)).toEqual("")
		})

		test("fragment", () => {
			expect(
				renderer.render(
					<Fragment>
						<span>1</span>
						<span>2</span>
					</Fragment>,
				),
			).toEqual("<span>1</span><span>2</span>")
		})

		test("array", () => {
			expect(
				renderer.render(
					<div>
						<span>1</span>
						{[<span>2</span>, <span>3</span>]}
						<span>4</span>
					</div>,
				),
			).toEqual(
				"<div><span>1</span><span>2</span><span>3</span><span>4</span></div>",
			)
		})

		test("nested arrays", () => {
			expect(
				renderer.render(
					<div>
						<span>1</span>
						{[<span>2</span>, [<span>3</span>, <span>4</span>], <span>5</span>]}
						<span>6</span>
					</div>,
				),
			).toEqual(
				"<div><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>",
			)
		})

		test("keyed array", () => {
			const spans = [
				<span crank-key="2">2</span>,
				<span crank-key="3">3</span>,
				<span crank-key="4">4</span>,
			]
			expect(
				renderer.render(
					<div>
						<span>1</span>
						{spans}
						<span>5</span>
					</div>,
				),
			).toEqual(
				"<div><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>",
			)
		})

		test("escaped children", () => {
			expect(renderer.render(<div>{"< > & \" '"}</div>)).toEqual(
				"<div>&lt; &gt; &amp; &quot; &#039;</div>",
			)
		})

		test("raw html", () => {
			const html = '<span id="raw">Hi</span>'
			expect(
				renderer.render(
					<div>
						Raw: <Raw value={html} />
					</div>,
				),
			).toEqual('<div>Raw: <span id="raw">Hi</span></div>')
		})

		it("should return element with same html as renderToString() result, for a vnode without event handlers", async () => {
			const vNode = <FileInput
				theme={config.theme}
				labelStyle={{}}
				loadAs="array"
				content={<span style={{ fontSize: "1.25em", fontWeight: 900 }}>Get Started</span>}
				// onDataLoaded={async () => { console.log("file input data loaded") }}
				style={{ height: "auto", width: "auto", fontSize: "14px" }}>
			</FileInput>

			// Generating an element through render
			const elt = await render(vNode)
			const renderString = await renderToString(vNode)

			assert.equal(div.outerHTML, renderString)
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

			assert.ok(isEquivalent(fakeDivRender, fakeDivRenderToString))
		})
	})*/
})

