/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { hasValue } from '@agyemanjp/standard'

import { createElement, } from '../core'
import { View, ViewProps } from './view'
import { StackPanel } from './stack-panel'
import { HtmlProps, Component, CSSProperties } from '../types'

export const TabsPanel: Component<Props> = async function* (props) {
	const { headers, headerItemStyle, headerItemTemplate, headerStyle, selectedHeaderItemStyle, selectedIndex, children, } = props
	const _selectedIndex = selectedIndex ?? 0

	const _children = (!hasValue(children)) ? [] : Array.isArray(children) ? children.flat() : [children]

	while (true) yield <StackPanel orientation={"vertical"}>
		<View
			orientation={"horizontal"}
			sourceData={headers}
			itemStyle={headerItemStyle}
			selectedItemStyle={selectedHeaderItemStyle}
			itemsPanel={StackPanel}
			itemTemplate={headerItemTemplate}
		/>

		<div>{_children[selectedIndex || 0]}</div>
	</StackPanel>
}

export type Props<THeader = any> = HtmlProps & {
	headers: Array<THeader>
	headerStyle?: CSSProperties
	headerItemTemplate?: ViewProps<THeader>["itemTemplate"]
	headerItemStyle?: CSSProperties
	selectedHeaderItemStyle?: CSSProperties
	selectedIndex?: number
}

// TabsPanel.stateful = false
TabsPanel.isPure = true
TabsPanel.defaultProps = {
	selectedIndex: 0,
	selectedHeaderItemStyle: {
		fontWeight: "bold"
	}
}

