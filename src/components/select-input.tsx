/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, Component } from '../core'
import { HtmlProps } from './types'

/** Type that defines the struct we need to send when we want to pass groups of options to this component. */
export interface OptionsGrouped { label: string, options: (string | number)[] }

type Props = HtmlProps & {
	/** Index of selected value by default will be 0 */
	selectedIndex: number

	/** Options can be passed as an array of strings or can be passed as an array of objects that group other options */
	options: string[] | OptionsGrouped[]

	/** Array of the indexes that can't be selected */
	disabledIndexes?: number[]

	/** Optional info that will be show as a tooltip for each option */
	descriptions?: string[]

	/** name property for the select html element*/
	name?: string
}

type Messages = { type: "SELECTION", data: number }

export const SelectInput: Component<Props> = (props) => {
	const {
		options,
		selectedIndex,
		style,
		children
	} = props

	const getCurrentValue = () => {
		if (options.length > 0 && typeof options[0] !== "string") {
			const reducedOptions = (options as OptionsGrouped[]).reduce<(string | number)[]>((arr, curr) => {
				return [...arr, ...curr.options]
			}, [])
			return reducedOptions[selectedIndex]
		}
		else {
			return (options || [])[selectedIndex]
		}
	}
	const currentValue = getCurrentValue()

	return <select
		defaultValue={props.defaultValue}
		name={props.name}
		style={{
			height: "1.5rem",
			...style,
			background: "white",
			color: props.disabledIndexes
				&& props.disabledIndexes.indexOf(props.selectedIndex || 0) !== -1
				? "gray"
				: "black"
		}}
		onClick={(e) => e.stopPropagation()}
		onChange={(e) => {
			// if (props.postMsgAsync !== undefined) {
			// 	props.postMsgAsync({
			// 		type: "SELECTION",
			// 		data: e.target.selectedIndex,
			// 	})
			// }
		}}
		{...props.selectedIndex ? { value: currentValue as string } : {}}>

		{options.length > 0 && typeof options[0] !== "string"
			? (options as OptionsGrouped[]).map(obj => {
				return (<optgroup label={obj.label}>
					{obj.options.map(data =>
						<option
							value={data.toString()} >
							{data}
						</option>)}
				</optgroup>)
			})
			: (children && Array.isArray(children) && children.length > 0 ? children : options as any[]).map((child, index) =>
				<option
					style={{ color: props.disabledIndexes && props.disabledIndexes.indexOf(index) !== -1 ? "gray" : "black" }}
					disabled={props.disabledIndexes && props.disabledIndexes.indexOf(index) !== -1 ? true : undefined}
					value={child?.toString()}
					title={props.descriptions !== undefined ? props.descriptions[index] : undefined}
					{...index === props.selectedIndex ? { selected: true } : {}}>
					{child?.toString()}
				</option>
			)
		}
	</select >
}

// SelectInput.stateful = false
SelectInput.isPure = true
SelectInput.defaultProps = {
	style: {
		backgroundColor: "white !important",
		background: "white !important"
	}
}