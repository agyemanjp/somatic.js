import { createElement, mountElement } from '../core'
import { CarouselPanel } from './index'

(async () => {
	if (typeof document !== 'undefined') {
		document.addEventListener('DOMContentLoaded', async event => {
			const rootContainerNode = document.getElementById('root')
			if (!rootContainerNode) { throw new Error(`Root container with id ${rootContainerNode} not found`) }

			const ComponentPreview = (() => (
				<div
					style={{
						display: 'grid',
						height: '100%',
						gridTemplateColumns: '25% 25% 25% 25%',
						gridGap: '10px',
						padding: '20px',
						justifyContent: 'space-evenly',
						alignContent: 'space-evenly',
					}}>
					<div style={{ height: '100px' }}>
						<CarouselPanel id='carousel' style={{ height: "300px", width: "300px" }}>
							<div><img src="https://craftinginterpreters.com/image/chunks-of-bytecode/ast.png" /></div>
							<div><img src="https://www.digitalocean.com/_next/static/media/default-avatar.14b0d31d.jpeg" /></div>
							<div>Some sample text</div>
							<div><button>A button</button></div>
						</CarouselPanel>
					</div>
				</div>
			))()

			await mountElement(ComponentPreview, rootContainerNode as Element)
		})
	}
})()
