/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { mergeProps } from '../../utils'
import { Component, Props } from '../../types'

/** Type that defines the struct we need to send when we want to pass groups of options to this component. */
export interface OptionsGrouped { label: string, options: (string | number)[] }

type Props = Props.Html & Props.Themed & {
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

const defaultProps = {
	options: [],
	selectedIndex: 0,
	style: {
		backgroundColor: "white !important",
		background: "white !important"
	}
}

type Messages = { type: "SELECTION", data: number }

export const SelectInput: Component<Props, Messages> = async (props) => {
	const fullProps = mergeProps(defaultProps, props)

	const getCurrentValue = (options: string[] | OptionsGrouped[], selectedIndex: number) => {
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
	const currentValue = getCurrentValue(fullProps.options, fullProps.selectedIndex || 0)

	return (
		<select
			defaultValue={props.defaultValue}
			name={props.name}
			style={{
				height: "1.5rem",
				...fullProps.style,
				background: "white",
				color: props.disabledIndexes
					&& props.disabledIndexes.indexOf(props.selectedIndex || 0) !== -1
					? "gray"
					: "black"
			}}
			onClick={(e) => e.stopPropagation()}
			onChange={(e) => {
				if (props.postMsgAsync !== undefined) {
					props.postMsgAsync({
						type: "SELECTION",
						data: e.target.selectedIndex,
					})
				}

			}}
			{...props.selectedIndex ? { value: currentValue as string } : {}}>

			{fullProps.options.length > 0 && typeof fullProps.options[0] !== "string"
				? (fullProps.options as OptionsGrouped[]).map(obj => {
					return (<optgroup label={obj.label}>
						{obj.options.map(data =>
							<option
								value={data.toString()} >
								{data}
							</option>)}
					</optgroup>)
				})
				: (props.children || fullProps.options).map((child, index) =>
					<option
						style={{ color: props.disabledIndexes && props.disabledIndexes.indexOf(index) !== -1 ? "gray" : "black" }}
						disabled={props.disabledIndexes && props.disabledIndexes.indexOf(index) !== -1 ? true : undefined}
						value={child.toString()}
						{...index === props.selectedIndex ? { selected: true } : {}}>
						{props.descriptions !== undefined ? props.descriptions[index] : child.toString()}
					</option>
				)
			}
		</select >
	)
}