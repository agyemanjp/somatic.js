/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { deepMerge } from '@agyemanjp/standard'
import { createElement } from '../core'
import { colorLuminance } from '../common'
import { Component, PanelProps, HtmlProps, IconProps, CSSProperties, ButtonHTMLAttributes } from '../types'
import { HoverBox } from './hover-box'

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
			color: "#444444",
			backgroundColor: "white",
			borderWidth: "thin",
			borderStyle: "solid",
			cursor: "pointer"
		}
	}
	const {
		color,
		children,
		icon,
		...htmlProps
	} = { ...defaultProps, ...props }

	const style = { ...defaultProps.style, ...props.style }
	const orientation = props.orientation ?? defaultProps.orientation
	const iconPlacement = props.iconPlacement ?? defaultProps.iconPlacement
	const hoverEffect = props.hoverEffect ?? defaultProps.hoverEffect
	const hoverStyle: CSSProperties = hoverEffect === "invert"
		? {
			color: style.backgroundColor ?? style.background ?? defaultProps.style.backgroundColor,
			borderColor: style.backgroundColor ?? style.background ?? defaultProps.style.backgroundColor,
			backgroundColor: style.color ?? defaultProps.style.color,
		}
		: {
			opacity: 1
		}

	return <HoverBox style={{ opacity: hoverEffect === "darken" ? 0.75 : 1 }} hoverStyle={hoverStyle}>
		<button
			{...htmlProps}
			style={{
				borderColor: style.color,
				...style
			}}>
			{children}
		</button>
	</HoverBox>
}

export type CommandBoxProps = Partial<HtmlProps & ButtonHTMLAttributes<any>> & {
	// color?: string
	icon?: Component<IconProps>
	iconPlacement?: "before" | "after"
	orientation?: PanelProps["orientation"]
	hoverEffect?: "darken" | "invert"
}


CommandBox.isPure = true

