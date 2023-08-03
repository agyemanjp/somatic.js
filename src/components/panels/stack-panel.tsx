import { createElement } from "../../core"
import { PanelProps, HtmlProps, Component } from "../../types"


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

	return <div
		id={id} {...htmlProps}
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