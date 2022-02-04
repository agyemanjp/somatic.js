/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as cuid from 'cuid'
import { deepMerge, first } from '@agyemanjp/standard'
import { createElement } from '../core'
import { stringifyStyle } from '../html'
import { getChildren, normalizeChildren, isEltProper } from '../element'
import { Component, CSSProperties, HtmlProps } from '../types'

export type HoverBoxProps = HtmlProps & {
	hoverStyle?: CSSProperties
}

export const HoverBox: Component<HoverBoxProps> = (props) => {
	const {
		children,
		hoverStyle,
		style,
		...htmlProps
	} = props

	const className__ = cuid()

	// eslint-disable-next-line fp/no-let
	let child = normalizeChildren(children)[0]
	if (isEltProper(child)) {
		child = {
			...child,
			props: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				...child.props,
				className: className__,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				style: child.props?.style ?? {},
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onMouseEnter: (e: unknown) => {
					// if (postMsgAsync)
					// 	postMsgAsync({ type: "HOVER_START" })
				},
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
				onMouseLeave: (e: any) => {
					// if (postMsgAsync)
					// 	postMsgAsync({ type: "HOVER_STOP" })
				}
			}
		}
	}
	else {
		child = <div {...htmlProps} className={className__}>{child}</div>
	}

	return <div style={{ display: "inline" }}>
		<style>
			{`
				.${className__} {
					${stringifyStyle({ ...style }, true)}
				}
				.${className__}:hover {
					${stringifyStyle({ ...hoverStyle }, true)}
				}					
				input[type="text"].${className__} {
					${stringifyStyle({ backgroundColor: "#fff", }, true)}
				}
			`}
		</style>

		{child}
	</div>
}

HoverBox.isPure = true
HoverBox.defaultProps = {
	style: {
		height: "auto",
		width: "auto",
		padding: 0,
		margin: 0
	} as CSSProperties,
	hoverStyle: {}
}

