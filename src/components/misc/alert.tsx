/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, mergeProps } from '../../core'
import { Component, CSSProperties, Icon } from '../../types'

export type AlertType = "warning" | "info" | "error" | "form"

type Props = {
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
		background: `white`,
		color: `black`
	}
})

export const Alert: Component<Props> = (props) => {
	const {
		type,
		errorIcon,
		title,
		style,
		headerStyle,
		children
	} = mergeProps(defaultProps, props)

	const getAlertTypeDefaultStyle = (): CSSProperties => {
		switch (type) {
			case "info":
				return { borderColor: 'green' }
			case "warning":
				return { borderColor: 'gold' }
			case "error":
				return { borderColor: 'red' }
			default:
				return { borderColor: 'black', }
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

	const getDefaultHeaderStyle = (): CSSProperties => {
		switch (type) {
			case "info":
				return {
					backgroundColor: 'green',
					borderColor: 'green',
					color: 'black'
				}
			case "warning":
				return {
					backgroundColor: 'gold',
					borderColor: 'gold',
					color: "#fff"
				}
			case "error":
				return {
					backgroundColor: 'red',
					borderColor: 'red',
					color: "#fff"
				}
			default:
				return {
					// backgroundColor: theme.colors.primary.dark,
					borderColor: 'black',
					color: "#fff"
				}
		}
	}

	const getContent = () => {
		return children && children.map(child => {
			switch (typeof child) {
				case "undefined":
					return <p>""</p>

				case "string":
					return <div>
						{child.split("\n").map((item, i) => <p>{item}</p>)}
					</div>

				case "object":
				default:
					return child as JSX.Element[]
			}
		})
	}

	const HeaderIcon = (type === "error"
		? errorIcon
		: type === "warning"
			? errorIcon
			: undefined
	)

	return <div
		style={{
			...getAlertTypeDefaultStyle(),
			...style,
			maxWidth: "100%"
		}}>

		<div
			style={{
				fontSize: "1.75em",
				fontWeight: 700,
				padding: "0 1rem 2px",
				fontVariant: "all-small-caps",
				...getDefaultHeaderStyle(),
				...headerStyle
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

			<span > {title || getAlertTitle()} </span>
		</div>
		{
			children === undefined
				? <div />
				: getContent()
		}
	</div>
}
