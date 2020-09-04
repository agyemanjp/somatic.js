/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { stringifyStyle } from '../../utils'
import { Component, Props } from '../../types'

// import { config } from './config'
// import { Icons, Alert, HoverBox, CommandBox } from './components'

type Messages = { type: "" }
interface Props extends Props.Themed {
	type?: "warning" | "info" | "error" | "form"
	title: string
	content: string | JSX.Element
}

export const Dialog: Component<Props, Messages> = (props) => {
	const defaultProps = Object.freeze({ type: "info" as const })

	// eslint-disable-next-line fp/no-let, init-declarations
	let content: JSX.Element
	switch (typeof (props.content)) {
		case "undefined":
			// eslint-disable-next-line fp/no-mutation
			content = <p>""</p>
			break

		case "string":
			// eslint-disable-next-line fp/no-mutation
			content = <div>{props.content.split("\n").map((item, i) => <p>{item}</p>)}</div>
			break

		case "object":
		default:
			// eslint-disable-next-line fp/no-mutation
			content = props.content as JSX.Element
	}

	return <div></div>

	// let buttons: Array__<{ label: string, icon?: FontIcon, action: () => void, placement?: "before" | "after" }>
	// switch (props.type) {
	// 	case "error": buttons = new Array__([{
	// 		label: "OK",
	// 		icon: Icons.Checkmark,
	// 		action: () => {/*this.update({ type: "modal-close" })*/ }
	// 	}])
	// 	default: buttons = new Array__([])
	// }

	// try {
	// 	const newContent = <StackPanel
	// 		orientation={Orientation.vertical}
	// 		style={{ height: "100%", width: "100%" }}
	// 		itemsAlignH={Alignment.center}
	// 		itemsAlignV={Alignment.center}>

	// 		{content}

	// 		<StackPanel
	// 			orientation={Orientation.horizontal}
	// 			style={{ marginTop: "1rem" }}>

	// 			{buttons.indexed().map((buttonInfo) => {
	// 				let button = buttonInfo[1]
	// 				let isFirstButton = button === buttons.first() || button === buttons.first()
	// 				let isLastButton = button === buttons.last() || button === buttons.last()

	// 				return <HoverBox
	// 					theme={props.theme}
	// 					hoverStyle={{background: "#fff"}}
	// 					style={{
	// 						borderLeft: "none",
	// 						borderTopLeftRadius: isFirstButton ? "0.75rem" : 0,
	// 						borderBottomLeftRadius: isFirstButton ? "0.75rem" : 0,
	// 						borderBottomRightRadius: isLastButton ? "0.75em" : 0,
	// 						borderTopRightRadius: isLastButton ? "0.75em" : 0,
	// 						borderColor: `gray`
	// 					}}>
	// 					<CommandBox
	// 						theme={props.theme}
	// 						iconPlacement={button.placement}
	// 						icon={button.icon}
	// 						iconStyle={{
	// 							top: "-0.1rem",
	// 							left: "0",
	// 							position: "relative",
	// 							height: "1.25rem",
	// 							marginTop: "0",
	// 							marginBottom: "0",
	// 							marginRight: "0.25rem",
	// 							marginLeft: 0
	// 						}}
	// 						style={{
	// 							height: "1.75rem",
	// 							paddingLeft: "0.75rem",
	// 							paddingRight: "0.75rem",
	// 							fontWeight: isLastButton ? "bold" : "normal",
	// 							borderLeftWidth: isFirstButton ? 1 : 0,
	// 							fontVariant: "all-small-caps"
	// 						}}
	// 						onClick={button.action}>

	// 						<div style={{
	// 							position: "relative",
	// 							top: isLastButton ? "-0.175rem" : "-0.15rem",
	// 							height: "auto"
	// 						}}>
	// 							{button.label}
	// 						</div>

	// 					</CommandBox>
	// 				</HoverBox>
	// 			})}
	// 		</StackPanel>
	// 	</StackPanel>

	// 	return <Alert
	// 		type={props.type || defaultProps.type}
	// 		title={props.title}
	// 		content={newContent}
	// 		theme={config.theme}
	// 	/>

	// }
	// catch (e) {
	// 	console.error(`DialogPanel render: ${e}`)
	// 	throw e
	// }
}