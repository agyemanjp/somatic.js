/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../core'
import { Component, PanelProps, HtmlProps, CSSLength } from '../types'

export type StackPanelProps = PanelProps & HtmlProps & {

}

export const StackPanel: Component<StackPanelProps> = function (props) {
	const {
		key,
		orientation,
		itemsAlignH,
		itemsAlignV,
		children,
		style,
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
			default:
				return "initial"
		}
	}

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


// const elt = createElement(StackPanel, { itemsAlignH: "stretch", x: 1 }, createElement("div", {}))
// const elt1 = createElement(StackPanel, { itemsAlignHX: "stretch" }, createElement("div", {}))

// const x = <div />

// const y = <StackPanel />