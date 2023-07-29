
import { deepMerge } from '@agyemanjp/standard'
import * as cuid from '@paralleldrive/cuid2'
import { StackPanel } from './stack-panel'
import { ChevronLeft, ChevronUp, ChevronRight, ChevronDown } from '../../icons'
import { PanelProps, HtmlProps, CSSLength, Component, Children } from '../../types'
import { createElement, invalidateUI } from '../..'

export type CarouselPanelProps = PanelProps & HtmlProps & {
	chevronSize?: CSSLength
}

export const CarouselPanel: Component<CarouselPanelProps> = function* (_props) {
	const defaultProps = {
		id: cuid.createId(),
		orientation: 'horizontal',
		chevronSize: '1em',
		style: {
			border: 'thin solid gray',
			overflow: 'hidden',
		}
	} satisfies CarouselPanelProps

	const props = deepMerge(defaultProps, _props)

	const {
		id,
		orientation,
		itemsAlignH,
		itemsAlignV,
		chevronSize,
		style,
		children,
		...htmlProps
	} = props as Required<CarouselPanelProps>

	const handlePrevButtonClicked = (_state: typeof state) => {
		if (_state.itemIndex > 0) {
			_state.itemIndex--
		}
		else {
			_state.itemIndex = items.length - 1
		}

		invalidateUI([id])
	}

	const handleNextButtonClicked = (_state: typeof state) => {
		if (items.length > _state.itemIndex + 1) {
			_state.itemIndex++
		}
		else {
			_state.itemIndex = 0
		}

		invalidateUI([id])
	}


	const state = {
		itemIndex: 0
	}
	const items = children as Children[]
	const ChevronPrev = orientation === "horizontal" ? ChevronLeft : ChevronUp
	const ChevronNext = orientation === "horizontal" ? ChevronRight : ChevronDown

	while (true) {
		yield (
			<StackPanel
				id={id}
				orientation={orientation}
				itemsAlignH={orientation === "horizontal" ? "dock" : "stretch"}
				itemsAlignV={orientation === "horizontal" ? "stretch" : "dock"}
				style={style}
				{...htmlProps}>

				<ChevronPrev
					style={{
						height: orientation === "horizontal" ? "100%" : chevronSize,
						width: orientation === "vertical" ? "100%" : chevronSize
					}} onClick={() => handlePrevButtonClicked(state)} />
				<div
					style={{
						border: "thin solid silver",
						width: orientation === "horizontal" ? `calc(100% - (2 * ${chevronSize}))` : "unset",
						height: orientation === "vertical" ? `calc(100% - 2 * ${chevronSize})` : "unset",
						justifyContent: "center",
						alignItems: "center",
						overflow: "hidden"
					}}>
					{items[state.itemIndex]}
				</div>
				<ChevronNext
					style={{
						height: orientation === "horizontal" ? "100%" : chevronSize,
						width: orientation === "vertical" ? "100%" : chevronSize
					}} onClick={() => handleNextButtonClicked(state)} />
			</StackPanel>
		)
	}
}

CarouselPanel.isPure = true
