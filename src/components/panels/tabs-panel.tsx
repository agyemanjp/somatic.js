/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createElement } from '../../core'
import { deepMerge } from '@sparkwave/standard/collections/object'
import { RecursivePartial } from '@sparkwave/standard'

import { StackView, Props as StackViewProps } from '../views/stack-view'
import { StackPanel, Props as StackPanelProps } from '../panels/stack-panel'
import { Component, HtmlProps, ViewProps, CSSProperties } from '../../types'


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


// export function renderChildren(children: JSX.Element[] | undefined) {
// 	return children?.map((child, index) => {
// 		return child
// 	})
// }