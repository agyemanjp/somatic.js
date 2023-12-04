import { Comparer, Obj, Tuple, hasValue, isAsyncGenerator, isGenerator, last, pick, prependSpaceIfNotEmpty, shallowEquals, stringify } from "@agyemanjp/standard"
import { default as morphdom } from "morphdom"

import { stringifyAttributes } from "./html"
import { createDOMShallow } from "./dom"
import { isComponentElt, isIntrinsicElt, getChildren, isEltProper } from "./element"
import { Component, DOMElement, UIElement, ValueElement, IntrinsicElement, Children, ComponentElement } from "./types"
import { selfClosingTags } from "./common"

type UIElementID = string
type CachedResult = {
	/** Element used for last render pass */
	elt: ComponentElement<{ id: string }>,

	/** Internal state of element */
	state: Obj,

	/** State changed since last render */
	stateChanged: boolean

	/** Cached result of elt (with state) */
	result: UIElement
}
const eltCache: Obj<CachedResult, UIElementID> = {}

function cachedResultValid(elt: CachedResult["elt"], cachedResult: CachedResult) {
	return elt.props.id === cachedResult.elt.props.id
		&& elt.type === cachedResult.elt.type
		&& cachedResult.stateChanged === false
		&& elt.type.isPure === true
}

function eltWithID(elt: ComponentElement<{ key?: string }>, parentId?: string): ComponentElement {
	return {
		...elt,
		props: {
			...elt.props,
			id:
				parentId
					? `${parentId}-${elt.props.key}`
					: `${elt.props.key}`
		}
	}
}

/** Render a UI element into DOM objects */
export async function renderAsync(elt: UIElement): Promise<(DOMElement | DocumentFragment | Text)> {
	return renderAsync__(elt)

	async function renderAsync__(elt: UIElement, parentId?: string): Promise<(DOMElement | DocumentFragment | Text)> {
		if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
			console.warn(`Object appearing to represent proper element has no type member.`)
			console.warn(`This is likely an error arising from creating an element with an undefined component tag`)
		}


		const leaf = isComponentElt(elt)
			? await getLeafAsync(eltWithID(elt), parentId)
			: elt
				? elt
				: ""

		const dom = createDOMShallow(leaf)
		return isIntrinsicElt(leaf)
			? Promise.all(getChildren(leaf).map(childElt => renderAsync__(childElt, (leaf as IntrinsicElement<{ key: string }>).props.key)))
				.then(childrenDom => (childrenDom.forEach(domChild => dom.appendChild(domChild)), dom))
			: Promise.resolve(dom)
	}

}


/** Gets leaf (intrinsic or value) element; Memoized */
export async function getLeafAsync(eltUI: ComponentElement, parentId?: string): Promise<IntrinsicElement<{ id: string }> | ValueElement> {
	if (typeof eltUI.type === "undefined") throw "Component element has undefined 'type' property"

	const _cache = cache ?? new ElementsCache({})
	const eltResult = _cache.get(eltUI, getResult(eltUI)).then(_ => augment(_))
	return isComponentElt(eltResult)
		? getLeafAsync(eltResult, _cache).then(_ => _ ?? "")
		: (eltResult ?? "") // resultElt is a leaf, so just return it

}


/** JSX is transformed into calls of this function
 * @returns UI Element corresponding to inputs
 */
export function createElement<T extends string | Component>(type: T, props: T extends Component<infer P> ? P : unknown, ...children: unknown[]) {
	if (typeof type !== "string" && typeof type !== "function") {
		console.warn(`Type argument has invalid type ${typeof type}`)
	}

	return {
		type,
		props: props ?? {},
		children: children.flat()
	}
}

/** Convenience method to mount the root DOM node of a client app */
export function mountElement(rootElement: UIElement, container: Element, cache?: ElementsCache) {
	const _cache = cache ?? new ElementsCache({})
	let rendering = Promise.resolve()

	document.addEventListener<any>('requestRender', (ev: CustomEvent<RenderRequestedInfo>) => { // ToDo: Maybe should be separate fn to avoid creating new ref each time	
		const elt = ev.detail.elt
		console.log(`Render event received for elt = ${stringify(elt)}`)

		rendering = (rendering ?? Promise.resolve())
			.then(_ => { if (elt !== undefined) _cache.delete(elt) })
			.then(_ => renderAsync(rootElement))
			.then(dom => morphdom(container, dom, { childrenOnly: true }))
	})

	return (renderRequest(), rendering.then(_ => _cache))
}

/** Render a UI element into its HTML string representation */
export async function renderToStringAsync(elt: UIElement, cache?: ElementsCache): Promise<string> {
	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`Object appearing to represent proper element has no type member\nThis is likely an error arising from creating an element with an undefined component`)
		return String(elt)
	}

	const leaf = await getLeafAsync(elt)
	if (isIntrinsicElt(leaf)) {
		const children = getChildren(leaf)
		const attributesHtml = prependSpaceIfNotEmpty(stringifyAttributes(leaf.props)).toString()
		const childrenHtml = () => Promise.all(children.map(_ => renderToStringAsync(_, cache))).then(arr => arr.join(""))
		return hasValue(leaf.type)
			? selfClosingTags.includes(leaf.type.toUpperCase()) && children.length === 0
				? `<${leaf.type}${attributesHtml} />`
				: `<${leaf.type}${attributesHtml}>${await childrenHtml()}</${leaf.type}>`
			: `${await childrenHtml()}`

	}
	else {
		return String(leaf ?? "")
	}
}

