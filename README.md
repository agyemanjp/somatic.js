# somatic.js

Functional, Asynchronous, Component-based UI Library that works with JSX. Inspired by [crank.js](https://crank.js.org/).

## Features

**Function-based**\
All components in Somatic are regular (stateless) or generator (stateful) synchronous or asynchronous functions. No classes, hooks, proxies or template languages are needed. These feature allows for simple and direct state management right inside components.

**Declarative**\
Somatic supports the JSX syntax popularized by React, allowing you to write HTML-like code directly in JavaScript.

**Props/State interaction management**\
Somatic allows component authors to manage the interaction between state and props directly in components, without any ugly life-cycle methods as in React, by injecting any props updates in the generators returned from stateful components.

**Strong JSX typing**\
Somatic supports very strong JSX typing. Elements and children are well typed, and components can specify if they accept children, something not possible in react

## Usage

**1. Install Somatic**\
`npm install --save @agyemanjp/somatic@latest`

**2. If you are using TypeScript, then in your _tsconfig.json_ file, include the following settings under _compilerOptions_**:

```json
"jsx": "react",
"jsxFactory": "createElement",
"jsxFragmentFactory": "Fragment",
```

**3. In your code, import from Somatic and write your components**

```typescript
import { createElement, Component, Fragment } from "@agyemanjp/somatic"
```

See examples below.

**4. In your client entry point, mount your root component**

```typescript
import { createElement, mountElement } from "@agyemanjp/somatic"

mountElement(<App />, document.getElementById("root"))
```

## Examples

**A stateless function component:**

```typescript
import {
	createElement,
	Component,
	PanelProps,
	HtmlProps,
} from "@agyemanjp/somatic"

export const StackPanel: Component<PanelProps & HtmlProps> = function (props) {
	const {
		key,
		orientation,
		itemsAlignH,
		itemsAlignV,
		children,
		style,
		id,
		...htmlProps
	} = props

	const alignItems = () => {
		switch (orientation === "vertical" ? itemsAlignH : itemsAlignV) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "stretch":
				return "stretch"
			default:
				return "initial"
		}
	}

	const justifyContent = () => {
		switch (orientation === "vertical" ? itemsAlignV : itemsAlignH) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "uniform":
				return "space-evenly"
			case "dock":
				return "space-between"
			default:
				return "initial"
		}
	}

	return (
		<div
			id={id}
			{...htmlProps}
			style={{
				...style,
				display: "flex",
				flexDirection: orientation === "vertical" ? "column" : "row",
				justifyContent: justifyContent(),
				alignItems: alignItems(),
			}}>
			{children}
		</div>
	)
}
```

<<<<<<< HEAD

**A stateful async generator function component:**

```typescript
import {
	createElement,
	PanelProps,
	HtmlProps,
	Component,
	CSSProperties,
	UIElement,
	renderToIntrinsicAsync,
	invalidateUI,
} from "@agyemanjp/somatic"
import { ArgsType, mergeDeep, deepMerge } from "@agyemanjp/standard"
import * as cuid from "cuid"
import { StackPanel } from "./stack-panel"

export async function* View<T>(
	_props: ArgsType<Component<ViewProps<T>>>[0]
): AsyncGenerator<JSX.Element, JSX.Element, typeof _props> {
	const defaultProps = {
		id: cuid(),
		selectedIndex: 0,
		itemsPanel: StackPanel,
		itemsPanelStyle: {},
		itemStyle: {},
		selectedItemStyle: {},
		selectionMode: "click" as Required<ViewProps>["selectionMode"],
		style: {},
	}

	let props = deepMerge(defaultProps, _props)

	while (true) {
		let {
			id,
			key,
			sourceData,
			itemsPanel: ItemsPanel,
			itemTemplate,
			style,
			orientation,
			itemsAlignV,
			itemsAlignH,
			itemStyle,
			itemsPanelStyle,
			selectedItemStyle,
			// hoverItemStyle,
			selectionMode,
			selectedIndex,
			onSelection,
			children, // children will be ignored, should be undefined
			...htmlProps
		} = mergeDeep()(defaultProps, props)

		const items = await Promise.all(
			[...sourceData].map((datum, index) => {
				const ItemTemplate = itemTemplate
				const itemElement = (
					ItemTemplate ? (
						<ItemTemplate
							id={id}
							value={datum}
							index={index}
							selected={index === selectedIndex}
						/>
					) : (
						<div
							id={id}
							style={{
								...itemStyle,
								...(index === selectedIndex ? selectedItemStyle : {}),
							}}>
							{String(datum)}
						</div>
					)
				) as UIElement

				const clickAction = () => {
					if (selectionMode && onSelection) onSelection({ selectedIndex: 0 })
				}

				return renderToIntrinsicAsync(itemElement).then((elt) => {
					if (elt && typeof elt === "object" && "props" in elt) {
						const onClick = elt.props.onClick
						elt.props.onClick =
							typeof onClick === "function"
								? () => {
										onClick()
										clickAction()
								  }
								: clickAction

						elt.props.style = {
							...itemStyle,
							...(typeof elt.props.style === "object" ? elt.props.style : {}),
						}
					}
					return elt
				})
			})
		)

		const newProps = yield (
			<ItemsPanel
				id={id}
				orientation={orientation}
				itemsAlignH={itemsAlignV}
				itemsAlignV={itemsAlignH}
				style={style}
				{...htmlProps}>
				{items}
			</ItemsPanel>
		)

		// Update props (including stateful members and extra state) based on injected props
		props = mergeDeep()(props, newProps ?? {}, {
			// if sourceData or selectedIndex has changed externally from what was initially passed, reset selectedIndex
			selectedIndex:
				newProps?.sourceData !== props.sourceData ||
				props.selectedIndex !== newProps?.selectedIndex
					? newProps?.selectedIndex ?? selectedIndex
					: selectedIndex,
		})
	}
}

type ViewProps<T = unknown> = HtmlProps &
	PanelProps & {
		sourceData: Iterable<T>
		selectedIndex?: number

		itemsPanel: Component<HtmlProps & PanelProps>
		itemTemplate?: Component<{
			id: string
			value: T
			index: number
			selected?: boolean /*, children?: never[]*/
		}>
		itemStyle?: CSSProperties
		selectedItemStyle?: CSSProperties

		children?: never[]

		/** Selection options, or undefined/null if disabled
		 * Mode indicates method of selection
		 */
		selectionMode?: "none" | "click" | "check" | "click-or-check"
		onSelection?: (eventData: { selectedIndex: number }) => void
	}
```

=======

> > > > > > > 2b940d3 (Improved Readme)

**A stateful async generator function component:**

```typescript
import {
	createElement,
	PanelProps,
	HtmlProps,
	Component,
	CSSProperties,
	UIElement,
	renderToIntrinsicAsync,
	invalidateUI,
} from "@agyemanjp/somatic"
import { ArgsType, mergeDeep, deepMerge } from "@agyemanjp/standard"
import * as cuid from "cuid"
import { StackPanel } from "./stack-panel"

export async function* View<T>(
	_props: ArgsType<Component<ViewProps<T>>>[0]
): AsyncGenerator<JSX.Element, JSX.Element, typeof _props> {
	const defaultProps = {
		id: cuid(),
		selectedIndex: 0,
		itemsPanel: StackPanel,
		itemsPanelStyle: {},
		itemStyle: {},
		selectedItemStyle: {},
		selectionMode: "click" as Required<ViewProps>["selectionMode"],
		style: {},
	}

	let props = deepMerge(defaultProps, _props)

	while (true) {
		let {
			id,
			key,
			sourceData,
			itemsPanel: ItemsPanel,
			itemTemplate,
			style,
			orientation,
			itemsAlignV,
			itemsAlignH,
			itemStyle,
			itemsPanelStyle,
			selectedItemStyle,
			// hoverItemStyle,
			selectionMode,
			selectedIndex,
			onSelection,
			children, // children will be ignored, should be undefined
			...htmlProps
		} = mergeDeep()(defaultProps, props)

		const items = await Promise.all(
			[...sourceData].map((datum, index) => {
				const ItemTemplate = itemTemplate
				const itemElement = (
					ItemTemplate ? (
						<ItemTemplate
							id={id}
							value={datum}
							index={index}
							selected={index === selectedIndex}
						/>
					) : (
						<div
							id={id}
							style={{
								...itemStyle,
								...(index === selectedIndex ? selectedItemStyle : {}),
							}}>
							{String(datum)}
						</div>
					)
				) as UIElement

				const clickAction = () => {
					if (selectionMode && onSelection) onSelection({ selectedIndex: 0 })
				}

				return renderToIntrinsicAsync(itemElement).then((elt) => {
					if (elt && typeof elt === "object" && "props" in elt) {
						const onClick = elt.props.onClick
						elt.props.onClick =
							typeof onClick === "function"
								? () => {
										onClick()
										clickAction()
								  }
								: clickAction

						elt.props.style = {
							...itemStyle,
							...(typeof elt.props.style === "object" ? elt.props.style : {}),
						}
					}
					return elt
				})
			})
		)

		const newProps = yield (
			<ItemsPanel
				id={id}
				orientation={orientation}
				itemsAlignH={itemsAlignV}
				itemsAlignV={itemsAlignH}
				style={style}
				{...htmlProps}>
				{items}
			</ItemsPanel>
		)

		// Update props (including stateful members and extra state) based on injected props
		props = mergeDeep()(props, newProps ?? {}, {
			// if sourceData or selectedIndex has changed externally from what was initially passed, reset selectedIndex
			selectedIndex:
				newProps?.sourceData !== props.sourceData ||
				props.selectedIndex !== newProps?.selectedIndex
					? newProps?.selectedIndex ?? selectedIndex
					: selectedIndex,
		})
	}
}

type ViewProps<T = unknown> = HtmlProps &
	PanelProps & {
		sourceData: Iterable<T>
		selectedIndex?: number

		itemsPanel: Component<HtmlProps & PanelProps>
		itemTemplate?: Component<{
			id: string
			value: T
			index: number
			selected?: boolean /*, children?: never[]*/
		}>
		itemStyle?: CSSProperties
		selectedItemStyle?: CSSProperties

		children?: never[]

		/** Selection options, or undefined/null if disabled
		 * Mode indicates method of selection
		 */
		selectionMode?: "none" | "click" | "check" | "click-or-check"
		onSelection?: (eventData: { selectedIndex: number }) => void
	}
```
