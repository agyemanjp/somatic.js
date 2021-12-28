// /* eslint-disable fp/no-loops */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { deepMerge } from '@agyemanjp/standard'

// import { View } from './view'
// import { StackPanel } from './stack-panel'
// import { HtmlProps, ViewProps } from './types'
// import { createElement, Component, CSSProperties } from '../core'

// export type Props<THeader = any> = HtmlProps & {
// 	headers: Array<THeader>
// 	headerStyle?: CSSProperties
// 	headerItemTemplate?: Component<{ item: THeader, index: number, selected: boolean }>
// 	headerItemStyle?: CSSProperties
// 	selectedHeaderItemStyle?: CSSProperties
// 	selectedIndex?: number
// }

// export const TabsPanel: Component<Props> = async function* (props) {
// 	const { headers, headerItemStyle, headerItemTemplate, headerStyle, selectedHeaderItemStyle, selectedIndex, children, } = props
// 	const _selectedIndex = selectedIndex ?? 0

// 	while (true) yield <StackPanel orientation={"vertical"}>
// 		<View
// 			orientation={"horizontal"}
// 			sourceData={headers}
// 			itemStyle={headerItemStyle}
// 			selectedItemStyle={selectedHeaderItemStyle}
// 			itemsPanel={StackPanel}
// 			itemTemplate={headerItemTemplate}>

// 			{{ children }}
// 		</View>

// 		<div>{(children ?? [])[selectedIndex || 0]}</div>
// 	</StackPanel>
// }

// /*postMsgAsync={async msg => {
// 			return postMsgAsync
// 				? postMsgAsync({
// 					type: "selection",
// 					data: [...headers.sourceData][msg.data]
// 				})
// 				: undefined
// 		}}*/

// // TabsPanel.stateful = false
// TabsPanel.isPure = true
// TabsPanel.defaultProps = {
// 	selectedIndex: 0,
// 	selectedItemStyle: {
// 		fontWeight: "bold"
// 	}
// }

