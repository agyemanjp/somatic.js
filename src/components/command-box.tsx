/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createElement, mergeProps, makeComponent, makeComponent1 } from '../core'
import { Component, HtmlProps, PanelProps, ButtonHTMLAttributes, CSSProperties } from '../types'
import { StackPanel } from './stack-panel'

export const enum BtnMode { Normal = "normal", Selected = "selected", Disabled = "disabled" }

type Props = Partial<HtmlProps & ButtonHTMLAttributes<any>> & {
	/** Icon component to be placed next/before the title of the button */
	icon?: JSX.Element

	/** Relative postion of the icon in relationship with the title */
	iconPlacement?: "before" | "after"

	/** Orientation for the container of the children */
	orientation?: PanelProps["orientation"]

	/** how colors should change on hover (or selection) */
	hoverEffect?: "darken" | "invert"

	/** normal disabled or selected */
	mode?: BtnMode
}
// eslint-disable-next-line @typescript-eslint/ban-types
type State = {}

interface Messages { type: "CLICKED" }


export const CommandBox = makeComponent({
	defaultProps: () => ({
		orientation: "horizontal" as const,
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

		iconPlacement: "before" as const,
		mode: BtnMode.Normal,
		postMsgAsync: () => { }
	}),
	defaultState: (props) => ({})
})<Props, Messages, State>(async (_, props, state) => {
	const {
		orientation,
		iconPlacement, icon,
		style, hoverEffect,
		mode,
		postMsgAsync,
		children,
		...htmlProps
	} = props

	const iconContent = props.icon
		? props.icon
		: <div />

	const mainContent = <StackPanel key="main-content"
		orientation={orientation}
		itemsAlignV={"center"}
		style={{ height: "100%" }}>
		{children}
	</StackPanel>

	return <button
		onClick={(e) => { postMsgAsync({ type: "CLICKED" }) }}
		{...htmlProps}
		style={{
			...htmlProps.disabled !== undefined
				? { color: 'gray', borderColor: `gray` }
				: {},

			...style
		}}>

		<StackPanel key="container"
			itemsAlignV={"center"}
			orientation={orientation}>
			{iconPlacement === "before" ? [iconContent, mainContent] : [mainContent, iconContent]}
		</StackPanel>
	</button>
})

