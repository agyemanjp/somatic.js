/* eslint-disable fp/no-rest-parameters */
/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, stringifyStyle } from "../../core"
import { first } from "@sparkwave/standard/collections/iterable"
import { Component, HtmlProps, CSSProperties } from '../../types'
import { mergeProps } from '../../core'
import { idProvider } from '../../utils'

// type Messages = { type: "HOVER_START" } | { type: "HOVER_STOP" }

type Props = HtmlProps & {
	hoverStyle?: CSSProperties
}

export const HoverBox: Component<Props> = async (props) => {
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
		postMsgAsync,
		hoverStyle,
		style,
		...htmlProps
	} = mergeProps(defaultProps, props) //as PropsExtended<Props>

	const className__ = idProvider.next()
	// eslint-disable-next-line fp/no-let
	let child = children ? await first(children) : undefined
	if (child && "props" in child) {
		// eslint-disable-next-line fp/no-mutation
		child = {
			...child,
			props: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				...child.props,
				className: className__,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				style: child.props?.style ?? {},
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


	return <div style={{ display: "inline" }}>
		<style>
			{`
				.${className__} {
					${stringifyStyle({ ...style }, true)}
				}
				.${className__}:hover {
					${stringifyStyle({ color: 'black', ...hoverStyle }, true)}
				}					
				input[type="text"].${className__} {
					${stringifyStyle({ backgroundColor: "#fff", }, true)}
				}
			`}
		</style>

		{child}
	</div>
}
