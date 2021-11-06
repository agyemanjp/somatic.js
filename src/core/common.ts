/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


/** Checks if a string corresponds to one of the (uppercase) event names keys */
export function isEventKey(key: string): key is keyof typeof eventNames {
	const keyUpper = key.toUpperCase()
	return keyUpper.startsWith("ON") // this condition is simply to prevent useless searches through the events list.
		&& Object.keys(eventNames).includes(keyUpper)
}

/** Special attributes that map to DOM events. */
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
	ONWHEEL: "wheel"
}

/** Mouse event names */
export const mouseMvmntEventNames = [
	"ONMOUSEENTER",
	"ONMOUSELEAVE",
	"ONMOUSEMOVE",
	"ONMOUSEOUT",
	"ONMOUSEOVER",
	"ONMOUSEUP"
]

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

export const UPDATE_INTERVAL_MILLISECONDS = 250


export function camelCaseToDash(str: string) {
	return str
		.replace(/[^a-zA-Z0-9]+/g, '-')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/([0-9])([^0-9])/g, '$1-$2')
		.replace(/([^0-9])([0-9])/g, '$1-$2')
		.replace(/-+/g, '-')
		.toLowerCase()
}

export function stringify(x: any) {
	return JSON.stringify(x, (key, val) => typeof val === "function" ? `[Function ${val.name}]` : val, 2)
}