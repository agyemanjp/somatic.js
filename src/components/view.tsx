/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { deepMerge, noop, promisify } from '@sparkwave/standard'

import { createElement, mergeProps } from '../core'
import { Component, CSSProperties, PropsExtended, MergedPropsExt, PanelProps, StyleProps, ViewProps } from '../types'

export type Messages = (
	| { type: "ITEM-SELECTED", data: { index: number } }
	| { type: "ITEM-DELETED", data: { index: number } }
)

type Props<T = unknown> = StyleProps & PanelProps & {
	sourceData: Iterable<T>
	itemsPanel: Component<PanelProps>,

	selectedIndex?: number,
	itemTemplate?: (itemInfo: {
		item: T,
		index: number,
		selected: boolean,
		select: () => void,
		delete: () => void
	}) => JSX.Element

	itemStyle?: CSSProperties,
	selectedItemStyle?: CSSProperties

	extraFeatures?: {
		selection?: boolean
		arrangement?: boolean
		deletion?: boolean
	}
}
type State = {

}

const defaultProps = () => ({
	selectedIndex: 0,
	itemStyle: {} as CSSProperties,
	selectedItemStyle: {} as CSSProperties,
	extraFeatures: {},
	postMsgAsync: promisify(noop)
})

const defaultState = function <T>(props?: Props<T>) {
	return {
		selectedIndex: props?.selectedIndex ?? 0
	}
}

export async function View<T>(
	_: PropsExtended<Props<T>, Messages>,
	props: MergedPropsExt<Props<T>, Messages, ReturnType<typeof defaultProps>>,
	state: ReturnType<typeof defaultState> & State & Partial<State> & { setState: (delta: Partial<State>) => void }
) {

	try {
		const {
			sourceData,
			itemTemplate,
			itemsPanel,
			itemStyle,
			selectedItemStyle,
			postMsgAsync,
			children,
			style,

			...restOfProps
		} = props

		const { selectedIndex, setState } = state

		return <props.itemsPanel {...restOfProps}>
			{[...sourceData].map((item, index) =>
				<div /*key={`item-container-${index}`}*/
					style={{ ...itemStyle, ...index === selectedIndex ? selectedItemStyle : {} }}
					onClick={(e) => {
						if (!itemTemplate) {
							setState({ selectedIndex: index })
							postMsgAsync({ type: "ITEM-SELECTED", data: { index } })
						}
					}}>

					{itemTemplate
						? itemTemplate({
							item,
							index,
							selected: index === selectedIndex,
							select: () => {
								setState({ selectedIndex: index })
								postMsgAsync({ type: "ITEM-SELECTED", data: { index } })
							},
							delete: () => {
								postMsgAsync({ type: "ITEM-DELETED", data: { index } })
							}
						})
						: String(item)
					}
				</div>
			)}

		</props.itemsPanel>
	}
	catch (e) {
		console.error(`StackView render: ${e}`)
		throw e
	}
}
