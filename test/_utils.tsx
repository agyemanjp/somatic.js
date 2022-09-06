/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable fp/no-mutation */
/* eslint-disable prefer-const */

import { mergeDeep, ArgsType, deepMerge } from "@agyemanjp/standard"
import * as cuid from "cuid"

import { createElement, renderToIntrinsicAsync } from "../dist/core"
import { normalizeChildren } from "../dist/element"
import { stringifyStyle } from "../dist/html"
import { ButtonHTMLAttributes, Component, CSSProperties, HtmlProps, PanelProps, SVGAttributes, UIElement } from "../dist/types"
import "../dist" // for globals e.g., JSX

/** Create html element from html string; Requires <document> object to exist */
export function constructElement(html: string): HTMLElement {
	const div = document.createElement("div")
	div.innerHTML = html.trim()
	return div
}

/** Remove some attributes from an html element string */
export function excludeAttributes(target: string, attributes: string[]): string
export function excludeAttributes(target: HTMLElement, attributes: string[]): HTMLElement
export function excludeAttributes(target: HTMLElement | string, attributes: string[]): string | HTMLElement {
	const div = constructElement(typeof target === "string" ? target : target.innerHTML)
	attributes.forEach(a => div.removeAttribute(a))
	return typeof target === "string" ? div.innerHTML : div
}

export function normalizeHTML(html: string) {
	return html //excludeAttributes(html, ["id"])
		.replace(/( \w*="undefined")/, "") // remove atributes set to the string "undefined"
		.replace(/ class="(\w*)"/, ' className="$1"')
		.replace(/ for="(\w*)"/, ' htmlFor="$1"')
}


export const StackPanel: Component<PanelProps & HtmlProps> = function (props) {
	const {
		key,
		orientation,
		itemsAlignH,
		itemsAlignV,
		children,
		style,
		id,
		...htmlProps
	} = props

	const alignItems = () => {
		switch (orientation === "vertical" ? (itemsAlignH) : (itemsAlignV)) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "stretch":
				return "stretch"
			default:
				return "initial"
		}
	}

	const justifyContent = () => {
		switch (orientation === "vertical" ? (itemsAlignV) : (itemsAlignH)) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "uniform":
				return "space-evenly"
			case "dock":
				return "space-between"
			default:
				return "initial"
		}
	}

	// console.log(`Rendering StackPanel, id = ${id}, props = ${stringify(props)}`)
	return <div {...htmlProps}
		style={{
			...style,
			display: "flex",
			flexDirection: orientation === "vertical" ? "column" : "row",
			justifyContent: justifyContent(),
			alignItems: alignItems()
		}}>

		{children}

	</div>
}
StackPanel.isPure = true


export const CommandBox: Component<CommandBoxProps> = function (props) {
	const defaultProps = {
		orientation: "horizontal" as Required<CommandBoxProps>["orientation"],
		iconPlacement: "before" as Required<CommandBoxProps>["iconPlacement"],
		hoverEffect: "invert" as Required<CommandBoxProps>["hoverEffect"],
		style: {
			overflow: "hidden",
			lineHeight: "1.1em",
			padding: "0.25em",
			// margin: "0.5em",
			marginLeft: "0",
			borderRadius: "0.2em",
			color: "#444444",
			backgroundColor: "white",
			borderWidth: "thin",
			borderStyle: "solid",
			cursor: "pointer"
		} as CSSProperties
	}
	const {
		orientation,
		hoverEffect,
		iconPlacement,
		icon: Icon,
		style,
		color,
		children,
		key,
		...htmlProps
	} = mergeDeep()(defaultProps, props)

	const hoverStyle: CSSProperties = (hoverEffect === "invert"
		? {
			color: style.backgroundColor ?? defaultProps.style.backgroundColor,
			borderColor: style.backgroundColor ?? style.background ?? defaultProps.style.backgroundColor,
			backgroundColor: style.color ?? defaultProps.style.color,
		}
		: {
			opacity: 1
		}
	)

	// console.warn(`Rendering commmand box; htmlProps = ${JSON.stringify(htmlProps)}`)
	return <HoverBox style={{ opacity: hoverEffect === "darken" ? 0.75 : 1 }} hoverStyle={hoverStyle}>
		<button
			{...htmlProps}
			style={{ borderColor: style.color, ...style }}>

			<StackPanel
				itemsAlignH={"center"}
				itemsAlignV={"center"}
				orientation={orientation}
				style={{ height: "auto" }}>
				{
					Icon ?
						iconPlacement === "before"
							? [<Icon /*style={{ height: "1em" }}*/ />, children]
							: [children, <Icon /*style={{ height: "1em" }}*/ />]
						: children
				}
			</StackPanel>

		</button>
	</HoverBox>
}

export type CommandBoxProps = Partial<HtmlProps & ButtonHTMLAttributes<any>> & {
	// color?: string
	icon?: Component<SVGAttributes<SVGGElement>>
	iconPlacement?: "before" | "after"
	orientation?: PanelProps["orientation"]
	hoverEffect?: "darken" | "invert"
}
CommandBox.isPure = true

