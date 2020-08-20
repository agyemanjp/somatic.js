/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable init-declarations */
import assert from "assert"
import core from '../dist/index.js'
// import utils from './utils.mjs'
import mocha from 'mocha'
import * as jsdom from 'mocha-jsdom'

jsdom({ url: 'https://hypothesize.io' })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Component, createElement, render } = core
const { describe, it, beforeEach, afterEach } = mocha
// const { equivElms } = utils

describe("Components", () => {

	/** @type { HTMLDivElement } */
	// eslint-disable-next-line fp/no-let
	let container

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
	})
	afterEach(() => {
		container.remove()
		container = null
	})

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

	describe("Stack-panel", async () => {
		it("should render the element and its children with the default props", async () => {
			const node = <StackPanel>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container.appendChild(renderedNode)

			assert.equal(container.children[0].textContent, 'test')
		})
		it("should set flex direction attribute as column when passing orientation props", async () => {
			const node = <StackPanel orientation={Component.Orientation.vertical}>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container.appendChild(renderedNode)

			assert.equal(container.children[0]["style"]["flex-direction"], 'column')
		})
		it("should set justify content attribute as centered when passing items align props", async () => {
			const node = <StackPanel itemsAlignH={Component.Alignment.center}>{`test`}</StackPanel>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container.appendChild(renderedNode)

			assert.equal(container.children[0]["style"]["justify-content"], 'center')
		})
	})

	describe("Alert", async () => {
		it("should render the element and its content", async () => {
			const node = <Alert type={"error"} theme={theme} content={'test-msg'}></Alert>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container.appendChild(renderedNode)

			assert.equal(container.children[0].textContent, ' Error! test-msg')
		})
		it("should render the element with its corresponding style according to its type", async () => {
			const node = <Alert type={"error"} theme={theme} content={'test-msg'}></Alert>
			const renderedNode = await render(node)

			// Attach the element to the dom container
			container.appendChild(renderedNode)

			assert.equal(container.children[0].children[0]["style"]["background-color"], theme.colors.error)
		})
	})
})
