import { createId } from "@paralleldrive/cuid2"
import { ArgsType, mergeDeep } from "@agyemanjp/standard"

import { Component, ComponentAsyncStateful, HtmlProps, CSSProperties } from "../../types"
import { createElement, render } from "../../core"
import { normalizeChildren } from "../../element"
import { View, ViewProps } from "../view"
import { StackPanel } from './stack-panel'

export async function* TabsPanel<THeader = unknown>(_props: ArgsType<Component<Props<THeader>>>[0]): AsyncGenerator<JSX.Element, JSX.Element, Props<THeader>> {
	const defaultProps/*: Props*/ = {
		selectedIndex: 0,
		headerItemStyle: {
			padding: "0.25em",
			paddingLeft: "0",
			marginRight: "0.5em",
			fontVariant: "all-small-caps",
			textDecoration: "underline"
		},
		selectedHeaderItemStyle: {
			fontWeight: "bold"
		},
		id: createId()
	}

	let props = mergeDeep()(defaultProps, _props)
	const state = {
		selectedIndex: props.selectedIndex ?? 0
	}

	while (true) {
		const {
			headers, headerItemStyle, headerStyle, selectedHeaderItemStyle,
			headerItemTemplate,
			selectedIndex,
			children,
			key,
			id,
			...htmlProps
		} = mergeDeep()(props, state)

		const normedChildren = normalizeChildren(children)
		const activeChild = normedChildren[selectedIndex]
		// console.log(`Yielding TabsPanel component\nChildren count: ${normedChildren.length}\nActive child: ${stringify(activeChild)}`)

		const newProps = yield <StackPanel id={id} orientation={"vertical"} {...htmlProps}>
			<View
				sourceData={headers}
				itemsPanel={StackPanel}
				orientation={"horizontal"}
				itemTemplate={headerItemTemplate}
				itemStyle={headerItemStyle}
				// hoverItemStyle={selectedHeaderItemStyle}
				selectedItemStyle={selectedHeaderItemStyle}
				selectedIndex={selectedIndex}
				selectionMode={"click"}
				onSelection={args => {
					console.log(`Setting selected index of tabs panel to ${args.selectedIndex}`)
					state.selectedIndex = args.selectedIndex
					render([TabsPanel])
				}}
			/>
			<div>{activeChild}</div>
		</StackPanel>

		// Update props (including stateful members and extra state) based on injected props
		props = mergeDeep()(props, newProps ?? {})

		// if selectedIndex has changed externally from what was initially passed, reset selectedIndex
		state.selectedIndex = (props.selectedIndex !== newProps.selectedIndex)
			? newProps.selectedIndex ?? state.selectedIndex
			: state.selectedIndex
	}
}

export type Props<THeader = unknown> = HtmlProps & {
	headers: Array<THeader>
	headerStyle?: CSSProperties
	headerItemTemplate?: ViewProps<THeader>["itemTemplate"]
	headerItemStyle?: CSSProperties
	selectedHeaderItemStyle?: CSSProperties
	selectedIndex?: number
}

type State = {
	selectedIndex: number
}

// TabsPanel.stateful = false
TabsPanel.isPure = true


