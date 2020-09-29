/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createElement } from '../../core'
import { Component, Props, Alignment, Orientation, CSSProperties, KeyboardEvent, FormEvent, MouseEvent } from '../../types'
import { StackPanel } from './stack-panel'
import { mergeProps } from '../../utils'
import { HoverBox } from "../boxes/hover-box"

type Props = Props.Panel & Props.Html & Props.Themed & {
	/** Key of the currently selected tab, it defines which content to show from the headerItems */
	selectedTabKey: string | undefined,

	/** Enables tab name editing */
	enableEditing: boolean

	/** Enable tab deletion */
	enableDeletion: boolean

	/** Properties for the header Panel */
	headerPanel: {
		component?: Component<Props.Panel>,
		placement?: "top" | "right" | "bottom" | "left"
		style?: CSSProperties
	}

	/** Properties for each tab header and content */
	headerItems: {
		data: {
			tabName: string,
			key: string,
			content: string | JSX.Element | undefined
		}[], // each header item must have a unique key
		style?: CSSProperties
		hoverStyle?: CSSProperties
		selectedStyle?: CSSProperties
		selectedHoverStyle?: CSSProperties
	}

	/** Tab key which is being edited */
	editingTabKey: string | undefined

	/** Name of the tab being edited */
	editingTabName: string
}
export interface Messages {
	selection: { type: "SELECTION", data: { key: string } },
	deletion: { type: "DELETION", data: { key: string } },
	editing: { type: "EDITING", data: { key: string, newName: string } }
}
const defaultProps = Object.freeze({
	enableEditing: false,
	enableDeletion: false,
	headerPanel: {
		component: StackPanel,
		placement: "top" as const,
		style: {
			marginBottom: "0.25em",
			width: "100%",
			overflow: "hidden"
		} as CSSProperties
	},
	selection: undefined,
})

export const TabsPanelExtended: Component<Props, Messages[keyof Messages]> = (props) => {
	const {
		children,
		headerPanel,
		headerItems,
		theme,
		style,
		orientation,
		itemsAlignH,
		itemsAlignV,
		selectedTabKey,
		postMsgAsync,
		...htmlProps
	} = props

	const fullProps = mergeProps(defaultProps, props)
	const HeaderPanelComponent = fullProps.headerPanel.component
	const headersJSX = fullProps.headerItems.data.map((header, index) => {
		const headerKey = header.key
		const headerContent = header.content === undefined ? header.tabName : header.content
		const isItemSelected = headerKey === selectedTabKey

		return <HoverBox
			theme={fullProps.theme}
			style={{
				...fullProps.headerItems.style,
				...isItemSelected === true
					? {
						color: fullProps.theme.colors.secondary.light,
						...fullProps.headerItems.selectedStyle
					}
					: {}
			}}
			// If we have only one header item, the hover style is similar to the regular style: no hover effect
			hoverStyle={fullProps.headerItems.data.length > 1 && isItemSelected === false
				?
				{
					...fullProps.headerItems.hoverStyle
				}
				:
				{
					...fullProps.headerItems.selectedStyle,
					...fullProps.headerItems.selectedHoverStyle
				}
			}>

			<StackPanel onClick={e => {
				if (fullProps.postMsgAsync) {
					fullProps.postMsgAsync({
						type: "SELECTION",
						data: {
							key: headerKey
						}
					})
				}
				// TODO: Check this, if still nescessary
				// if (!isItemSelected){
				// 	this.setState({ editingTabKey: undefined })
				// }
			}}>
				{fullProps.editingTabKey === headerKey
					? <input
						type="text"
						autoFocus
						defaultValue={header.tabName}
						style={{
							width: header.tabName.length < 20 ? "8.5rem" : "11rem",
							height: "2em",
							fontSize: "1.05em",
							padding: "0.15em",
							border: "thin solid silver"
						}}
						onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
							const code = e.keyCode || e.which
							if (code === 13) {
								const newTabName = fullProps.editingTabName === ""
									? header.tabName
									: fullProps.editingTabName
								if (fullProps.postMsgAsync) {
									fullProps.postMsgAsync({
										type: "EDITING",
										data: {
											key: headerKey,
											newName: newTabName
										}
									})
								}
							}
						}}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
							const code = e.keyCode || e.which
							if (code === 27) {
								//TODO: Re-enable the confirmation on Enter
								// this.setState({
								// 	editingTabName: "",
								// 	editingTabKey: undefined
								// })
							}
						}}
						onBlur={(e: FormEvent<HTMLInputElement>) => {
							//TODO: Re-enable the confirmation on Blur

							// this.setState({
							// 	editingTabName: "",
							// 	editingTabKey: undefined
							// })
						}}
					/>
					: headerContent}
				<StackPanel
					itemsAlignV={Alignment.center}
					orientation={Orientation.vertical}>
					{isItemSelected === true && fullProps.enableEditing !== false
						? <div
							onClick={(e: MouseEvent<HTMLDivElement>) => {
								e.stopPropagation()
								const editingTabKey = fullProps.editingTabKey
								// TODO: Deal with this click

								// this.setState({
								// 	editingTabKey: editingTabKey !== undefined
								// 		? undefined
								// 		: header.key
								// })
							}}
							onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
								const newTabName = fullProps.editingTabName === ""
									? header.tabName
									: fullProps.editingTabName
								if (fullProps.editingTabKey !== undefined) {
									if (fullProps.postMsgAsync) {
										fullProps.postMsgAsync({
											type: "EDITING",
											data: {
												key: headerKey,
												newName: newTabName
											}
										})
									}
								}
							}}
							style={{ cursor: "pointer", paddingLeft: "0.25em" }}>

							{/* {fullProps.editingTabKey === headerKey
								? <Icons.CheckmarkBold size="1em" />
								: <Icons.EditPencil size="1em" />} */}

						</div>

						: <div />
					}
					{isItemSelected === true && fullProps.editingTabKey === undefined && fullProps.enableDeletion !== false
						? <div
							onClick={e => {
								e.stopPropagation()
								if (fullProps.postMsgAsync) {
									fullProps.postMsgAsync({
										type: "DELETION",
										data: {
											key: headerKey
										}
									})
								}
							}}
							style={{ cursor: "pointer", paddingLeft: "0.25em" }}>
							{/* <Icons.Trash_1 size="1em" /> */}
						</div>

						: <div />
					}
				</StackPanel>
			</StackPanel>
		</HoverBox>
	})

	switch (fullProps.headerPanel.placement || defaultProps.headerPanel.placement) {
		case "top":
			return (
				<StackPanel
					{...htmlProps}
					orientation={Orientation.vertical}
					style={{
						flexFlow: "column",
						height: "100%",
						...style
					}}>

					<HeaderPanelComponent
						style={{
							...defaultProps.headerPanel.style,
							...fullProps.headerPanel.style
						}}
						orientation={orientation}>

						{headersJSX}
					</HeaderPanelComponent>

					<StackPanel
						style={{ padding: "0", margin: "0", flex: "2", overflow: "auto", width: "100%" }}>

						{
							children?.map((child, index) => {
								return child
							})
						}
					</StackPanel>
				</StackPanel>
			)

		default:
			throw new Error(`Unknown header panel placement: ${fullProps.headerPanel.placement}`)
	}
}