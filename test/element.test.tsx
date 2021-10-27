/* eslint-disable @typescript-eslint/no-unused-vars */
import * as assert from "assert"
import { createElement, traceToLeafAsync, IntrinsicElement } from '../dist/core/index'
import { StackPanel } from '../dist/components'


describe("traceToLeaf", () => {
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

	it("should return a trace with leaf set to the same intrinsic element, when passed an intrinsic element", async () => {
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
