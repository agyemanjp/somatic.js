/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { mergeProps } from '../../utils'
import { Component, Props } from '../../types'

/** Type that defines the struct we need to send when we want to pass groups of options to this component. */
export interface OptionsGrouped { label: string, options: (string | number)[] }

type Props = Props.Html & Props.Themed & {
	/** Index of selected value by default will be 0 */
	selectedIndex: number

	/** Options can be passed as an array of strings */
	options?: string[]

	/** Options can be passed as an array of objects that group objects */
	optionsGrouped?: OptionsGrouped[]

	/** Array of the indexes that can't be selected */
	disabledIndexes?: number[]

	/** Optional info that will be show as a tooltip for each option */
	descriptions?: string[]

	/** name property for the select html element*/
	name?: string
}

const defaultProps = {
	options: [],
	selectedIndex: 0,
	style: {
		backgroundColor: "white !important",
		background: "white !important"
	}
}

export const SelectInput: Component<Props> = (props) => {
	const {
		defaultValue,
		disabledIndexes,
		descriptions,
		postMsgAsync,
		optionsGrouped,
		options,
		selectedIndex,
		children,
		style
	} = mergeProps(defaultProps, props)

	const getCurrentValue = (selectedIndex_: number, optionsGrouped_?: OptionsGrouped[]) => {
		if (optionsGrouped_ !== undefined) {
			return optionsGrouped_.reduce<(string | number)[]>((accu, curr) => [...accu, ...curr.options], [])[selectedIndex_]
		}
		else {
			return (options || [])[selectedIndex_]
		}
	}
	const currentValue = getCurrentValue(selectedIndex || 0, optionsGrouped)
	const effectiveStyle = { ...defaultProps.style, ...style }

	return (
		<select
			defaultValue={defaultValue}
			name={name}
			style={{
				height: "1.5rem",
				...effectiveStyle,
				background: "white",
				color: disabledIndexes && disabledIndexes.indexOf(selectedIndex || 0) !== -1 ? "gray" : "black"
			}}
			onClick={(e) => { e.stopPropagation() }}
			onChange={(e) => { if (postMsgAsync) postMsgAsync({ type: "select", data: e.target.selectedIndex, }) }}

			{...selectedIndex ? { value: currentValue } : {}}>

			{optionsGrouped ?
				optionsGrouped.map((obj, index) => {
					return (<optgroup label={obj.label}>
						{obj.options.map((data) =>
							<option
								//key={data.toString()}
								value={data.toString()} /*selected={index === props.selectedIndex}*/>
								{data}
							</option>)}
					</optgroup>)
				})

				: (children || []).map((child, index) =>
					<option
						style={{ color: disabledIndexes && disabledIndexes.indexOf(index) !== -1 ? "gray" : "black" }}
						disabled={disabledIndexes && disabledIndexes.indexOf(index) !== -1 ? true : undefined}
						//key={child!.toString()}
						value={child?.toString()}
						{...index === selectedIndex ? { selected: true } : {}}>
						{descriptions !== undefined ? descriptions[index] : child.toString()}
					</option>
				)
			}
		</select>
	)
}