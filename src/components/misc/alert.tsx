/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { Component, CSSProperties, Props, Alignment } from '../../types'
import { StackPanel } from '../panels/stack-panel'

type Messages = { type: "" }
interface Props extends Props.Themed {
	type: "warning" | "info" | "error" | "form",
	content?: string | JSX.Element,
	title?: string,
	style?: CSSProperties,
}

export const Alert: Component<Props, Messages> = (props) => {
	const defaultProps = Object.freeze({
		type: "info" as Props["type"],
		style: {
			border: "thin solid ",
			maxWidth: "35%",
			padding: "1.5em",
			textAlign: "center" as const,
			borderRadius: "0.25em"
		},
		theme: undefined
	})

	const alertStyle = (): CSSProperties => {
		if (props.theme.colors.error !== undefined) {
			switch (props.type) {
				case "info":
					return {
						backgroundColor: props.theme.colors.info,
						color: props.theme.colors.primary.dark
					}
				case "warning":
					return {
						backgroundColor: props.theme.colors.warning,
						color: props.theme.colors.primary.dark
					}
				case "error":
					return {
						backgroundColor: props.theme.colors.error,
						color: props.theme.colors.primary.dark
					}
				case "form":
					return {
						backgroundColor: "transparent",
						color: props.theme.colors.primary.dark
					}
			}
		}

		return {
			backgroundColor: props.theme.colors.whitish,
			borderColor: props.theme.colors.primary.dark,
			color: props.theme.colors.primary.dark
		}

	}
	const alertTitle = (): string => {
		switch (props.type) {
			case "info":
				return "Info!"

			case "warning":
				return "Warning!"

			case "error":
				return "Error!"

			case "form":
				return props.title || "Form"
			default:
				return "Info!"
		}
	}

	// eslint-disable-next-line fp/no-let, init-declarations
	let content: JSX.Element
	switch (typeof (props.content)) {
		case "undefined":
			// eslint-disable-next-line fp/no-mutation
			content = <p>""</p>
			break
		case "string":
			// eslint-disable-next-line fp/no-mutation
			content = <div>{props.content.split("\n").map(item => <p>{item}</p>)}</div>
			break
		case "object":
		default:
			// eslint-disable-next-line fp/no-mutation
			content = props.content as JSX.Element
	}

	return <StackPanel
		style={{ height: "100%", width: "100%" }}
		itemsAlignH={Alignment.center}
		itemsAlignV={Alignment.center}>

		<div style={{ ...defaultProps.style, ...props.style, ...alertStyle() }}>
			<div /* title */ style={{ fontVariant: "all-small-caps", fontSize: "1.5em", fontWeight: 700 }}>
				<span style={{ margin: "0 auto" }}> {props.title || alertTitle()} </span>
			</div>

			{props.content === undefined ? null : <div /* content */>{content}</div>}
		</div>
	</StackPanel>
}
