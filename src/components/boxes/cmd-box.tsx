import { mergeDeep } from "@agyemanjp/standard"

import { Component, CSSProperties, HtmlProps, ButtonHTMLAttributes, SVGAttributes, PanelProps } from "../../types"
import { createElement } from "../../core"
import { StackPanel } from "../panels"
import { HoverBox } from "./hover-box"

export const CommandBox: Component<CommandBoxProps> = function (props) {
	const defaultProps = {
		orientation: "horizontal" as Required<CommandBoxProps>["orientation"],
		iconPlacement: "before" as Required<CommandBoxProps>["iconPlacement"],
		hoverEffect: "invert" as Required<CommandBoxProps>["hoverEffect"],
		style: {
			overflow: "hidden",
			lineHeight: "1.1em",
			padding: "0.25em",
			// margin: "0.5em",
			marginLeft: "0",
			borderRadius: "0.2em",
			color: "#444444",
			backgroundColor: "white",
			borderWidth: "thin",
			borderStyle: "solid",
			cursor: "pointer"
		} as CSSProperties
	}
	const {
		orientation,
		hoverEffect,
		iconPlacement,
		icon: Icon,
		style,
		color,
		children,
		key,
		...htmlProps
	} = mergeDeep()(defaultProps, props)

	const hoverStyle: CSSProperties = (hoverEffect === "invert"
		? {
			color: style.backgroundColor ?? defaultProps.style.backgroundColor,
			borderColor: style.backgroundColor ?? (style.background as any) ?? defaultProps.style.backgroundColor,
			backgroundColor: style.color ?? defaultProps.style.color,
		}
		: {
			opacity: 1
		}
	)

	// console.warn(`Rendering commmand box; htmlProps = ${JSON.stringify(htmlProps)}`)
	return <HoverBox style={{ opacity: hoverEffect === "darken" ? 0.75 : 1 }} hoverStyle={hoverStyle}>
		<button
			{...htmlProps}
			style={{ borderColor: style.color, ...style }}>

			<StackPanel
				itemsAlignH={"center"}
				itemsAlignV={"center"}
				orientation={orientation}
				style={{ height: "auto" }}>
				{
					Icon ?
						iconPlacement === "before"
							? [<Icon /*style={{ height: "1em" }}*/ />, children]
							: [children, <Icon /*style={{ height: "1em" }}*/ />]
						: children
				}
			</StackPanel>

		</button>
	</HoverBox>
}

export type CommandBoxProps = Partial<HtmlProps & ButtonHTMLAttributes<any>> & {
	// color?: string
	icon?: Component<SVGAttributes<SVGGElement>>
	iconPlacement?: "before" | "after"
	orientation?: PanelProps["orientation"]
	hoverEffect?: "darken" | "invert"
}
CommandBox.isPure = true
