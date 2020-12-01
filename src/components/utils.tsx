/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement, makeComponent } from "../core"
import { ComponentRegular, IconProps } from "../types"


export const makeIcon = (svgElement: JSX.Element): ComponentRegular<IconProps> => {
	return async (props) => Promise.resolve(svgElement).then(elt => <svg
		preserveAspectRatio='xMidYMid meet'
		fill='currentColor'
		{...elt.props /*as SVGAttributes<SVGElement>*/}
		style={props.style}
		width={props.size ?? props.style?.width ?? undefined}
		height={props.size ?? props.style?.height ?? undefined}
		color={props.color ?? props.style?.color ?? undefined}
		stroke={props.color ?? props.style?.color ?? undefined}>

		{elt.children}
	</svg>
	)
}