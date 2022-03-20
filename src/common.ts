import * as cuid from "cuid"
import { Obj } from "@agyemanjp/standard/utility"

/** Names of DOM events. */
export const eventNames = {
	ONABORT: "abort",
	ONANIMATIONSTART: "animationstart",
	ONANIMATIONITERATION: "animationiteration",
	ONANIMATIONEND: "animationend",
	ONBLUR: "blur",
	ONCANPLAY: "canplay",
	ONCANPLAYTHROUGH: "canplaythrough",
	ONCHANGE: "change",
	ONCLICK: "click",
	ONCONTEXTMENU: "contextmenu",
	ONCOPY: "copy",
	ONCUT: "cut",
	ONDOUBLECLICK: "dblclick",
	ONDRAG: "drag",
	ONDRAGEND: "dragend",
	ONDRAGENTER: "dragenter",
	ONDRAGEXIT: "dragexit",
	ONDRAGLEAVE: "dragleave",
	ONDRAGOVER: "dragover",
	ONDRAGSTART: "dragstart",
	ONDROP: "drop",
	ONDURATIONCHANGE: "durationchange",
	ONEMPTIED: "emptied",
	ONENCRYPTED: "encrypted",
	ONENDED: "ended",
	ONERROR: "error",
	ONFOCUS: "focus",
	ONINPUT: "input",
	ONINVALID: "invalid",
	ONKEYDOWN: "keydown",
	ONKEYPRESS: "keypress",
	ONKEYUP: "keyup",
	ONLOAD: "load",
	ONLOADEDDATA: "loadeddata",
	ONLOADEDMETADATA: "loadedmetadata",
	ONLOADSTART: "loadstart",
	ONPAUSE: "pause",
	ONPLAY: "play",
	ONPLAYING: "playing",
	ONPROGRESS: "progress",
	ONMOUSEDOWN: "mousedown",
	ONMOUSEENTER: "mouseenter",
	ONMOUSELEAVE: "mouseleave",
	ONMOUSEMOVE: "mousemove",
	ONMOUSEOUT: "mouseout",
	ONMOUSEOVER: "mouseover",
	ONMOUSEUP: "mouseup",
	ONPASTE: "paste",
	ONRATECHANGE: "ratechange",
	ONRESET: "reset",
	ONSCROLL: "scroll",
	ONSEEKED: "seeked",
	ONSEEKING: "seeking",
	ONSUBMIT: "submit",
	ONSTALLED: "stalled",
	ONSUSPEND: "suspend",
	ONTIMEUPDATE: "timeupdate",
	ONTRANSITIONEND: "transitionend",
	ONTOUCHCANCEL: "touchcancel",
	ONTOUCHEND: "touchend",
	ONTOUCHMOVE: "touchmove",
	ONTOUCHSTART: "touchstart",
	ONVOLUMECHANGE: "volumechange",
	ONWAITING: "waiting",
	ONWHEEL: "wheel",
}

/** Checks if a string corresponds to one of the (uppercase) event names keys */
export function isEventKey(key: string) {
	const keyUpper = key.toUpperCase()
	return keyUpper.startsWith("ON") // this condition is simply to prevent useless searches through the events list.
		&& Object.keys(eventNames).includes(keyUpper)
}

