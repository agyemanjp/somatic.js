/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createElement, mergeProps } from '../../core'
import { Component, PanelProps, HtmlProps, CSSProperties, KeyboardEvent, FormEvent, MouseEvent } from '../../types'
import { StackPanel } from './stack-panel'
import { HoverBox } from "../boxes/hover-box"

export type Messages = (
	| { type: "SELECTION", data: { key: string } }
	| { type: "DELETION", data: { key: string } }
	| { type: "EDITING", data: { key: string, newName: string } }
)

export type Props = PanelProps & HtmlProps & {
	/** Key of the currently selected tab, it defines which content to show from the headerItems */
	selectedTabKey: string | undefined,

	/** Enables tab name editing */
	enableEditing: boolean

	/** Enable tab deletion */
	enableDeletion: boolean

	/** Properties for the header Panel */
	headerPanel: {
		component?: Component<PanelProps>,
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

export const TabsPanelExtended: Component<Props, Messages> = (props) => {
	const {
		children,
		headerPanel,
		headerItems,
		// theme,
		style,
		orientation,
		itemsAlignH,
		itemsAlignV,
		selectedTabKey,
		editingTabKey,
		editingTabName,
		enableDeletion,
		enableEditing,
		postMsgAsync,
		...htmlProps
	} = mergeProps(defaultProps, props)

	const HeaderPanelComponent = headerPanel.component
	const headersJSX = headerItems.data.map((header, index) => {
		const headerKey = header.key
		const headerContent = header.content === undefined ? header.tabName : header.content
		const isItemSelected = headerKey === selectedTabKey

		return <HoverBox
			// theme={theme}
			style={{
				...headerItems.style,
				...isItemSelected === true
					? {
						// color: theme.colors.secondary.light,
						...headerItems.selectedStyle
					}
					: {}
			}}
			// If we have only one header item, the hover style is similar to the regular style: no hover effect
			hoverStyle={headerItems.data.length > 1 && isItemSelected === false
				? { ...headerItems.hoverStyle }
				: { ...headerItems.selectedStyle, ...headerItems.selectedHoverStyle }
			}>

			<StackPanel
				onClick={e => { if (postMsgAsync) postMsgAsync({ type: "SELECTION", data: { key: headerKey } }) }}>
				{editingTabKey === headerKey
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
								const newTabName = editingTabName === ""
									? header.tabName
									: editingTabName
								if (postMsgAsync) {
									postMsgAsync({
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
					itemsAlignV={"center"}
					orientation={"vertical"}>
					{isItemSelected === true && enableEditing !== false
						? <div
							onClick={(e: MouseEvent<HTMLDivElement>) => { e.stopPropagation() }}
							onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
								const newTabName = editingTabName === ""
									? header.tabName
									: editingTabName
								if (editingTabKey !== undefined) {
									if (postMsgAsync) {
										postMsgAsync({
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

							{/* {editingTabKey === headerKey
								? <Icons.CheckmarkBold size="1em" />
								: <Icons.EditPencil size="1em" />} */}

						</div>

						: <div />
					}
					{isItemSelected === true && editingTabKey === undefined && enableDeletion !== false
						? <div
							onClick={e => {
								e.stopPropagation()
								if (postMsgAsync) {
									postMsgAsync({
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

	switch (headerPanel.placement || defaultProps.headerPanel.placement) {
		case "top":
			return (
				<StackPanel
					{...htmlProps}
					orientation={"vertical"}
					style={{
						flexFlow: "column",
						height: "100%",
						...style
					}}>

					<HeaderPanelComponent
						style={{
							...defaultProps.headerPanel.style,
							...headerPanel.style
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
			throw new Error(`Unknown header panel placement: ${headerPanel.placement}`)
	}
}