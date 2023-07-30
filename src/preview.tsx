
import { MediaSet } from "./components"
import { createElement, mountElement } from "./core"
import * as Icons from './icons'


(async () => {

	if (typeof document !== "undefined") {
		document.addEventListener("DOMContentLoaded", async event => {
			const rootContainerNode = document.getElementById("root")
			if (!rootContainerNode) { throw new Error(`Root container with id ${rootContainerNode} not found`) }

			const IconPreview = (() => <div style={{

			}}>
				<div style={{ display: "flex", height: "20%" }}>
					<p id="iconLabel">Icons</p>
					<p id="componentLabel" style={{ paddingLeft: "10px" }}>Components</p>
				</div>
				{/* Icons Container */}
				<div
					id="iconsContainer" style={{
						display: "grid",
						height: "100%",
						gridTemplateColumns: "25% 25% 25% 25%",

						gridGap: "10px",
						padding: "20px",
						justifyContent: "space-evenly",
						alignContent: "space-evenly"
					}}>
					{Object.entries(Icons).map(([key, ico]) => (<div
						id={key}
						style={{
							alignContent: "center",
							border: "1px solid",
							justifyContent: "center",
							textAlign: "center",
							paddingTop: "10px",
							paddingBottom: "50px",
							height: "60px"
						}}>{createElement(ico, {})}
						<p>{key}</p>
					</div>))}
				</div>
				{/** Components Container */}
				<div id="componentsContainer" style={{ display: 'none' }}>
					{/* <p>Carousel Panel</p>
					<div style={{ height: '100px' }}>
						<CarouselPanel wrapAround={true} chevronSize='50px' id='carousel' style={{ height: "500px", width: "auto", alignItems: "center", justifyContent: "center", display: "flex" }}>
							<div><img src="https://craftinginterpreters.com/image/chunks-of-bytecode/ast.png" /></div>
							<div><img src="https://www.digitalocean.com/_next/static/media/default-avatar.14b0d31d.jpeg" /></div>
							<div>Some sample text</div>
							<div><button>A button</button></div>
						</CarouselPanel>
					</div> */}
					<div style={{height: "500px"}}>
						<MediaSet/>
					</div>
				</div>


			</div>)()

			await mountElement(IconPreview, rootContainerNode as Element)

			const iconLabel = document.getElementById('iconLabel')
			const componentLabel = document.getElementById('componentLabel')
			const iconsContainer = document.getElementById('iconsContainer')
			const componentsContainer = document.getElementById('componentsContainer')

			if (iconLabel && componentLabel && iconsContainer && componentsContainer) {

				// Click listeners for 'Icons' and 'Components'
				iconLabel.addEventListener('click', function () {
					iconsContainer.style.display = 'grid'
					componentsContainer.style.display = 'none'
				})

				componentLabel.addEventListener('click', function () {
					iconsContainer.style.display = 'none'
					componentsContainer.style.display = 'block'
				})
			}
		})
	}
})()
