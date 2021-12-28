/* eslint-disable prefer-const */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable brace-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// import { deepMerge, noop, promisify } from '@agyemanjp/standard'

import { createElement, Component, CSSProperties, EventHandler, SyntheticEvent } from '../core'
import { PanelProps, HtmlProps } from './types'
import { StackPanel } from './stack-panel'

// interface SelectionEvent extends SyntheticEvent { selectedIndex: number }
// const event = new CustomEvent('build', { detail: elem.dataset.time })

// ToDo: Implement deletion and rearrangement

export type Props<T = unknown> = HtmlProps & PanelProps & {
	sourceData: Iterable<T>
	selectedIndex?: number,

	itemsPanel: Component<HtmlProps & PanelProps>,
	itemTemplate?: Component<{ item: T, index: number, selected?: boolean/*, children?: never[]*/ }>
	itemStyle?: CSSProperties,
	selectedItemStyle?: CSSProperties

	selectionEnabled?: boolean
	arrangementEnabled?: boolean
	deletionEnabled?: boolean

	onSelect?: (eventData: { selectedIndex: number }) => void
	// onDelete?: (eventData: { deletedIndex: number }) => void
	// onArrange?: (eventData: { oldIndex: number, newIndex: number }) => void
}

export async function* View<T>(props: Props<T> & { children?: never[] }): AsyncGenerator<JSX.Element, JSX.Element, typeof props> {
	const defaultProps = () => ({
		selectedIndex: 0,
		itemsPanel: StackPanel,
		itemTemplate: (p => <div>{p.item}</div>) as Required<Props<T>>["itemTemplate"],
		itemStyle: {} as CSSProperties,
		selectedItemStyle: {} as CSSProperties,
		selectionEnabled: true,
		// deletionEnabled: true,
		// arrangementEnabled: true,
	})

	try {
		let {
			sourceData,
			itemTemplate,
			itemsPanel: ItemsPanel,
			itemStyle,
			selectedItemStyle,
			selectedIndex,
			children, // children will be ignored, should be undefined
			style,
			selectionEnabled,
			deletionEnabled,
			arrangementEnabled,
			onSelect,
			// onDelete,
			// onArrange,
			...restOfProps
		} = { ...defaultProps(), ...props }

		while (true) {
			const newProps = yield <ItemsPanel style={style} {...restOfProps}>
				{
					[...sourceData].map((item, index) =>
						<div //key={`item-container-${index}`}
							style={{ ...itemStyle, ...index === selectedIndex ? selectedItemStyle : {} }}
							onClick={(ev) => {
								if (selectionEnabled) {
									selectedIndex = index
									if (onSelect)
										onSelect({ selectedIndex: 1 })
								}
							}}>

							{itemTemplate({ item, index, selected: index === selectedIndex })}
						</div>
					)
				}
			</ItemsPanel>

			// Update props in case new values have been injected via the yield 
			// eslint-disable-next-line require-atomic-updates
			({
				sourceData,
				itemTemplate,
				itemsPanel: ItemsPanel,
				itemStyle,
				selectedItemStyle,
				selectedIndex,
				children, // children will be ignored, should be undefined
				style,
				selectionEnabled,
				deletionEnabled,
				arrangementEnabled,
				onSelect,
				// onDelete,
				// onArrange,
				...restOfProps
			} = { ...defaultProps(), ...newProps })
		}
	}
	catch (e) {
		console.error(`View render: ${e}`)
		throw e
	}
}


// this should succeed type-checking
// const elt1 = <View sourceData={[1, 2, 3]} itemsPanel={StackPanel}></View>

// this should fail type-checking
// const elt2 = <View sourceData={[1, 2, 3]} itemsPanel={StackPanel}><div /></View>


