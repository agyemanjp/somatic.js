/* eslint-disable @typescript-eslint/no-unused-vars */
import { hasValue, Obj } from "@sparkwave/standard"
import { createElement, mergeProps } from '../../core'
import { Component, Icon, CSSProperties } from "../../types"
import { StackPanel } from "../panels/stack-panel"
import { HoverBox } from "../boxes/hover-box"


export interface Crumb<PageName extends string = string> {
	/** Title or label to be displayed on the crumb */
	title: string | { main: string, prefix?: string | JSX.Element, suffix?: string | JSX.Element }

	/** Page with parameter that crumb points to; an undefined or null value means crumb is disabled/inactive */
	target?: { pageName: PageName, pageProps: Obj<unknown> } | (() => unknown)

	/** Icon use to be displayed next to the title or label */
	icon?: Component<{ style: CSSProperties }>

	/** Disabled the crumb from being clicked/selected */
	isDisabled?: boolean
}

export interface Messages { type: "SELECTION", data: { index: number } }

export type Props = {
	/** Array of crumb objects, each defined by properties on the Crumb interface */
	crumbs: Array<Crumb>,

	/** template used for creating visual crumbs */
	// crumbTemplate?: Component<Crumb>

	crumbStyle?: CSSProperties

	hoverCrumbStyle?: CSSProperties

	selectedCrumbStyle?: CSSProperties

	disabledCrumbStyle?: CSSProperties

	/** Current selected crumb */
	currentIndex: number,

	/** Icons to be used as containers of the crumb, we suggest to use the default ones from this component */
	icons?: { CrumbLeft: Icon, CrumbMiddle: Icon }
}

const CrumbLeft: Icon = async (props) => <svg
	viewBox="0 0 200 100"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
	style={{ ...props.style }}>
	<svg viewBox="0 0 200 100" preserveAspectRatio="none">
		<g>
			<polygon vectorEffect="non-scaling-stroke" points="2,5 185,5 197,50 185,95 2,95" strokeWidth={1} />
		</g>
	</svg>
</svg>

const CrumbMiddle: Icon = async (props) => <svg
	viewBox="0 0 200 100" version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
	style={{ ...props.style }}>
	<svg viewBox="0 0 200 100" preserveAspectRatio="none">
		<g>
			<polygon vectorEffect="non-scaling-stroke" points="2,5 185,5 197,50 185,95 2,95 14,50" strokeWidth={1} />
		</g>
	</svg>
</svg>

const defaultProps = {
	crumbs: [] as Array<Crumb>,
	crumbStyle: {} as CSSProperties,
	selectedCrumbStyle: {} as CSSProperties,
	hoverCrumbStyle: {} as CSSProperties,
	disabledCrumbStyle: {} as CSSProperties,
	icons: {
		CrumbLeft: CrumbLeft,
		CrumbMiddle: CrumbMiddle
	}
}

export const BreadCrumbs: Component<Props, Messages> = async (props) => {
	const {
		icons,
		crumbs,
		currentIndex,
		crumbStyle,
		hoverCrumbStyle,
		selectedCrumbStyle,
		disabledCrumbStyle
	} = mergeProps(defaultProps, props)


	return <StackPanel
		style={{ paddingTop: "0.25em", paddingBottom: "0.25em", width: "100%", maxWidth: "1200px" }}
		itemsAlignV={"center"}
		orientation={"horizontal"}>

		{props.crumbs.map((crumb, index) => {
			const isCrumbDisabled = !hasValue(crumb.target)
			const CrumbBox = index === 0 ? icons?.CrumbLeft : icons?.CrumbMiddle

			return <div style={{ flex: "1 1 200px" }}>
				<HoverBox
					style={{
						...crumbStyle,
						...(index === props.currentIndex ? selectedCrumbStyle : {}),
						...(isCrumbDisabled ? disabledCrumbStyle : {}),
						stroke: {
							...crumbStyle,
							...(index === props.currentIndex ? selectedCrumbStyle : {}),
							...(isCrumbDisabled ? disabledCrumbStyle : {})
						}.color,
						overflow: "none",
					}}
					hoverStyle={{
						cursor: isCrumbDisabled ? "default" : "pointer",
						backgroundColor: "transparent",
						...crumbStyle,
						...(index === props.currentIndex ? selectedCrumbStyle : {}),
						...hoverCrumbStyle,
						...(isCrumbDisabled ? disabledCrumbStyle : {})
					}}>

					<div
						// ref={(divElement: HTMLDivElement) => this.crumbContainers.push(divElement)}
						style={{
							position: "relative",
							textAlign: "center",
							transform: index === 0 ? `none` : `translate(-${5 * index}%)`,
							cursor: isCrumbDisabled ? 'initial' : 'pointer'
						}}
						onClick={() => {
							if (typeof crumb.target === "function") {
								crumb.target()
							}
							else if (hasValue(crumb.target) && props.postMsgAsync) {
								props.postMsgAsync({ type: "SELECTION", data: { index: index } })
							}
						}}>

						{
							CrumbBox
								? <CrumbBox style={{ color: "inherit", stroke: "inherit", width: "100%", height: "2.5em" }} />
								: undefined
						}

						<div style={{ position: "absolute", top: "10%", left: "10%", }}>
							{
								crumb.icon
									? <crumb.icon
										style={{
											// color: isCrumbDisabled ? colorLuminance(props.theme.colors.blackish!, 0.8) : `white`,
											height: "1.5em",
											marginRight: ".25rem",
											verticalAlign: "middle",
											padding: ".15rem",
											boxSizing: "content-box",
											overflow: "initial"
										}} />
									: null
							}
						</div>

						<div
							style={{
								position: "absolute",
								top: "12.5%",
								// left: this.state.crumbWidth > 150 ? "27%" : "2.8em",
								left: "27%",
								fontSize: "1.3em",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								// maxWidth: this.state.crumbWidth > 150 ? "70%" : "calc(90% - 2.8em)",
								maxWidth: "70%",
								textTransform: "capitalize",
								color: "inherit",
								textShadow: isCrumbDisabled ? `0px` : `0px 1px 2px rgba(0,0,0,0.2)`
							}}>
							{/* {this.state.crumbWidth > 60 ? crumb.title.main : ``}  */}
							{typeof crumb.title == "string" ? crumb.title : crumb.title.main}
						</div>
					</div>
				</HoverBox>
			</div>
		})}
	</StackPanel >
}