/** SVG-specific tags. */
export const svgTags = [
	"ANIMATE",
	"ANIMATEMOTION",
	"ANIMATETRANSFORM",

	"CIRCLE",
	"CLIPPATH",
	"COLOR-PROFILE",

	"DEFS",
	"DESC",
	"DISCARD",

	"ELLIPSE",

	"FEBLEND",
	"FECOLORMATRIX",
	"FECOMPONENTTRANSFER",
	"FECOMPOSITE",
	"FECONVOLVEMATRIX",
	"FEDIFFUSELIGHTING",
	"FEDISPLACEMENTMAP",
	"FEDISTANTLIGHT",
	"FEDROPSHADOW",
	"FEFLOOD",
	"FEFUNCA",
	"FEFUNCB",
	"FEFUNCG",
	"FEFUNCR",
	"FEGAUSSIANBLUR",
	"FEIMAGE",
	"FEMERGE",
	"FEMERGENODE",
	"FEMORPHOLOGY",
	"FEOFFSET",
	"FEPOINTLIGHT",
	"FESPECULARLIGHTING",
	"FESPOTLIGHT",
	"FETILE",
	"FETURBULENCE",
	"FILTER",
	"FOREIGNOBJECT",

	"G",

	"HATCH",
	"HATCHPATH",

	"IMAGE",

	"LINE",
	"LINEARGRADIENT",

	"MARKER",
	"MASK",
	"MESH",
	"MESHGRADIENT",
	"MESHPATCH",
	"MESHROW",
	"METADATA",
	"MPATH",

	"PATH",
	"PATTERN",
	"POLYGON",
	"POLYLINE",

	"RADIALGRADIENT",
	"RECT",

	//"SCRIPT",
	"SET",
	"SOLIDCOLOR",
	"STOP",
	//"STYLE",
	"SVG",
	"SWITCH",
	"SYMBOL",

	"TEXT",
	"TEXTPATH",
	//"TITLE",
	"TSPAN",

	"UNKNOWN",
	"USE",

	"VIEW"
]

/** Self-closing HTML tags. */
export const selfClosingTags = [
	"AREA",
	"BASE",
	"BR",
	"COL",
	"COMMAND",
	"EMBED",
	"HR",
	"IMG",
	"INPUT",
	"KEYGEN",
	"LINK",
	"META",
	"PARAM",
	"SOURCE",
	"TRACK",
	"WBR"
]

/** HTML (boolean) attributes set by their presence irrespective of their value. */
export const booleanAttributes = [
	"REQUIRED",
	"DISABLED",
	"CHECKED",
	"READONLY",
	"AUTOFOCUS"
]

/** Attribute name conversions when passed to DOM setAttribute or rendered as HTML
 * From https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes and
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 * For directly settign an attribute on a DOM element, 
 * we assume the attribute name is already in the proper case (as specified by the attribute typings)
 * so no conversion is needed. 
 */
export const attributeConversions: Obj<string, string> = {
	"autoreverse": "auto-reverse",
	"htmlfor": "for",
	"classname": "class",
	"acceptcharset": "accept-charset",
	"httpequiv": "http-equiv",
	"fillrule": "fill-rule",
	"baselineshift": "baseline-shift",
	"accentheight": "accent-height",
	"alignmentbaseline": "alignment-baseline",
	"arabicform": "arabic-form",
	"capheight": "cap-height",
	"clippath": "clip-path",
	"cliprule": "clip-rule",
	"colorinterpolation": "color-interpolation",
	"colorinterpolationfilters": "color-interpolation-filters",
	"colorprofile": "color-profile",
	"colorrendering": "color-rendering",
	"dominantbaseline": "dominant-baseline",
	"enablebackground": "enable-background",
	"fillopacity": "fill-opacity",
	"fontfamily": "font-family",
	"fontsize": "font-size",
	"fontsizeadjust": "font-size-adjust",
	"fontstretch": "font-stretch",
	"fontstyle": "font-style",
	"fontvariant": "font-variant",
	"fontweight": "font-weight",
	"glyphname": "glyph-name",
	"glyphorientationhorizontal": "glyph-orientation-horizontal",
	"glyphorientationvertical": "glyph-orientation-vertical",
	"horizoriginx": "horiz-origin-x",
	"horizadvx": "horiz-adv-x",
	"imagerendering": "image-rendering",
	"letterspacing": "letter-spacing",
	"lightingcolor": "lighting-color",
	"markerend": "marker-end",
	"markerstart": "marker-start",
	"markermid": "marker-mid",
	"overlineposition": "overline-position",
	"overlinethickness": "overline-thickness",
	"panose1": "panose-1",
	"paintorder": "paint-order",
	"pointerevents": "pointer-events",
	"renderingintent": "rendering-intent",
	"shaperendering": "shape-rendering",
	"stopcolor": "stop-color",
	"stopopacity": "stop-opacity",
	"strikethroughposition": "strikethrough-position",
	"strikethroughthickness": "strikethrough-thickness",
	"strokedasharray": "stroke-dasharray",
	"strokedashoffset": "stroke-dashoffset",
	"strokelinecap": "stroke-linecap",
	"strokelinejoin": "stroke-linejoin",
	"strokemiterlimit": "stroke-miterlimit",
	"strokeopacity": "stroke-opacity",
	"strokewidth": "stroke-width",
	"textanchor": "text-anchor",
	"textdecoration": "text-decoration",
	"textrendering": "text-rendering",
	"transformorigin": "transform-origin",
	"unicodebidi": "unicode-bidi",
	"unicoderange": "unicode-range",
	"unitsperem": "units-per-em",
	"valphabetic": "v-alphabetic",
	"vhanging": "v-hanging",
	"videographic": "v-ideographic",
	"vmathematical": "v-mathematical",
	"vertadvy": "vert-adv-y",
	"vertoriginx": "vert-origin-x",
	"vertoriginy": "vert-origin-y",
	"wordspacing": "word-spacing",
	"writingmode": "writing-mode",
	"xheight": "x-height"
}

