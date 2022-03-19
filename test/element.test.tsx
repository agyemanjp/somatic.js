/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as assert from "assert"
import { isAsyncGenerator, isGenerator, pick, unique } from "@agyemanjp/standard"
import { UIElement, RenderingTrace, ComponentElt, Component, IntrinsicElement, CSSProperties } from '../dist/types'
import { isEltProper, isIntrinsicElt, isComponentElt, updateResultAsync, traceToLeafAsync, updateTraceAsync, getChildren } from '../dist/element'
import { stringify } from '../dist/common'
import { createElement } from '../dist/core'
import { StackPanel } from '../dist/components'

interface User {
	id: string
	displayName: string
	emailAddress?: string
	imageUrl?: string
	provider: "google" | "microsoft" | "dropbox" | "amazon" | "facebook" | "twitter",
	refreshToken: string
	accessToken: string
}
const SplashPage: Component = () => <div>Splash page</div>
const Layout: Component<{ user: User | undefined }> = function (props) {
	const { user, children } = props
	return <StackPanel id="root" orientation="vertical" style={{ padding: 0, margin: 0 }}>
		<StackPanel id="header"
			itemsAlignH="uniform"
			itemsAlignV="center"
			style={{ backgroundColor: "purple", width: "100vw", height: "10vh" }}>
			<StackPanel id="user-info" style={{ padding: "0.25em", color: "whitesmoke" }}>
				{user
					? <StackPanel style={{ gap: "10%" } as any}>
						<span>Welcome, {user.displayName}</span>
						<a href="/logout">LOGOUT</a>
					</StackPanel>

					: <a href="/auth/google">LOGIN</a>
				}
			</StackPanel>
		</StackPanel>

		<StackPanel id="content" style={{ backgroundColor: "whitesmoke", height: "75vh" }}>
			{children}
		</StackPanel>

		<StackPanel id="footer" style={{ height: "10vh" }}></StackPanel>
	</StackPanel>
}

