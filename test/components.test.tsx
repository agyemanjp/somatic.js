/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable init-declarations */

import * as assert from "assert"
import { Component, createElement, render } from '../dist/index.js'
import { PanelProps, CSSProperties } from '../dist/types.js'
import { StackPanel, DialogBox, StackView, ToggleInput, CommandBox } from '../dist/components/index.js'
import { describe, it, beforeEach, afterEach } from 'mocha'
const jsdom = require('mocha-jsdom')
jsdom({ url: 'http://localhost', skipWindowCheck: true })

const theme = {
	colors: {
		primary: {
			light: "#86a1bc",
			dark: "#34495e"
		},
		secondary: {
			light: "#d477b0",
			dark: "#C64B97"
		},

		error: "red",
		warning: "yellow",
		info: "green",

		whitish: "whitesmoke",
		blackish: "#555555",
		grayish: "#808080"
	},
	fonts: {
		text: "normal normal 12px serif",
		textAlt: "italics normal 12px serif",
		link: "normal normal 12px sans-serif",
		titleBig: "normal bold 24px sans-serif",
		titleMedium: "normal normal 20px sans-serif",
		titleSmall: "normal bold 12px sans-serif",
		tiny: "normal normal 10 serif"
	},
	thickness: 1
}

describe("Components", () => {
	// eslint-disable-next-line fp/no-let
	let container: HTMLDivElement | null

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
	})

	afterEach(() => {
		if (container) container?.remove()
		container = null
	})

	/*describe("StackPanel", () => {
		it("should render the element and its children with the default props", async () => {
			const node = <StackPanel>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			assert.equal(container?.children[0].textContent, 'test')
		})

		it("should set flex direction attribute as column when passing orientation props", async () => {
			const node = <StackPanel orientation={"vertical"}>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			const elt = container?.children[0]
			if (elt && 'style' in elt)
				assert.equal(elt["style"]["flex-direction"], 'column')

		})

		it("should set justify content attribute as centered when passing items align props", async () => {
			const node = <StackPanel itemsAlignH={"center"}>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			const elt = container?.children[0]
			if (elt && 'style' in elt)
				assert.equal(elt["style"]["justify-content"], 'center')

		})
	})*/

	/*describe("StackView", () => {
		it("should render the element and its children with the default props", async () => {
			const node = <StackView itemTemplate={(args) => <div>{args.item}</div>} sourceData={[1, 2, 3]} selectedItemIndex={0}></StackView>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			assert.equal(container?.children[0].textContent, 'test')
		})

		it("should set flex direction attribute as column when passing orientation props", async () => {
			const node = <StackPanel orientation={"vertical"}>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			const elt = container?.children[0]
			if (elt && 'style' in elt)
				assert.equal(elt["style"]["flex-direction"], 'column')

		})

		it("should set justify content attribute as centered when passing items align props", async () => {
			const node = <StackPanel itemsAlignH={"center"}>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			const elt = container?.children[0]
			if (elt && 'style' in elt)
				assert.equal(elt["style"]["justify-content"], 'center')

		})
	})*/

	/*describe("DialogBox", () => {
		it("should render the element and its content", async () => {
			const node = <DialogBox header={{ title: "error" }}><div>test</div></DialogBox>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			assert.equal(container?.children[0].textContent, ' Error! test-msg')
		})
		it("should render the element with its corresponding style according to its type", async () => {
			const node = <DialogBox buttons={[]}></DialogBox>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container?.appendChild(renderedNode)

			const elt = container?.children[0].children[0]
			if (elt && 'style' in elt)
				assert.equal(elt["style"]["background-color"], theme.colors.error)
		})
	})*/
})
