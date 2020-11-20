/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from "../core"
import { Icon } from "../types"


export const makeIcon = (svgElement: JSX.Element): Icon => {
	return (props) => Promise.resolve(svgElement).then(elt => <svg
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