import { Obj, keys, toDashCase } from "@agyemanjp/standard"
import { HTMLAttributes, CSSProperties } from "./types"
import { booleanAttributes, attributeConversions, stringify } from "./common"

/** Converts an attributes property object to a string */
export function stringifyAttributes<E>(props: HTMLAttributes<any> & E): string {
	// console.log(`Stringifying ${stringify(props)}`)

	return Object.keys(props)
		.map(key => {
			const effectiveKey = keys(attributeConversions).includes(key.toLowerCase())
				? attributeConversions[key.toLowerCase()]
				: key.toLowerCase()
			const htmlKey = encodeHTML(effectiveKey)

			// const htmlKey = encodeHTML(toDashCase(key))
			const value = (props as Obj)[key] as any
			switch (true) {
				case key.toUpperCase() === "STYLE":
					return (`style="${encodeHTML(stringifyStyle(value as CSSProperties))}"`)
				case booleanAttributes.includes(key.toUpperCase()):
					return ([false, undefined, null].includes(value) ? `` : `${encodeHTML(key.toLowerCase())}`)
				case typeof value === "string":
					return (`${htmlKey}="${encodeHTML(globalThis.String(value))}"`)
				case typeof value === "number" && !isNaN(value):
					return (`${htmlKey}="${value}"`)
				case typeof value === "boolean":
					return (`${htmlKey}="${value}"`)
				default:
					return ""
			}
		})
		.filter(attrHTML => attrHTML.length > 0)
		.join(" ")
}

/** Converts a css props object literal to a string */
export function stringifyStyle(style: CSSProperties, important = false): string {
	if (typeof style === "object") {
		return Object.keys(style)
			.map((key) => `${toDashCase(key)}: ${(style)[key as keyof typeof style]}${important === true ? " !important" : ""}`)
			.join("; ")
		// .concat(";")
	}
	else {
		console.warn(`Input "${JSON.stringify(style)}" to somatic.stringifyStyle() is of type ${typeof style}, returning empty string`)
		return ""
	}
}

/** Encode html string */
export function encodeHTML(str: string): string {
	return str.replace(/[&<>"']/g, (match) => {
		switch (match) {
			case "&":
				return "&amp;"
			case "<":
				return "&lt;"
			case ">":
				return "&gt;"
			case '"':
				return "&quot;"
			case "'":
				return "&#39;"
			default:
				return ""
		}
	})
}

/*function encodeHTML(str?:string) {
	var str = '' + str
	var match = matchHtmlRegExp.exec(str)

	if (!match) {
		return str
	}

	var escape
	var html = ''
	var index = 0
	var lastIndex = 0

	for (index = match.index; index < str.length; index++) {
		switch (str.charCodeAt(index)) {
			case 34: // "
				escape = '&quot;'
				break
			case 38: // &
				escape = '&amp;'
				break
			case 39: // '
				escape = '&#39;'
				break
			case 60: // <
				escape = '&lt;'
				break
			case 62: // >
				escape = '&gt;'
				break
			default:
				continue
		}

		if (lastIndex !== index) {
			html += str.substring(lastIndex, index)
		}

		lastIndex = index + 1
		html += escape
	}

	return lastIndex !== index
		? html + str.substring(lastIndex, index)
		: html
}*/

/* var HTMLUtils = new function() {
		var rules = [
			{ expression: /&/g, replacement: '&amp;'  }, // keep this rule at first position
			{ expression: /</g, replacement: '&lt;'   },
			{ expression: />/g, replacement: '&gt;'   },
			{ expression: /"/g, replacement: '&quot;' },
			{ expression: /'/g, replacement: '&#039;' } // or  &#39;  or  &#0039;
														// &apos;  is not supported by IE8
														// &apos;  is not defined in HTML 4
		];
		this.escape = function(html) {
			var result = html;
			for (var i = 0; i < rules.length; ++i) {
				var rule = rules[i];
				result = result.replace(rule.expression, rule.replacement);
			}
			return result;
		}
	};
*/