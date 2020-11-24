/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable fp/no-rest-parameters */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */

import morphdom from 'morphdom'
import fastMemoize from 'fast-memoize'
import { VNode, VNodeType, PropsExtended, Message, CSSProperties } from "./types"
import { setAttribute, isEventKey, camelCaseToDash, encodeHTML, idProvider } from "./utils"
import { svgTags, eventNames, mouseMvmntEventNames, } from "./constants"
import { Obj, Primitive } from "@sparkwave/standard/utility"
import { flatten } from "@sparkwave/standard/collections"
import { deepMerge } from "@sparkwave/standard/collections/object"

// export const Fragment = (async () => ({})) as Renderer
export const fnStore: ((evt: Event) => unknown)[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createElement<P extends Obj, T extends VNodeType<P>>(type: T, props: P, ...children: any[]): VNode<P, T> {
	return { type, props, children }
}

/** Render virtual node to DOM node */
export async function render<Props extends Obj, State>(vnode?: Primitive | Object | VNode<PropsExtended<Props, Message, State>> | Promise<VNode<PropsExtended<Props, Message, State>>>, parentKey?: string): Promise<Node> {
	// console.log(`Starting render of vnode: ${JSON.stringify(vnode)}`)

	if (vnode === null || vnode === undefined) {
		// console.log(`VNode is null or undefined, returning empty text node`)
		return document.createTextNode("")
	}

	const _vnode = await vnode
	if (typeof _vnode === 'object' && 'type' in _vnode && 'props' in _vnode) {
		// console.log(`vNode is object with 'type' and 'props' properties`)

		const children = [...flatten([_vnode.children]) as JSX.Element[]]
		switch (typeof _vnode.type) {
			case "function": {
				// console.log(`vNode type is function, rendering as custom component`)
				const _props: PropsExtended<Props, Message, State> = {
					..._vnode.props,
					key: `${parentKey ?? ""}__${(vnode as any).props?.key ?? ""}`,
					children: [...children]
				}
				const element = await _vnode.type(_props)

				return element.children === undefined
					? await memoizedRender(element)
					: await render(element, _props.key) // If element has children, we don't use the cache system (yet)
			}

			case "string": {
				// console.log(`vNode type is string, rendering as intrinsic component`)
				const node = svgTags.includes(_vnode.type)
					? document.createElementNS('http://www.w3.org/2000/svg', _vnode.type)
					: document.createElement(_vnode.type)

				// render and append children in order
				await Promise
					.all(children.map((c, i) => render(c, `${i}_${parentKey ?? ""}`)))
					.then(rendered => rendered.forEach(child => node.appendChild(child)))

				// attach attributes
				const nodeProps = _vnode.props || {}
				Object.keys(nodeProps).forEach(propKey => {
					try {
						const propValue = nodeProps[propKey]
						if (propValue !== undefined) {
							const htmlPropKey = propKey.toUpperCase()
							if (isEventKey(htmlPropKey) && typeof propValue === "function") {
								// The first condition above is to prevent useless searches through the events list.
								const eventId = idProvider.next()
								// We attach an eventId per possible event: an element having an onClick and onHover will have 2 such properties.
								node.setAttribute(`data-${htmlPropKey}-eventId`, eventId)

								// If the vNode had an event, we add it to the document-wide event. 
								// We keep track of every event and its matching element through the eventId:
								// each listener contains one, each DOM element as well
								addListener(document, eventNames[htmlPropKey], (e: Event) => {
									const target = e.target as HTMLElement | null
									if (target !== document.getRootNode()) {
										// We don't want to do anything when the document itself is the target
										// We bubble up to the actual target of an event: a <div> with an onClick might be triggered by a click on a <span> inside
										const intendedTarget = target ? target.closest(`[data-${htmlPropKey.toLowerCase()}-eventId="${eventId}"]`) : undefined

										// For events about mouse movements (onmouseenter...), an event triggered by a child should not activate the parents handler (we when leave a span inside a div, we don't activate the onmouseleave of the div)
										// We also don't call handlers if the bubbling was cancelled in a previous handler (from a child element)
										const shouldNotTrigger = mouseMvmntEventNames.includes(htmlPropKey) && intendedTarget !== target
											|| e.cancelBubble

										if (!shouldNotTrigger && intendedTarget) {
											// Execute the callback with the context set to the found element
											// jQuery goes way further, it even has it's own event object
											(propValue as (e: Event) => unknown).call(intendedTarget, e)
										}
									}
								}, true)
							}
							else {
								setAttribute(node, propKey, (propValue as (e: Event) => unknown))
							}
						}
					}
					catch (e) {
						console.error(`Error setting dom attribute ${propKey} to ${JSON.stringify(nodeProps[propKey])}:\n${e}`)
					}
				})
				return node
			}

			default: {
				console.error(`Somatic render(): invalid vnode "${JSON.stringify(_vnode)}" of type "${typeof _vnode}"; `)
				return document.createTextNode(String(_vnode))
			}
		}
	}
	else {
		return document.createTextNode(String(_vnode))
	}
}
const memoizedRender = fastMemoize(render, {})

/** Render virtual node to HTML string */
export async function renderToString<P extends Obj = Obj>(vnode?: { toString(): string } | VNode<P> | Promise<VNode<P>>): Promise<string> {
	const elt = (await render(vnode)) as Node | Element
	const result = ('outerHTML' in elt)
		? elt.outerHTML
		: (elt.textContent ?? elt.nodeValue ?? "")

	// console.log(`renderToString output: ${result}`)
	return result

	/*if (vnode === null || vnode === undefined) {
		return ""
	}
	const _vnode = await vnode

	if (typeof _vnode === 'object' && 'type' in _vnode) {
		const children = new Array(flatten(_vnode.children || [])) as Array<JSX.Element>
		switch (typeof _vnode.type) {
			case "function": {
				const _props: PropsExtended<P, Message> = { ..._vnode.props, children: [...children || []] }

				const resolvedVNode = await _vnode.type(_props)
				return typeof resolvedVNode.type === "function" && children.length === 0
					? await memoizedRenderToString(resolvedVNode)
					: await renderToString(resolvedVNode) // If elem have children, we don't use the cache system (yet).
			}

			case "string": {
				const notSelfClosing = !selfClosingTags.includes(_vnode.type.toLocaleLowerCase())
				const childrenHtml = (notSelfClosing && _vnode.children && _vnode.children.length > 0)
					? (await Promise.all(children.map(child => {
						return renderToString(child)
					}))).join("")
					: ""

				const nodeProps = _vnode.props || {}
				const attributesHtml = new SuperString(Object.keys(nodeProps)
					.map(propName => {
						const propValue = nodeProps[propName]
						switch (propName) {
							case "style":
								return `${propName}="${stringifyStyle(propValue as CSSProperties)}"`

							default:
								return typeof propValue === "string"
									? `${propName}="${encodeHTML(propValue)}"`
									: typeof propValue === "function"
										? `${propName.toLowerCase()}="(${escape(propValue.toString())})(this);"`
										: ""
						}
					})
					.filter(attrHTML => attrHTML?.length > 0)
					.join(" ")
				).prependSpaceIfNotEmpty().toString()

				return notSelfClosing
					? `<${_vnode.type}${attributesHtml}>${childrenHtml}</${_vnode.type}>`
					: `<${_vnode.type}${attributesHtml}>`

			}

			default:
				console.error(`\nrender(): invalid vnode type "${typeof _vnode}"; `)
				return String(_vnode)
		}
	}
	else {
		return String(_vnode)
	}*/
}

/** Attach event listeners from element to corresponding nodes in container */
export function hydrate(element: HTMLElement): void {
	[...element.attributes].forEach(attr => {
		// Event attributes will give place to an event listener and be removed.
		if (isEventKey(attr.name)) {
			const callback: (evt: Event) => void = fnStore[parseInt(attr.value)]
			setAttribute(element, attr.name, callback)
			element.addEventListener(eventNames[attr.name], { handleEvent: callback })
			element.removeAttribute(attr.name)
		}
		else if (attr.name === "htmlfor") { // the innerHTML that we are hydrating might have turned the htmlFor to lowercase in some browsers
			setAttribute(element, "htmlFor", attr.value)
			element.removeAttribute(attr.name)
		}
		else if (attr.name === "classname") { // the innerHTML that we are hydrating might have turned the className to lowercase in some browsers
			setAttribute(element, "className", attr.value)
			element.removeAttribute(attr.name)
		}
		else {
			setAttribute(element, attr.name, attr.value)
		}
	});[...element["children"]].forEach(child => {
		hydrate(child as HTMLElement)
	})
}

/** Compares an HTML element with a node, and updates only the parts of the HTML element that are different
 * @param rootElement An HTML element that will be updated
 * @param node A node obtained by rendering a VNode
 */
export function updateDOM(rootElement: Element, node: Node) { morphdom(rootElement, node) }

const _eventHandlers: { [key: string /** The name of a JS event, i.e. onmouseenter */]: { node: Node, handler: (e: Event) => void, capture: boolean }[] } = {} // Global dictionary of events
const addListener = (node: Node, event: string, handler: (e: Event) => void, capture = false) => {
	if (_eventHandlers[event] === undefined) {
		// eslint-disable-next-line fp/no-mutation
		_eventHandlers[event] = []
	}
	// Here we track the events and their nodes (note that we cannot use node as Object keys, as they'd get coerced into a string)
	// eslint-disable-next-line fp/no-mutating-methods
	_eventHandlers[event].push({ node: node, handler: handler, capture: capture })
	node.addEventListener(event, handler, capture)
}

/** Remove all event listeners */
export const removeAllListeners = (targetNode: Node) => {
	Object.keys(_eventHandlers).forEach(eventName => {
		// remove listeners from the matching nodes
		_eventHandlers[eventName]
			.filter(({ node }) => node === targetNode)
			.forEach(({ node, handler, capture }) => node.removeEventListener(eventName, handler, capture))

		// update _eventHandlers global
		// eslint-disable-next-line fp/no-mutation
		_eventHandlers[eventName] = _eventHandlers[eventName].filter(
			({ node }) => node !== targetNode,
		)
	})
}

/** Converts a css props object literal to a string */
export function stringifyStyle(style: CSSProperties, important = false) {
	if (typeof style === "object") {
		return Object.keys(style)
			.map((key) => `${camelCaseToDash(key)}: ${(style)[key as keyof typeof style]}${important === true ? " !important" : ""}`)
			.join("; ")
			.concat(";")
	}
	else {
		console.warn(`Input "${JSON.stringify(style)}" to somatic.stringifyStyle() is of type ${typeof style}, returning empty string`)
		return ""
	}
}

export function stringifyAttribs(props: Obj) {
	return Object.keys(props)
		.map(name => {
			const value = props[name]
			switch (true) {
				case name === "style":
					return (`style="${encodeHTML(stringifyStyle(value as CSSProperties))}"`)
				case typeof value === "string":
					return (`${encodeHTML(name)}="${encodeHTML(String(value))}"`)
				case typeof value === "number":
					return (`${encodeHTML(name)}="${value}"`)
				// case typeof value === "function":
				// 	fnStore.push(value as (e: Event) => unknown)
				// 	return (`${encodeHTML(name.toLowerCase())}="${fnStore.length - 1}"`)
				case value === true:
					return (`${encodeHTML(name)}`)
				default:
					return ""
			}
		})
		.filter(attrHTML => attrHTML?.length > 0)
		.join(" ")
}

/** Merge default props with actual props of renderer */
export function mergeProps<P extends Obj, D extends Partial<P>>(defaults: D, props: P): D & P & Partial<P> {
	return deepMerge(defaults, props) as D & P & Partial<P>
}

/** Get curried form of state cache that does not require key argument */
export function getSimpleStateCache<Props, State extends Obj, D extends Partial<State>>(props: PropsExtended<Props, any, State>, defaultState: D) {
	const stateCache = props.stateCache
	const key = props.key

	const setAsync = async (delta: Partial<State>) => {
		if (stateCache && key) {
			stateCache.setAsync(key, delta)
		}
	}
	const getAsync = async () => {
		const cachedState = stateCache ? await stateCache.getAsync(key ?? "") : undefined
		return mergeProps(defaultState, cachedState ?? {}) as D & State & Partial<State>
	}

	return { getAsync, setAsync }
}