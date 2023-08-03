
import { deepMerge } from "@agyemanjp/standard"
import * as cuid from '@paralleldrive/cuid2'
import { createElement } from "../../core"
import { CSSProperties, Children, Component, HtmlProps, PanelProps } from "../../types"
import { StackPanel } from "./stack-panel"

export type LayersPanelProps = PanelProps & HtmlProps & {
    transparency?: number
}

export const LayersPanel: Component<LayersPanelProps> = function (_props) {
	const defaultProps = {
		id: cuid.createId(),
		transparency: 0.5,
		orientation: 'horizontal',
		style: {
			border: 'thin solid gray',
			overflow: 'hidden',
			position: 'relative'
		}
	} satisfies LayersPanelProps

	const props = deepMerge(defaultProps, _props)

	const {
		id, orientation, transparency, style, children, ...htmlProps
	} = props as Required<LayersPanelProps>

	const elements = children as Children[]

	return (
		<StackPanel id={id} orientation={orientation} style={style} {...htmlProps}>
			{elements.map((element, index) => {
				const elementStyle: CSSProperties = {
					top: "0px",
					left: "0px",
					opacity: transparency,
					position: index === 0 ? 'static' : 'absolute',
				}

				return <div id={index.toString()} style={elementStyle}>{element}</div>
			})}

		</StackPanel>
	)

}