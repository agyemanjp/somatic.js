/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createElement, mergeProps } from '../../core'
import { Component, HtmlProps, PanelProps, ButtonHTMLAttributes, CSSProperties } from '../../types'
import { StackPanel } from '../panels/stack-panel'

export const enum BtnMode { Normal = "normal", Selected = "selected", Disabled = "disabled" }

type Props = HtmlProps & ButtonHTMLAttributes<any> & {
	/** Icon component to be placed next to the title of the button */
	icon?: Component<{ style: CSSProperties }>

	/** Relative postion of the icon in relationship with the title */
	iconPlacement?: "before" | "after"

	/** Icon style */
	iconStyle?: CSSProperties

	/** Style of the component */
	style?: CSSProperties

	/** Orientation for the container of the children */
	orientation?: PanelProps["orientation"]

	/** Tooltip title to display */
	tooltip?: string

	/** how colors should change on hover (or selection) */
	hoverEffect?: "darken" | "invert"

	/** normal disabled or selected */
	mode?: BtnMode
}
interface Messages { type: "CLICKED" }

const defaultProps = {
	orientation: "horizontal" as const,
	tooltip: "",
	hoverEffect: "invert" as const,

	style: {
		fontSize: "1em",
		color: "#666",
		borderColor: "#666",
		borderWidth: "1px",
		borderStyle: "solid",
		padding: "0",
		margin: "0",
		overflow: "hidden",
		borderRadius: "2px",
		cursor: "pointer"
	},

	iconStyle: { padding: 0 },
	iconPlacement: "before" as const,

	mode: BtnMode.Normal
}

export const CommandBox: Component<Props, Messages> = async (props) => {
	const {
		tooltip,
		orientation,
		iconPlacement, iconStyle, icon,
		style, hoverEffect,
		mode,
		postMsgAsync,
		children,
		...htmlProps
	} = mergeProps(defaultProps, props)

	const iconContent = props.icon ? <props.icon key="icon-content" style={iconStyle || {}} /> : <div />
	const mainContent = <StackPanel key="main-content"
		orientation={orientation}
		itemsAlignV={"center"}
		style={{ height: "100%" }}>
		{children}
	</StackPanel>

	return <button
		title={tooltip}
		onClick={(e) => { if (postMsgAsync) { postMsgAsync({ type: "CLICKED" }) } }}
		{...htmlProps}
		style={{
			...htmlProps.disabled !== undefined
				? { color: 'gray', borderColor: `gray` }
				: {},

			...defaultProps.style,
			...style
		}}>

		<StackPanel key="container"
			itemsAlignV={"center"}
			orientation={orientation}>
			{iconPlacement === "before" ? [iconContent, mainContent] : [mainContent, iconContent]}
		</StackPanel>
	</button>
}