/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Props, Alignment, Orientation, CSSProperties, Icon } from '../../types'
import { colorLuminance, config, mergeProps } from '../../utils'
import { createElement } from '../../core'
import { HoverBox } from '../boxes/hover-box'
import { StackPanel } from '../panels/stack-panel'

/** Defines properties for each option */
export interface Option {
	label: string
	tooltip?: string
	icon?: Icon
	isDisabled?: boolean,
	customElement?: JSX.Element
	style?: CSSProperties
}

type Props = Props.Themed & {
	/** Array of option objects */
	options: Option[]

	/** Defines the selected option using the index of the array */
	selectedSwitchIndex: number

	/** Style of the switch */
	style?: CSSProperties

	/** "on-off" will show only the selected label, "multiple-choices" shows all the labels, the selected is highlighted */
	type?: "on-off" | "multiple-choices"
}

export const defaultProps = {
	options: [],
	selectedSwitchIndex: 0,
	theme: config.theme,
	style: {
		height: "40px"
	},
	type: "multiple-choices" as const
}

type Messages = (
	{ type: "SWITCH_CHANGE", data: { index: number } }
)

export const ToggleSwitch: Component<Props, Messages> = (props) => {
	const fullProps = mergeProps(defaultProps, props)
	const sliderWidth = fullProps.style.height
	const borderColor = colorLuminance(config.theme.colors.whitish, -0.1)

	return props.options.length == 2
		? <HoverBox
			theme={config.theme}
			style={{
				display: "flex",
				flexDirection: fullProps.selectedSwitchIndex === 1 ? "row-reverse" : "row",
				backgroundColor: fullProps.theme.colors.secondary.light,
				...fullProps.type !== "multiple-choices" && fullProps.selectedSwitchIndex === 0
					? {
						backgroundColor: fullProps.theme.colors.primary.dark,
					}
					: {},
				width: "90px",
				borderRadius: "20px",
				margin: "2px",
				boxShadow: "inset 0px 1px 1px rgba(0,0,0,0.4)",
				cursor: "pointer",
				...fullProps.style
			}}
			hoverStyle={{
				display: "flex",
				flexDirection: fullProps.selectedSwitchIndex === 1 ? "row-reverse" : "row",
				backgroundColor: fullProps.theme.colors.secondary.dark,
				...fullProps.type !== "multiple-choices" && fullProps.selectedSwitchIndex === 0
					? {
						backgroundColor: fullProps.theme.colors.primary.dark
					}
					: {},
				...fullProps.style
			}}>
			<div
				onClick={() => {
					if (fullProps.postMsgAsync) {
						fullProps.postMsgAsync({
							type: "SWITCH_CHANGE",
							data: {
								index: props.selectedSwitchIndex === 0 ? 1 : 0
							}
						})
					}
				}}>
				<div
					style={{
						height: sliderWidth,
						width: sliderWidth,
						borderRadius: "30px",
						backgroundColor: fullProps.theme.colors.whitish,
						boxShadow: "0px 1px 5px rgba(0,0,0,0.5)",
						transform: "scale(0.8)"
					}}>
				</div>
				<div
					style={{
						width: "calc(100% - 40px)",
						justifyContent: "center",
						color: "white",
						display: "flex",
						alignItems: "center",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						height: "100%",
						textShadow: `0px 1px 2px rgba(0,0,0,0.2)`
					}}>
					{props.options[fullProps.selectedSwitchIndex].label}
				</div>
			</div>
		</HoverBox>
		: <StackPanel orientation={Orientation.horizontal} style={{ height: "100%", ...props.style }}>
			{
				props.options.map((option, index) => {
					const IconItem = option.icon
					const border = fullProps.selectedSwitchIndex === index
						? `2px solid ${fullProps.theme.colors.primary.dark}`
						: `thin solid ${borderColor}`

					return <HoverBox
						theme={config.theme}
						style={{
							backgroundColor: "white",
							color: props.selectedSwitchIndex === index
								? 'white'
								: "black",
							// userSelect: "none",
							height: "100%",
							flex: "1"
						}}
						hoverStyle={{
							backgroundColor: option.isDisabled !== true
								? config.theme.colors.whitish
								: "inherit",
							borderColor: props.style && props.style.borderColor
						}}>

						<StackPanel
							title={option.tooltip}
							itemsAlignV={Alignment.center}
							style={{
								cursor: option.isDisabled !== true ? "pointer" : "inherit",
								borderRight: fullProps.selectedSwitchIndex === index + 1
									? `2px solid ${fullProps.theme.colors.primary.dark}`
									: border
								,
								borderTop: border,
								borderBottom: border,
								// ...props.selectedSwitchIndex === index && { boxShadow: "inset 0 0 2px #333" },
								...index === 0
								&& { borderLeft: border, borderRadius: "0.3rem 0 0 0.3rem" },
								...index === props.options.length - 1
								&& { borderRadius: "0 0.3rem 0.3rem 0" },
								...option.style,

							}}
							onClick={() => {
								if (props.postMsgAsync && option.isDisabled !== true)
									props.postMsgAsync({
										type: "SWITCH_CHANGE",
										data: {
											index: index
										}
									})
							}}>
							{
								option.customElement
									? <StackPanel
										style={{
											height: '100%',
											width: "100%",
											margin: "auto"
										}}
										itemsAlignV={Alignment.center}
										itemsAlignH={Alignment.center}>
										{option.customElement}
									</StackPanel>
									: <StackPanel
										style={{ height: '100%', width: "100%", margin: "auto", }}
										itemsAlignV={Alignment.center}
										itemsAlignH={Alignment.center}>
										{IconItem && <IconItem style={{}} />}
										{option.label}
									</StackPanel>
							}
						</StackPanel>
					</HoverBox>
				})
			}

		</StackPanel>
}