// import { createElement } from './core'
// import { Renderer, CSSProperties } from './types'
// import { StackPanel, Props as StackPanelProps } from './stack-panel'
// import { CommandBox } from './command-box'

// type ChildHeader = string | JSX.Element;
// interface Props extends StackPanelProps {
// 	childHeaders: ChildHeader[],
// 	buttonsStyle: CSSProperties
// }
// interface State {
// 	openStatuses: boolean[]
// }

// export type ExpandablePanelProps = Partial<Props>

// export class ExpandablePanel extends Renderer<ExpandablePanelProps, State> {

// 	constructor(props: ExpandablePanelProps) {
// 		super(props)
// 		this.state = {
// 			openStatuses: this.props.childHeaders.map(hdr => false)
// 		}
// 	}

// 	public static defaultProps: ExpandablePanelProps = {
// 		childHeaders: []
// 	};

// 	protected collapseChild = (index: number) => {
// 		this.setState((prevState, props) => { this.state.openStatuses[index] = false })
// 	}
// 	protected expandChild = (index: number) => {
// 		this.setState((prevState, props) => { this.state.openStatuses[index] = true })
// 	}

// 	render() {
// 		let _perpendicular: any = this.props.orientation === "horizontal" ? "vertical" : "horizontal"

// 		return (
// 			<StackPanel orientation={this.props.orientation} style={this.props.style}>
// 				{
// 					React.Children.map(this.props.children, (child, index) =>
// 						<StackPanel style={{ margin: "1em" }} orientation={this.props.orientation}>
// 							<StackPanel orientation={_perpendicular}>
// 								<div style={{ margin: "0.25em" }}>
// 									{this.props.childHeaders[index] || ''}
// 								</div>

// 								{
// 									this.state.openStatuses[index] === true
// 										? <CommandBox
// 											isFlat={true}
// 											onClick={(e) => { this.collapseChild(index) }}
// 											icon={this.props.orientation === "vertical" ? "arrow-up" : "arrow-left"}
// 											style={{
// 												width: "auto",
// 												margin: "0.25em",
// 												borderRadius: "1em",
// 												...this.props.buttonsStyle
// 											}}
// 										/>
// 										: <CommandBox
// 											isFlat={true}
// 											onClick={(e) => { this.expandChild(index) }}
// 											icon={this.props.orientation === "vertical" ? "arrow-down" : "arrow-right"}
// 											style={{
// 												width: "auto",
// 												margin: "0.25em",
// 												borderRadius: "1em",
// 												...this.props.buttonsStyle
// 											}}
// 										/>
// 								}

// 							</StackPanel>

// 							{
// 								this.state.openStatuses[index] === true ? <div>{child}</div> : ""
// 							}

// 						</StackPanel>
// 					)
// 				}
// 			</StackPanel>)
// 	}
// }