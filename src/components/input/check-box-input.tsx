/* eslint-disable @typescript-eslint/no-unused-vars */
import { Obj } from "@agyemanjp/standard"
import { createElement } from '../../core'
import { PropsExtended, CSSProperties, Renderer } from '../../types'
// import * as Icons from "./icons"

interface Props {
	style?: CSSProperties,
	isChecked: boolean,
	disabled: boolean,
	disabledStyle?: CSSProperties,
	checkedColor?: string,
	useRadio: boolean,
	iconSize?: string,
	icons: Obj<string, () => JSX.Element>
}

const defaultProps = {
	isChecked: false,
	disabled: false,
	useRadio: false,
	disabledStyle: { color: "#ebebe0" },
	checkedColor: "#d477b0"
}

export const CheckBoxInput: Renderer<Props> = (props) => {
	const _props = { ...defaultProps, ...props || {} } as PropsExtended<Props>
	const icons = _props.icons

	const checkBoxStyle = _props.disabled
		? { ..._props.style, ..._props.disabledStyle }
		: { ..._props.style }

	return <div style={{ ...checkBoxStyle }}
		onClick={e => {
			if (!_props.disabled && _props.postMsgAsync)
				_props.postMsgAsync({ type: "ON_CLICK" })
		}}>

		{!_props.useRadio
			? _props.isChecked
				? <icons.CheckedBox color={_props.disabled ? _props.disabledStyle?.color : _props.checkedColor} size={_props.iconSize} />
				: <icons.UnCheckedBox size={_props.iconSize} />
			: _props.isChecked
				? <icons.CheckedRadioButton color={_props.disabled ? _props.disabledStyle?.color : _props.checkedColor} size={_props.iconSize} />
				: <props.icons.UnCheckedRadioButton size={_props.iconSize} />
		}
	</div>
}