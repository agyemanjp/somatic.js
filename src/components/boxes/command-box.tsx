/* eslint-disable fp/no-rest-parameters */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Obj } from "@agyemanjp/standard/utility"
import { createElement } from '../../core'
import { mergeProps, config } from '../../utils'
import { Component, Props, Orientation, Alignment, Icon, CSSProperties } from '../../types'
import { StackPanel, Props as StackPanelProps } from '../panels/stack-panel'

export const enum BtnMode { Normal = "normal", Selected = "selected", Disabled = "disabled" }


type Props = {
	icon?: Icon
	iconPlacement?: "before" | "after"
	iconStyle?: CSSProperties
	orientation?: Orientation
	tooltip?: string

	/** how colors should change on hover (or selection) */
	hoverEffect?: "darken" | "invert"
	mode?: BtnMode
}
type Messages = { type: "click", data?: undefined }

export const CommandBox: Component<Props & Props.Html & Props.Themed, Messages> = (props) => {
	const defaultProps = Object.freeze({
		orientation: Orientation.horizontal,
		tooltip: "",
		hoverEffect: "invert" as Props["hoverEffect"],
		style: {
			fontSize: "1em",
			borderColor: "rgba(0,0,0,0.1)",
			borderWidth: "1px",
			borderStyle: "solid",
			padding: "0.25em",
			overflow: "hidden"
		},

		iconStyle: { padding: 0 },
		iconPlacement: "before" as Props["iconPlacement"],

		mode: BtnMode.Normal,

		theme: config.theme,
		icon: undefined
	} as const)

	const {
		tooltip,
		children,
		orientation,
		iconPlacement,
		iconStyle,
		icon,
		theme,
		mode,
		style,
		hoverEffect,
		postMsgAsync,
		...htmlProps
	} = mergeProps(defaultProps, props)

	const iconContent = props && props.icon ? <props.icon style={iconStyle} /> : undefined

	const mainContent = (
		<StackPanel orientation={orientation} itemsAlignV={Alignment.center} style={{ height: "100%" }}>
			{children}
		</StackPanel>
	)


	// eslint-disable-next-line fp/no-let, prefer-const
	let colors: { foreground?: string, background?: string } = ({
		[BtnMode.Normal]: {
			foreground: theme?.colors.primary.dark,
			background: "transparent"
		},
		[BtnMode.Selected]: {
			foreground: "white",
			background: theme?.colors.primary.dark
		},
		[BtnMode.Disabled]: {
			foreground: theme?.colors.grayish,
			background: "transparent"
		}
	}[mode])

	return <button
		title={tooltip || defaultProps.tooltip}
		{...htmlProps}
		onClick={() => postMsgAsync?.({ type: "click" })}
		style={{
			...theme === undefined
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
			{iconPlacement === "after" ? [mainContent, iconContent] : [iconContent, mainContent]}
		</StackPanel>

	</button>
}