export async function* View<T>(_props: ArgsType<Component<ViewProps<T>>>[0]): AsyncGenerator<JSX.Element, JSX.Element, typeof _props> {
	console.log(`"${_props.key}" view render start`)

	const defaultProps = {
		id: cuid(),
		selectedIndex: 0,
		itemsPanel: StackPanel,
		itemsPanelStyle: {},
		itemStyle: {},
		selectedItemStyle: {},
		selectionMode: "click" as Required<ViewProps>["selectionMode"],
		style: {}
	}

	let props = deepMerge(defaultProps, _props)

	try {
		while (true) {
			let {
				id,
				key,
				sourceData,
				itemsPanel: ItemsPanel,
				itemTemplate,
				style,
				orientation,
				itemsAlignV,
				itemsAlignH,
				itemStyle,
				itemsPanelStyle,
				selectedItemStyle,
				// hoverItemStyle,
				selectionMode,
				selectedIndex,
				onSelection,
				children, // children will be ignored, should be undefined
				...htmlProps
			} = mergeDeep()(defaultProps, props)

			const items = await Promise.all([...sourceData].map((datum, index) => {
				const ItemTemplate = itemTemplate
				const itemElement = (ItemTemplate
					? <ItemTemplate id={id} value={datum} index={index} selected={index === selectedIndex} />
					: <div id={id} style={{ ...itemStyle, ...(index === selectedIndex) ? selectedItemStyle : {} }}>
						{datum as any}
					</div>
				) as UIElement

				const clickAction = () => {
					if (selectionMode && onSelection) onSelection({ selectedIndex: 0 })
				}

				return renderToIntrinsicAsync(itemElement).then(elt => {
					// console.log(`rendered intrinsic elt: ${elt as any}`)
					if (elt && typeof elt === "object" && "props" in elt) {
						const onClick = elt.props.onClick
						elt.props.onClick = typeof onClick === "function"
							? () => {
								onClick(); clickAction()
							}
							: clickAction

						elt.props.style = {
							...itemStyle,
							...(typeof elt.props.style === "object" ? elt.props.style : {})
						}
					}
					return elt
				})
			}))
			const newProps = yield <ItemsPanel id={id}
				orientation={orientation}
				itemsAlignH={itemsAlignV}
				itemsAlignV={itemsAlignH}
				style={style}
				{...htmlProps}>

				{items}
			</ItemsPanel>

			// Update props (including stateful members and extra state) based on injected props
			props = mergeDeep()(
				props,
				newProps ?? {},
				{
					// if sourceData or selectedIndex has changed externally from what was initially passed, reset selectedIndex
					selectedIndex: (newProps?.sourceData !== props.sourceData) || (props.selectedIndex !== newProps?.selectedIndex)
						? newProps?.selectedIndex ?? selectedIndex
						: selectedIndex
				}
			)
		}
	}
	catch (e) {
		console.error(`View render: ${e}`)
		throw e
	}
}
export type ViewProps<T = unknown> = HtmlProps & PanelProps & {
	sourceData: Iterable<T>
	selectedIndex?: number,

	itemsPanel: Component<HtmlProps & PanelProps>,
	// itemsPanelStyle: CSSProperties,
	itemTemplate?: Component<{ id: string, value: T, index: number, selected?: boolean/*, children?: never[]*/ }>
	itemStyle?: CSSProperties,
	// hoverItemStyle?: CSSProperties,
	selectedItemStyle?: CSSProperties

	children?: never[]

	/** Selection options, or undefined/null if disabled 
	 * Mode indicates method of selection 
	 */
	selectionMode?: "none" | "click" | "check" | "click-or-check"
	onSelection?: (eventData: { selectedIndex: number }) => void

	// deletion?: { mode: "click" | "check" | "click-or-check" }
	// onDelete?: (eventData: { deletedIndex: number }) => void

	// addition?: { mode: "click" | "check" | "click-or-check" }
	// onAdd?: () => void

	// arrangementEnabled?: boolean
	// onArrange?: (eventData: { oldIndex: number, newIndex: number }) => void
}

export const HoverBox: Component<HoverBoxProps> = function (props) {
	const defaultProps = {
		style: {
			display: "inline-block",
			padding: 0,
			margin: 0
		} as CSSProperties,
		hoverStyle: {},
		id: cuid()
	}

	const className__ = cuid()

	let { key, id, children, hoverStyle, style, ...htmlProps } = mergeDeep()(defaultProps, props)
	const child = normalizeChildren(children)[0]

	const styleContent = `.${className__}:hover {${stringifyStyle({ ...hoverStyle }, true)}}`
	// console.log(`style content: ${styleContent}`)

	return <div id={id} style={{ ...style }} className={className__} {...htmlProps}>
		<style>{styleContent}</style>
		{child}
	</div>
}
HoverBox.isPure = true
export type HoverBoxProps = HtmlProps & {
	hoverStyle?: CSSProperties
}


