/* eslint-disable @typescript-eslint/no-unused-vars */
import { Obj } from "@sparkwave/standard"
import { createElement } from '../../core'
import { PropsExtended, CSSProperties, Component, Icon } from '../../types'
// import * as Icons from "./icons"

interface Props {
	style?: CSSProperties,
	isChecked: boolean,
	disabled: boolean,
	disabledStyle?: CSSProperties,
	checkedColor?: string,
	useRadio: boolean,
	iconSize?: string,
	icons: { CheckedBox: Icon, UnCheckedBox: Icon, CheckedRadioButton: Icon, UnCheckedRadioButton: Icon }
}

const defaultProps = {
	isChecked: false,
	disabled: false,
	useRadio: false,
	disabledStyle: { color: "#ebebe0" },
	checkedColor: "#d477b0"
}

export const CheckBoxInput: Component<Props> = async (props) => {
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
				? <icons.CheckedBox style={{
					color: _props.disabled ? _props.disabledStyle?.color : _props.checkedColor,
					height: _props.iconSize
				}} />
				: <icons.UnCheckedBox style={{
					height: _props.iconSize
				}} />
			: _props.isChecked
				? <icons.CheckedRadioButton style={{
					color: _props.disabled ? _props.disabledStyle?.color : _props.checkedColor,
					height: _props.iconSize
				}} />
				: <props.icons.UnCheckedRadioButton style={{
					height: _props.iconSize
				}} />
		}
	</div>
}