/* eslint-disable @typescript-eslint/no-unused-vars */

import { createElement } from '../core'
import { Component, HtmlProps, PanelProps, CSSProperties } from '../types'
export type GridPanelProps = PanelProps & HtmlProps & {
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

	try {
		const {
			orientation,
			itemsAlignH,
			itemsAlignV,
			children,
			style,
			...htmlProps
		} = props

		return <div
			{...htmlProps}

			style={{
				display: "grid",
				...style,
				flexDirection: orientation === "vertical" ? "column" : "row",
				justifyContent: justifyContent(),
				alignItems: alignItems()
			}}>

			{children}

		</div>
	}
	catch (e) {
		console.error(`GridPanel render: ${e}`)
		throw e
	}
}

GridPanel.isPure = true

