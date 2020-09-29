/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { Component, CSSProperties, Props, Icon } from '../../types'
import { config, mergeProps } from '../../utils'

export type AlertType = "warning" | "info" | "error" | "form"

type Props = Props.Themed & {
	/** Will define the general style of the alert: "warning" | "info" | "error" | "form"  */
	type: AlertType,

	/** Title at the header of the alert */
	title?: string,

	/** Style of the Alert Box */
	style?: CSSProperties,

	/** Style of the header that contains the title */
	headerStyle?: CSSProperties

	/** Icon to be used when is a warning or error alert */
	errorIcon?: Icon
}

const defaultProps = Object.freeze({
	type: "info" as AlertType,
	style: {
		border: "thin solid ",
		textAlign: "center",
		margin: "auto",
		borderRadius: "0.15rem",
		background: config.theme.colors.whitish,
		color: config.theme.colors.blackish
	}
})

export const Alert: Component<Props> = (props) => {
	const fullProps = mergeProps(defaultProps, props)

	const getAlertStyle = (): CSSProperties => {
		switch (fullProps.type) {
			case "info":
				return {
					borderColor: fullProps.theme.colors.info,
				}
			case "warning":
				return {
					borderColor: fullProps.theme.colors.warning,
				}
			case "error":
				return {
					borderColor: fullProps.theme.colors.error,
				}
			default:
				return {
					borderColor: fullProps.theme.colors.blackish,
				}
		}
	}

	const getAlertTitle = (): string => {
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

	const getHeaderStyle = (): CSSProperties => {
		switch (fullProps.type) {
			case "info":
				return {
					backgroundColor: fullProps.theme.colors.info,
					borderColor: fullProps.theme.colors.info,
					color: fullProps.theme.colors.blackish
				}
			case "warning":
				return {
					backgroundColor: fullProps.theme.colors.warning,
					borderColor: fullProps.theme.colors.warning,
					color: "#fff"
				}
			case "error":
				return {
					backgroundColor: fullProps.theme.colors.error,
					borderColor: fullProps.theme.colors.error,
					color: "#fff"
				}
			default:
				return {
					backgroundColor: fullProps.theme.colors.primary.dark,
					borderColor: fullProps.theme.colors.blackish,
					color: "#fff"
				}
		}
	}
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
				return props.children as JSX.Element[]
		}
	}

	const HeaderIcon = fullProps.type === "error"
		? fullProps.errorIcon
		: fullProps.type === "warning"
			? fullProps.errorIcon
			: undefined

	return <div
		style={{
			...fullProps.style,
			...getAlertStyle(),
			maxWidth: "100%"
		}}>

		<div
			style={{
				fontSize: "1.75em",
				fontWeight: 700,
				padding: "0 1rem 2px",
				fontVariant: "all-small-caps",
				...getHeaderStyle(),
				...fullProps.headerStyle
			}}>
			{
				HeaderIcon !== undefined
					? <HeaderIcon style={{
						height: "1em",
						position: "relative",
						top: "3px"
					}} />
					: undefined
			}

			<span > {fullProps.title || getAlertTitle()} </span>
		</div>
		{
			fullProps.children === undefined
				? <div />
				: getContent()
		}
	</div>
}
