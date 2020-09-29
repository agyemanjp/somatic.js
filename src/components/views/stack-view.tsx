/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '../../core'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackPanel, Props as StackPanelProps } from '../panels/stack-panel'
import { Component, Props, CSSProperties } from '../../types'
import { deepMerge } from '@sparkwave/standard/collections/object'

export type Messages = (
	{ type: "selection", data: number }
)

export interface Props<T = unknown> extends StackPanelProps, Props.View<T> {
	selectedItemIndex: number,
	selectedItemStyle?: CSSProperties
}

export const StackView: Component<Props, Messages> = async (props) => {
	const defaultProps = {
		selectedItemIndex: 0,
		selectedItemStyle: {}
	}

	try {
		const {
			sourceData,
			selectedItemIndex,
			itemTemplate,
			itemStyle,
			selectedItemStyle,
			postMsgAsync,
			children,

			...restOfProps
		} = deepMerge(defaultProps, props)

		return <StackPanel {...restOfProps}>

			{[...sourceData]
				.map((item, index) =>
					<div
						style={{ ...itemStyle, ...index === selectedItemIndex ? selectedItemStyle : {} }}
						onClick={(e) => { postMsgAsync!({ type: "selection", data: index }) }}>

						{itemTemplate
							? itemTemplate({ item, index, selected: index === selectedItemIndex })
							: item
						}
					</div>
				)
			}

		</StackPanel>
	}
	catch (e) {
		console.error(`StackView render: ${e}`)
		throw e
	}
}
