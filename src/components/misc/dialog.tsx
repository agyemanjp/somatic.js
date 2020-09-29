/* eslint-disable @typescript-eslint/no-unused-vars */
import { Array } from "@sparkwave/standard/collections"
import { createElement } from '../../core'
import { mergeProps } from '../../utils'
import { Component, Props, CSSProperties, Icon, Orientation, Alignment } from '../../types'
import { AlertType, Alert } from './alert'
import { StackPanel } from '../panels/stack-panel'
import { HoverBox } from '../boxes/hover-box'
import { CommandBox } from '../boxes/command-box'

type Props = Props.Themed & Props.Html & {
	/** Type of the Dialog, using the Alert component types: "warning" | "info" | "error" | "form"  */
	type?: AlertType

	/** Title to display on the header of the dialog */
	title: string

	/** Style of the header that contains the title */
	headerStyle?: CSSProperties

	/** Array of button that comes right after the content */
	buttons?: Array<{ label: string, icon?: Icon, action: () => void, placement?: "before" | "after" }>
}

const defaultProps = {
	headerStyle: { padding: "0.5em 1em" },
	type: "info" as const,
	buttons: new Array<{ label: string, icon?: Icon, action: () => void, placement?: "before" | "after" }>([])
}

export const Dialog: Component<Props> = (props) => {
	const fullProps = mergeProps(defaultProps, props)
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
			orientation={Orientation.vertical}
			style={{ height: "100%", width: "100%", padding: "1em" }}
			itemsAlignH={Alignment.center}
			itemsAlignV={Alignment.center}>

			{getContent()}

			<StackPanel
				orientation={Orientation.horizontal}
				style={{ marginTop: "1rem" }}>
				{[
					...fullProps.buttons.map((buttonInfo, index) => {
						const button = buttonInfo
						const isFirstButton = button === fullProps.buttons.first()
						const isLastButton = button === fullProps.buttons.last()

						return <HoverBox
							theme={fullProps.theme}
							style={{
								flex: "0 1 120px",
								display: "flex",
								justifyContent: "center",
								marginLeft: "0.5em"
							}}>
							<CommandBox
								theme={fullProps.theme}
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
									padding: "0.5rem",
									fontWeight: isLastButton ? "bold" : "normal",
									fontVariant: "all-small-caps"
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
			style={fullProps.style}
			headerStyle={fullProps.headerStyle}
			type={fullProps.type}
			title={fullProps.title}
			theme={fullProps.theme}>
			{newContent}
		</Alert>
	}
	catch (e) {
		console.error(`DialogPanel render: ${e}`)
		throw e
	}
}
