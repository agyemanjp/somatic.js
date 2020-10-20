/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, mergeProps } from '../../core'
import { StyleProps, CSSProperties, Component, Icon } from '../../types'

export type Props = StyleProps & {
	isChecked: boolean,
	checkedColor?: string,

	isDisabled: boolean,
	disabledStyle?: CSSProperties,

	iconSize?: string,
	icons: {
		checked: Icon,
		unchecked: Icon
	}
}

const defaultProps = {
	isChecked: false,
	isDisabled: false,
	disabledStyle: { color: "#ebebe0" },
	checkedColor: "#d477b0",
	postMsgAsync: async () => { }
}

export const CheckBoxInput: Component<Props> = async (props) => {
	const {
		isDisabled,
		disabledStyle,
		isChecked,
		style,
		checkedColor,
		icons,
		iconSize,
		postMsgAsync,
		children
	} = mergeProps(defaultProps, props) //as PropsExtended<Props>

	const checkBoxStyle = isDisabled ? { ...style, ...disabledStyle } : { ...style }

	return <div
		style={{ ...checkBoxStyle }}
		onClick={e => { if (!isDisabled) postMsgAsync({ type: "ON_CLICK" }) }}>

		{isChecked
			? <icons.checked key="checked-icon" style={{ color: isDisabled ? disabledStyle?.color : checkedColor, height: iconSize }} />
			: <icons.unchecked key="unchecked-icon" style={{ height: iconSize }} />
		}
	</div>
}