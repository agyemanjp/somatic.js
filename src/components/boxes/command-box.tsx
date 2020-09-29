/* eslint-disable @typescript-eslint/no-unused-vars */

import { createElement } from '../../core'
import { mergeProps } from '../../utils'
import { Component, Props as SomaticProps, Orientation, Alignment, CSSProperties } from '../../types'
import { StackPanel } from '../panels/stack-panel'

export const enum BtnMode { Normal = "normal", Selected = "selected", Disabled = "disabled" }

type Props = SomaticProps.Themed & {
	/** Icon component to be placed next to the title of the button */
	icon?: Component<{ style: CSSProperties }>

	/** Relative postion of the icon in relationship with the title */
	iconPlacement?: "before" | "after"

	/** Icon style */
	iconStyle?: CSSProperties

	/** Style of the component */
	style?: CSSProperties

	/** Orientation for the container of the children */
	orientation?: Orientation

	/** Tooltip title to display */
	tooltip?: string

	/** how colors should change on hover (or selection) */
	hoverEffect?: "darken" | "invert"

	/** normal disabled or selected */
	mode?: BtnMode
}

interface Messages {
	clicked: { type: "CLICKED", data?: undefined }
}

const defaultProps = {
	orientation: Orientation.horizontal,
	tooltip: "",
	hoverEffect: "invert" as const,
	style: {
		fontSize: "1em",
		color: "#666",
		borderColor: "#666",
		borderWidth: "1px",
		borderStyle: "solid",
		padding: "0.25em",
		overflow: "hidden",
		borderRadius: "2px",
		cursor: "pointer"
	},

	iconStyle: { padding: 0 },
	iconPlacement: "before" as const,

	mode: BtnMode.Normal
}

export const CommandBox: Component<Props, Messages[keyof Messages]> = async (props) => {
	const {
		tooltip, children,
		orientation, iconPlacement, iconStyle, icon,
		theme, mode, style, hoverEffect,
		postMsgAsync,
		...htmlProps
	} = mergeProps(defaultProps, props)

	const iconContent = props.icon ? <props.icon style={iconStyle || {}} /> : <div />
	const mainContent = (
		<StackPanel orientation={orientation} itemsAlignV={Alignment.center} style={{ height: "100%" }}>
			{children}
		</StackPanel>
	)
	const colors = {
		[BtnMode.Normal]: {
			foreground: theme.colors.primary.dark,
			background: "transparent"
		},
		[BtnMode.Selected]: {
			foreground: "white",
			background: theme.colors.primary.dark
		},
		[BtnMode.Disabled]: {
			foreground: theme.colors.grayish,
			background: "transparent"
		}
	}[mode]

	return <button
		title={tooltip || defaultProps.tooltip}
		onClick={(e) => {
			if (props.postMsgAsync) {
				props.postMsgAsync({ type: "CLICKED" })
			}
		}}
		{...htmlProps}
		style={{
			...props.theme === undefined
				? {}
				: {
					color: colors.foreground,
					backgroundColor: colors.background,
					borderColor: colors.foreground
				},

			...defaultProps.style,
			...style
		}}>
		<StackPanel
			itemsAlignV={Alignment.center}
			orientation={orientation}>
			{iconPlacement === "before" ? [iconContent, mainContent] : [mainContent, iconContent]}
		</StackPanel>
	</button>
}