export const colorConstants/*: Record<string, string>*/ = {
	"aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
	"beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
	"cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
	"darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
	"darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
	"darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
	"firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
	"gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
	"honeydew": "#f0fff0", "hotpink": "#ff69b4",
	"indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
	"lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
	"lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
	"lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
	"magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
	"mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
	"navajowhite": "#ffdead", "navy": "#000080",
	"oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
	"palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
	"rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
	"saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
	"tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
	"violet": "#ee82ee",
	"wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
	"yellow": "#ffff00", "yellowgreen": "#9acd32"
}
export const colors: Record<string, string> = colorConstants

export function colourNameToHex(colour: string) {
	return (typeof colors[colour.toLowerCase()] != 'undefined')
		? colors[colour.toLowerCase()]
		: colour
}

/** Function that calculates a lighter or darker color of a base color in Hex representation
 * @param hexColor a hex color value such as “#abc” or “#123456” (the hash is optional)
 * @param luminosity the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc
 */
export function colorLuminance(color: string, luminosity: number) {
	if (color === "transparent") {
		return color
	}
	const sanitizedColor = colourNameToHex(color).replace(/[^0-9a-f]/gi, '')
	const hexColor = sanitizedColor.length >= 6
		? sanitizedColor
		: sanitizedColor[0] + sanitizedColor[0] + sanitizedColor[1] + sanitizedColor[1] + sanitizedColor[2] + sanitizedColor[2]

	// Convert to decimal and change luminosity
	return "#" + [0, 1, 2].map(i => {
		const initialColor = parseInt(hexColor.substr(i * 2, 2), 16)
		const endColor = Math.round(Math.min(Math.max(0, initialColor + (initialColor * luminosity)), 255)).toString(16)
		return endColor
	}).join("")
}

class IdProvider {
	private cache: string[]
	private pointer: number
	constructor() {
		this.cache = []
		this.pointer = 0
	}
	next() {
		if (this.pointer >= this.cache.length) {
			// console.log(`pushing to id provider cache`)
			this.cache.push(cuid())
		}
		return this.cache[this.pointer++]
	}
	reset() {
		this.pointer = 0
	}
}
export const idProvider = new IdProvider()


export function stringify(x: any): string {
	return JSON.stringify(x, (key, val) => typeof val === "function" ? `[Function ${val.name}]` : val, 2)
}



/** Mouse event names */
/*export const mouseMvmntEventNames = [
	"ONMOUSEENTER",
	"ONMOUSELEAVE",
	"ONMOUSEMOVE",
	"ONMOUSEOUT",
	"ONMOUSEOVER",
	"ONMOUSEUP"
]*/