describe("ELEMENT MODULE", () => {
	describe("isComponentElt", () => {
		it("should return true for a component UI element", async () => {
			assert(isComponentElt(<SplashPage user={undefined} objectId={undefined} />))
		})
	})

	describe("isEltProper", () => {
		it("should work for a component element with children", async () => {
			const elt = <StackPanel>
				<span>hello</span>
			</StackPanel>
			assert(isEltProper(elt))
		})

		it("should return false for a primitive value", async () => {
			assert(!isEltProper(3))
			assert(!isEltProper("abc"))
		})
	})

	describe("updateResultAsync", () => {
		it("should not mutate input element", async () => {
			const elt: ComponentElt = <SplashPage /> as any
			const augmented = await updateResultAsync(elt)
			assert.notStrictEqual(elt, augmented)
		})
		it("should retain original non-result members in augmented object returned", async () => {
			const elt: ComponentElt = <SplashPage /> as any
			const membersOrig = pick(elt as any, "children", "type", "props")
			const augmented = await updateResultAsync(elt)
			const membersNew = pick(augmented as any, "children", "type", "props")
			assert.deepStrictEqual(membersOrig, membersNew)
		})
		it("should change an already existing result member for a stateless component", async () => {
			const elt: ComponentElt = <SplashPage /> as any
			const augmented = await updateResultAsync(elt)
			assert.notStrictEqual(augmented.result, (await updateResultAsync(augmented)).result)
		})
		it("should return correct result member for a regular function component", async () => {
			const elt = <SplashPage /> as ComponentElt
			const componentResult = (await updateResultAsync(elt)).result
			assert(!("generator" in componentResult), `Regular function component result has "generator" member`)
			// assert(!isAsyncIterable(componentResult))
			assert.deepStrictEqual(componentResult.element, {
				type: "div",
				props: {},
				children: ["Splash page"]
			})
		})
		it("should return correct result member for an async generator component", async () => {
			const Selector: Component<{ selectedIndex?: number, selectedStyle?: CSSProperties }> = function* (props) {
				// eslint-disable-next-line prefer-const, fp/no-let
				let { selectedIndex, selectedStyle, children } = props
				while (true)
					yield <StackPanel orientation="vertical" style={{ padding: 0, margin: 0 }} >
						{(children ? Array.isArray(children) ? children : [children] : []).map((child, index) =>
							// eslint-disable-next-line fp/no-mutation
							<div
								style={index === selectedIndex ? selectedStyle : {}}
								// eslint-disable-next-line fp/no-mutation
								onClick={() => selectedIndex = index}>
								{child}
							</div>
						)}
					</StackPanel>
			}
			const elt = <Selector selectedStyle={{ color: "orange" }}>
				<SplashPage />
				<div>Hello</div>
			</Selector> as ComponentElt

			const updatedResult = (await updateResultAsync(elt)).result
			assert("generator" in updatedResult, `Element result missing 'generator' property`)
			assert(isGenerator(updatedResult.generator), `Element result's 'generator' property is not a generator`)
			// assert("next" in updatedResult, `Element result missing 'next' property`)

			// console.log(`Result Generator: ${augmentedResult.generator}`)
			// console.log(`Result Next: ${augmentedResult.next}`)

			assert(isComponentElt(updatedResult.element), `Result element is not a component element`)
			assert.strictEqual(updatedResult.element.type, StackPanel, `Result element is not a 'StackPanel' element`)
			assert.strictEqual(getChildren(updatedResult.element).length, 2)
			assert.deepStrictEqual(updatedResult.element.props, {
				// id: "root",
				orientation: "vertical",
				style: { padding: 0, margin: 0 }
			})
		})
	})

	describe("traceToLeafAsync", () => {
		it("should work for a component element with children", async () => {
			const trace = await traceToLeafAsync(
				<StackPanel orientation="horizontal">
					<input type="text" />
				</StackPanel>
			)

			assert.strictEqual(typeof trace.leafElement, "object")
			assert.deepStrictEqual(trace.leafElement, {
				type: "div",
				props: {
					style: {
						alignItems: 'initial',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'initial'
					}
				},
				children: [{
					type: "input",
					props: { type: "text" },
					children: []
				}]
			} as IntrinsicElement)
		})

		it("should work for a complex component", async () => {
			const trace = await traceToLeafAsync(
				// <Layout user={/*injectedInfo.user*/ undefined}>
				<SplashPage user={undefined} objectId={undefined} />
				// </Layout>
			)

			assert(trace.leafElement !== undefined, `Leaf element is undefined`)
			assert(isIntrinsicElt(trace.leafElement), `Leaf element ${stringify(trace.leafElement)} is not intrinsic`)
			assert.strictEqual(trace.leafElement.type.toUpperCase(), "DIV")
		})

		it("should trace with leaf set to the same intrinsic element, when passed an intrinsic element", async () => {
			const trace = await traceToLeafAsync(
				<div className={'clss'} style={{ backgroundColor: "blue" }}>
					{`val`}
				</div>
			)

			assert.strictEqual(typeof trace.leafElement, "object")
			assert.deepStrictEqual(trace.leafElement, {
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: ["val"]
			} as IntrinsicElement)
		})
	})

	describe("updateTraceAsync", () => {
		it("should not mutate input trace", async () => {
			const trace = await traceToLeafAsync(<SplashPage />)
			const newTrace = await updateTraceAsync(trace)
			assert.notStrictEqual(trace, newTrace)
		})

		it("should not have any duplicate elements in output trace", async () => {
			const trace = await traceToLeafAsync(<Layout user={/*injectedInfo.user*/ undefined}>
				<SplashPage user={undefined} objectId={undefined} />
			</Layout>)

			assert.strictEqual(trace.componentElts.length, [...unique(trace.componentElts)].length)
		})
	})
})
