import { ArgsType, Comparer, Obj, hasValue, isAsyncGenerator, isGenerator, last, prependSpaceIfNotEmpty, shallowEquals } from "@agyemanjp/standard"
import { default as morphdom } from "morphdom"


import { stringifyAttributes } from "./html"
import { createDOMShallow } from "./dom"
import { isComponentElt, isIntrinsicElt, getChildren } from "./element"
import { Component, DOMElement, UIElement, ValueElement, IntrinsicElement, Children, ComponentElt } from "./types"
import { selfClosingTags } from "./common"


/** JSX is transformed into calls of this function
 * @returns UI Element corresponding to inputs
 */
export function createElement<T extends string | Component>(type: T, props: (typeof type) extends Component<infer P> ? P : unknown, ...children: unknown[]) {
	if (typeof type !== "string" && typeof type !== "function") { console.warn(`Type argument has invalid type ${typeof type}`) }

	return { type, props: props ?? {}, children: children.flat() }
}

/*export async function renderAsync(elt: UIElement): Promise<(DOMAugmented | DocumentFragment | Text)> {
	// console.assert(!isFragmentElt(elt))

	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn(`renderAsync: Object appearing to represent proper element has no type member. This is likely an error arising from creating an element with an undefined component`)
	}

	const trace = await traceToLeafAsync(elt)
	const leaf = trace.leafElement
	const dom = createDOMShallow(leaf)

	if (!isTextDOM(dom)) {
		const domWithChildren = await updateChildrenAsync(dom, getChildren(leaf))
		return domWithChildren instanceof DocumentFragment
			? domWithChildren
			: Object.assign(domWithChildren, { renderTrace: trace })
	}
	else {
		return dom
	}
}*/

export const { mountElement, renderAsync, renderToStringAsync, getLeafAsync } = (() => {
	/** Convenience method to mount the root DOM node of a client app */
	async function mountElement(element: UIElement, container: Element) {
		let rendering = Promise.resolve()

		document.addEventListener('Render', (ev) => { // ToDo: Maybe should be separate fn to avoid creating new ref each time	
			rendering = (rendering ?? Promise.resolve())
				.then(_ => (ev as any as RenderEvent).detail.comps.forEach(comp => { eltCache.delete(comp) }))
				.then(_ => renderAsync(element))
				.then(dom => morphdom(container, dom, { childrenOnly: true }))
		})

		document.dispatchEvent(new CustomEvent('Render', { detail: { comps: [] } }))
	}

	/** Render a UI element into DOM objects */
	async function renderAsync(elt: UIElement): Promise<(DOMElement | DocumentFragment | Text)> {
		// console.assert(!isFragmentElt(elt))
		if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
			console.warn(`Object appearing to represent proper element has no type member.
			This is likely an error arising from creating an element with an undefined component tag`)
		}

		const leaf = await getLeafAsync(elt)
		const dom = createDOMShallow(leaf)
		if (isIntrinsicElt(leaf)) {
			// Promise.all(getChildren(leaf).map(renderAsync)).then(_ => dom.())
			getChildren(leaf).forEach(child => renderAsync(child).then(dom.appendChild))
		}

		return dom
	}

	/** Render a UI element into its HTML string representation */
	async function renderToStringAsync(elt: UIElement): Promise<string> {
		if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
			console.warn(`Object appearing to represent proper element has no type member\nThis is likely an error arising from creating an element with an undefined component`)
			return String(elt)
		}

		const leaf = await getLeafAsync(elt)
		if (isIntrinsicElt(leaf)) {
			const children = getChildren(leaf)
			const attributesHtml = prependSpaceIfNotEmpty(stringifyAttributes(leaf.props)).toString()
			const childrenHtml = () => Promise.all(children.map(renderToStringAsync)).then(arr => arr.join(""))
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

	/** Gets leaf (intrinsic or value) element; Memoized */
	async function getLeafAsync(eltUI: UIElement): Promise<IntrinsicElement | ValueElement> {
		if (isComponentElt(eltUI)) {
			if (typeof eltUI.type === "undefined")
				throw "Component element has undefined 'type' property"

			const { type: comp, props, children } = eltUI

			const resultElt = await (async () => {
				/** Returns same entry, if passed, with the elt member filled in; Otherwise return a fresh entry */
				const useableEntry = async (_?: Entry): Promise<Entry<UIElement>> => {
					const fx = (): ComponentResult<UIElement> => {
						const r = comp({ ...props, children })
						return isAsyncGenerator(r)
							? { element: r.next().then(_ => _.value), generator: r }
							: isGenerator(r)
								? { element: r.next().value, generator: r }
								: { element: r, generator: undefined }
					}

					if (_ === undefined) {
						return { props, children, result: fx() }
					}

					else {
						const { result } = _
						return (result.element
							? _
							: result.generator
								? (result.element = (await result.generator.next()).value, _)
								: (_.result = fx(), _)
						) as Entry<UIElement>
					}

				}

				const matching: Comparer<{ props: ComponentElt["props"], children?: ComponentElt["children"] }> = (a, b) => {
					return shallowEquals(a.props, b.props) && shallowEquals(Object(a.children), Object(b.children))
				}

				const resultsArr = eltCache.get(comp)
				return (resultsArr
					? await useableEntry(resultsArr.find(_ => matching(_, eltUI))) ?? (resultsArr.push(await useableEntry()), last(resultsArr))
					: last(eltCache.set(comp, [await useableEntry()]).get(comp)!)
				).result.element as UIElement
			})()

			return isComponentElt(resultElt)
				? getLeafAsync(resultElt).then(_ => _ ?? "")
				: (resultElt ?? "") // resultElt is a leaf, so just return it
		}
		else { // eltUI is already a leaf (intrinsic or a value)
			return eltUI ?? ""
		}
	}

	type ComponentResult<Elt extends UIElement | undefined = UIElement | undefined> = {
		generator?: Generator<UIElement, UIElement> | AsyncGenerator<UIElement, UIElement>
		element: Elt
	}
	type Entry<Elt extends UIElement | undefined = UIElement | undefined> = {
		props: Obj
		children?: Children
		result: ComponentResult<Elt>
	}

	const eltCache = new Map<Component, Array<Entry>>()

	return { mountElement, renderAsync, renderToStringAsync, getLeafAsync }
})()


/** Request re-render */
export function render(comps?: Function[], reason?: string) {
	const ev = new CustomEvent('Render', { detail: { comps } })

	if (document.readyState === "complete") {
		document.dispatchEvent(ev)
	}
	else {
		// console.log(`\ndocument.readyState: ${document.readyState}`)
		document.onreadystatechange = async event => {
			// console.log(`\ndocument.readyState changed to: ${document.readyState}`)
			if (document.readyState === "complete") {
				// console.log(`\nDispatching UIInvalidated event for ids "${ev.detail.invalidatedFnRefs}" after document loading complete\n`)
				document.dispatchEvent(ev)
			}
		}
	}
}

interface RenderEvent extends Event { detail: { comps: Component[] } }


/** DOM update/refresh interval. This value seems to work best when tested; Don't change without a good reason */
// const DEFAULT_UPDATE_INTERVAL_MILLISECONDS = 14

export const fragment = ""
