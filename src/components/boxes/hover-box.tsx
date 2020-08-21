/* eslint-disable fp/no-rest-parameters */
/* eslint-disable brace-style */
import cuid from "cuid"
import { first } from "@agyemanjp/standard/collections/iterable"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, propsToCSS } from "../../core"
import { Component, Props, CSSProperties } from '../../types'
import { mergeProps } from '../../utils'

type Messages = { type: "hover-start" } | { type: "hover-stop" }

type Props = Props.Html & Props.Themed & {
	hoverStyle?: CSSProperties
}

export const HoverBox: Component<Props, Messages> = async (props) => {
	const defaultProps = Object.freeze({
		style: {
			overflow: "hidden",
			height: "auto",
			width: "auto",
			padding: 0,
			margin: 0
		} as CSSProperties,
		hoverStyle: {}
	})

	const { children, theme, postMsgAsync, hoverStyle, style, ...htmlProps } = mergeProps(defaultProps, props) //as PropsExtended<Props>

	const className__ = cuid()
	// eslint-disable-next-line fp/no-let
	let child = children ? await first(children) : undefined
	if (typeof child === "object") {
		// eslint-disable-next-line fp/no-mutation
		child = {
			...child,
			props: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				...child.props as any,
				className: className__,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				style: (child.props as any)?.style || {},
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onMouseEnter: (e: unknown) => { if (postMsgAsync) postMsgAsync({ type: "hover-start" }) },
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
				onMouseLeave: (e: any) => { if (postMsgAsync) postMsgAsync({ type: "hover-stop" }) }
			}
		}
	}
	else {
		// eslint-disable-next-line fp/no-mutation
		child = await (<div {...htmlProps} className={className__}>{child}</div>)
	}

	const html = `
		.${className__} {${propsToCSS({ ...style }, true)}

		}
        .${className__}:hover {${propsToCSS({
		color: theme.colors.primary.light,
		...defaultProps.hoverStyle,
		...hoverStyle
	}, true)}}
                
        input[type="text"].${className__} {${propsToCSS({
		backgroundColor: "#fff",
	}, true)}}
    `

	return <div style={{ display: "inline" }}>
		<style>{html}</style>
		{child}
	</div>
}