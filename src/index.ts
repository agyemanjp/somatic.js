/* eslint-disable @typescript-eslint/no-namespace */
export * from './types'
export * from './core'
export * from './components'
export * from './components/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Somatic from "./types"
declare global {
	namespace JSX {
		type Element = Promise<Somatic.VNode>

		interface IntrinsicElements {
			html: Somatic.HtmlHTMLAttributes<HTMLHeadingElement>,
			form: Somatic.HTMLAttributes<HTMLFormElement>;
			div: Somatic.HTMLAttributes<HTMLDivElement>;
			h1: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h2: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h3: Somatic.HTMLAttributes<HTMLHeadingElement>,
			br: Somatic.HtmlHTMLAttributes<HTMLBRElement>,
			i: Somatic.HtmlHTMLAttributes<HTMLElement>,
			b: Somatic.HtmlHTMLAttributes<HTMLElement>,
			p: Somatic.HtmlHTMLAttributes<HTMLParagraphElement>,
			li: Somatic.LiHTMLAttributes<HTMLLIElement>,
			ul: Somatic.HTMLAttributes<HTMLUListElement>,
			ol: Somatic.OlHTMLAttributes<HTMLOListElement>,
			a: Somatic.AnchorHTMLAttributes<HTMLAnchorElement>,
			select: Somatic.SelectHTMLAttributes<HTMLSelectElement>
			button: Somatic.ButtonHTMLAttributes<HTMLButtonElement>
			input: Somatic.InputHTMLAttributes<HTMLInputElement>;
			label: Somatic.LabelHTMLAttributes<HTMLLabelElement>,
			span: Somatic.HTMLAttributes<HTMLSpanElement>;
			optgroup: Somatic.OptgroupHTMLAttributes<HTMLOptGroupElement>,
			option: Somatic.OptionHTMLAttributes<HTMLOptionElement>;
			style: Somatic.StyleHTMLAttributes<HTMLStyleElement>;
			textarea: Somatic.TextareaHTMLAttributes<HTMLInputElement>;

			/* svg */
			svg: Somatic.SVGAttributes<SVGSVGElement>,
			g: Somatic.SVGAttributes<SVGGElement>,
			circle: Somatic.SVGAttributes<SVGCircleElement>,
			animate: Somatic.SVGAttributes<SVGAnimateElement>,
			animateTransform: Somatic.SVGAttributes<SVGAnimateTransformElement>,
			rect: Somatic.SVGAttributes<SVGRectElement>,
			line: Somatic.SVGAttributes<SVGLineElement>,
			polyline: Somatic.SVGAttributes<SVGPolylineElement>,
			path: Somatic.SVGAttributes<SVGPathElement>,
			polygon: Somatic.SVGAttributes<SVGPolygonElement>,
			title: Somatic.SVGAttributes<SVGTitleElement>,
			switch: Somatic.SVGAttributes<SVGSwitchElement>,
			desc: Somatic.SVGAttributes<SVGDescElement>,
			foreignObject: Somatic.SVGAttributes<SVGForeignObjectElement>,
			text: Somatic.SVGAttributes<SVGTextElement>,
			defs: Somatic.SVGAttributes<SVGSVGElement>,
			linearGradient: Somatic.SVGAttributes<SVGSVGElement>,
			stop: Somatic.SVGAttributes<SVGSVGElement>,
			filter: Somatic.SVGAttributes<SVGSVGElement>,
			clipPath: Somatic.SVGAttributes<SVGSVGElement>,
			use: Somatic.SVGAttributes<SVGSVGElement>,
		}
	}
}