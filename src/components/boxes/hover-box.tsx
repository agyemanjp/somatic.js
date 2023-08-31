import { createId } from "@paralleldrive/cuid2"
import { mergeDeep } from "@agyemanjp/standard"
import { createElement } from "../../core"
import { normalizeChildren } from "../../element"
import { stringifyStyle } from "../../html"
import { CSSProperties, Component, HtmlProps } from "../../types"

export function HoverBox(deps: { _createId?: typeof createId, _mergeDeep?: typeof mergeDeep }) {
	const comp: Component<HoverBoxProps> = (props) => {
		const defaultProps = {
			style: {
				display: "inline-block",
				padding: 0,
				margin: 0
			} as CSSProperties,
			hoverStyle: {},
		}
		const { id, children, hoverStyle, style, ...htmlProps } = (deps._mergeDeep ?? mergeDeep)()(defaultProps, props)

		const className__ = `${id ?? (deps._createId ?? createId)()}_class_name`

		const { } = mergeDeep()(defaultProps, props)
		const child = normalizeChildren(children)[0]

		const styleContent = `.${className__}:hover {${stringifyStyle({ ...hoverStyle }, true)}}`
		// console.log(`style content: ${styleContent}`)

		return <div style={{ ...style }} className={className__} {...htmlProps}>
			<style>{styleContent}</style>
			{child}
		</div>
	}

	comp.isPure = true
	return comp
}

export type HoverBoxProps = HtmlProps & {
	hoverStyle?: CSSProperties
}