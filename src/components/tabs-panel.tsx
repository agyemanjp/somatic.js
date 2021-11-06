/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { deepMerge } from '@agyemanjp/standard'

import { View } from './view'
import { StackPanel } from './stack-panel'
import { HtmlProps, ViewProps } from './types'
import { createElement, Component, CSSProperties } from '../core'


export type Messages = (
	{ type: "selection", data: string }
)

export type Props = {
	headers: ViewProps<string>
	selectedIndex?: number
	selectedItemStyle?: CSSProperties
}

export const TabsPanel: Component<Props> = (props) => {

	const {
		headers,
		selectedIndex,
		selectedItemStyle,
		children,
	} = props


	return <StackPanel orientation={"vertical"}>
		<View
			orientation={"horizontal"}
			sourceData={headers.sourceData}
			itemStyle={headers.itemStyle}
			selectedItemStyle={selectedItemStyle}
			itemsPanel={StackPanel}

		// itemTemplate={headers.itemTemplate}
		/*postMsgAsync={async msg => {
			return postMsgAsync
				? postMsgAsync({
					type: "selection",
					data: [...headers.sourceData][msg.data]
				})
				: undefined
		}}*/
		// selectedItemIndex={selectedIndex || 0}
		>
			{{ children }}
		</View>

		<div>
			{(children ?? [])[selectedIndex || 0]}
		</div>
	</StackPanel>
}

// TabsPanel.stateful = false
TabsPanel.isPure = true
TabsPanel.defaultProps = {
	selectedIndex: 0,
	selectedItemStyle: {
		fontWeight: "bold"
	}
}

