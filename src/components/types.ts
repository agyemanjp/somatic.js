import { Component, HTMLAttributes, CSSProperties } from "../core/types"

export type HtmlProps = Partial<HTMLAttributes<HTMLElement>>
export type StyleProps = { style?: CSSProperties }
export type PanelProps = Partial<{
	itemsAlignH: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	itemsAlignV: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	orientation: "vertical" | "horizontal"
}>
export type ViewProps<TData = unknown> = {
	sourceData: Iterable<TData>
	itemTemplate?: Component<{ item: TData, index: number }>
	itemStyle?: CSSProperties
}
export type IconProps = Partial<{
	color: string | null | undefined;
	size: string | number;
	style: CSSProperties
}>