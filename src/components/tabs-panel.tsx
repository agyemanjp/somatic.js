/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { deepMerge, } from '@sparkwave/standard/collections/object'

import { StackView, Props as StackViewProps } from './stack-view'
import { StackPanel, Props as StackPanelProps } from './stack-panel'
import { Component, CSSProperties, HtmlProps, ViewProps } from '../types'
import { createElement, makeComponent } from '../core'


export type Messages = (
	{ type: "selection", data: string }
)

export type Props = HtmlProps & {
	headers: ViewProps<string>
	selectedIndex?: number
	selectedItemStyle: CSSProperties
}

export const TabsPanel = makeComponent({})<Props>(async (props) => {

	const defaultProps/*: RecursivePartial<Props>*/ = {
		selectedIndex: 0,
		selectedItemStyle: {
			fontWeight: "bold"
		},
		headers: {
			itemTemplate: (headerInfo: { item: unknown, index: number }) => <div>{headerInfo.item}</div>
		},
		postMsgAsync: async (msg: Messages) => ""
	}

	const {
		headers,
		selectedIndex,
		selectedItemStyle,

		children,
		postMsgAsync,
		style,
		...htmlProps
	} = deepMerge(defaultProps, props)


	return <StackPanel orientation={"vertical"}>
		<StackView
			orientation={"horizontal"}
			sourceData={headers.sourceData}
			itemStyle={headers.itemStyle}
			selectedItemStyle={selectedItemStyle}
			itemTemplate={headers.itemTemplate}
			postMsgAsync={async msg => {
				postMsgAsync({
					type: "selection",
					data: [...headers.sourceData][msg.data]
				})
			}}
			selectedItemIndex={selectedIndex}>

		</StackView>

		<div>
			{(children ?? [])[selectedIndex]}
		</div>
	</StackPanel>
})

