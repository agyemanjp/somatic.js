/* eslint-disable @typescript-eslint/no-unused-vars */
import { } from "@sparkwave/standard"
import { Component, Orientation, Icon, CSSProperties } from "../../types"
import { config, colorLuminance } from "../../utils"
import { StackPanel } from "../panels/stack-panel"
import { HoverBox } from "../boxes/hover-box"
import { createElement } from "../../core"

interface Props {
	label?: string,
	captions: JSX.Element[],
	thumbnail?: JSX.Element,
	isSelected: boolean
	style?: CSSProperties
	customTheme: "modern" | "minimalist"
	enableDeletion?: boolean,
	icons: { trash: Icon }
}

const defaultProps = {
	label: "",
	captions: [],
	thumbnail: null,
	isSelected: false,
	style: {
		margin: "auto",
	},
	customTheme: "modern",
	enableDeletion: false
}

type Messages = ({ type: "CARD_SELECTED" } | { type: "CARD_DELETED" })

export const Card: Component<Props> = async (props) => {
	const _props = { ...defaultProps, ...(props || {}) }
	const { icons, captions, postMsgAsync, customTheme } = { ...defaultProps, ...(props || {}) }

	const colors = {
		background: {
			default: _props.customTheme === "modern"
				? `linear-gradient(180deg, rgba(0,0,0,${_props.thumbnail ? "0.8" : "0.85"}) 0%, rgba(0,0,0,${_props.thumbnail ? "0.1" : "0.4"}) 100%)`
				: colorLuminance(config.theme.colors.primary.light, 0.35),
			selected: _props.customTheme === "modern"
				? `linear-gradient(180deg, ${config.theme.colors.secondary.dark} 0%, ${colorLuminance(config.theme.colors.secondary.light, 0.5)} 100%)`
				: colorLuminance(config.theme.colors.primary.dark, 0.5),
			hover: _props.customTheme === "modern"
				? `linear-gradient(180deg, rgba(0,0,0,${_props.thumbnail ? "0.5" : "0.7"}) 0%, rgba(0,0,0,${_props.thumbnail ? "0.1" : "0.2"}) 100%)`
				: colorLuminance(config.theme.colors.primary.light, 0.30),
			selectedHover: _props.customTheme === "modern"
				? `linear-gradient(180deg, ${colorLuminance(config.theme.colors.secondary.dark, 0.2)} 0%, ${colorLuminance(config.theme.colors.secondary.light, 0.9)} 100%)`
				: colorLuminance(config.theme.colors.primary.dark, 0.35),
		},
		foreground: {
			default: _props.customTheme === "modern" ? "white" : config.theme.colors.blackish,
			selected: _props.customTheme === "modern" ? "white" : "white",
			hover: _props.customTheme === "modern" ? "white" : "black"
		}
	}
	return <HoverBox
		theme={config.theme}
		style={{
			paddingTop: "0.4em",
			height: "auto",
			marginLeft: "1px",
			color: _props.isSelected ? colors.foreground.selected : colors.foreground.default,
			background: _props.isSelected ? colors.background.selected : colors.background.default,
			textAlign: "left",
			width: "100%",
			cursor: "pointer",
			lineHeight: "1.2em",
			..._props.style,
		}}
		hoverStyle={{
			color: _props.isSelected ? colors.foreground.selected : colors.foreground.default,
			background: _props.isSelected ? colors.background.selectedHover : colors.background.hover,
			display: "flex"
		}}>
		<StackPanel
			onClick={() => {
				/** Does not requires to pass a default handler since the event doesn't cause any internal effect, its delegated to the parent component */
				if (postMsgAsync) postMsgAsync({ type: "CARD_SELECTED" })
			}}
			orientation={Orientation.horizontal}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100%" }} >{_props.thumbnail}</div>
			<div style={{ width: "100%" }}>
				{
					_props.enableDeletion === true
						? <HoverBox
							theme={config.theme}
							style={{ float: "right", color: colors.foreground.default }}
							hoverStyle={{ float: "right", color: colors.foreground.hover }}>
							<div
								onClick={(e) => {
									e.stopPropagation()
									// Does not requires to pass a default handler since the event doesn't cause any internal effect, 
									// its delegated to the parent component */
									if (postMsgAsync) postMsgAsync({ type: "CARD_DELETED" })
								}}>
								<icons.trash style={{ height: "1.3rem", cursor: "pointer", marginLeft: "0.5em" }} />
							</div>
						</HoverBox>
						: null
				}
				{_props.label
					? <div
						style={{ fontWeight: "bold", fontSize: "1.3em", wordBreak: "break-word", width: "100%" }}>
						{_props.label}
					</div>
					: null
				}

				{captions.map((caption: JSX.Element) => caption)}

			</div>

		</StackPanel>

	</HoverBox >
}