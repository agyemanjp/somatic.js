
import { createElement, mountElement } from '../../src'
import * as Icons from '../index'


(async () => {

	if (typeof document !== "undefined") {
		document.addEventListener("DOMContentLoaded", async event => {
			const rootContainerNode = document.getElementById("root")
			if (!rootContainerNode) { throw new Error(`Root container with id ${rootContainerNode} not found`) }

			const IconPreview = (() => <div style={{
				display: "grid",
				height: "100%",
				gridTemplateColumns: "25% 25% 25% 25%",

				gridGap: "10px",
				padding: "20px",
				justifyContent: "space-evenly",
				alignContent: "space-evenly"
			}}>

				{/* eslint-disable-next-line react/jsx-key */}
				{Object.entries(Icons).map(([key, ico]) => (<div id={key}
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


			</div>)()

			await mountElement(IconPreview, rootContainerNode as Element)
		})
	}
})()
