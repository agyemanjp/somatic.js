import { Comparer, Obj, Tuple, hasValue, isAsyncGenerator, isGenerator, last, prependSpaceIfNotEmpty, shallowEquals, stringify } from "@agyemanjp/standard"
import { default as morphdom } from "morphdom"

import { stringifyAttributes } from "./html"
import { createDOMShallow } from "./dom"
import { isComponentElt, isIntrinsicElt, getChildren } from "./element"
import { Component, DOMElement, UIElement, ValueElement, IntrinsicElement, Children, ComponentElt } from "./types"
import { selfClosingTags } from "./common"


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

export const { mountElement, renderAsync, renderToStringAsync, getLeafAsync, matchingProps } = (() => {
	/** Convenience method to mount the root DOM node of a client app */
	function mountElement(element: UIElement, container: Element) {
		let rendering = Promise.resolve()
		document.addEventListener('Render', (ev) => { // ToDo: Maybe should be separate fn to avoid creating new ref each time	
			const elt = (ev as any as CustomEvent<RenderEventInfo>).detail.elt
			console.log(`Render event received for elt = ${stringify(elt)}`)

			rendering = (rendering ?? Promise.resolve())
				.then(_ => { // remove cached element result

					if (elt !== undefined && isComponentElt(elt)) {
						const entry = eltCache.get(elt.type)
						if (entry !== undefined) {
							const idx = entry.findIndex(_ => matchingProps(_, elt))

							console.warn(`REMOVING ENTRY # FROM CACHE: ${idx}`)
							if (idx > 0) entry.splice(idx)
						}
					}
				})
				.then(_ => renderAsync(element))
				.then(dom => morphdom(container, dom, { childrenOnly: true }))
		})

		render()
		return rendering.then(_ => eltCache)
	}

	/** Render a UI element into DOM objects */
	async function renderAsync(elt: UIElement): Promise<(DOMElement | DocumentFragment | Text)> {
		if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
			console.warn(`Object appearing to represent proper element has no type member.
			This is likely an error arising from creating an element with an undefined component tag`)
		}

		const leaf = await getLeafAsync(elt)
		const dom = createDOMShallow(leaf)
		return isIntrinsicElt(leaf)
			? Promise.all(getChildren(leaf).map(childElt => renderAsync(childElt)))
				.then(childrenDom => (childrenDom.forEach(domChild => dom.appendChild(domChild)), dom))
			: Promise.resolve(dom)
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
						const r = comp({ ...props, children }, () => render(eltUI))
						return isAsyncGenerator(r)
							? { element: r.next().then(_ => _.value), generator: r }
							: isGenerator(r)
								? { element: r.next().value, generator: r }
								: { element: r, generator: undefined }
					}

					if (_ === undefined) {
						return { type: comp, props, children, result: fx() }
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

				const arrEntry = eltCache.get(comp)
				const entry = arrEntry?.find(_ => matchingProps(_, eltUI))
				return (arrEntry
					? entry
						? await useableEntry(entry)

						: (arrEntry.push(await useableEntry()), last(arrEntry))

					: addToCache(comp, await useableEntry())

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

	const matchingProps: Comparer<ComponentElt> = function (a, b) {
		const ret = shallowEquals(a.props, b.props) && shallowEquals(Object(a.children), Object(b.children))
		// if ("onClick" in a.props || "onClick" in b.props)
		// 	console.log(`\n${a.type.name} props: ${stringify(a.props)} matches ${b.type.name} props ${stringify(b.props)}: ${ret}`)
		return ret
	}

	type ComponentResult<Elt extends UIElement | undefined = UIElement | undefined> = {
		generator?: Generator<UIElement, UIElement> | AsyncGenerator<UIElement, UIElement>
		element: Elt
	}
	type Entry<Elt extends UIElement | undefined = UIElement | undefined> = {
		type: Component
		props: Obj
		children?: Children
		result: ComponentResult<Elt>
	}

	const eltCache = new Map<Component, Array<Entry>>()

	function addToCache(key: Component, val: Entry) {
		(eltCache.has(key))
			? eltCache.get(key)!.push(val)
			: eltCache.set(key, [val])

		return val
	}

	return { mountElement, renderAsync, renderToStringAsync, getLeafAsync, matchingProps }
})()


/** Invalidate an element (and thus request its re-rendering) */
function render(elt?: UIElement, reason?: string) {
	console.log(`Internal render function called for elt ${stringify(elt)}`)

	const ev = new CustomEvent<RenderEventInfo>('Render', { detail: { elt }, })
	if (document.readyState === "complete") {
		try {
			document.dispatchEvent(ev)
		}
		catch (e) {
			console.error(`Error dispatching render event ${ev}: ${e}`)
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
					console.error(`Error dispatching render event ${ev}: ${e}`)
				}
			}
		}
	}
}

interface RenderEventInfo { elt?: UIElement }


/** DOM update/refresh interval. This value seems to work best when tested; Don't change without a good reason */
// const DEFAULT_UPDATE_INTERVAL_MILLISECONDS = 14

export const fragment = ""
