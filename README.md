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
import { createElement, Component, Fragment } from '@agyemanjp/somatic'
```

See examples below.

**4. In your client entry point, mount your root component**
```typescript
import { createElement, mountElement } from "@agyemanjp/somatic"

mountElement(<App/>, document.getElementById("root"))
```

## Examples
**A stateless function component:**
```typescript
import { createElement, Component, PanelProps, HtmlProps } from '@agyemanjp/somatic'

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
		switch (orientation === "vertical" ? (itemsAlignH) : (itemsAlignV)) {
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
		switch (orientation === "vertical" ? (itemsAlignV) : (itemsAlignH)) {
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

	return <div id={id} {...htmlProps}
		style={{
			...style,
			display: "flex",
			flexDirection: orientation === "vertical" ? "column" : "row",
			justifyContent: justifyContent(),
			alignItems: alignItems()
		}}>

		{children}

	</div>
}
```
