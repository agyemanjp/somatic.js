import * as assert from "assert"
import { stringifyAttributes, stringifyStyle, encodeHTML } from '../dist/html'

// const SplashPage: Component = () => <div>Splash page</div>

describe("HTML MODULE", () => {
	describe("stringifyAttributes", function () {
		it('should return empty string for empty object argument', () => {
			assert.strictEqual(stringifyAttributes({}), '')
		})
		it('should maintain empty string values of attributes', () => {
			assert.strictEqual(stringifyAttributes({ title: "" }), 'title=""')
		})
		it('should include all valid properties in input object, in order, separated by spaces', () => {
			assert.strictEqual(
				stringifyAttributes({
					title: "",
					placeholder: "hello",
					acceptCharset: "utf-8", // form
					httpEquiv: "refresh", // meta
					"style": {
						position: "absolute",
						backgroundColor: "blue"
					},
					disabled: "disabled",
					// dataXXX: "" // any,
				}),
				'title="" placeholder="hello" accept-charset="utf-8" http-equiv="refresh" style="position: absolute; background-color: blue" disabled'
			)
		})
		it("should process class attributes properly", () => {
			assert.strictEqual(stringifyAttributes({
				class: "clss",
				style: { backgroundColor: "blue" }
			}), 'class="clss" style="background-color: blue"')
		})
		it('should return only the name for "presence" attributes, when they are set to a truthy value', () => {
			assert.strictEqual(stringifyAttributes({ disabled: "disabled" }), 'disabled')
			assert.strictEqual(stringifyAttributes({ disabled: "" }), 'disabled')
			assert.strictEqual(stringifyAttributes({ disabled: true }), 'disabled')

			assert.strictEqual(stringifyAttributes({ checked: "" }), 'checked')
			assert.strictEqual(stringifyAttributes({ checked: true }), 'checked')
			assert.strictEqual(stringifyAttributes({ checked: "checked" }), 'checked')

			assert.strictEqual(stringifyAttributes({ required: "" }), 'required')
			assert.strictEqual(stringifyAttributes({ required: true }), 'required')
			assert.strictEqual(stringifyAttributes({ required: "checked" }), 'required')

			assert.strictEqual(stringifyAttributes({ readOnly: "" }), 'readonly')
			assert.strictEqual(stringifyAttributes({ readOnly: true }), 'readonly')
			assert.strictEqual(stringifyAttributes({ readOnly: "checked" }), 'readonly')

		})
		it('should omit "presence" attributes, when they are set to a falsy value', () => {
			assert.strictEqual(stringifyAttributes({ checked: false }), '')
			assert.strictEqual(stringifyAttributes({ disabled: false }), '')
			assert.strictEqual(stringifyAttributes({ required: false }), '')
			assert.strictEqual(stringifyAttributes({ readOnly: false }), '')

			assert.strictEqual(stringifyAttributes({ checked: undefined }), '')
			assert.strictEqual(stringifyAttributes({ disabled: undefined }), '')
			assert.strictEqual(stringifyAttributes({ required: undefined }), '')
			assert.strictEqual(stringifyAttributes({ readOnly: undefined }), '')

			assert.strictEqual(stringifyAttributes({ checked: null }), '')
			assert.strictEqual(stringifyAttributes({ disabled: null }), '')
			assert.strictEqual(stringifyAttributes({ required: null }), '')
			assert.strictEqual(stringifyAttributes({ readOnly: null }), '')

		})
	})

	describe("stringifyStyle", function () {
		it('should return empty string for empty object argument', function () {
			assert.strictEqual(stringifyStyle({}), '')
		})

		it('should convert all style attribute keys to dash-case', function () {
			assert.strictEqual(
				stringifyStyle({
					margin: "0.5em",
					marginLeft: "0.5em",
					WIDTH: "1.5em"
				} as any),
				'margin: 0.5em; margin-left: 0.5em; width: 1.5em'
			)
		})

		it('should process style attribute values with spaces properly', function () {
			assert.strictEqual(
				stringifyStyle({ gridTemplateColumns: "10em 10em 10em" }),
				'grid-template-columns: 10em 10em 10em'
			)
		})
	})

	describe('encodeHTML', function () {
		describe('when string contains \'"\'', function () {
			describe('as only character', function () {
				it('should replace with "&quot;"', function () {
					assert.strictEqual(encodeHTML('"'), '&quot;')
				})
			})

			describe('as first character', function () {
				it('should replace with "&quot;"', function () {
					assert.strictEqual(encodeHTML('"bar'), '&quot;bar')
				})
			})

			describe('as last character', function () {
				it('should replace with "&quot;"', function () {
					assert.strictEqual(encodeHTML('foo"'), 'foo&quot;')
				})
			})

			describe('as middle character', function () {
				it('should replace with "&quot;"', function () {
					assert.strictEqual(encodeHTML('foo"bar'), 'foo&quot;bar')
				})
			})

			describe('multiple times', function () {
				it('should replace all occurrences with "&quot;"', function () {
					assert.strictEqual(encodeHTML('foo""bar'), 'foo&quot;&quot;bar')
				})
			})
		})

		describe('when string contains "&"', function () {
			describe('as only character', function () {
				it('should replace with "&amp;"', function () {
					assert.strictEqual(encodeHTML('&'), '&amp;')
				})
			})

			describe('as first character', function () {
				it('should replace with "&amp;"', function () {
					assert.strictEqual(encodeHTML('&bar'), '&amp;bar')
				})
			})

			describe('as last character', function () {
				it('should replace with "&amp;"', function () {
					assert.strictEqual(encodeHTML('foo&'), 'foo&amp;')
				})
			})

			describe('as middle character', function () {
				it('should replace with "&amp;"', function () {
					assert.strictEqual(encodeHTML('foo&bar'), 'foo&amp;bar')
				})
			})

			describe('multiple times', function () {
				it('should replace all occurrences with "&amp;"', function () {
					assert.strictEqual(encodeHTML('foo&&bar'), 'foo&amp;&amp;bar')
				})
			})
		})

		describe('when string contains "\'"', function () {
			describe('as only character', function () {
				it('should replace with "&#39;"', function () {
					assert.strictEqual(encodeHTML("'"), '&#39;')
				})
			})

			describe('as first character', function () {
				it('should replace with "&#39;"', function () {
					assert.strictEqual(encodeHTML("'bar"), '&#39;bar')
				})
			})

			describe('as last character', function () {
				it('should replace with "&#39;"', function () {
					assert.strictEqual(encodeHTML("foo'"), 'foo&#39;')
				})
			})

			describe('as middle character', function () {
				it('should replace with "&#39;"', function () {
					assert.strictEqual(encodeHTML("foo'bar"), 'foo&#39;bar')
				})
			})

			describe('multiple times', function () {
				it('should replace all occurrences with "&#39;"', function () {
					assert.strictEqual(encodeHTML("foo''bar"), 'foo&#39;&#39;bar')
				})
			})
		})

		describe('when string contains "<"', function () {
			describe('as only character', function () {
				it('should replace with "&lt;"', function () {
					assert.strictEqual(encodeHTML('<'), '&lt;')
				})
			})

			describe('as first character', function () {
				it('should replace with "&lt;"', function () {
					assert.strictEqual(encodeHTML('<bar'), '&lt;bar')
				})
			})

			describe('as last character', function () {
				it('should replace with "&lt;"', function () {
					assert.strictEqual(encodeHTML('foo<'), 'foo&lt;')
				})
			})

			describe('as middle character', function () {
				it('should replace with "&lt;"', function () {
					assert.strictEqual(encodeHTML('foo<bar'), 'foo&lt;bar')
				})
			})

			describe('multiple times', function () {
				it('should replace all occurrences with "&lt;"', function () {
					assert.strictEqual(encodeHTML('foo<<bar'), 'foo&lt;&lt;bar')
				})
			})
		})

		describe('when string contains ">"', function () {
			describe('as only character', function () {
				it('should replace with "&gt;"', function () {
					assert.strictEqual(encodeHTML('>'), '&gt;')
				})
			})

			describe('as first character', function () {
				it('should replace with "&gt;"', function () {
					assert.strictEqual(encodeHTML('>bar'), '&gt;bar')
				})
			})

			describe('as last character', function () {
				it('should replace with "&gt;"', function () {
					assert.strictEqual(encodeHTML('foo>'), 'foo&gt;')
				})
			})

			describe('as middle character', function () {
				it('should replace with "&gt;"', function () {
					assert.strictEqual(encodeHTML('foo>bar'), 'foo&gt;bar')
				})
			})

			describe('multiple times', function () {
				it('should replace all occurrences with "&gt;"', function () {
					assert.strictEqual(encodeHTML('foo>>bar'), 'foo&gt;&gt;bar')
				})
			})
		})

		describe('when escaped character mixed', function () {
			it('should escape all occurrences', function () {
				assert.strictEqual(encodeHTML('&foo <> bar "fizz" l\'a'),
					'&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a')
			})
		})
	})
})