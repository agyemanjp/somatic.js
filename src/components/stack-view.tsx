/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { deepMerge } from '@sparkwave/standard/collections/object'

import { createElement, mergeProps } from '../core'
import { CSSProperties, PropsExtended, PanelProps, ViewProps } from '../types'
import { StackPanel } from './index'

export type Messages = (
	{ type: "selection", data: number }
)

export type Props<T = unknown> = PanelProps & ViewProps<T> & {
	selectedItemIndex: number,
	selectedItemStyle?: CSSProperties,
	style?: CSSProperties
}

export async function StackView<T>(props: PropsExtended<Props<T>, Messages>) {
	const defaultProps = {
		selectedItemIndex: 0,
		selectedItemStyle: {} as CSSProperties,
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
		} = mergeProps(defaultProps, props)

		return <StackPanel {...restOfProps}>

			{[...sourceData]
				.map((item, index) =>
					<div
						style={{ ...itemStyle, ...index === selectedItemIndex ? selectedItemStyle : {} }}
						onClick={(e) => { postMsgAsync({ type: "selection", data: index }) }}>

						{itemTemplate
							? itemTemplate({ item, index })
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
