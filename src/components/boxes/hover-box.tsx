/* eslint-disable fp/no-rest-parameters */
/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, stringifyStyle } from "../../core"
import { first } from "@sparkwave/standard/collections/iterable"
import { Component, Props, CSSProperties } from '../../types'
import { idProvider, mergeProps, config } from '../../utils'

type Messages = { type: "HOVER_START" } | { type: "HOVER_STOP" }

type Props = Props.Html & Props.Themed & { hoverStyle?: CSSProperties }

export const HoverBox: Component<Props, Messages> = async (props) => {
	const defaultProps = Object.freeze({
		style: {
			height: "auto",
			width: "auto",
			padding: 0,
			margin: 0
		} as CSSProperties,
		hoverStyle: {}
	})

	const {
		children,
		theme,
		postMsgAsync,
		hoverStyle,
		style,
		...htmlProps
	} = mergeProps(defaultProps, props) //as PropsExtended<Props>

	const className__ = idProvider.next()
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
				onMouseEnter: (e: unknown) => { if (postMsgAsync) postMsgAsync({ type: "HOVER_START" }) },
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
				onMouseLeave: (e: any) => { if (postMsgAsync) postMsgAsync({ type: "HOVER_STOP" }) }
			}
		}
	}
	else {
		// eslint-disable-next-line fp/no-mutation
		child = await (<div {...htmlProps} className={className__}>{child}</div>)
	}

	const html = `
		.${className__} {${stringifyStyle({ ...style }, true)}

		}
        .${className__}:hover {${stringifyStyle({
		color: config.theme.colors.blackish,
		...defaultProps.hoverStyle,
		...hoverStyle
	}, true)}}
                
        input[type="text"].${className__} {${stringifyStyle({
		backgroundColor: "#fff",
	}, true)}}
    `

	return <div style={{ display: "inline" }}>
		<style>{html}</style>
		{child}
	</div>
}
