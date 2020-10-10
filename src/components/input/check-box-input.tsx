/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, mergeProps } from '../../core'
import { ComponentProps, CSSProperties, Component, Icon } from '../../types'

type Props = Partial<ComponentProps.Styled> & {
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
	checkedColor: "#d477b0"
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
		onClick={e => { if (!isDisabled && postMsgAsync) postMsgAsync({ type: "ON_CLICK" }) }}>

		{isChecked
			? <icons.checked style={{ color: isDisabled ? disabledStyle?.color : checkedColor, height: iconSize }} />
			: <icons.unchecked style={{ height: iconSize }} />
		}
	</div>
}