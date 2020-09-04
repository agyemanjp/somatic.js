/* eslint-disable fp/no-rest-parameters */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { createElement } from '../../core'
import { Component, Props, Alignment } from '../../types'
import { StackPanel } from "../panels/stack-panel"

export interface Props extends Props.Html { }

type Messages = { type: "modal-closure" }
export const ModalBox: Component<Props, Messages> = (props) => {

	const { children, postMsgAsync, style, ...htmlProps } = props || {}

	return <StackPanel /* backdrop */
		{...htmlProps}
		style={{
			...style,
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50,
			zIndex: 10
		}}
		itemsAlignH={Alignment.center}
		itemsAlignV={Alignment.center}>

		{children}

	</StackPanel>

}