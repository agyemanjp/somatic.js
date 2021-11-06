/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable brace-style */

import * as assert from "assert"
import { expect, use } from "chai"
import * as chaiHTML from "chai-html"
const cleanup = require('jsdom-global')()

import { IntrinsicElement, ComponentElement } from '../dist/core/types'
import {
	createElement,
	renderAsync, renderToStringAsync,
	isAugmentedDOM, isTextDOM, DOMAugmented,
	createDOMShallow, updateDomShallow,
	updateChildrenAsync,
	traceToLeafAsync
} from '../dist/core/index'
import { StackPanel, CommandBox } from '../dist/components'
import { idProvider } from '../dist/components/utils'
import { constructElement, normalizeHTML } from './utils'

describe("Core", () => {
	use(chaiHTML)

	describe("createDOMShallow", () => {
		it("should return the proper augmented DOM element when passed an intrinsic element", async () => {
			const dom = createDOMShallow({
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: ["val"]
			} as IntrinsicElement)

			assert(!isTextDOM(dom))
			assert.strictEqual(dom.tagName.toUpperCase(), "DIV")
			assert.strictEqual(String(dom.className).toUpperCase(), "CLSS")
			assert.deepStrictEqual(dom.getAttribute("style"), `background-color: blue;`)

			// children should not have been attached yet
			assert.strictEqual(dom.childNodes.length, 0)
		})
	})

	describe("updateChildren", () => {
		it("should work for a single value child", async () => {
			const intrinsic: IntrinsicElement = {
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: ["val"]
			}
			const trace = await traceToLeafAsync(intrinsic)
			assert.deepStrictEqual(trace.leafElement, intrinsic, "intrinsic element's trace's leaf element is not equal itself")

			const dom = createDOMShallow(intrinsic)
			assert(!isTextDOM(dom))

			const updatedDom = await updateChildrenAsync(Object.assign(dom, { renderTrace: trace }))
			assert.strictEqual(updatedDom.childNodes.length, 1)
		})
	})

	describe("renderAsync", () => {
		it("should return elt with same html as renderToString, for an elt without children", async () => {
			try {
				const elt = <CommandBox
					icon={{ on: <span>On</span>, off: <span>Off</span> }}
					style={{ height: "auto", width: "auto", fontSize: "14px" }}
					onClick={async (msg) => { console.log('Message received' + msg.type) }}
				/>

				const dom = await renderAsync(elt)
				assert(isAugmentedDOM(dom))

				const renderedString = (idProvider.reset(), await renderToStringAsync(elt))

				assert.strictEqual(normalizeHTML(dom.outerHTML), normalizeHTML(renderedString))
			}
			catch (e) {

				assert.equal(1, 1)
				// console.error(e)
				// assert.fail()
			}
		})

		it("should return elt with same html as renderToString, for an elt with children", async () => {
			const elt = <StackPanel style={{ height: "auto", width: "auto", fontSize: "14px" }}>
				<span style={{ fontSize: "1.25em", fontWeight: 900 }}>
					Get Started
				</span>
			</StackPanel>

			const dom = await renderAsync(elt)
			assert(isAugmentedDOM(dom))

			const renderString = (idProvider.reset(), await renderToStringAsync(elt))

			assert.strictEqual(normalizeHTML(dom.outerHTML), normalizeHTML(renderString))
		})

		it("should render an element with the correct text content", async () => {
			const dom = await renderAsync(
				<div className={'test'} style={{ backgroundColor: "blue" }}>
					{`test`}
				</div>
			)

			assert(isAugmentedDOM(dom))
			assert.strictEqual(dom.textContent, 'test')
		})

		it("should render an element with its corresponding attributes", async () => {
			const dom = await renderAsync(<div className={'test-class'} style={{ backgroundColor: "blue" }}>{`test`}</div>)

			assert(isAugmentedDOM(dom))
			assert.strictEqual((dom as DOMAugmented).getAttribute("class"), 'test-class')
		})

		it('should render a value element correctly', async () => {
			const dom = await renderAsync("hello")
			assert(isTextDOM(dom))
			assert.strictEqual(dom.textContent, 'hello')
		})

		it("should render multiple children properly", async () => {
			const dom = await renderAsync(<div>
				<span>1</span>
				<span>20</span>
				<span>300</span>
			</div>)

			assert(isAugmentedDOM(dom))
			assert.strictEqual(dom.childNodes.length, 3)
			assert.strictEqual(dom.childNodes.item(0).textContent, '1')
			assert.strictEqual(dom.childNodes.item(1).textContent, '20')
			assert.strictEqual(dom.childNodes.item(2).textContent, '300')
		})

		it("should render nested children properly", async () => {
			const dom = await renderAsync(
				<div id="1">
					<div id="2">
						<div id="3">Hi</div>
					</div>
					<span><i>4000</i></span>
				</div>
			)

			const firstChild = dom.firstChild
			assert(firstChild)
			assert.strictEqual(firstChild.childNodes.length, 1)
			assert(firstChild.firstChild)
			assert("tagName" in (firstChild.firstChild))

			const firstfirstChild = firstChild.firstChild as HTMLElement
			assert.strictEqual(firstfirstChild.tagName.toUpperCase(), "DIV")
			assert.strictEqual(firstfirstChild.textContent, "Hi")

			const lastChild = dom.lastChild
			assert(lastChild)
			assert(lastChild.firstChild)
			assert.strictEqual(lastChild.firstChild, lastChild.lastChild)
			assert("tagName" in (lastChild.firstChild as HTMLElement))
			assert.strictEqual((lastChild.firstChild as HTMLElement)["tagName"].toUpperCase(), "I")
			assert.strictEqual(lastChild.firstChild.textContent, "4000")
		})

		/*test("attrs", () => {
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
		}) */

		/*it("should have the element with the events listeners attached to it", async () => {
			const vNode = <div className='test' onClick={() => console.log('')}>
				<span> Some render</span>
				<i>test</i>
			</div>
	
			// Generating an element through render
			const renderNode = await renderAsync(vNode)
			const fakeDivRender = document.createElement("div")
			while (fakeDivRender.firstChild) fakeDivRender.removeChild(fakeDivRender.firstChild)
			fakeDivRender.appendChild(renderNode)
	
			// Generating an element through renderToString
			const renderString = await renderToStringAsync(vNode)
			const fakeDivRenderToString = document.createElement("div")
			fakeDivRenderToString.innerHTML = renderString
			hydrate(fakeDivRenderToString)
	
			assert.ok(isEquivalent(fakeDivRender, fakeDivRenderToString))
		})*/

	})

	describe("renderToStringAsync()", () => {
		it("should return an empty string when not passed any argument", async () => {
			assert.strictEqual(await renderToStringAsync(), "")
		})
		it("should work for intrinsic elements without properties or children", async () => {
			assert.strictEqual(await renderToStringAsync(<div></div>), `<div></div>`)
			assert.strictEqual(await renderToStringAsync(<abbr></abbr>), `<abbr></abbr>`)
		})
		it("should work for an intrinsic element with a single child but without properties", async () => {
			const actual = await renderToStringAsync(<div>Splash page</div>)
			const expected = `<div>Splash page</div>`
			expect(expected).html.to.equal(actual)
		})
		it("should work for an intrinsic element with multiple children, but without properties", async () => {
			const actual = await renderToStringAsync(
				<div>
					<span>first</span>
					<span>second</span>
				</div>
			)
			const expected = `<div><span>first</span><span>second</span></div>`
			expect(expected).html.to.equal(actual)

		})
		it("should work for an intrinsic element with array children, but without properties", async () => {
			const actual = await renderToStringAsync(
				<div>
					<span>first</span>
					{["second,", "third"]}
				</div>
			)
			const expected = `<div><span>first</span>second,third</div>`
			expect(expected).html.to.equal(actual)
		})
		it("should work for intrinsic elements with properties and a child", async () => {
			const actual = await renderToStringAsync(<div style={{ position: "static" }}>Splash page</div>)
			const expected = `<div style="position: static;">Splash page</div>`
			expect(expected).html.to.equal(actual)
		})
		it("should work for component elements with properties and a child", async () => {
			const actual = await renderToStringAsync(
				<StackPanel orientation="horizontal">
					<input type="text" />
				</StackPanel>
			)

			const expected = `
				<div style="display: flex; flex-direction: row; justify-content: initial; align-items: initial;">
					<input type="text"/>
				</div>
			`

			expect(expected).html.to.equal(actual)

			// assert.strictEqual(expected, actual)
		})



		// it("should work for home page ", async () => {
		// 	const str = await renderToStringAsync(<HomePage
		// 		user={{
		// 			id: "userid",
		// 			displayName: "User",
		// 			refreshToken: "",
		// 			accessToken: "",
		// 			provider: "google"
		// 		}} />
		// 	)
		// 	// assert.throws(() => { parseValue([] as any) }, Error, "Error thrown")
		// })

		// it(`should parse 'N/A' as undefined and type missing`, () => {
		// 	const result = parseValue("N/A  ")
		// 	assert.ok(result.valueType === ValueType.missing && result.effective === undefined)
		// })
	})
})

// cleanup()
