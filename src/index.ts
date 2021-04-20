/* eslint-disable @typescript-eslint/no-namespace */
export * from './types'
export * from './core'
export { removeListeners, stringifyAttribs, stringifyStyle, } from './utils'
export * from './components'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Somatic from "./types"
declare global {
	namespace JSX {
		type Element = Promise<Somatic.VNode>

		interface IntrinsicElements {
			html: Somatic.HtmlHTMLAttributes<HTMLHtmlElement>,
			head: Somatic.HtmlHTMLAttributes<HTMLHeadElement>,
			body: Somatic.HtmlHTMLAttributes<HTMLBodyElement>,
			meta: Somatic.MetaHTMLAttributes<HTMLMetaElement>,
			style: Somatic.StyleHTMLAttributes<HTMLStyleElement>,
			title: Somatic.HtmlHTMLAttributes<HTMLTitleElement>,
			link: Somatic.LinkHTMLAttributes<HTMLLinkElement>,
			script: Somatic.ScriptHTMLAttributes<HTMLScriptElement>,
			noscript: Somatic.HtmlHTMLAttributes<HTMLElement>,
			form: Somatic.FormHTMLAttributes<HTMLFormElement>;
			div: Somatic.HTMLAttributes<HTMLDivElement>;
			h1: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h2: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h3: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h4: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h5: Somatic.HTMLAttributes<HTMLHeadingElement>,
			h6: Somatic.HTMLAttributes<HTMLHeadingElement>,
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
			textarea: Somatic.TextareaHTMLAttributes<HTMLTextAreaElement>;

			table: Somatic.TableHTMLAttributes<HTMLTableElement>,
			th: Somatic.ThHTMLAttributes<HTMLTableHeaderCellElement>,
			tr: Somatic.HTMLAttributes<HTMLTableRowElement>,
			td: Somatic.TdHTMLAttributes<HTMLTableDataCellElement>,
			frame: Somatic.HTMLAttributes<HTMLFrameElement>,
			audio: Somatic.AudioHTMLAttributes<HTMLAudioElement>,
			img: Somatic.ImgHTMLAttributes<HTMLImageElement>,
			canvas: Somatic.CanvasHTMLAttributes<HTMLCanvasElement>,

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
			switch: Somatic.SVGAttributes<SVGSwitchElement>,
			desc: Somatic.SVGAttributes<SVGDescElement>,
			foreignObject: Somatic.SVGAttributes<SVGForeignObjectElement>,
			text: Somatic.SVGAttributes<SVGTextElement>,
			defs: Somatic.SVGAttributes<SVGDefsElement>,
			linearGradient: Somatic.SVGAttributes<SVGLinearGradientElement>,
			stop: Somatic.SVGAttributes<SVGStopElement>,
			filter: Somatic.SVGAttributes<SVGFilterElement>,
			clipPath: Somatic.SVGAttributes<SVGClipPathElement>,
			use: Somatic.SVGAttributes<SVGUseElement>,
		}
	}
}