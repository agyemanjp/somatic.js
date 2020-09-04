/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Props, Alignment, Orientation, CSSProperties } from '../../types'
import { colorLuminance, config } from '../../utils'
import { createElement } from '../../core'
import { HoverBox } from '../boxes/hover-box'
import { StackPanel } from '../panels/stack-panel'

export interface Option {
	label: string
	tooltip?: string
	icon?: () => JSX.Element
	isDisabled?: boolean,
	customElement?: JSX.Element
	style?: CSSProperties
}

interface Props extends Props.Themed, Props.Styled {
	options: Option[]
	selectedSwitchIndex: number
}

type Messages = ({ type: "SWITCH_CHANGE", data: { index: number } })

export const ToggleSwitch: Component<Props, Messages> = (props) => {
	const sliderWidth = props.style.height || "40px"
	const borderColor = colorLuminance(config.theme.colors.whitish, -0.1)

	return props.options.length == 2
		? <HoverBox
			theme={config.theme}
			style={{
				display: "flex",
				flexDirection: props.selectedSwitchIndex === 1 ? "row-reverse" : "row",
				height: "40px",
				backgroundColor: props.theme.colors.secondary.light,
				width: "90px",
				borderRadius: "20px",
				margin: "2px",
				boxShadow: "inset 0px 1px 1px rgba(0,0,0,0.4)",
				cursor: "pointer",
				...props.style
			}}
			hoverStyle={{
				display: "flex",
				flexDirection: props.selectedSwitchIndex === 1 ? "row-reverse" : "row",
				backgroundColor: props.theme.colors.secondary.dark
			}}>
			<div
				onClick={() => {
					if (props.postMsgAsync) {
						props.postMsgAsync({
							type: "SWITCH_CHANGE",
							data: { index: props.selectedSwitchIndex === 0 ? 1 : 0 }
						})
					}
				}}>
				<div
					style={{
						height: sliderWidth,
						width: sliderWidth,
						borderRadius: "30px",
						backgroundColor: props.theme.colors.whitish,
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
					{props.options[props.selectedSwitchIndex].label}
				</div>
			</div>
		</HoverBox>
		: <StackPanel orientation={Orientation.horizontal} style={{ height: "100%", ...props.style }}>
			{
				props.options.map((option, index) => {
					const IconItem = option.icon
					return <HoverBox
						theme={config.theme}
						style={{
							backgroundColor: props.selectedSwitchIndex === index
								? colorLuminance(config.theme.colors.secondary.light, 0.1)
								: "white",
							color: props.selectedSwitchIndex === index
								? 'white'
								: "black",
							// userSelect: "none",
							height: "100%",
							flex: "1"
						}}
						hoverStyle={{
							backgroundColor: option.isDisabled !== true
								? props.selectedSwitchIndex === index
									? config.theme.colors.secondary.light
									: config.theme.colors.whitish
								: "inherit",
							color: props.selectedSwitchIndex === index
								? 'white'
								: 'black'
						}}>

						<StackPanel
							itemsAlignV={Alignment.center}
							style={{
								cursor: "pointer",
								borderRight: `thin solid ${borderColor}`,
								borderTop: `thin solid ${borderColor}`,
								borderBottom: `thin solid ${borderColor}`,
								...props.selectedSwitchIndex === index && { boxShadow: "inset 0 0 2px #333" },
								...index === 0
								&& { borderLeft: `thin solid ${borderColor}`, borderRadius: "0.3rem 0 0 0.3rem" },
								...index === props.options.length - 1
								&& { borderRadius: "0 0.3rem 0.3rem 0" },
								...option.style
							}}
							onClick={() => {
								if (props.postMsgAsync)
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
										style={{ height: '100%', width: "100%", margin: "auto", }}
										itemsAlignV={Alignment.center}
										itemsAlignH={Alignment.center}>
										{option.customElement}
									</StackPanel>
									: <StackPanel
										style={{ height: '100%', width: "100%", margin: "auto", }}
										itemsAlignV={Alignment.center}
										itemsAlignH={Alignment.center}>
										{IconItem && <IconItem />}
										{option.label}
									</StackPanel>
							}
						</StackPanel>
					</HoverBox>
				})
			}

		</StackPanel>
}