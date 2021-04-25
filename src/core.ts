/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-assign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable fp/no-rest-parameters */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */

import morphdom from 'morphdom'
import fastMemoize from 'fast-memoize'
import { VNode, VNodeType, PropsExtended, Message, MergedPropsExt, CSSProperties, ComponentExtended, Component } from "./types"
import { addListener, stringifyStyle, setAttribute, isEventKey, encodeHTML, idProvider } from "./utils"
import { svgTags, eventNames, selfClosingTags, mouseMvmntEventNames, } from "./constants"
import { Obj, String, Primitive, flatten, deepMerge } from "@sparkwave/standard"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createElement<P extends Obj, T extends VNodeType<P>>(type: T, props: P, ...children: any[]): VNode<P, T> {
	return { type, props, children }
}

const _stateCache: Obj<Obj> = (global as any).__SOMATIC_CACHE__ = {}
export const fnStore: ((evt: Event) => unknown)[] = []

/** Render virtual node to DOM node */
export async function render<P extends Obj, S>(vnode?: Primitive | Object | VNode<PropsExtended<P>> | Promise<VNode<PropsExtended<P>>>, parentKey?: string): Promise<Node> {
	// console.log(`Starting render of vnode: ${JSON.stringify(vnode)}`)

	if (vnode === null || vnode === undefined) {
		// console.log(`VNode is null or undefined, returning empty text node`)
		return document.createTextNode("")
	}

	const _vnode = await vnode
	if (typeof _vnode === 'object' && 'type' in _vnode && 'props' in _vnode) {

		const children = [...flatten([_vnode.children]) as JSX.Element[]]
		switch (typeof _vnode.type) {
			case "function": {
				// console.log(`vNode type is function, rendering as custom component`)
				const vnodeType = _vnode.type
				const _props: PropsExtended<P, Message> = { ..._vnode.props, children: [...children] }

				const fullProps = mergeProps("defaultProps" in vnodeType && vnodeType.defaultProps && typeof vnodeType.defaultProps === "function"
					? vnodeType.defaultProps()
					: {},
					_props
				)
				const propsHash = ("hashProps" in vnodeType && vnodeType.hashProps)
					? vnodeType.hashProps(fullProps)
					: undefined

				fullProps.key = `${parentKey ?? ""}_${_props?.key ?? ""}_${propsHash ?? ""}` as any

				/** Turns a vNode representing a component into a vNode representing an intrinsic (HTML) element */
				const compToInstrinsic = async (vNode: VNode<PropsExtended<P>, Component<PropsExtended<P>>>) => {
					const fullState = mergeProps("defaultState" in vnodeType && vnodeType.defaultState
						? vnodeType.defaultState(fullProps)
						: {},
						_stateCache[fullProps.key ?? ""] ?? {}
					)

					return await vnodeType(_props, fullProps, {
						...fullState,
						setState: async (delta: Partial<S>) => {
							if (fullProps.key) {
								// console.log(`Setting state for key "${_props.key}" to ${JSON.stringify(delta, undefined, 2)}`)
								_stateCache[fullProps.key] = { ..._stateCache[fullProps.key] ?? {}, ...delta }
							}

							// We re-render the element
							const newElem = await compToInstrinsic(vNode)
							const renderedElem = await render(newElem, _props.key) // If element has children, we don't use the cache system (yet)
							const el = document.querySelector(`[key="${_props.key}"]`)
							if (el !== null) {
								updateDOM(el, renderedElem)
							}
							else {
								console.error(`Cannot update an element after setState: key '${_props.key}' not found in the document`)
							}

							if ("stateChangeCallback" in vnodeType && vnodeType.stateChangeCallback !== undefined && typeof vnodeType.stateChangeCallback === "function") {
								vnodeType.stateChangeCallback(delta)
							}
						}
					})
				}

				const intrinsicNode = await compToInstrinsic(_vnode as VNode<PropsExtended<P>, Component<PropsExtended<P>>>)

				return intrinsicNode.children === undefined
					? await memoizedRender(intrinsicNode)
					: await render(intrinsicNode, _props.key) // If element has children, we don't use the cache system (yet)
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
				if (parentKey) {
					setAttribute(node, "key", parentKey)
				}
				return node
			}

			default: {
				console.error(`Somatic render(): invalid vnode "${JSON.stringify(_vnode)}" of type "${typeof _vnode}"; `)
				return document.createTextNode(globalThis.String(_vnode))
			}
		}
	}
	else {
		return document.createTextNode(globalThis.String(_vnode))
	}
}
const memoizedRender = fastMemoize(render, {})

