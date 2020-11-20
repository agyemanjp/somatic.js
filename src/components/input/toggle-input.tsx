/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createElement, mergeProps, getSimpleStateCache } from '../../core'
import { Component, StyleProps, Icon, } from '../../types'
import { makeIcon } from '../utils'

type Messages = ({ type: "TOGGLE", data: { toggleState: "on" | "off" } })

export type Props = StyleProps & { toggleState?: "on" | "off", icons?: { on: Icon, off: Icon } }
export type State = { toggleState: "on" | "off" }

const getDefaultProps = () => Object.freeze({
	toggleState: "off" as NonNullable<Props["toggleState"]>,

	icons: {
		on: makeIcon(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645C13.6583 6.95118 13.3417 6.95118 13.1464 7.14645L8.5 11.7929L6.85355 10.1464C6.65829 9.95118 6.34171 9.95118 6.14645 10.1464C5.95118 10.3417 5.95118 10.6583 6.14645 10.8536L8.14645 12.8536C8.34171 13.0488 8.65829 13.0488 8.85355 12.8536L13.8536 7.85355Z" fill="#212121" />
			<path d="M5.68182 3C4.20069 3 3 4.20069 3 5.68182V14.3182C3 15.7993 4.20069 17 5.68182 17H14.3182C15.7993 17 17 15.7993 17 14.3182V5.68182C17 4.20069 15.7993 3 14.3182 3H5.68182ZM4 5.68182C4 4.75298 4.75298 4 5.68182 4H14.3182C15.247 4 16 4.75298 16 5.68182V14.3182C16 15.247 15.247 16 14.3182 16H5.68182C4.75298 16 4 15.247 4 14.3182V5.68182Z" fill="#212121" />
		</svg>),
		off: makeIcon(
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5ZM5 4C4.44772 4 4 4.44772 4 5V15C4 15.5523 4.44772 16 5 16H15C15.5523 16 16 15.5523 16 15V5C16 4.44772 15.5523 4 15 4H5Z" fill="#212121" />
			</svg>
		)
	} as NonNullable<Props["icons"]>,

	postMsgAsync: async () => { }
} as const)

const getDefaultState = (props: Props) => Object.freeze({ toggleState: props.toggleState })

export const ToggleInput: Component<Props, Messages, State> = async (props) => {
	const { style, icons, postMsgAsync, children } = mergeProps(getDefaultProps(), props)
	const stateCache = getSimpleStateCache(props, getDefaultState(props))
	const { toggleState } = await stateCache.getAsync()

	return <div
		style={{ ...style }}
		onClick={e => {
			const newToggleState = toggleState === "off" ? "on" : "off"
			stateCache.setAsync({ toggleState: newToggleState })
			postMsgAsync({ type: "TOGGLE", data: { toggleState: newToggleState } })
		}}>

		{toggleState === "on" ? <icons.on key="on" /> : <icons.off key="off" />}
	</div>
}