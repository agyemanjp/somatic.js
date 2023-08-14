import { createElement, mountElement } from '../../core'
import { CarouselPanel } from '../../components/panels/carousel-panel'
import * as Icons from '../../icons'


function Preview() {
	const handleClick = (tab: string) => {
		const iconsContainer = document.getElementById('iconsContainer')
		const componentsContainer = document.getElementById('componentsContainer')

		if (iconsContainer && componentsContainer) {
			if (tab === 'icons') {
				iconsContainer.style.display = 'grid'
				componentsContainer.style.display = 'none'
			}
			else if (tab === 'components') {
				iconsContainer.style.display = 'none'
				componentsContainer.style.display = 'block'
			}
		}
	}

	const renderIcons = () => (
		<div
			id="iconsContainer"
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

					{createElement(ico, {})}
					<p>{key}</p>
				</div>
			))}
		</div>
	)

	const renderComponents = () => (
		<div id="componentsContainer" style={{ display: 'none' }}>
			<p>Carousel Panel</p>
			<div style={{ height: '100px' }}>
				<CarouselPanel chevronSize="50px" id="carousel" style={{ height: '300px', width: '300px' }}>
					<div>
						<img src="https://craftinginterpreters.com/image/chunks-of-bytecode/ast.png" alt="AST" />
					</div>
					<div>
						<img src="https://www.digitalocean.com/_next/static/media/default-avatar.14b0d31d.jpeg" alt="Avatar" />
					</div>
					<div>Some sample text</div>
					<div>
						<button>A button</button>
					</div>
				</CarouselPanel>
			</div>
		</div>
	)

	return (
		<div>
			<div style={{ display: 'flex', height: '20%' }}>
				<p id="iconLabel" onClick={() => handleClick('icons')}>Icons</p>
				<p id="componentLabel" style={{ paddingLeft: '10px' }} onClick={() => handleClick('components')}>
					Components
				</p>
			</div>
			{renderIcons()}
			{renderComponents()}
		</div>
	)
}

(async () => {
	if (typeof document !== 'undefined') {
		document.addEventListener('DOMContentLoaded', async event => {
			const rootContainerNode = document.getElementById('root')
			if (!rootContainerNode) {
				throw new Error(`Root container with id root not found`)
			}
			console.log(`Mounting`)
			await mountElement(<Preview />, rootContainerNode)
		})
	}
})()