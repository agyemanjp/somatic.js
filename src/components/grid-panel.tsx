/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../core'
import { Component, PanelProps, HtmlProps, CSSLength } from '../types'
import { isArray } from '@agyemanjp/standard/utility'

type RowOrColumnInfo = CSSLength | "none" | "auto" | "max-content" | "min-content" | "initial" | "inherit"

export type GridPanelProps = PanelProps & HtmlProps & {
	rows?: number | RowOrColumnInfo[]
	cols?: number | RowOrColumnInfo[]

	/** Specifies the gap between the grid rows and columns
	 * Either a single CSS length value for both row and column gap
	 * Or two CSS length values specifying the row-gap and column-gap
	 */
	gap?: CSSLength | { row?: CSSLength, column?: CSSLength }
}

export const GridPanel: Component<GridPanelProps> = function (props) {
	const alignItems = () => {
		switch (props.orientation === "vertical" ? (props.itemsAlignH) : (props.itemsAlignV)) {
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
		switch (props.orientation === "vertical" ? (props.itemsAlignV) : (props.itemsAlignH)) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "uniform":
				return "space-between"
			default:
				return "initial"
		}
	}

	const {
		orientation, itemsAlignH, itemsAlignV, children,
		rows, cols, gap,
		style, ...htmlProps
	} = props

	return <div {...htmlProps}
		style={{
			...style,
			gridTemplateRows: isArray(rows) ? rows.join(" ") : (String(rows) ?? "unset"),
			gridTemplateColumns: isArray(cols) ? cols.join(" ") : (String(cols) ?? "unset"),
			...typeof gap === "string" ? { gap } : { rowGap: gap?.row ?? "unset", columnGap: gap?.column ?? "unset" },
			display: "grid",
			flexDirection: orientation === "vertical" ? "column" : "row",
			justifyContent: justifyContent(),
			alignItems: alignItems()
		}}>

		{children}

	</div>


}

GridPanel.isPure = true


// const elt = createElement(StackPanel, { itemsAlignH: "stretch", x: 1 }, createElement("div", {}))
// const elt1 = createElement(StackPanel, { itemsAlignHX: "stretch" }, createElement("div", {}))
// const x = <div />
// const y = <StackPanel />