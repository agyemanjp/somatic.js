import { createId } from "@paralleldrive/cuid2"
import { mergeDeep } from "@agyemanjp/standard"
import { createElement } from "../../core"
import { normalizeChildren } from "../../element"
import { stringifyStyle } from "../../html"
import { CSSProperties, Component, HtmlProps } from "../../types"

export const HoverBox: Component<HoverBoxProps> = function (props) {
	const defaultProps = {
		style: {
			display: "inline-block",
			padding: 0,
			margin: 0
		} as CSSProperties,
		hoverStyle: {},
		id: createId()
	}

	const className__ = createId()

	const { key, id, children, hoverStyle, style, ...htmlProps } = mergeDeep()(defaultProps, props)
	const child = normalizeChildren(children)[0]

	const styleContent = `.${className__}:hover {${stringifyStyle({ ...hoverStyle }, true)}}`
	// console.log(`style content: ${styleContent}`)

	return <div id={id} style={{ ...style }} className={className__} {...htmlProps}>
		<style>{styleContent}</style>
		{child}
	</div>
}
HoverBox.isPure = true

export type HoverBoxProps = HtmlProps & {
	hoverStyle?: CSSProperties
}