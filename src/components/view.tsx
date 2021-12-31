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
import * as cuid from "cuid"
import { createElement, Component, CSSProperties, emitCustomEvent } from '../core'
import { PanelProps, HtmlProps } from './types'
import { StackPanel } from './stack-panel'

// interface SelectionEvent extends SyntheticEvent { selectedIndex: number }
// const event = new CustomEvent('build', { detail: elem.dataset.time })

// ToDo: Implement deletion and rearrangement

export type Props<T = unknown> = HtmlProps & PanelProps & {
	sourceData: Iterable<T>
	selectedIndex?: number,

	itemsPanel: Component<HtmlProps & PanelProps>,
	itemTemplate?: Component<{ value: T, index: number, selected?: boolean/*, children?: never[]*/ }>
	itemStyle?: CSSProperties,
	selectedItemStyle?: CSSProperties

	selectionEnabled?: boolean
	// arrangementEnabled?: boolean
	// deletionEnabled?: boolean

	// Custom event handler callback
	onSelect?: (eventData: { selectedIndex: number }) => void
	// onDelete?: (eventData: { deletedIndex: number }) => void
	// onArrange?: (eventData: { oldIndex: number, newIndex: number }) => void
}

export async function* View<T>(props: Props<T> & { children?: never[] }): AsyncGenerator<JSX.Element, JSX.Element, typeof props> {
	const defaultProps = {
		id: cuid(),
		selectedIndex: 0,
		itemsPanel: StackPanel,
		itemTemplate: (p => <div>{p.value}</div>) as Required<Props<T>>["itemTemplate"],
		itemStyle: {} as CSSProperties,
		selectedItemStyle: {} as CSSProperties,
		selectionEnabled: true,
	}

	try {
		while (true) {
			let {
				id,
				style,
				children, // children will be ignored, should be undefined
				sourceData,
				itemTemplate,
				itemsPanel: ItemsPanel,
				itemStyle,
				selectedItemStyle,
				selectedIndex,
				selectionEnabled,
				onSelect,
				...restOfProps
			} = { ...defaultProps, ...props }

			// Yield the current UI, and also updating props with any new injected props
			props = (yield <ItemsPanel id={id} style={style} {...restOfProps}>
				{
					[...sourceData].map((item, index) =>
						<div id={`${id}_item_container_${index}`} // Pre-pend parent id so that child ids are globally unique
							style={{ ...itemStyle, ...index === selectedIndex ? selectedItemStyle : {} }}
							onClick={(ev) => {
								if (selectionEnabled) {
									const oldSelectedIndex = selectedIndex
									selectedIndex = index

									// Always use emitCustomEvent function to raise events for standardized handling
									emitCustomEvent({
										event: onSelect ? { handler: onSelect, data: { selectedIndex } } : undefined,

										// specify elements whose UI need updating as a result of the event
										invalidatedElementIds: [
											`${id}_item_container_${oldSelectedIndex}`,
											`${id}_item_container_${selectedIndex}`
										]
									})
								}
							}}>

							{itemTemplate({ value: item, index, selected: index === selectedIndex })}
						</div>
					)
				}
			</ItemsPanel>) ?? props // So that props is not overwritten with undefined in case none were injected
		}
	}
	catch (e) {
		console.error(`View render: ${e}`)
		throw e
	}
}


// this should succeed type-checking
// const elt1 = <View sourceData={[1, 2, 3]} itemsPanel={StackPanel}></View>

// this should fail type-checking because the View component does not accept children
// const elt2 = <View sourceData={[1, 2, 3]} itemsPanel={StackPanel}><div /></View>