/** Render virtual node to HTML string */
export async function renderToString<P extends Obj, S>(vnode?: Primitive | Object | VNode<PropsExtended<P>> | Promise<VNode<PropsExtended<P>>>, parentKey?: string): Promise<string> {
	if (vnode === null || vnode === undefined) {
		return ""
	}
	const _vnode = await vnode

	if (typeof _vnode === 'object' && 'type' in _vnode) {
		const children = [...flatten([_vnode.children]) as JSX.Element[]]
		switch (typeof _vnode.type) {
			case "function": {
				const vnodeType = _vnode.type
				const _props: PropsExtended<P> = { ..._vnode.props, children: [...children] }
				const fullProps = mergeProps("defaultProps" in vnodeType && vnodeType.defaultProps && typeof vnodeType.defaultProps === "function"
					? vnodeType.defaultProps()
					: {},
					_props
				)

				const propsHash = ("hashProps" in vnodeType && vnodeType.hashProps)
					? vnodeType.hashProps(fullProps)
					: undefined

				fullProps.key = `${parentKey ?? ""}_${_props?.key ?? ""}_${propsHash ?? ""}` as any

				/** Turns a vNode representing a component into a vNode representing an intrisic (HTML) element */
				const compToInstrinsic = async (vNode: VNode<PropsExtended<P, Message>, Component<PropsExtended<P, Message>>>) => {
					const fullState = mergeProps("defaultState" in vnodeType && vnodeType.defaultState
						? vnodeType.defaultState(fullProps)
						: {},
						_stateCache[fullProps.key ?? ""] ?? {}
					)

					return await (vNode).type(_props, fullProps, {
						...fullState,
						setState: async (delta: Partial<S>) => {
							if (fullProps.key) {
								// console.log(`Setting state for key "${_props.key}" to ${JSON.stringify(delta, undefined, 2)}`)
								_stateCache[fullProps.key] = { ..._stateCache[fullProps.key] ?? {}, ...delta }
							}

							// We re-render the element
							const newElem = await compToInstrinsic(vNode)
							const renderedElem = await render(newElem, _props.key) // If element has children, we don't use the cache system (yet)
							const el = document.querySelector(`[key="${_props.key}"]`)
							if (el !== null) {
								updateDOM(el, renderedElem)
							}
							else {
								console.error(`Cannot update an element after setState: key '${_props.key}' not found in the document`)
							}

							if ("stateChangeCallback" in vnodeType && vnodeType.stateChangeCallback !== undefined && typeof vnodeType.stateChangeCallback === "function") {
								vnodeType.stateChangeCallback(delta)
							}
						}
					})
				}

				const intrinsicNode = await compToInstrinsic(_vnode as VNode<PropsExtended<P, Message>, Component<PropsExtended<P, Message>>>)

				return intrinsicNode.children === undefined
					? await renderToString(intrinsicNode)
					: await renderToString(intrinsicNode, _props.key) // If element has children, we don't use the cache system (yet)
			}

			case "string": {
				const notSelfClosing = !selfClosingTags.includes(_vnode.type.toLocaleLowerCase())
				const childrenHtml = (notSelfClosing && _vnode.children && _vnode.children.length > 0)
					? (await Promise.all(children.map(child => {
						return renderToString(child)
					}))).join("")
					: ""

				const nodeProps = _vnode.props || {}
				const attributesHtml = new String(Object.keys(nodeProps)
					.map(propName => {
						const propValue = nodeProps[propName]
						switch (propName) {
							case "style":
								return `${propName}="${stringifyStyle(propValue as CSSProperties)}"`

							default:
								// if prop is function, will not be added (will be hydrated later on client)
								return typeof propValue === "string"
									? `${propName}="${encodeHTML(propValue)}"`
									: `${propName}="${JSON.stringify(propValue)}"`
						}
					})
					.filter(attrHTML => attrHTML?.length ?? 0 > 0)
					.join(" ")
				).prependSpaceIfNotEmpty().toString()

				return notSelfClosing
					? `<${_vnode.type}${attributesHtml}>${childrenHtml}</${_vnode.type}>`
					: `<${_vnode.type}${attributesHtml}>`

			}

			default:
				console.error(`\nrender(): invalid vnode type "${typeof _vnode}"; `)
				return globalThis.String(_vnode)
		}
	}
	else {
		return globalThis.String(_vnode)
	}
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
export function updateDOM(rootElement: Element, node: Node) { morphdom(rootElement, node, { getNodeKey: () => undefined }) }

/** Merge default props with actual props of component */
export function mergeProps<P extends Obj, D extends Partial<P>>(defaults: D, props: P): D & P & Partial<P> {
	return deepMerge(defaults, props) as D & P & Partial<P>
}

/** Utility function to help in writing a component */
export const makeComponent = <DP, DS>(args:
	{
		defaultProps?: () => DP,
		defaultState?: (props: DP) => DS
	}) => {
	return <P extends Obj = Obj, M extends Message = Message, S = {}>(
		comp: (
			props: PropsExtended<P, M>,
			mergedProps: MergedPropsExt<P, M, DP>,
			stateCache: DS & S & Partial<S> & { setState: (delta: Partial<S>) => void }
		) => JSX.Element) => {

		return Object.assign(comp, { ...args })
	}
}
/** Utility function to help in writing a component */
export function makeComponent1<P extends Obj, M extends Message = Message, S extends Obj = {}>() {
	return <DP extends Partial<P>, DS extends Partial<S>>(
		comp: (
			_: PropsExtended<P, M>,
			props: MergedPropsExt<P, M, DP>,
			state: DS & S & Partial<S> & { setState: (delta: Partial<S>) => void }
		) => JSX.Element,

		opts: {
			defaultProps: () => DP,
			defaultState: (props?: P) => DS,
			hashProps?: (props: P) => string,
			stateChangeCallback?: (delta: Partial<S>) => Promise<void>

		}) => {

		const r: ComponentExtended<P, M, S, DP, DS> = Object.assign(comp, { ...opts })
		return r
	}
}


// export const Fragment = (async () => ({})) as Renderer
