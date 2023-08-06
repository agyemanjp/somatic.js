import * as assert from "assert"
import { isEventKey } from '../dist/common'

describe("isEventKey", () => {
	it("should return <true> for 'onClick'", () => {
		assert.strictEqual(isEventKey("onClick"), true)

	})
	it("should return <false> for 'click'", () => {
		assert.strictEqual(isEventKey("click"), false)

	})
	it("should return <false> for 'onsomeevent'", () => {
		assert.strictEqual(isEventKey("onsomeevent"), false)

	})
})
