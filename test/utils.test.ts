/* eslint-disable @typescript-eslint/no-empty-function */
import * as assert from "assert"
import { isEventKey } from "../dist/utils"

describe("Utils", () => {

	describe("isEventKey", () => {
		it("should return <true> for 'onClick'", () => {
			assert.equal(isEventKey("onClick"), true)

		})
		it("should return <false> for 'click'", () => {
			assert.equal(isEventKey("click"), false)

		})
		it("should return <false> for 'onsomeevent'", () => {
			assert.equal(isEventKey("onsomeevent"), false)

		})
	})
})
