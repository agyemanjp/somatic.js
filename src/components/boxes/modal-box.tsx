/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { Component, HtmlProps } from '../../types'
import { StackPanel } from "../panels/stack-panel"
import { idProvider } from '../../utils'
import { mergeProps } from '../../core'


type Props = HtmlProps & {
	/** If enabled will trigger a modal closure event in case the escape keyboard is pressed*/
	closeOnEscape?: boolean,

	/** If enabled, will trigger a modal closure event if its clicked outside the content */
	closeOnClickOutside?: boolean
}

const defaultProps = {
	closeOnEscape: true,
	closeOnClickOutside: true
}

type Messages = { type: "CLOSURE" }

export const ModalBox: Component<Props, Messages> = (props) => {
	const { postMsgAsync, style, children, closeOnEscape, closeOnClickOutside, ...htmlProps } = mergeProps(defaultProps, props)
	const id = idProvider.next()

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.keyCode === 27) {
			if (postMsgAsync)
				postMsgAsync({
					type: "CLOSURE"
				})
		}
	}

	const handleOutsideClick = (e: MouseEvent) => {
		const clickOnBackground = (e.target as Element).matches(`#${id}`)

		if (clickOnBackground) {
			if (postMsgAsync) {
				postMsgAsync({
					type: "CLOSURE"
				})
			}
		}
	}

	if (closeOnEscape === true) {
		window.addEventListener('keyup', handleKeyUp, false)
	}

	if (closeOnClickOutside === true) {
		window.addEventListener('click', handleOutsideClick, false)
	}

	return <StackPanel /* backdrop */
		{...htmlProps}
		id={id}
		style={{
			...style,
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			zIndex: 10
		}}
		itemsAlignH={"center"}
		itemsAlignV={"center"}>

		{children}

	</StackPanel>

}