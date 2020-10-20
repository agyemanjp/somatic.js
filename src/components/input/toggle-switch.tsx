/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, mergeProps } from '../../core'
import { Component, HtmlProps, CSSProperties, Icon } from '../../types'
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

type Props = HtmlProps & {
	/** Array of option objects */
	choices: Option[]

	/** Defines the selected option using the index of the array */
	selectedSwitchIndex: number

	/** Style of the switch */
	style?: CSSProperties

	/** "on-off" will show only the selected label, "multiple-choices" shows all the labels, the selected is highlighted */
	type?: "on-off" | "multiple-choices"
}

export const defaultProps = {
	options: [] as Option[],
	selectedSwitchIndex: 0,
	style: {},
	type: "multiple-choices" as const,
	postMsgAsync: async () => { }
}

type Messages = ({ type: "SWITCH_CHANGE", data: { index: number } })

export const ToggleSwitch: Component<Props, Messages> = (props) => {
	const { choices, style, selectedSwitchIndex, postMsgAsync } = mergeProps(defaultProps, props)
	const sliderWidth = style.height
	// const borderColor = colorLuminance(config.theme.colors.whitish, -0.1)

	return choices.length == 2
		? <HoverBox
			style={{
				display: "flex",
				flexDirection: selectedSwitchIndex === 1 ? "row-reverse" : "row",
				// backgroundColor: theme.colors.secondary.light,
				// ...type !== "multiple-choices" && selectedSwitchIndex === 0
				// 	? { backgroundColor: theme.colors.primary.dark, }
				// 	: {},
				width: "90px",
				borderRadius: "20px",
				margin: "2px",
				boxShadow: "inset 0px 1px 1px rgba(0,0,0,0.4)",
				cursor: "pointer",
				...style
			}}
			hoverStyle={{
				display: "flex",
				flexDirection: selectedSwitchIndex === 1 ? "row-reverse" : "row",
				// backgroundColor: theme.colors.secondary.dark,
				// ...type !== "multiple-choices" && selectedSwitchIndex === 0
				// 	? { backgroundColor: theme.colors.primary.dark }
				// 	: {},
				...style
			}}>

			<div
				onClick={() => {
					postMsgAsync({
						type: "SWITCH_CHANGE",
						data: { index: props.selectedSwitchIndex === 0 ? 1 : 0 }
					})
				}}>

				<div
					style={{
						height: sliderWidth,
						width: sliderWidth,
						borderRadius: "30px",
						// backgroundColor: theme.colors.whitish,
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
					{props.choices[selectedSwitchIndex].label}
				</div>
			</div>
		</HoverBox >

		: <StackPanel
			orientation={"horizontal"}
			style={{ height: "100%", ...style }}>

			{
				choices.map((option, index) => {
					const border = selectedSwitchIndex === index ? `2px solid` : `thin solid`

					return <HoverBox
						style={{
							backgroundColor: "white",
							color: props.selectedSwitchIndex === index
								? 'white'
								: "black",
							height: "100%",
							flex: "1"
						}}
						hoverStyle={{
							backgroundColor: option.isDisabled !== true ? "whitesmoke" : "inherit",
							borderColor: props.style && props.style.borderColor
						}}>

						<StackPanel
							title={option.tooltip}
							itemsAlignV={"center"}
							style={{
								cursor: option.isDisabled !== true ? "pointer" : "inherit",
								borderRight: selectedSwitchIndex === index + 1
									? `2px solid`
									: border
								,
								borderTop: border,
								borderBottom: border,
								// ...props.selectedSwitchIndex === index && { boxShadow: "inset 0 0 2px #333" },
								...index === 0
								&& { borderLeft: border, borderRadius: "0.3rem 0 0 0.3rem" },
								...index === props.choices.length - 1
								&& { borderRadius: "0 0.3rem 0.3rem 0" },
								...option.style,

							}}
							onClick={() => {
								if (option.isDisabled !== true)
									postMsgAsync({ type: "SWITCH_CHANGE", data: { index } })
							}}>
							{
								option.customElement
									? <StackPanel
										style={{ height: '100%', width: "100%", margin: "auto" }}
										itemsAlignV={"center"}
										itemsAlignH={"center"}>
										{option.customElement}
									</StackPanel>

									: <StackPanel
										style={{ height: '100%', width: "100%", margin: "auto", }}
										itemsAlignV={"center"}
										itemsAlignH={"center"}>
										{option.icon ? <option.icon key={`option-icon-${index}`} style={{}} /> : undefined}
										{option.label}
									</StackPanel>
							}
						</StackPanel>
					</HoverBox>
				})
			}

		</StackPanel>
}