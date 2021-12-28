import { Component, HTMLAttributes, CSSProperties } from "../core/types"

export type HtmlProps = Partial<HTMLAttributes<HTMLElement>>
export type StyleProps = { style?: CSSProperties }
export type PanelProps = Partial<{
	itemsAlignH: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	itemsAlignV: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	orientation: "vertical" | "horizontal"
}>

export type IconProps = Partial<{
	color: string | null | undefined;
	size: string | number;
	style: CSSProperties
}>