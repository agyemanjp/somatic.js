/* eslint-disable @typescript-eslint/no-unused-vars */
import { map, first, last } from "@sparkwave/standard/collections"
import { createElement, mergeProps } from '../../core'
import { AlertType, Alert } from '../misc/alert'
import { Component, HtmlProps, CSSProperties, Icon } from '../../types'
import { StackPanel } from '../panels/stack-panel'
import { HoverBox } from '../boxes/hover-box'
import { CommandBox } from '../boxes/command-box'

export type ButtonInfo = { label: string, icon?: Icon, action: () => void, placement?: "before" | "after", style?: CSSProperties }

export type Props = HtmlProps & {
	/** Type of the Dialog, using the Alert component types: "warning" | "info" | "error" | "form"  */
	type?: AlertType

	/** Title to display on the header of the dialog */
	title: string

	/** Style of the header that contains the title */
	headerStyle?: CSSProperties

	/** Array of buttons that comes right after the content */
	buttons?: Iterable<ButtonInfo>
}

const defaultProps = {
	headerStyle: { padding: "0.5em 1em" } as Props["headerStyle"],
	type: "info" as const,
	buttons: [] as ButtonInfo[]
}

export const DialogBox: Component<Props> = async (props) => {
	const { buttons, type, headerStyle, style, title, postMsgAsync } = mergeProps(defaultProps, props)

	const getContent = () => {
		switch (typeof (props.children)) {
			case "undefined":
				return <p>""</p>
			case "string":
				return <div>{(props.children as string).split("\n").map((item, i) => {
					return <p>{item}</p>
				})}</div>
			case "object":
			default:
				return props.children
		}
	}
	try {
		const newContent = <StackPanel
			orientation={"vertical"}
			style={{ height: "100%", width: "100%", padding: "1em" }}
			itemsAlignH={"center"}
			itemsAlignV={"center"}>

			{getContent()}

			<StackPanel
				orientation={"horizontal"}
				style={{ marginTop: "1rem" }}>
				{[
					...map(buttons, (buttonInfo, index) => {
						const button = buttonInfo
						const isFirstButton = button === first(buttons)
						const isLastButton = button === last(buttons)

						return <HoverBox
							// theme={theme}
							style={{
								flex: "0 1 120px",
								display: "flex",
								justifyContent: "center",
								marginLeft: "0.5em",
								padding: "0.5rem"
							}}>
							<CommandBox
								// theme={theme}
								iconPlacement={button.placement}
								icon={button.icon}
								iconStyle={{
									left: "0",
									position: "relative",
									height: "1.25rem",
									marginTop: "0",
									marginBottom: "0",
									marginRight: "0.25rem",
									marginLeft: 0
								}}
								style={{
									fontWeight: isLastButton ? "bold" : "normal",
									fontVariant: "all-small-caps",
									...buttonInfo.style
								}}
								postMsgAsync={async () => button.action()}>
								<div
									style={{
										position: "relative",
										height: "auto"
									}}>
									{button.label}
								</div>

							</CommandBox>
						</HoverBox>
					})
				]}
			</StackPanel>
		</StackPanel>

		return <Alert
			style={style}
			headerStyle={headerStyle}
			type={type}
			title={title}>
			{newContent}
		</Alert>
	}
	catch (e) {
		console.error(`DialogPanel render: ${e}`)
		throw e
	}
}
