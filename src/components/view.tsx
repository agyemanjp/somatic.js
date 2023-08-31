import { createId } from "@paralleldrive/cuid2"
import { deepMerge, mergeDeep } from "@agyemanjp/standard"

import { createElement } from "../core"
import { Component, UIElement, HtmlProps, PanelProps, CSSProperties, ElementGeneratorAsync, ComponentArgs } from "../types"
import { StackPanel } from "./panels"

export async function View(deps:
	{
		_mergeDeep?: typeof mergeDeep,
		_createId?: typeof createId,
	}) {


	/** View component */
	const View = async function* <T>(_props: ComponentArgs<ViewProps<T>>, render: Function): ElementGeneratorAsync<ViewProps, JSX.Element> {
		// console.log(`"${_props.key}" view render start`)

		const defaultProps = {
			// id: (deps._createId ?? createId)(),
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
				const {
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
						? <ItemTemplate value={datum} index={index} selected={index === selectedIndex} />
						: <div style={{ ...itemStyle, ...(index === selectedIndex) ? selectedItemStyle : {} }}>
							{datum as any}
						</div>
					) as UIElement

					const clickAction = () => {
						if (onSelection) onSelection({ selectedIndex: 0 })
					}

					return itemElement
					/*renderToIntrinsicAsync(itemElement).then(elt => {
						// console.log(`rendered intrinsic elt: ${elt as any}`)
						if (elt !== null && typeof elt === "object" && "props" in elt) {
							const onClick = elt.props.onClick
							elt.props.onClick = typeof onClick === "function"
								? () => {
									onClick()
									clickAction()
								}
								: clickAction
	
							elt.props.style = {
								...itemStyle,
								...(typeof elt.props.style === "object" ? elt.props.style : {})
							}
						}
						return elt
					})*/
				}))

				const newProps = (yield <ItemsPanel
					orientation={orientation}
					itemsAlignH={itemsAlignV}
					itemsAlignV={itemsAlignH}
					style={style}
					{...htmlProps}>

					{items}
				</ItemsPanel>) ?? props

				// Update props (including stateful members and extra state) based on injected props
				props = mergeDeep()(
					props,
					newProps,
					{
						// if sourceData or selectedIndex has changed externally from what was initially passed, reset selectedIndex
						selectedIndex: (newProps.sourceData !== props.sourceData) || (props.selectedIndex !== newProps.selectedIndex)
							? newProps.selectedIndex ?? selectedIndex
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

	View.isPure = true
	return View
}

export type ViewProps<T = unknown> = HtmlProps & PanelProps & {
	sourceData: Iterable<T>
	selectedIndex?: number,

	itemsPanel: Component<HtmlProps & PanelProps>,
	// itemsPanelStyle: CSSProperties,
	itemTemplate?: Component<{ value: T, index: number, selected?: boolean/*, children?: never[]*/ }>
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
