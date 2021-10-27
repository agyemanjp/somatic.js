/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, Component } from '../core/index'
import { PanelProps, HtmlProps } from './types'

export type Props = PanelProps & HtmlProps & {
}


export const StackPanel: Component<Props> = async function* (props) {
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
		orientation,
		itemsAlignH,
		itemsAlignV,
		children,
		style,
		...htmlProps
	} = props

	while (true) {
		yield <div
			{...htmlProps}

			style={{
				display: "flex",
				...style,
				flexDirection: orientation === "vertical" ? "column" : "row",
				justifyContent: justifyContent(),
				alignItems: alignItems()
			}}>

			{children}

		</div>
	}

	// return <div />
}

StackPanel.isPure = true


// const x = <div />

// const y = <StackPanel />