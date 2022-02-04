/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { deepMerge } from '@agyemanjp/standard'
import { createElement } from '../core'
import { colorLuminance } from './utils'
import { Component, PanelProps, HtmlProps, IconProps, ButtonHTMLAttributes } from '../types'
import { HoverBox } from './hover-box'

export type CommandBoxProps = Partial<HtmlProps & ButtonHTMLAttributes<any>> & {
	color?: string
	icon?: Component<IconProps>
	iconPlacement?: "before" | "after"
	orientation?: PanelProps["orientation"]
	hoverEffect?: "darken" | "invert"
}

export const CommandBox: Component<CommandBoxProps> = function (props) {
	const defaultProps = {
		color: "black",
		orientation: "horizontal" as const,
		iconPlacement: "before" as const,
		hoverEffect: "invert" as const,
		style: {
			overflow: "hidden",
			padding: "0",
			margin: "0.5em",
			borderRadius: "0.2em",
			backgroundColor: "transparent",
			cursor: "pointer"
		}
	}
	const {
		color,
		children,
		style,
		...htmlProps
	} = deepMerge(defaultProps, props)


	return <HoverBox hoverStyle={{ backgroundColor: colorLuminance((color), -0.1) }}>
		<button {...htmlProps} style={{ color, border: `thin solid ${color}`, ...style }}>
			{children}
		</button>
	</HoverBox>
}


CommandBox.isPure = true

