/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { deepMerge } from '@sparkwave/standard/collections/object'
import { RecursivePartial } from '@sparkwave/standard'

import { StackView, Props as StackViewProps } from './stack-view'
import { StackPanel, Props as StackPanelProps } from './stack-panel'
import { Component, CSSProperties, HtmlProps, ViewProps } from '../types'
import { createElement } from '../core'


export type Messages = (
	{ type: "selection", data: string }
)

export type Props = HtmlProps & {
	headers: ViewProps<string>
	selectedIndex?: number
}

export const TabsPanel: Component<Props, Messages> = (props) => {

	const defaultProps/*: RecursivePartial<Props>*/ = {
		selectedIndex: 0,
		headers: {
			itemTemplate: (headerInfo: { item: unknown, index: number }) => <div>{headerInfo.item}</div>,
			selectedItemStyle: {
				fontWeight: "bold"
			}
		}
	}

	const {
		headers,
		selectedIndex,

		children,

		style,
		...htmlProps
	} = deepMerge(defaultProps, props)


	return <StackPanel orientation={"vertical"}>
		<StackView
			orientation={"horizontal"}
			sourceData={headers.sourceData}
			itemStyle={headers.itemStyle}
			selectedItemStyle={headers.selectedItemStyle}
			itemTemplate={headers.itemTemplate}
			selectedItemIndex={selectedIndex}>

		</StackView>

		<div>
			{(children ?? [])[selectedIndex]}
		</div>
	</StackPanel>
}

