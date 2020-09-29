/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { Props, CSSProperties } from '../../types'

export interface Props extends Props.Html {
	title: string
	style?: CSSProperties
}

interface State {
	displayed: boolean
}

export const DisplayToggleBox = () => {
	const name__ = "DisplayToggleBox"

	const getInitialState = (props: Props) => {
		return {
			displayed: false
		}
	}

	const defaultProps = {}

	return (<div></div>
		// <StackPanel
		// 	orientation={Orientation.vertical}
		// 	style={{
		// 		borderRadius: "0.15em",
		// 		...this.props.style
		// 	}}>
		// 	<div style={{
		// 		width: "100%",
		// 		padding: ".25em .5em",
		// 		cursor: "pointer",
		// 	}}
		// 		onClick={() => {
		// 			this.setState({
		// 				...this.state,
		// 				displayed: !this.state.displayed
		// 			})
		// 		}}>
		// 		<span>
		// 			<span style={{ verticalAlign: "middle" }}>{this.props.title}</span>
		// 			<div
		// 				style={{
		// 					verticalAlign: "middle",
		// 					display: "inline-block",
		// 					marginLeft: this.state.displayed ? "0.25em" : ".5em",
		// 					borderTop: this.state.displayed ? `0.5em solid currentColor` : `0.5em solid transparent`,
		// 					borderLeft: this.state.displayed ? `0.5em solid transparent` : `0.5em solid currentColor`,
		// 					borderBottom: this.state.displayed ? undefined : `0.5em solid transparent`,
		// 					borderRight: this.state.displayed ? `0.5em solid transparent` : undefined,
		// 				}} />
		// 		</span>
		// 	</div>
		// 	<div style={{
		// 		padding: ".25em .5em",
		// 		width: "100%",
		// 		height: this.state.displayed ? undefined : 0,
		// 		opacity: this.state.displayed ? undefined : 0
		// 	}}>{this.props.children}</div>
		// </StackPanel >
	)
}