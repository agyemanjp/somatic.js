/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { mergeProps } from '../../utils'
import { Component, Props, CSSProperties } from '../../types'

/** Type that defines the struct we need to send when we want to pass groups of options to this component. */
export interface OptionsGrouped { label: string, options: (string | number)[] }

interface Props extends Props.Html, Props.Themed {
	selectedIndex: number
	useOptGroup?: boolean // Used optionally to group related options
	optionsGrouped?: OptionsGrouped[]
	disabledIndexes?: number[]
	descriptions?: string[]
	name?: string
}

export const SelectInput: Component<Props> = (props) => {
	const defaultProps = {
		//...componentDefaults.html,
		//theme: componentDefaults.theme,
		//postMessage: componentDefaults.postMessage,
		selectedIndex: 0,
		useOptGroup: false,
		style: {
			backgroundColor: "white !important",
			background: "white !important"
		} as CSSProperties
	}

	const { defaultValue, disabledIndexes, descriptions, postMsgAsync, useOptGroup, optionsGrouped, selectedIndex, children, style } = mergeProps(defaultProps, props)


	const effectiveStyle = { ...defaultProps.style, ...style }
	// eslint-disable-next-line fp/no-let, init-declarations
	let currentValue: string | number | string[] | undefined

	if (useOptGroup === true) {
		// eslint-disable-next-line fp/no-let
		let index = selectedIndex;
		(optionsGrouped ?? []).every((el, i) => {
			if (index < el.options.length) {
				// eslint-disable-next-line fp/no-mutation
				currentValue = el.options[index]
				return false
			}
			else {
				// eslint-disable-next-line fp/no-mutation
				index -= el.options.length
				return true
			}
		})
	}
	else {
		// eslint-disable-next-line fp/no-mutation
		currentValue = (children || [])[selectedIndex || 0] as any
	}

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

			{useOptGroup ?
				(optionsGrouped ?? []).map((obj, index) => {
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