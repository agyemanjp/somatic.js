import { mergeDeep } from "@agyemanjp/standard"
import { Component, SVGAttributes, UIElement, createElement, isComponentElt, isIntrinsicElt } from ".."

type SVGProps = SVGAttributes<SVGGElement>;
export type Icon = Component<SVGProps>;

export const create = (elt: UIElement<SVGProps>): Icon => {
	const defaults = {
		preserveAspectRatio: "xMidYMid meet",
		fill: "currentColor",
		viewBox: "0 0 384 512",
		style: {
			height: "inherit",
			width: "inherit"
		},
	}

	return function (props) {
		if (isIntrinsicElt(elt) || isComponentElt(elt)) {
			const { key, children, ...svgProps } = mergeDeep()(
				defaults,
				elt.props ?? {},
				props
			)

			return createElement("svg", { ...svgProps }, elt.children)
		}
		else {
			return elt
		}
	}
}
