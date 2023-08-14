import { getType, isArray, mergeDeep, stringify } from "@agyemanjp/standard"

import { createElement } from "../../core"
import { Component, PanelProps, HtmlProps, CSSLength } from "../../types"
import { getChildren, isEltProper, normalizeChildren } from "../../element"
import { StackPanel } from "./stack-panel"

export const GridPanel: Component<GridPanelProps> = function (props) {
	const alignItems = () => {
		switch (props.orientation === "vertical" ? (props.itemsAlignH) : (props.itemsAlignV)) {
			case "start":
				return "start"
			case "end":
				return "end"
			case "center":
				return "center"
			case "stretch":
				return "stretch"
			default:
				return "initial"
		}
	}
	const justifyContent = () => {
		switch (props.orientation === "vertical" ? (props.itemsAlignV) : (props.itemsAlignH)) {
			case "start":
				return "start"
			case "end":
				return "end"
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

	const defaultProps = {
		itemsAlignH: "start",
		itemsAlignV: "start",
		orientation: "horizontal",
		rowsOrColumns: 2
	} as Required<CoreProps>

	const {
		orientation,
		itemsAlignH,
		itemsAlignV,
		rowsOrColumns,
		style,
		key,
		children,
		...htmlProps
	} = mergeDeep()(props, defaultProps)

	const rowsOrColumnsTemplate = isArray(rowsOrColumns)
		? rowsOrColumns.join(" ")
		: typeof rowsOrColumns === "number"
			? `repeat(${rowsOrColumns}, minmax(0, 1fr))`
			: "unset"

	return <div
		{...htmlProps}
		style={{
			...style,
			...orientation === "horizontal"
				? { gridTemplateColumns: rowsOrColumnsTemplate }
				: { gridTemplateRows: rowsOrColumnsTemplate },

			flexDirection: orientation === "vertical" ? "column" : "row",
			gridAutoRows: "minmax(0, 1fr)", // Allow grid items to size based on content
			gridAutoColumns: "minmax(0, 1fr)", // Allow grid items to size based on content
			justifyContent: justifyContent(),
			alignItems: alignItems(),
			display: "grid"
		}}>

		{[children].flat().map(c => <div
			style={{
				width: "12px",
				border: "thin solid blue",
				overflow: "auto",
				objectFit: "container",
				minWidth: "min-content",
				minHeight: "min-content"
			}}>
			{c}
		</div>)}

	</div >
}
GridPanel.isPure = true

type CoreProps = PanelProps & { rowsOrColumns?: number | RowOrColumnInfo[] }
export type GridPanelProps = CoreProps & HtmlProps

type RowOrColumnInfo = CSSLength | "none" | "auto" | "max-content" | "min-content" | "initial" | "inherit"

// const elt = createElement(StackPanel, { itemsAlignH: "stretch", x: 1 }, createElement("div", {}))
// const elt1 = createElement(StackPanel, { itemsAlignHX: "stretch" }, createElement("div", {}))
// const x = <div />
// const y = <StackPanel />