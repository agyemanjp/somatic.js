/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '../../core'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackPanel, Props as StackPanelProps } from '../panels/stack-panel'
import { Component, ViewProps, CSSProperties } from '../../types'
import { deepMerge } from '@sparkwave/standard/collections/object'

export type Messages = (
	{ type: "selection", data: number }
)

export type Props<T = unknown> = StackPanelProps & ViewProps<T> & {
	selectedItemIndex: number,
	selectedItemStyle?: CSSProperties
}

export const StackView: Component<Props, Messages> = async (props) => {
	const defaultProps = {
		selectedItemIndex: 0,
		selectedItemStyle: {},
		postMsgAsync: async (msg: Messages) => { }
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
						onClick={(e) => { postMsgAsync({ type: "selection", data: index }) }}>

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
