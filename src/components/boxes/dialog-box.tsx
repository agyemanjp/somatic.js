/* eslint-disable @typescript-eslint/no-unused-vars */
import { map, first, last } from "@sparkwave/standard/collections"
import { createElement, mergeProps } from '../../core'
import { Component, StyleProps, CSSProperties, Icon } from '../../types'
import { StackPanel } from '../panels/stack-panel'
import { HoverBox } from '../boxes/hover-box'
import { CommandBox } from '../boxes/command-box'

export type ButtonInfo = {
	label: string,
	icon?: Icon,
	action: () => void
}

export type Props = StyleProps & {
	header?: { title: string, icon?: Icon } | JSX.Element
	buttons?: Iterable<ButtonInfo>
	buttonTemplate?: (info: ButtonInfo) => JSX.Element
}

const defaultProps = {
	header: { title: "" },
	buttons: [] as Iterable<ButtonInfo>
}

export const DialogBox: Component<Props> = async (props) => {
	const { buttons, style, header, buttonTemplate } = mergeProps(defaultProps, props)

	const mainContent = () => {
		switch (typeof (props.children)) {
			case "undefined":
				return <p>""</p>

			case "string":
				return <div>
					{(props.children as string).split("\n").map((item, i) => {
						return <p>{item}</p>
					})}
				</div>

			case "object":
			default:
				return props.children
		}
	}

	try {
		return <div
			style={{
				border: "thin solid ",
				// textAlign: "center",
				margin: "auto",

				borderRadius: "0.15rem",
				background: `white`,
				color: `black`,
				...style,
				maxWidth: "100%"
			}}>

			<StackPanel
				orientation={"vertical"}
				style={{ height: "100%", width: "100%", padding: "1em", overflow: "hidden" }}>

				{"title" in header
					? <div /* header */
						style={{
							fontSize: "1.75em",
							fontWeight: 700,
							padding: "0 1rem 2px",
							fontVariant: "all-small-caps",
						}}>

						{"icon" in header && header.icon
							? <header.icon style={{ height: "1em", position: "relative", top: "3px" }} />
							: undefined
						}
						<span> {header.title} </span>
					</div>

					: header
				}

				{mainContent()}

				<StackPanel /* toolbar */
					orientation={"horizontal"}
					itemsAlignH={"center"}
					style={{ marginTop: "1rem", width: "100%" }}>
					{[
						map(buttons, buttonTemplate
							? buttonTemplate
							: (buttonInfo, index) => {
								const button = buttonInfo
								const isFirstButton = button === first(buttons)
								const isLastButton = button === last(buttons)

								return <HoverBox
									style={{
										flex: "0 1 120px",
										display: "flex",
										justifyContent: "center",
										marginLeft: "0.5em",
										padding: "0.5rem"
									}}>
									<CommandBox
										iconPlacement={"before"}
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
										}}
										postMsgAsync={async () => button.action()}>

										<div style={{ position: "relative", height: "auto" }}>
											{button.label}
										</div>

									</CommandBox>
								</HoverBox>
							})
					]}
				</StackPanel>

			</StackPanel>
		</div>
	}
	catch (e) {
		console.error(`DialogBox render\n${e}`)
		throw e
	}
}
