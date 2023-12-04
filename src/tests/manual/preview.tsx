
import { noop } from "@agyemanjp/standard"
import { stringify } from "@agyemanjp/standard"

import { createElement, fragment, mountElement } from '../../core'
import { ComponentAsyncStateful } from '../../types'
import { StackPanel } from '../../components/panels/stack-panel'
import * as Icons from '../../icons'


const Preview: ComponentAsyncStateful<{}> = async function* (_props, _render) {
	console.log(`Preview component starting`)

	const state: State = { tabSelected: "components" }
	const render = _render ?? noop

	const IconsPreview = () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '25% 25% 25% 25%',
				gridGap: '10px',
				padding: '20px',
				justifyContent: 'space-evenly',
				alignContent: 'space-evenly',
			}}>

			{Object.entries(Icons).map(([key, ico]) => (
				<div
					id={key}
					style={{
						alignContent: 'center',
						border: '1px solid',
						justifyContent: 'center',
						textAlign: 'center',
						paddingTop: '10px',
						paddingBottom: '50px',
						height: '60px',
					}}>

					{ico({})}

					<p>{key}</p>
				</div>
			))}
		</div>
	)
	const CompsPreview = () => {
		const children = <>
			<img
				src="https://craftinginterpreters.com/image/chunks-of-bytecode/ast.png"
				alt="AST"
			/>
			<img
				src="https://www.digitalocean.com/_next/static/media/default-avatar.14b0d31d.jpeg"
				alt="Avatar"
			/>
			<div>Some sample text</div>
			<button>A button</button>
		</>

		return <StackPanel orientation="vertical"></StackPanel>
	}

	while (true) {
		console.log(`Preview component yielding with state = ${stringify(state)}`)

		const elt = <StackPanel orientation="vertical" >
			<StackPanel style={{ gap: "0.25em" }}>
				<div
					style={{ textDecoration: state.tabSelected === "components" ? "underline" : "unset" }}
					onClick={() => {
						state.tabSelected = "components"
						console.log(`Components tab selected; re-rendering`)
						render()
					}}>Components</div>
				<div
					style={{ textDecoration: state.tabSelected === "icons" ? "underline" : "unset" }}
					onClick={() => {
						console.log(`Icons tab selected; re-rendering`)
						state.tabSelected = "icons"
						render()
					}}>Icons</div>
			</StackPanel>

			{
				state.tabSelected === "components"
					? <CompsPreview />
					: <IconsPreview />
			}
		</StackPanel>

		yield elt
	}
}

type State = { tabSelected: "components" | "icons" }

(async () => {
	if (typeof document !== 'undefined') {
		document.addEventListener('DOMContentLoaded', async event => {
			const rootContainerNode = document.getElementById('root')
			if (!rootContainerNode) {
				throw new Error(`Root container with id root not found`)
			}
			console.log(`Mounting`)
			let cache = await mountElement(<Preview />, rootContainerNode)
		})
	}
})()