/** Invalidate an element (and thus request its re-rendering) */
function renderRequest(elt?: ComponentElement, reason?: string) {
	// console.log(`Internal render function called for elt ${stringify(elt)}`)

	const ev = new CustomEvent<RenderRequestedInfo>('requestRender', { detail: { elt }, })
	if (document.readyState === "complete") {
		try {
			document.dispatchEvent(ev)
		}
		catch (e) {
			console.error(`Error dispatching requestRender event ${ev}: ${e}`)
		}
	}
	else {
		// console.log(`\ndocument.readyState: ${document.readyState}`)
		document.onreadystatechange = async event => {
			// console.log(`\ndocument.readyState changed to: ${document.readyState}`)
			if (document.readyState === "complete") {
				// console.log(`\nDispatching UIInvalidated event for ids "${ev.detail.invalidatedFnRefs}" after document loading complete\n`)
				try {
					document.dispatchEvent(ev)
				}
				catch (e) {
					console.error(`Error dispatching requestRender event ${ev}: ${e}`)
				}
			}
		}
	}
}

export interface RenderRequestedInfo { elt?: ComponentElement }


/** DOM update/refresh interval. This value seems to work best when tested; Don't change without a good reason */
// const DEFAULT_UPDATE_INTERVAL_MILLISECONDS = 14

export const fragment = ""


export class ElementsCache /*implements Map<ComponentElt, Promise<ComponentResult<UIElement>>>*/ {
	private _cache: Map<Component, Array<PropsResult>>

	constructor(protected opts: {
		onCacheEviction?: (elt: ComponentElement) => void
		onCacheMiss?: (elt: ComponentElement, reason: "Comp" | "Props" | "Children" | "Result") => void
		onCacheHit?: (elt: ComponentElement, result: ComponentResult) => void
	}) {
		this._cache = new Map<Component, Array<PropsResult>>()
	}

	get size(): number {
		return this._cache.size
	}

	has(key: ComponentElement): boolean {
		return this._cache.has(key.type) && this._cache.get(key.type)!.find(_ => matchingProps(_, key)) !== undefined
	}

	set(key: ComponentElement, result: Promise<ComponentResult<UIElement>>) {
		const entry = {
			props: key.props,
			children: key.children,
			result
		}
		const comp = key.type
		this._cache.has(comp)
			? this._cache.get(comp)!.push(entry)
			: this._cache.set(comp, [entry])

		return this
		// return entry
	}

	/** Evicts an element result */
	delete(key: ComponentElement) {
		const entry = this._cache.get(key.type)

		if (entry !== undefined) {
			const idx = entry.findIndex(_ => matchingProps(_, key))
			if (idx >= 0) {
				console.warn(`Removing ${key.type.name} entry #${idx} from cache`)
				entry.splice(idx)
				console.assert(entry.findIndex(_ => matchingProps(_, key)) === -1)
				return true
			}
		}
		return false
	}

	get(elt: ComponentElement, defaultVal: Promise<ComponentResult<UIElement>>): typeof defaultVal {

		const augment = async (_?: ComponentResult): ComponentResult<UIElement> => {
			const { type: comp, props, children } = elt
			const getResult = async (): Promise<ComponentResult<UIElement>> => {
				const r = comp({ ...props, children }, () => renderRequest(elt))
				return isAsyncGenerator(r)
					? { element: (await r.next()).value, generator: r }
					: isGenerator(r)
						? { element: r.next().value, generator: r }
						: { element: r, generator: undefined }
			}

			if (_ === undefined) {
				return { props, children, result: getResult() }
			}

			else {
				const r = await _.result
				return (r.element
					? _
					: r.generator
						? (r.element = (await r.generator.next()).value, _)
						: (_.result = Promise.resolve(getResult()), _)
				) as PropsResult<UIElement>
			}
		}

		const entries = this._cache.get(elt.type)
		const result = (() => {
			if (entries) {
				const entry = entries?.find(_ => matchingProps(_, elt))
				if (entry) {
					return useableEntry(entry)
				}
				else {
					return useableEntry().then(e => entries.push(e)).then(_ => last(entries))
				}
			}
			else {
				return useableEntry().then(_ => this.add(elt, _.result))
			}
		})().then(_ => _.result) as Promise<ComponentResult<UIElement>>

		return result
	}

}

type PropsResult<Elt extends UIElement | undefined = UIElement | undefined> = {
	props: Obj
	children?: Children
	result: Promise<ComponentResult<Elt>>
}

type ComponentResult<Elt extends UIElement | undefined = UIElement | undefined> = {
	generator?: Generator<UIElement, UIElement> | AsyncGenerator<UIElement, UIElement>
	element: Elt
}


const matchingProps: Comparer<{ props: Obj & { key?: string }, children: Children, depth: number }> = function (a, b) {
	const ret = (a.props.key !== undefined && b.props.key !== undefined && a.props.key === b.props.key && a.depth === b.depth)
		|| (shallowEquals(a.props, b.props) && shallowEquals(Object(a.children), Object(b.children)))
	// if ("onClick" in a.props || "onClick" in b.props)
	// 	console.log(`\n${a.type.name} props: ${stringify(a.props)} matches ${b.type.name} props ${stringify(b.props)}: ${ret}`)
	return ret
}