import { Obj } from "@agyemanjp/standard"
import { colorConstants } from "./common"

/** General component type */
export type Component<P extends Obj = Obj> = ComponentOptions<P> & (
	((props: P & { children?: Children, key?: string }/*, extra: { invalidate: () => void }*/) =>
		// UIElement generic types below should not be generic type since we don't know their props in advance
		| AsyncGenerator<UIElement, UIElement, typeof props>
		| Generator<UIElement, UIElement, typeof props>
		| Promise<UIElement>
		| UIElement
	)
)
/** Async stateful component type */
export type ComponentAsyncStateful<P extends Obj = Obj> = ComponentOptions<P> & (
	(props: P & { children?: Children, key?: string }) => AsyncGenerator<UIElement, UIElement, typeof props>
)

/**
 *
 */
export interface ComponentOptions<P extends Obj = Obj> {

	name?: string

	isPure?: boolean

	defaultProps?: Partial<P>
}

export const Fragment = ""
/**
 *
 */
export type Fragment = typeof Fragment

/**
 *
 */
export type Children = UIElement | UIElement[]

/**
 *
 */
export interface UIElementBase<P = unknown> {

	props: P,

	children?: Children
}
/**
 *
 */
export interface IntrinsicElement<P extends Obj = Obj> extends UIElementBase<P> {

	type: string
}
/**
 *
 */
export interface ComponentElt<P extends Obj = Obj> extends UIElementBase<P> {

	type: Component<P>,

	result?: ComponentResult
}
/**
 *
 */
export type ValueElement = | null | string | number | bigint | symbol | boolean | Object

/** An UI element is, basically, information for a future (component) function invocation,
 * I.e., the component function plus the arguments with which to call it
 * A component element produces another component element, recursively,
 * until an intrinsic element is obtained, at which point we can generate an actual node from it
 */
export type UIElement<P extends Obj = Obj> = ComponentElt<P> | IntrinsicElement<P> | /*FragmentElement |*/ ValueElement

/**
 *
 */
export type ComponentResult = {
	element: UIElement,
	generator?: Generator<UIElement, UIElement> | AsyncGenerator<UIElement, UIElement>
}

/**
 *
 */
export interface ComponentEltAugmented<P extends Obj = Obj> extends ComponentElt<P> {

	result: ComponentResult
}

/**
 *
 */
export interface RenderingTrace {

	componentElts: ComponentEltAugmented[],

	leafElement: IntrinsicElement | ValueElement
}

/**
 *
 */
export type DOMElement = SVGElement | HTMLElement
/**
 *
 */
export type DOMAugmented = DOMElement & { renderTrace: RenderingTrace }

export interface CSSProperties1 {
	alignmentBaseline?: CSSProperty<(
		| "auto"
		| "baseline"
		| "before-edge"
		| "text-before-edge"
		| "middle"
		| "central"
		| "after-edge"
		| "text-after-edge"
		| "ideographic"
		| "alphabetic"
		| "hanging"
		| "mathematical"
		| "top"
		| "center"
		| "bottom"
	)>

	/** The `animation` property sets the animation properties for an element. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation 
	 */
	animation?: `${string} ${number} ${"normal" | "reverse" | "alternate" | "alternate-reverse"} ${"none" | "forward" | "backward" | "both"} ${"running" | "paused"} ${string}`


	/** The baseline-shift CSS property specifies how the baseline of an element should be moved relative to the rest of the text.
	 @see https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
	 */
	baselineShift?: CSSLength | "sub" | "super"

	/** The border-image-source CSS property sets the source image used to create an element's border image.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
	 */
	borderImageSource?: "none" | `url(${string})`

	/** The border-left CSS property sets the width, style, and color of an element's left border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-left
	 */
	borderLeft?: CSSLength | CSSBorderStyle

	/** The border-left-color CSS property sets the color of an element's left border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color
	 */
	borderLeftColor?: CSSColor

	/** The border-left-style CSS property sets the style of an element's left border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-style
	 */
	borderLeftStyle?: CSSBorderStyle

	/** The border-left-width CSS property sets the width of an element's left border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width
	 */
	borderLeftWidth?: CSSBorderWidth

	/** The border-right CSS property sets the width, style, and color of an element's right border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-right
	 */
	borderRight?: CSSLength | CSSBorderStyle

	/** The border-right-color CSS property sets the color of an element's right border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color
	 */
	borderRightColor?: CSSColor

	/** The border-right-style CSS property sets the style of an element's right border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-style
	 */
	borderRightStyle?: CSSBorderStyle

	/** The border-right-width CSS property sets the width of an element's right border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width
	 */
	borderRightWidth?: CSSBorderWidth

	/** The border-spacing CSS property sets the distance between adjacent cells of a table and the distance between a cell and its content.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
	 */
	borderSpacing?: CSSLength

	/** The border-style CSS property sets the style of an element's four borders.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
	 */
	borderStyle?: CSSBorderStyle

	/** The border-top CSS property sets the width, style, and color of an element's top border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-top
	 */
	borderTop?: CSSBorderWidth | CSSBorderStyle

	/** The border-top-color CSS property sets the color of an element's top border.
	 @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color
	 */
	borderTopColor?: CSSColor

	borderTopStyle?: CSSBorderStyle

	borderTopWidth?: CSSBorderStyle | CSSLength

	borderWidth?: string | CSSLength

	breakAfter?: (
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)

	breakBefore?: (
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)

	breakInside?: (
		| "auto"
		| "avoid"
		| "avoid-page"
		| "avoid-column"
		| "avoid-region"
	)

	captionSide?: (
		| "top"
		| "bottom"
		| "block-start"
		| "block-end"
		| "inline-start"
		| "inline-end"
	)

	clear?: (
		| "none"
		| "left"
		| "right"
		| "both"
		| "inline-start"
		| "inline-end"
	)

	clip?: string | null

	clipRule?: "nonzero" | "evenodd" | "inherit"

	colorInterpolationFilters?: string | null

	columnCount?: "auto" | number

	columnFill?: "auto" | "balance" | "balance-all"

	columnRule?: CSSBorderStyle | string

	columnRuleColor?: CSSColor | string

	columnRuleStyle?: CSSBorderStyle

	columnRuleWidth?: CSSBorderStyle | CSSLength

	columnSpan?: "none" | "all"

	columnWidth?: "auto" | CSSLength

	columns?: (
		| CSSLength
		| "auto"
		| number
		| string
	)

	content?: string | null

	counterIncrement?: string | "none"

	counterReset?: string | "none"

	cssFloat?: string | null

	float?: (
		| "left"
		| "right"
		| "none"
		| "inline-start"
		| "inline-end"
	)

	cssText?: string

	display?: (
		| "block"
		| "inline"
		| "inline-block"
		| "flex"
		| "inline-flex"
		| "grid"
		| "inline-grid"
		| "flow-root"
		| "none"
		| "contents"
		| "block flow"
		| "inline flow"
		| "inline flow-root"
		| "block flex"
		| "inline flex"
		| "block grid"
		| "inline grid"
		| "block flow-root"
		| "table"
		| "table-row"
		| "list-item"
	)

	dominantBaseline?: (
		| "auto"
		| "ideographic"
		| "alphabetic"
		| "hanging"
		| "mathematical"
		| "central"
		| "middle"
		| "text-after-edge"
		| "text-before-edge"
		| "text-top"
	)

	emptyCells?: "show" | "hide"

	enableBackground?: "accumulate" | `${number} ${number} ${number} ${number}`

	fill?: string | null

	fillOpacity?: number | `${number}%`

	fillRule?: "nonzero" | "evenodd"

	filter?: (
		| `url(${string})`
		| `blur(${CSSLength})`
		| `brightness(${number})`
		| `contrast(${number}%)`
		//| `drop-shadow(${CSSLength} ${CSSLength} ${CSSLength} ${CSSColor})`
		| `grayscale(${number}%)`
		| `hue-rotate(${number}deg)`
		| `invert(${number}%)`
		| `opacity(${number}%)`
		| `saturate(${number}%)`
		| `sepia(${number}%)`
		| string
		| "none"
	)

	flex?: (
		| "none"
		| "auto"
		| "initial"
		| number
		| CSSLength
		| string
	)

	flexBasis?: (
		| "auto"
		| CSSLength
		| "min-content"
		| "max-content"
		| "fit-content"
		| "content"
	)

	flexDirection?: (
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
	)

	flexFlow?: (
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
		| "nowrap"
		| "wrap"
		| "wrap-reverse"
		//| `${"row" | "row-reverse" | "column" | "column-reverse"} ${"nowrap" | "wrap" | "wrap-reverse"}`
	)

	flexGrow?: number

	flexShrink?: number

	flexWrap?: "nowrap" | "wrap" | "wrap-reverse"

	floodColor?: CSSColor

	floodOpacity?: number | `${number}%`

	font?: string | null

	fontFamily?: (
		| "serif"
		| "sans-serif"
		| "cursive"
		| "fantasy"
		| "monospace"
		| "system-ui"
		| "ui-serif"
		| "ui-sans-serif"
		| "ui-monospace"
		| "ui-rounded"
		| "emoji"
		| "math"
		| "fangsong"
		| string
		//         | `${string} ${"serif" | "sans-serif" | "cursive" | "fantasy" | "monospace" | "system-ui" | "ui-serif" |
		// "ui-sans-serif" | "ui-monospace" | "ui-rounded" | "emoji" | "math" | "fangsong"}`
	)

	fontFeatureSettings?: (
		| "normal"
		| string
		| `${string} ${"on" | "off" | number}`
	)


	fontSizeAdjust?: (
		| "none"
		| number
		| `${"ex-height" | "cap-height" | "ch-width" | "ic-width" | "ic-height"} ${number}`
	)

	fontStretch?: (
		| "normal"
		| "ultra-condensed"
		| "extra-condensed"
		| "condensed"
		| "semi-condensed"
		| "semi-expanded"
		| "expanded"
		| "extra-expanded"
		| "ultra-expanded"
		| `${number}%`
	)

	fontStyle?: (
		| "normal"
		| "italic"
		| "oblique"
		| `oblique ${number}deg`
	)

	fontVariant?: (
		| "normal"
		| "small-caps"
		| "all-small-caps"
		| "petite-caps"
		| "all-petite-caps"
		| "unicase"
		| "titling-caps"
		| "lining-nums"
		| "oldstyle-nums"
		| "proportional-nums"
		| "tabular-nums"
		| "diagonal-fractions"
		| "stacked-fractions"
		| "ordinal"
		| "slashed-zero"
		| "jis78"
		| "jis83"
		| "jis90"
		| "jis04"
		| "simplified"
		| "traditional"
		| "full-width"
		| "proportional-width"
		| "ruby"
	)

	glyphOrientationVertical?: `${number} ${"deg" | "grad" | "rad"}`

	imeMode?: (
		| "auto"
		| "normal"
		| "active"
		| "inactive"
		| "disabled"
	)

	justifyContent?: CSSProperty<(
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "left"
		| "right"
		| "normal"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)>

	kerning?: "auto" | number | CSSLength

	top?: CSSProperty<"auto" | CSSLength>

	bottom?: CSSLength | "auto"

	left?: CSSProperty<"auto" | CSSLength>

	/** The right property specifies the distance between the right edge of an element and the right edge of its containing element.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/right
	 */
	right?: CSSProperty<"auto" | CSSLength>


	readonly length?: CSSLength


	lightingColor?: CSSColor

	listStyle?: string | null

	listStyleImage?: "none" | `url(${string})`

	listStylePosition?: "inside" | "outside"

	listStyleType?: (
		| "none"
		| string
		| "disc"
		| "circle"
		| "square"
		| "decimal"
		| "cjk-decimal"
		| "decimal-leading-zero"
		| "lower-roman"
		| "upper-roman"
		| "lower-greek"
		| "lower-alpha"
		| "lower-latin"
		| "upper-alpha"
		| "upper-latin"
		| "arabic-indic"
		| "-moz-arabic-indic"
		| "armenian"
		| "bengali"
		| "-moz-bengali"
		| "cambodian"
		| "khmer"
		| "cjk-earthly-branch"
		| "-moz-cjk-earthly-branch"
		| "cjk-heavenly-stem"
		| "-moz-cjk-heavenly-stem"
		| "cjk-ideographic"
		| "devanagari"
		| "-moz-devanagari"
		| "ethiopic-numeric"
		| "georgian"
		| "gujarati"
		| "-moz-gujarati"
		| "gurmukhi"
		| "-moz-gurmukhi"
		| "hebrew"
		| "hiragana"
		| "hiragana-iroha"
		| "japanese-formal"
		| "japanese-informal"
		| "kannada"
		| "-moz-kannada"
		| "katakana"
		| "katakana-iroha"
		| "korean-hangul-formal"
		| "korean-hanja-formal"
		| "korean-hanja-informal"
		| "lao"
		| "-moz-lao"
		| "lower-armenian"
		| "malayalam"
		| "-moz-malayalam"
		| "mongolian"
		| "myanmar"
		| "-moz-myanmar"
		| "oriya"
		| "-moz-oriya"
		| "persian"
		| "-moz-persian"
		| "simp-chinese-formal"
		| "simp-chinese-informal"
		| "tamil"
		| "-moz-tamil"
		| "telugu"
		| "-moz-telugu"
		| "thai"
		| "-moz-thai"
		| "tibetan"
		| "trad-chinese-formal"
		| "trad-chinese-informal"
		| "upper-armenian"
		| "disclosure-open"
		| "disclosure-closed"
	)

	margin?: (
		| number
		| CSSLength
		| string
	)

	marginBottom?: CSSLength | "auto" | `${number}`

	marginLeft?: CSSLength | "auto" | `${number}`

	marginRight?: CSSLength | "auto" | `${number}`

	marginTop?: CSSLength | "auto" | `${number}`

	marker?: string | null

	markerEnd?: string | null

	markerMid?: string | null

	markerStart?: string | null

	mask?: string | null

	maxHeight?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)

	maxWidth?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)

	minHeight?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)

	minWidth?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)

	/**	Specifies whether zooming is chained to the next outermost element with zooming capabilities. */
	msContentZoomChaining?: "none" | "chained" | string | null
	/** Specifies the minimum and maximum zooming factor. */
	msContentZoomLimit?: string | null
	/** Specifies the maximum zooming factor. */
	msContentZoomLimitMax?: number | string | null
	/** Specifies the minimum zooming factor. */
	msContentZoomLimitMin?: number | string | null
	/** Specifies whether zooming positions are snapped to the nearest zooming factor. */
	msContentZoomSnap?: "none" | "mandatory" | "proximity" | string | null
	/** Specifies the positions where zooming is snapped. */
	msContentZoomSnapPoints?: string | null
	/** Specifies the type of zooming positions that are snapped. */
	msContentZoomSnapType?: "none" | "mandatory" | "proximity" | string | null
	/** Specifies whether zooming is enabled. */
	msContentZooming?: "none" | "zoom" | string | null
	/** Specifies the name of the object to which content flows. */
	msFlowFrom?: string | null
	/** Specifies the name of the element from which content flows. */
	msFlowInto?: string | null
	/** Specifies font feature settings. */
	msFontFeatureSettings?: string | null
	/** Specifies the grid column number of the element. */
	msGridColumn?: number | string | null
	/** Specifies the horizontal alignment of an element in a grid column. */
	msGridColumnAlign?: "start" | "end" | "center" | "stretch" | string | null
	/** Specifies the number of grid columns that an element spans. */
	msGridColumnSpan?: number | string | null
	/** Specifies the width of grid columns. */
	msGridColumns?: string | null
	/** Specifies the grid row number of the element. */
	msGridRow?: number | string | null
	/** Specifies the vertical alignment of an element in a grid row. */
	msGridRowAlign?: "start" | "end" | "center" | "stretch" | string | null
	/** Specifies the number of grid rows that an element spans. */
	msGridRowSpan?: number | string | null
	/** Specifies the height of grid rows. */
	msGridRows?: string | null
	/** Specifies whether and how background color and images are adjusted for high contrast. */
	msHighContrastAdjust?: "auto" | "none" | "incandescent" | "cold" | "contrast" | "blackwhite" | string | null
	/** Specifies the number of characters to display before a hyphenation occurs. */
	msHyphenateLimitChars?: number | string | null
	/** Specifies the maximum number of lines that can be broken before a hyphenation occurs. */
	msHyphenateLimitLines?: number | string | null
	/** Specifies the distance between the end of the hyphenation zone and the end of the line. */
	msHyphenateLimitZone?: number | string | null
	/** Specifies how words should be hyphenated. */
	msHyphens?: "none" | "manual" | "auto" | string | null
	/** Specifies the alignment of the input method editor (IME) candidate window. */
	msImeAlign?: "auto" | "before" | "after" | string | null
	/** Specifies how to handle the overflow content of an element. */
	msOverflowStyle?: "-ms-autohiding-scrollbar" | "scrollbar" | "scrollbarbutton" | "none" | "scrollbarthumb"

	/** Specifies whether scrolling is chained to the next outermost element with scrolling capabilities. */
	msScrollChaining?: 'none' | 'chained' | null

	/** Specifies the minimum and maximum scrolling positions. */
	msScrollLimit?: string | null

	/** Specifies the maximum horizontal scrolling position.
	 */
	msScrollLimitXMax?: number | null

	/** Specifies the minimum horizontal scrolling position. */
	msScrollLimitXMin?: number | null

	/** Specifies the maximum vertical scrolling position. */
	msScrollLimitYMax?: number | null

	/** Specifies the minimum vertical scrolling position. */
	msScrollLimitYMin?: number | null

	/** Specifies the type of scrolling rails that are displayed. */
	msScrollRails?: 'none' | 'railed' | null

	/** Specifies the horizontal positions where scrolling is snapped. */
	msScrollSnapPointsX?: string | null

	/** Specifies the vertical positions where scrolling is snapped. */
	msScrollSnapPointsY?: string | null

	/** Specifies the type of scrolling snap points. */
	msScrollSnapType?: 'none' | 'mandatory' | 'proximity' | null

	/** Specifies the horizontal snapping behavior. */
	msScrollSnapX?: 'none' | 'mandatory' | 'proximity' | null

	/** Specifies the vertical snapping behavior. */
	msScrollSnapY?: 'none' | 'mandatory' | 'proximity' | null

	/** Specifies the type of CSS transformation to apply during scrolling. */
	msScrollTranslation?: 'none' | 'translate' | null

	/** Specifies whether multiple text blocks can be combined into a single block. */
	msTextCombineHorizontal?: 'none' | 'all' | null

	/** Controls the scaling of text in mobile browsers. */
	msTextSizeAdjust?: 'auto' | 'none' | 'percentage' | null

	/** Specifies the touch actions that are permitted on an element. */
	msTouchAction?: 'auto' | 'none' | 'pan-x' | 'pan-y' | 'manipulation' | null

	/** Specifies the touch-select behavior. */
	msTouchSelect?: 'none' | 'text' | 'toggle' | null

	/** Specifies the user-select behavior. */
	msUserSelect?: 'none' | 'text' | 'all' | 'element' | null

	/** Specifies the flow direction of content around a floating object. */
	msWrapFlow?: 'auto' | 'both' | 'clear' | 'end' | 'maximum' | 'start' | 'maximum' | null

	/** Specifies the amount of space between wrapped text and the object it flows around. */
	msWrapMargin?: string | null

	/** Specifies whether the content should wrap around a floating object. */
	msWrapThrough?: 'none' | 'wrap'

	/** Sets the order in which a flex item appears within its container.
	 * A lower order means the item will appear first, and higher orders will appear later.
	 */
	order?: number | null

	/** Sets the minimum number of lines that must be left at the bottom of the last page of a document. */
	orphans?: number

	/** Sets the style of an element's outline, which is a line drawn around the element's outside edge. */
	outline?: CSSBorderStyle | string

	/** Sets the color of an element's outline. */
	outlineColor?: CSSColor | "invert"

	/** Sets the style of an element's outline. */
	outlineStyle?: CSSBorderStyle

	/** Sets the width of an element's outline. */
	outlineWidth?: CSSBorderWidth

	/** Specifies how overflow content is handled within an element's content box. */
	overflow?: "visible" | "hidden" | "clip" | "scroll" | "auto"

	/** Specifies how horizontal overflow content is handled within an element's content box. */
	overflowX?: "visible" | "hidden" | "clip" | "scroll" | "auto"

	/** Specifies how vertical overflow content is handled within an element's content box. */
	overflowY?: "visible" | "hidden" | "clip" | "scroll" | "auto"

	/** Sets the padding of an element. 
	 * Padding is the space between the content of an element and its border.
	 */
	padding?: CSSLength | CSSLength[]

	/** Sets the padding at the bottom of an element. */
	paddingBottom?: CSSLength

	/** Sets the padding at the left of an element. */
	paddingLeft?: CSSLength

	/** Sets the padding at the right of an element. */
	paddingRight?: CSSLength

	/** Sets the padding at the top of an element. */
	paddingTop?: CSSLength

	/** Specifies the page-break behavior after an element. */
	pageBreakAfter?: "auto" | "always" | "avoid" | "left" | "right" | "recto" | "verso"

	/** Specifies the page-break behavior before an element. */
	pageBreakBefore?: "auto" | "always" | "avoid" | "left" | "right" | "recto" | "verso"

	/** Specifies the page-break behavior inside an element. */
	pageBreakInside?: "auto" | "avoid"

	/** Specifies the position type of an element.
	 * Default value is 'static'.
	 */
	position?: "static" /*default*/ | "fixed" | "absolute" | "relative" | "sticky" | null

	/** Sets the typeface and format of quotation marks for text. */
	quotes?: "none" | "auto" | `${string} ${string}` | `${string} ${string} ${string} ${string}`


	/** Specifies the horizontal alignment of a Ruby text container relative to its base text.
	 */
	rubyAlign?: CSSProperty<"start" | "center" | "space-between" | "space-around">

	/** Specifies by how much Ruby text can hang below the baseline of the parent element.
	 */
	rubyOverhang?: CSSProperty<string | null>

	/** Specifies the color of the SVG shape or text element.
	 */
	stopColor?: CSSProperty<"currentColor" | CSSColor>

	/** Specifies the opacity of the SVG shape or text element.
	 */
	stopOpacity?: CSSProperty<number>

	/** Specifies the color of the SVG shape's stroke.
	 */
	stroke?: CSSProperty<string | null>

	/** Specifies the pattern of the SVG shape's stroke dashes.
	 */
	strokeDasharray?: CSSProperty<"none" | "inherit" | string | CSSLength>

	/** Specifies the distance from the start of the stroke to the beginning of the first dash.
	 */
	strokeDashoffset?: CSSProperty<CSSLength>

	/** Specifies the shape to be used at the end of an SVG shape's stroke.
	 */
	strokeLinecap?: CSSProperty<"butt" | "round" | "square">

	/** Specifies the shape to be used at the corners of an SVG shape's stroke.
	 */
	strokeLinejoin?: CSSProperty<"miter" | "round" | "bevel" | "arcs" | "miter-clip">

	/** Specifies the maximum allowed ratio of the miter length to half the stroke width.
	 */
	strokeMiterlimit?: CSSProperty<number>

	/** Specifies the opacity of the SVG shape's stroke.
	 */
	strokeOpacity?: CSSProperty<`${number}%`>

	/** Specifies the width of the SVG shape's stroke.
	 */
	strokeWidth?: CSSProperty<CSSLength>

	/** Specifies the layout algorithm to be used for a table element.
	 */
	tableLayout?: CSSProperty<"auto" | "fixed">

	/** The alignment of the text within the text content element.
	 */
	textAnchor?: "start" | "middle" | "end" | null

	/** The length of the Arabic kashida character.
	 */
	textKashida?: CSSLength | null

	/** The length of space to be used for the kashida character.
	 */
	textKashidaSpace?: CSSLength | null

	/** The position of the underline decoration of the text. */
	textUnderlinePosition?: "auto" | "under" | "left" | "right" | `${"auto" | "under" | "left" | "right"} ${"auto" | "under" | "left" | "right"}` | null

	/** Aligns the content within a flex container when there is extra space along the cross-axis.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
	 */
	webkitAlignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' | 'baseline' | 'safe' | 'unsafe' | null

	/** Aligns flex items along the cross-axis of the flex container.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
	 */
	webkitAlignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe' | 'unsafe' | null

	/** Aligns a flex item within its flex container.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
	 */
	webkitAlignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe' | 'unsafe' | null

	/** A shorthand property for all the animation-* properties, except animation-play-state.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation
	 */
	webkitAnimation?: string | null

	/** Defines a length of time to elapse before an animation starts, allowing an animation to begin execution some time after it is applied.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
	 */
	webkitAnimationDelay?: string | null

	/** Defines whether an animation should run forwards, backwards, or alternating back and forth.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
	 */
	webkitAnimationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | null

	/** Defines the length of time that an animation takes to complete one cycle.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
	 */
	webkitAnimationDuration?: string | null

	/** Defines how the animation applies styles to its target before and after it is executed.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
	 */
	webkitAnimationFillMode?: 'none' | 'forwards' | 'backwards' | 'both' | null

	/** Defines the number of times an animation cycle should be played before stopping.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
	 */
	webkitAnimationIterationCount?: 'infinite' | number | null

	/** Specifies the name of the keyframe to use for the animation.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
	 */
	webkitAnimationName?: string | null

	/** Defines whether the animation is running or paused.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
	 */
	webkitAnimationPlayState?: 'running' | 'paused' | null

	/** Specifies the speed curve of an animation.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
	 */
	webkitAnimationTimingFunction?: string | null


	webkitBackgroundSize?: string | null

	webkitBorderBottomLeftRadius?: string | null

	webkitBorderBottomRightRadius?: string | null

	webkitBorderImage?: string | null

	webkitBorderRadius?: string | null

	webkitBorderTopLeftRadius?: string | number | null

	webkitBorderTopRightRadius?: string | number | null

	/** Possible values for the `-webkit-column-break-after` CSS property.
	 */
	webkitColumnBreakAfter?: "auto" | "avoid" | "always" | "left" | "right" | "page" | "column" | "avoid-page" | "avoid-column" | null

	/** Possible values for the `-webkit-column-break-before` CSS property.
	 */
	webkitColumnBreakBefore?: "auto" | "avoid" | "always" | "left" | "right" | "page" | "column" | "avoid-page" | "avoid-column" | null

	/** Possible values for the `-webkit-column-break-inside` CSS property.
	 */
	webkitColumnBreakInside?: "auto" | "avoid" | "avoid-page" | "avoid-column" | null

	/** The number of columns to use for the element.
	 */
	webkitColumnCount?: number | null

	/** The gap between columns for a multi-column element.
	 */
	webkitColumnGap?: string | null

	/** Possible values for the `-webkit-column-rule-style` CSS property.
	 */
	webkitColumnRuleStyle?: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | null

	/** The color of the column rule for a multi-column element.
	 */
	webkitColumnRuleColor?: CSSColor | null

	/** The width of the column rule for a multi-column element.
	 */
	webkitColumnRuleWidth?: CSSLength | null

	/** Whether the element should span across all columns when using a multi-column layout.
	 */
	webkitColumnSpan?: "none" | "all" | null

	/** The width of each column for a multi-column element.
	 */
	webkitColumnWidth?: CSSLength | null

	/** Possible values for the `-webkit-box-direction` CSS property.
	 */
	webkitBoxDirection?: "normal" | "reverse" | null

	/** Possible values for the `-webkit-box-orient` CSS property.
	 */
	webkitBoxOrient?: "horizontal" | "vertical" | "inline-axis" | "block-axis" | null

	/** Possible values for the `-webkit-box-pack` CSS property.
	 */
	webkitBoxPack?: "start" | "end" | "center" | "justify" | "distribute" | null

	/** Possible values for the `-webkit-box-align` CSS property.
	 */
	webkitBoxAlign?: "start" | "end" | "center" | "baseline" | "stretch" | null

	/** Possible values for the `-webkit-box-flex` CSS property.
	 */
	webkitBoxFlex?: string | null

	/** Possible values for the `-webkit-box-ordinal-group` CSS property.
	 */
	webkitBoxOrdinalGroup?: string | null

	/** Possible values for the `-webkit-box-sizing` CSS property.
	 */
	webkitBoxSizing?: "content-box" | "border-box" | null

	/** The appearance of the element.
	 */
	webkitAppearance?: string | null

	/** The visibility of the back face of the element when it is facing away from the viewer.
	 */
	webkitBackfaceVisibility?: "visible" | "hidden" | null

	/** The part of the element's background to clip.
	 */
	webkitBackgroundClip?: "border-box" | "padding-box" | "content-box" | "text" | null

	/** The origin of the element's background image.
	 */
	webkitBackgroundOrigin?: "border-box" | "padding-box" | "content-box" | null


	/** Specifies the number of columns an element should be divided into	 */
	webkitColumns?: `${CSSLength} ${number}` | `${number} ${CSSLength}` | `${CSSLength}` | `${number}` | "auto" | "initial" | "inherit" | null

	/** Sets the initial main size of a flex item.
	 */
	webkitFlexBasis?: CSSLength | "auto" | "content" | "fit-content" | "max-content" | "min-content" | "initial" | "inherit" | null

	/** The webkitFlexDirection CSS property sets the direction of the main axis of a flex container.
	 */
	webkitFlexDirection?: "row" | "row-reverse" | "column" | "column-reverse" | "initial" | "inherit" | null

	/** The webkitFlexFlow CSS property is a shorthand property that sets the values of webkitFlexDirection and webkitFlexWrap.
	 */
	webkitFlexFlow?: string | null

	/** The webkitFlexGrow CSS property sets the flex grow factor of a flex item.
	 */
	webkitFlexGrow?: number | "initial" | "inherit" | null

	/** The webkitFlexShrink CSS property sets the flex shrink factor of a flex item.
	 */
	webkitFlexShrink?: number | "initial" | "inherit" | null

	/** Specifies the filter or effect to apply to an element
	 */
	webkitFilter?: string | null

	/** Specifies the size of the flexible items
	 */
	webkitFlex?: CSSProperty<"none" | "initial" | "auto" | CSSLength | number> | null

	/** Specifies whether flexible items should wrap or not
	 */
	webkitFlexWrap?: CSSProperty<"nowrap" | "wrap" | "wrap-reverse"> | null

	/** Specifies the alignment of flexible items along the main axis
	 */
	webkitJustifyContent?: CSSProperty<
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly"
	> | null

	/** Specifies the order of a flexible item
	 */
	webkitOrder?: CSSProperty<number> | null

	/** Specifies the perspective of an element
	 */
	webkitPerspective?: CSSProperty<"none" | CSSLength> | null

	/** Specifies the position of the perspective for the element
	 */
	webkitPerspectiveOrigin?: CSSProperty<string> | null

	/** Specifies the color of the highlight when tapping on an element
	 */
	webkitTapHighlightColor?: CSSProperty<string> | null

	/** Specifies the color to fill the text of an element
	 */
	webkitTextFillColor?: CSSProperty<CSSColor> | null

	/** Specifies whether text size is automatically adjusted based on the size of the container element
	 */
	webkitTextSizeAdjust?: CSSProperty<"none" | "auto" | CSSLength> | null

	/** Specifies a 2D or 3D transformation to apply to an element
	 */
	webkitTransform?: string | null

	/** Specifies the position of the transform origin for an element
	 */
	webkitTransformOrigin?: CSSProperty<string> | null

	/** Specifies how nested elements are displayed in 3D space
	 */
	webkitTransformStyle?: CSSProperty<"flat" | "preserve-3d"> | null

	/** Specifies the transition effect to apply to an element
	 */
	webkitTransition?: string | null

	/** Specifies the amount of time to delay the start of a transition
	 */
	webkitTransitionDelay?: string | null

	/** Specifies the duration of a transition effect
	 */
	webkitTransitionDuration?: string | null

	/** Specifies the CSS properties to which a transition effect should be applied
	 */
	webkitTransitionProperty?: string | null

	/** Specifies the speed curve of a transition effect
	 */
	webkitTransitionTimingFunction?: string | null

	/** Specifies whether the content of an element can be modified by the user
	 */
	webkitUserModify?: CSSProperty<"read-only" | "read-write" | "write-only"> | null

	/** Specifies whether an element can be selected by the user
	 */
	webkitUserSelect?: CSSProperty<"none" | "text" | "contain" | "all">

	webkitWritingMode?: CSSProperty<"horizontal-tb" | "writing-mode: vertical-rl" | "writing-mode: vertical-lr">

	zoom?: CSSProperty<"normal" | "reset" | `${number}%` | number>

	/** A shorthand property for the row-gap and the column-gap properties
	 * Either a single CSS length value for both row and column gap
	 * Or two CSS length values specifying the row-gap and column-gap
	 */
	gap?: string | null

	/** The `alignContent` property aligns the lines within a flex container when there is extra space on the cross-axis. See: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content */
	alignContent?: CSSProperty<(
		| "center" // Align content to the center of the container.
		| "start" // Align content to the start of the container.
		| "end" // Align content to the end of the container.
		| "flex-start" // Align content to the start of the first line.
		| "flex-end" // Align content to the end of the last line.
		| "normal" // Use default behavior, which is stretch.
		| "baseline" // Align content to the baseline of the container.
		| "first baseline" // Align content to the baseline of the first visible item.
		| "last baseline" // Align content to the baseline of the last visible item.
		| "space-between" // Distribute space evenly between lines.
		| "space-around" // Distribute space evenly around lines.
		| "space-evenly" // Distribute space evenly between and around lines.
		| "stretch" // Stretch content to fill the container.
		| "safe center" // Align content to the center within the padding box.
		| "unsafe center" // Align content to the center within the content box.
	)>

	/** The `alignItems` property aligns items within a flex container along the cross-axis. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items 
	 */
	alignItems?: CSSProperty<(
		| "center" // Align items to the center of the container.
		| "start" // Align items to the start of the container.
		| "end" // Align items to the end of the container.
		| "flex-start" // Align items to the start of the cross axis.
		| "flex-end" // Align items to the end of the cross axis.
		| "baseline" // Align items to the baseline of the container.
		| "first baseline" // Align items to the baseline of the first visible item.
		| "last baseline" // Align items to the baseline of the last visible item.
		| "stretch" // Stretch items to fill the container.
	)>

	/** The `alignSelf` property aligns a single flex item within a flex container along the cross-axis. See: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self */
	alignSelf?: CSSProperty<(
		| "auto" // Use the `align-items` value of the parent container.
		| "center" // Align item to the center of the container.
		| "start" // Align item to the start of the container.
		| "end" // Align item to the end of the container.
		| "flex-start" // Align item to the start of the cross axis.
		| "flex-end" // Align item to the end of the cross axis.
		| "baseline" // Align item to the baseline of the container.
		| "first baseline" // Align item to the baseline of the first visible item.
		| "last baseline" // Align item to the baseline of the last visible item.
		| "stretch" // Stretch item to fill the container.
	)>

	/** The `animationDelay` property sets the delay before the animation starts. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay 
	 */
	animationDelay?: CSSProperty<string>

	/** Whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction 
	 */
	animationDirection?: CSSProperty<(
		| "normal" // Play the animation forwards.
		| "reverse" // Play the animation backwards.
		| "alternate" // Play the animation forwards, then backwards, then forwards, and so on.
		| "alternate-reverse" // Play the animation backwards, then forwards, then backwards, and so on.
	)>

	/** The `animationDuration` property sets the length of time that the animation takes to complete one cycle. See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration */
	animationDuration?: CSSProperty<string>

	/** The `animationFillMode` property sets how the element will be styled when the animation is not playing (before it starts, after it ends, or both). See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode */
	animationFillMode?: CSSProperty<(
		| "none" // Do not apply any styles to the element.
		| "forwards" // Apply the styles defined in the last keyframe rule for the duration of the animation.
		| "backwards" // Apply the styles defined in the first keyframe rule before the animation starts.
		| "both" // Apply the styles defined in both the first and last keyframe rules.
	)>

	/** The `animationIterationCount` property sets the number of times that the animation should repeat. See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count */
	animationIterationCount?: CSSProperty<("infinite" | number)>

	/** The `animationName` property sets the name of the animation. See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name */
	animationName?: CSSProperty<string>

	/** The `animationPlayState` property sets whether the animation is running or paused. See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state */
	animationPlayState?: CSSProperty<("paused" | "running")>

	/** The `animationTimingFunction` property sets the speed curve of the animation. See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function */
	animationTimingFunction?: CSSProperty<string>

	/** The `appearance` property is used to display an element using a platform-native styling based on the operating system's theme. See: https://developer.mozilla.org/en-US/docs/Web/CSS/appearance */
	appearance?: CSSProperty<string>

	/** The `backdropFilter` property applies a filter effect to the background of an element. See: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter */
	backdropFilter?: CSSProperty<string>

	/** The `backfaceVisibility` property determines whether or not the back face of an element is visible when facing the user. See: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility */
	backfaceVisibility?: CSSProperty<("visible" | "hidden")>

	/** The `background` property sets the background color and/or image of an element. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background */
	background?: CSSProperty<string>

	/** The `backgroundAttachment` property sets whether a background image is fixed or scrolls with the rest of the page. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment */
	backgroundAttachment?: CSSProperty<("scroll" | "fixed" | "local")>

	/** The `backgroundBlendMode` property sets how the background image blends with the element's background color. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode */
	backgroundBlendMode?: CSSProperty<string>

	/** The `backgroundClip` property sets the area of an element that is used for the background image. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip */
	backgroundClip?: CSSProperty<(
		| "border-box" // The background extends to the outside edge of the border (but underneath the border in z-ordering).
		| "padding-box" // The background extends to the outside edge of the padding.
		| "content-box" // The background is painted within (clipped to) the content box.
	)>

	/** The `backgroundColor` property sets the background color of an element. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-color */
	backgroundColor?: CSSProperty<string>

	/** The `backgroundImage` property sets one or more background images for an element. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image */
	backgroundImage?: `url(${string})`

	/** The `backgroundOrigin` property sets the origin position of the background image. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin */
	backgroundOrigin?: CSSProperty<(
		| "border-box" // The background image starts from the outer edge of the border.
		| "padding-box" // The background image starts from the inner edge of the border (but above the padding).
		| "content-box" // The background image starts from the inner edge of the padding.
	)>

	/** The `backgroundPosition` property sets the initial position of the background image. See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position */
	backgroundPosition?: CSSProperty<string>

	/** The `backgroundSize` property sets the size of the background image. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size 
	 */
	backgroundSize?: CSSProperty<(
		| "auto" // The width and height of the background image are set to the intrinsic size of the image.
		| "cover" // The background image is scaled to be as large as possible while ensuring both its dimensions are greater than or equal to the corresponding dimensions of the container.
		| "contain" // The background image is scaled to be as small as possible while ensuring both its dimensions are greater than or equal to the corresponding dimensions of the container.
		| string // A specific size for the background image, e.g. "50% auto".
	)>

	/** The `blockSize` property sets the size of an element in the direction of its block axis (vertical direction). See: https://developer.mozilla.org/en-US/docs/Web/CSS/block-size */
	blockSize?: CSSProperty<string>

	/** The `borderBottom` property sets the width, style, and color of the bottom border of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom 
	 */
	borderBottom?: CSSProperty<string | number>

	/** The `borderBottomColor` property sets the color of the bottom border of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-color 
	 */
	borderBottomColor?: CSSProperty<string>

	/** The `borderBottomRightRadius` property sets the radius of the bottom-right corner of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius 
	 */
	borderBottomRightRadius?: CSSProperty<string | number>

	/** The `borderBottomStyle` property sets the style of the bottom border of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-style 
	 */
	borderBottomStyle?: CSSProperty<"none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset">

	/** The `borderBottomWidth` property sets the width of the bottom border of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width 
	 */
	borderBottomWidth?: CSSProperty<string | number>

	/** The `borderCollapse` property sets whether table borders should collapse into a single border or be separated as in standard HTML.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse 
	 */
	borderCollapse?: CSSProperty<"separate" | "collapse">

	/** The `borderColor` property sets the color of an element's four borders.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color 
	 */
	borderColor?: CSSProperty<string>

	/** The `borderImage` property is a shorthand property that sets the image to be used instead of the border styles for an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image 
	 */
	borderImage?: CSSProperty<string | number>

	/** The `borderImageOutset` property sets the amount by which the border image area extends beyond the border box.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset 
	 */
	borderImageOutset?: CSSProperty<string | number>

	/** The `borderImageRepeat` property sets how the border image is repeated.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat 
	 */
	borderImageRepeat?: CSSProperty<"stretch" | "repeat" | "round" | "space">

	/** The `borderImageSlice` property divides the border image into nine regions: four corners, four edges, and a middle.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice 
	 */
	borderImageSlice?: CSSProperty<string | number>

	/** The `borderImageWidth` property sets the width of the border image. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width 
	 */
	borderImageWidth?: CSSProperty<string | number>

	/** The `borderTopLeftRadius` property sets the radius of the top-left corner of the border. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius 
	 */
	borderTopLeftRadius?: CSSProperty<string | number>

	/** The `borderTopRightRadius` property sets the radius of the top-right corner of the border. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius 
	 */
	borderTopRightRadius?: CSSProperty<string | number>

	/** The `borderBottomLeftRadius` property sets the radius of the bottom-left corner of the border. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius 
	 */
	borderBottomLeftRadius?: CSSProperty<string | number>

	/** The `boxDecorationBreak` property specifies how the background, padding, border, and margin of an element are broken 
	 * across multiple lines, columns, or pages. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break 
	 */
	boxDecorationBreak?: CSSProperty<
		| "slice" // The element is rendered as multiple fragments, with the specified background, padding, border, and margin applied to each fragment.
		| "clone" // The element is rendered as a single fragment, with the specified background, padding, border, and margin applied to the entire element.
	>

	/** The `boxShadow` property sets one or more shadows to an element. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow 
	 */
	boxShadow?: CSSProperty<string | number>[]

	/** The `opacity` property sets the opacity level of an element. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/opacity 
	 */
	opacity?: CSSProperty<number>

	/** The `transformOrigin` property sets the origin for the transformation axes of an element. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin 
	 */
	transformOrigin?: CSSProperty<string>

	/** The `transition` property sets one or more CSS properties to transition. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transition 
	 */
	transition?: CSSProperty<string>[]


	/** The transitionDelay property specifies the duration of a transition animation between two different states of an element.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay
	 */
	transitionDelay?: CSSProperty<string | number>

	/** The `transitionDuration` property specifies the duration of a transition animation.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
	 */
	transitionDuration?: CSSProperty<CSSTime | CSSTime[]>

	/** The `transitionProperty` property specifies the CSS properties to which a transition effect should be applied.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
	 */
	transitionProperty?: CSSProperty<string | string[]>

	/** The `transitionTimingFunction` property specifies the speed curve of a transition effect.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
	 */
	transitionTimingFunction?: CSSProperty<string | string[]>

	/** The `unicodeBidi` property specifies the level of embedding with respect to the bidirectional algorithm.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
	 */
	unicodeBidi?: CSSProperty<"normal" | "embed" | "isolate" | "bidi-override" | "plaintext">

	/** The `userSelect` property controls whether the user can select text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
	 */
	userSelect?: CSSProperty<"auto" | "none" | "text" | "contain" | "all">

	/** The `verticalAlign` property sets the vertical alignment of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
	 */
	verticalAlign?: CSSProperty<CSSLength | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom">

	/** The `visibility` property specifies whether an element is visible.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
	 */
	visibility?: CSSProperty<"visible" | "hidden" | "collapse">

	/** The `whiteSpace` property sets how white space inside an element is handled.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
	 */
	whiteSpace?: CSSProperty<"normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces">

	/** The `widows` property sets the minimum number of lines that must be left at the top of a page when a page break occurs inside an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/widows
	 */
	widows?: CSSProperty<number>

	/** The `width` property sets the width of an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/width
	 */
	width?: CSSProperty<CSSLength | "auto">

	/** The `willChange` property provides a hint to browsers about the kind of changes to be expected on an element, so they can optimize for it.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
	 */
	willChange?: CSSProperty<string>

	/** The `word-break` property determines how words should break when they reach the end of a line.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
	 */
	wordBreak?: CSSProperty<
		| "normal" // Use default line break rules.
		| "break-all" // Lines may break between any two characters (except for East Asian scripts, like Chinese or Japanese).
		| "keep-all" // Don't allow breaks between white space. 
		| "break-word" // Line breaks may occur only where there are allowed breaks (typically within a word)
	>

	/** The `word-spacing` property sets the amount of space between words in a text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
	 */
	wordSpacing?: CSSProperty<string | number>

	/** The `writing-mode` property sets whether lines of text are laid out horizontally or vertically, as well as the direction in which blocks progress.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
	 */
	writingMode?: CSSProperty<
		| "horizontal-tb" // Left-to-right writing in horizontal lines.
		| "vertical-rl" // Top-to-bottom writing in vertical lines from right to left.
		| "vertical-lr" // Top-to-bottom writing in vertical lines from left to right.
		| "sideways-rl" // Left-to-right writing, vertical lines, top to bottom, rotated 90 degrees clockwise.
		| "sideways-lr" // Right-to-left writing, vertical lines, top to bottom, rotated 90 degrees clockwise.
		| "sideways" // Top-to-bottom writing, horizontal lines, left to right, rotated 90 degrees clockwise.
		| "horizontal-bt" // Left-to-right writing in horizontal lines, bottom to top.
		| "inherit" // The writing mode is inherited from the parent element.
		| "initial" // The writing mode is set to its default value.
		| "unset" // The writing mode is set to its inherited value if it has one, otherwise to its initial value.
	>

	/** The `z-index` property sets the z-order of a positioned element and its descendants.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
	 */
	zIndex?: CSSProperty<"auto" | number>


	/** The resize property specifies whether an element is resizable, and if so, along which axis(es).
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
	 */
	resize?: CSSProperty<(
		| "none" // The element is not resizable.
		| "both" // The element is resizable both horizontally and vertically.
		| "horizontal" // The element is resizable horizontally only.
		| "vertical" // The element is resizable vertically only.
		| "block" // The element is resizable both horizontally and vertically, and a thicker block-style resize handle is displayed.
		| "inline" // The element is resizable both horizontally and vertically, and a thinner inline-style resize handle is displayed.
		| "inherit" // The element inherits the resize behavior of its parent element.
	)>

	/** The rowGap property specifies the space between rows in a grid container.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
	 */
	rowGap?: CSSProperty<string | number>

	/** The scrollMargin property specifies the margin between an element's border and the nearest scroll container's outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin
	 */
	scrollMargin?: CSSProperty<string | number>

	/** The scrollMarginBlock property specifies the margin between an element's block-start border and the nearest scroll container's block-start outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block
	 */
	scrollMarginBlock?: CSSProperty<string | number>

	/** The scrollMarginBlockEnd property specifies the margin between an element's block-end border and the nearest scroll container's block-end outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block-end
	 */
	scrollMarginBlockEnd?: CSSProperty<string | number>

	/** The scrollMarginBlockStart property specifies the margin between an element's block-start border and the nearest scroll container's block-start outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block-start
	 */
	scrollMarginBlockStart?: CSSProperty<string | number>

	/** The scrollMarginBottom property specifies the margin between an element's bottom border and the nearest scroll container's bottom outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-bottom
	 */
	scrollMarginBottom?: CSSProperty<string | number>

	/** The scrollMarginInline property specifies the margin between an element's inline-start border and the nearest scroll container's inline-start outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline
	 */
	scrollMarginInline?: CSSProperty<string | number>

	/** The scrollMarginInlineEnd property specifies the margin between an element's inline-end border and the nearest scroll container's inline-end outer border.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline-end
	 */
	scrollMarginInlineEnd?: CSSProperty<string | number>

	/** The outlineOffset property sets the space between an outline and the edge or border of an element.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset
	 */
	outlineOffset?: CSSProperty<string | number>

	/** The objectFit property sets how the content of an element should fit within its container.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
	 */
	objectFit?: CSSProperty<"fill" | "contain" | "cover" | "none" | "scale-down">

	/** The objectPosition property sets the alignment of the content within an element's box.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
	 */
	objectPosition?: CSSProperty<string | number>

	/** The clipPath property sets a clipping region to an element.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
	 */
	clipPath?: CSSProperty<string>

	/** The shapeOutside property specifies a shape to flow content around.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
	 */
	shapeOutside?: CSSProperty<string>

	/** The perspective property sets the distance between the z=0 plane and the user in order to give a 3D-positioned element some perspective.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
	 */
	perspective?: CSSProperty<string | number>

	/** The perspectiveOrigin property sets the origin for the perspective property.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
	 */
	perspectiveOrigin?: CSSProperty<string | number>

	/** The transformStyle property sets whether child elements of the transformed element are also transformed.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
	 */
	transformStyle?: CSSProperty<"flat" | "preserve-3d">

	/** The transform property allows 3D transformations to be applied to an element.
	 See: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
	 */
	transform?: CSSProperty<string>

	/** The `rotate` property specifies the angle of rotation for an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
	 */
	rotate?: CSSProperty<string | number>

	/** The `scale` property specifies the scale factor for an element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
	 */
	scale?: CSSProperty<string | number>

	/** The `scrollBehavior` property specifies the scrolling behavior for a scrolling box when scrolling is triggered by the navigation or CSSOM scrolling APIs.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
	 */
	scrollBehavior?: CSSProperty<
		| "auto" // The scrolling box scrolls instantly, without any smooth scrolling effect.
		| "smooth" // The scrolling box scrolls with a smooth animated effect.
	>

	/** The `scrollMarginInlineStart` property defines the inline start margin of an element that participates in
	 * establishing the scrolling box.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline-start
	 */
	scrollMarginInlineStart?: CSSProperty<CSSLength | "auto">

	/** The `scrollMarginLeft` property defines the left margin of an element that participates in establishing the
	 * scrolling box.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-left
	 */
	scrollMarginLeft?: CSSProperty<CSSLength | "auto">

	/** The `scrollMarginRight` property defines the right margin of an element that participates in establishing the
	 * scrolling box.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-right
	 */
	scrollMarginRight?: CSSProperty<CSSLength | "auto">

	/** The `text-shadow` property adds shadow to text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
	 */
	textShadow?: CSSProperty<string>

	/** The `text-transform` property controls the capitalization of text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
	 */
	textTransform?: CSSProperty<"none" | "capitalize" | "uppercase" | "lowercase" | "initial" | "inherit">

	/** The `text-align` property sets the horizontal alignment of text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
	 */
	textAlign?: CSSProperty<
		"left" // Align text to the left.
		| "right" // Align text to the right.
		| "center" // Align text to the center.
		| "justify" // Align text to both the left and right, adding extra space between words as necessary.
		| "start" // Align text to the left if the base writing direction is left-to-right, or to the right if the base writing direction is right-to-left.
		| "end" // Align text to the right if the base writing direction is left-to-right, or to the left if the base writing direction is right-to-left.
		| "match-parent" // Use the value of the parent element's text-align property.
	>

	/** The `text-align-last` property sets the horizontal alignment of the last line of a block or a line right before a forced line break.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
	 */
	textAlignLast?: CSSProperty<
		| "auto" // Use the default alignment for the element.
		| "left" // Align the last line to the left.
		| "right" // Align the last line to the right.
		| "center" // Align the last line to the center.
		| "justify" // Align the last line to the left and right edges, with extra space distributed between words.
		| "start" // Align the last line to the start of the writing direction.
		| "end" // Align the last line to the end of the writing direction.
	>

	/** The `text-decoration` property sets the decoration of text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
	 */
	textDecoration?: CSSProperty<
		| "none" // No decoration.
		| "underline" // Add an underline to the text.
		| "overline" // Add a line over the text.
		| "line-through" // Add a line through the text.
		| "blink" // Add a blinking effect to the text.
		| "dotted"
		| "double"
		| "solid"
		| "wavy"

	>

	/** The `text-decoration-line` property sets the type of decoration to be added to text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line
	 */
	textDecorationLine?: CSSProperty<
		| "none" // No decoration.
		| "underline" // Add an underline to the text.
		| "overline" // Add a line over the text.
		| "line-through" // Add a line through the text.
		| "blink" // Add a blinking effect to the text.
		| "underline overline" // Add both underline and overline to the text.
		| "underline line-through" // Add underline and line-through to the text.
		| "overline line-through" // Add overline and line-through to the text.
		| "underline overline line-through" // Add all three decorations to the text.
	>

	/** The `textDecorationColor` property specifies the color of the line used for text decorations. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color
	 */
	textDecorationColor?: CSSProperty<CSSColor>

	/** The `textEmphasisPosition` property specifies the position of the emphasis marks applied to text. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
	 */
	textEmphasisPosition?: CSSProperty<"over" | "under">

	/** The `textIndent` property specifies the amount of space to indent the first line of a block-level text. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent
	 */
	textIndent?: CSSProperty<CSSLength>

	/** The `textJustify` property specifies the justification method used when text is justified. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
	 */
	textJustify?: CSSProperty<
		| "auto" // Use browser-defined justification algorithm.
		| "inter-word" // Justify text using spaces between words.
		| "inter-ideograph" // Justify text using spaces between ideographic characters.
		| "inter-cluster" // Justify text using spaces between grapheme clusters.
		| "distribute" // Justify text using spacing between all characters.
		| "kashida" // Justify text using kashida justification (for Arabic text).
		| "trim" // Trim spaces at the end of each line.
	>

	/** The `textOrientation` property specifies the orientation of the text within a line. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
	 */
	textOrientation?: CSSProperty<"mixed" | "upright" | "sideways" | "sideways-right">

	/** The `textDecorationSkip` property specifies which elements of a text decoration should be skipped over when drawing the decoration. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip
	 */
	textDecorationSkip?: CSSProperty<
		| "none" // Do not skip any elements.
		| "ink" // Skip over ink gaps.
		| "edges" // Skip over gaps between the edges of the characters.
		| "box-decoration" // Skip over gaps between the box and its decorations.
		| "objects" // Skip over gaps between replaced elements and their descendants.
		| "spaces" // Skip over gaps between spaces.
	>

	/** The `textUnderlineOffset` property sets the position of the underline decoration relative to its associated text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset
	 */
	textUnderlineOffset?: CSSProperty<CSSLength | "auto">

	/** The `textOverflow` property specifies how to handle text overflow.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
	 */
	textOverflow?: CSSProperty<
		| "clip" // Text will be clipped when it overflows the element.
		| "ellipsis" // Text will be clipped and an ellipsis (...) will be shown to indicate truncated text.
	>

	/** The `textDecorationStyle` property sets the style of the lines specified by `text-decoration-line`. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style 
	 */
	textDecorationStyle?: CSSProperty<(
		| "solid" // A solid line.
		| "double" // Two parallel solid lines.
		| "dotted" // A series of dots.
		| "dashed" // A series of short dashes.
		| "wavy" // A wavy line.
	)>

	/** The `textDecorationSkipInk` property specifies whether underlines, overlines, and line-throughs 
	 * should be skipped when they cross glyphs that have ink edges. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink 
	 */
	textDecorationSkipInk?: CSSProperty<"auto" | "none">

	/** The `textDecorationThickness` property sets the thickness of the lines specified by `text-decoration-line`. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness 
	 */
	textDecorationThickness?: CSSProperty<(
		| CSSLength
		| "from-font" // The thickness is based on the font size.
		| "auto" // The default thickness is used.
	)[]>

	/** The `textEmphasisStyle` property sets the style of emphasis marks, which are small markings added to text 
	 * to indicate emphasis. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style 
	 */
	textEmphasisStyle?: CSSProperty<(
		| "none" // No emphasis mark is used.
		| "filled" // A filled oval or rectangle.
		| "open" // An open oval or rectangle.
		| "dot" // A small dot.
		| "circle" // A small circle.
		| "double-circle" // Two small circles.
		| "triangle" // A small triangle.
		| "sesame" // Three small circles.
	)>

	/** The `textEmphasisColor` property sets the color of emphasis marks specified by `text-emphasis-style`. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-color 
	 */
	textEmphasisColor?: CSSProperty<CSSColor>

	/** The `ruby-position` property sets the position of ruby annotations over the base text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-position
	 */
	rubyPosition?: CSSProperty<'over' | 'under'>

	/** The `touch-action` property specifies whether an element should respond to touch input.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
	 */
	touchAction?: CSSProperty<
		| 'auto' // Allows the browser to determine the most appropriate touch action.
		| 'none' // Disables all touch interactions with the element.
		| 'pan-x' // Allows the user to pan along the horizontal axis.
		| 'pan-y' // Allows the user to pan along the vertical axis.
		| 'pan-left' // Allows the user to pan to the left.
		| 'pan-right' // Allows the user to pan to the right.
		| 'pan-up' // Allows the user to pan upwards.
		| 'pan-down' // Allows the user to pan downwards.
		| 'manipulation' // Allows the user to perform pinch-zoom and double-tap zoom gestures.
		| 'pinch-zoom' // Allows the user to perform pinch-zoom gestures.
	>

	/** The `overflowWrap` property specifies how words should wrap when reaching the end of a line.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
	 */
	overflowWrap?: CSSProperty<"normal" | "break-word" | "anywhere">

	/** The `lineBreak` property specifies how lines should break within words.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
	 */
	lineBreak?: CSSProperty<"auto" | "loose" | "normal" | "strict">

	/** The `tabSize` property specifies the width of tabs in spaces.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size
	 */
	tabSize?: CSSProperty<number | string>

	/** The `hyphens` property specifies how words should break when hyphenated.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
	 */
	hyphens?: CSSProperty<"none" | "manual" | "auto">

	/** The `lineHeight` property sets the height of a line box. 
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
	 */
	lineHeight?: CSSProperty<string | number>

	/** The `wordWrap` property specifies whether or not the browser should insert line breaks within words to prevent text from overflowing its container.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/word-wrap
	 */
	wordWrap?: CSSProperty<"normal" | "break-word">

	/** The `fontSize` property sets the size of text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
	 */
	fontSize?: CSSProperty<string | number>

	/** The `fontWeight` property sets the weight (or boldness) of the font.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
	 */
	fontWeight?: CSSProperty<
		| "normal"
		| "bold"
		| "bolder"
		| "lighter"
		| 100
		| 200
		| 300
		| 400
		| 500
		| 600
		| 700
		| 800
		| 900
	>

	/** The `letterSpacing` property sets the spacing between characters in text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
	 */
	letterSpacing?: CSSProperty<string | number>

	/** The `boxSizing` property defines how the total width and height of an element is calculated, including padding and border, but not the margin.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
	 */
	boxSizing?: CSSProperty<"content-box" | "border-box">

	/** The `pointerEvents` property allows you to control whether an element can be the target for mouse events.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
	 */
	pointerEvents?: CSSProperty<"auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all">

	/** The `direction` property specifies the text direction/writing direction within a block-level element.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/direction
	 */
	direction?: CSSProperty<"ltr" | "rtl" | "inherit">

	/** The `backgroundRepeat` property sets how background images are repeated.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
	 */
	backgroundRepeat?: CSSProperty<
		| "repeat" // The background image is repeated both vertically and horizontally.
		| "repeat-x" // The background image is repeated horizontally.
		| "repeat-y" // The background image is repeated vertically.
		| "no-repeat" // The background image is not repeated.
	>

	/** The `border` property is a shorthand for setting border width, style, and color.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border
	 */
	border?: CSSProperty<string>

	/** The `borderRadius` property sets the rounded corners of an element's border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
	 */
	borderRadius?: CSSProperty<string | number>

	/** The `color` property sets the text color of an element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color
	 */
	color?: CSSProperty<string>

	/** The `cursor` property sets the type of cursor to be displayed when the mouse pointer is over an element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
	 */
	cursor?: CSSProperty<(
		| CSSCursorTypes
		| `url(${string}), ${CSSCursorTypes}`
		| `url(${string}) ${number} ${number}, ${CSSCursorTypes}`
	)>

	/** The orientation of a character when a font allows for rotated glyphs.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/glyph-orientation-horizontal
	 * @deprecated
	 */
	glyphOrientationHorizontal?: CSSProperty<
		| `${0 | 90 | 180 | 270}deg`
		| "auto"
		| "reverse"
		| "upright"
		| "sideways"
		| "sideways-right"
	>

	/** The `grid` shorthand property specifies all the grid properties in one declaration,
	 * 	i.e., grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid
	 */
	grid?: CSSProperty<string | "none">

	/** Either specifies a name for the grid item, or this property is a shorthand property for the
	 * grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties
	 */
	gridArea?: CSSProperty<CSSGridLine | "auto">

	/** The `gridAutoColumns` property specifies the size of any auto-generated grid columns.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
	 */
	gridAutoColumns?: CSSProperty<string>

	/** The `gridAutoFlow` property specifies how auto-placed items are inserted in the grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
	 */
	gridAutoFlow?: CSSProperty<
		| "row"
		| "column"
		| "dense"
		| "row dense"
		| "column dense"
	>

	/** The `gridAutoRows` property specifies the size of any auto-generated grid rows.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows
	 */
	gridAutoRows?: CSSProperty<string>

	/** The `gridColumn` shorthand property specifies a grid item's start and end positions within the grid columns.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
	 */
	gridColumn?: CSSProperty<CSSGridLine>

	/** The `gridColumnEnd` property specifies the end position of a grid item within the grid columns.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
	 */
	gridColumnEnd?: CSSProperty<CSSGridLine>

	/** The `gridColumnGap` property specifies the size of the gap between columns in a grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap
	 */
	gridColumnGap?: CSSProperty<CSSLength>

	/** The `gridColumnStart` property specifies the start position of a grid item within the grid columns.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
	 */
	gridColumnStart?: CSSProperty<CSSGridLine>

	/** The `gridGap` shorthand property specifies the size of the gaps between rows and columns in a grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
	 */
	gridGap?: CSSProperty<CSSLength | CSSGridLine>

	/** The `gridRow` shorthand property specifies a grid item's start and end positions within the grid rows.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
	 */
	gridRow?: CSSProperty<CSSGridLine>

	/** The `gridRowEnd` property specifies the end position of a grid item within the grid rows.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
	 */
	gridRowEnd?: CSSProperty<CSSGridLine>

	/** The gridRowStart property specifies the start position of a grid item within the grid rows.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
	 */
	gridRowStart?: CSSProperty<CSSGridLine>

	/** The gridTemplate shorthand property specifies the size of the grid tracks and the placement of grid items within a grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
	 */
	gridTemplate?: CSSProperty<string>

	/** The gridTemplateAreas property specifies named grid areas for an explicit grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
	 */
	gridTemplateAreas?: CSSProperty<"none" | string>

	/** The gridTemplateColumns property specifies the size of the columns in a grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
	 */
	gridTemplateColumns?: CSSProperty<string>

	/** The gridTemplateRows property specifies the size of the rows in a grid.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
	 */
	gridTemplateRows?: CSSProperty<string>

	/** The hangingPunctuation property controls the use of punctuation marks at the beginning or end of a line of text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation
	 */
	hangingPunctuation?: CSSProperty<"none" | "first" | "last" | "allow-end" | "force-end">

	/** The height property sets an element's height.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/height
	 */
	height?: CSSProperty<CSSLength | "auto" | "fit-content" | "min-content" | "max-content">


	/** The imageOrientation property specifies the orientation of an image.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation
	 */
	imageOrientation?: CSSProperty<"none" | CSSAngle | "from-image">

	/** The imageRendering property specifies the quality of an image when scaled up or down.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
	 */
	imageRendering?: CSSProperty<
		"auto" | "optimizeSpeed" | "optimizeQuality" | "crisp-edges" | "pixelated"
	>

	/** The imageResolution property specifies the intrinsic resolution of an image.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/image-resolution
	 */
	imageResolution?: CSSProperty<
		| "from-image"
		| CSSResolution
		| `from-image ${CSSResolution}`
		| `${CSSResolution} snap`
	>

	/** The initialLetter property specifies how a drop cap should be styled.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter
	 */
	initialLetter?: CSSProperty<
		| "normal"
		| "no-change"
		| "raise"
		| "lower"
		| CSSLength
	>

	/** The inlineSize property sets an element's inline size, i.e. its width for horizontal text or its height for vertical text.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size
	 */
	inlineSize?: CSSProperty<CSSLength | "auto">

	/** The inset shorthand property specifies the placement of an element in the inline and block directions.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset
	 */
	inset?: CSSProperty<| CSSLength | "auto" | "none">


	/** The insetBlock property specifies the position of an element within its containing block in the block direction.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block
	 */
	insetBlock?: CSSProperty<CSSLength | "auto" | "none">

	/** The insetBlockEnd property specifies the position of an element's end edge within its containing block in the block direction.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-end
	 */
	insetBlockEnd?: CSSProperty<CSSLength | "auto">

	/** The insetBlockStart property specifies the position of an element's start edge within its containing block in the block direction.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-start
	 */
	insetBlockStart?: CSSProperty<CSSLength | "auto">

	/** The insetInline property specifies the position of an element within its containing block in the inline direction.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline
	 */
	insetInline?: CSSProperty<CSSLength | "auto" | "none">

	/** The insetInlineEnd property specifies the position of an element's end edge within its containing block in the inline direction.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-end
	 */
	insetInlineEnd?: CSSProperty<CSSLength | "auto">

	/** The insetInlineStart property specifies the position of an element's start edge within its containing block in the inline direction.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start
	 */
	insetInlineStart?: CSSProperty<CSSLength | "auto">

	/** The isolation property determines whether an element must create a new stacking context.
	 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/isolation
	 */
	isolation?: CSSProperty<"auto" | "isolate">
}

export interface CSSProperties {
	alignContent?: CSSProperty<(

		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "normal"
		| "baseline"
		| "first baseline"
		| "last baseline"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)>
	alignItems?: CSSProperty<(
		| "normal"
		| "stretch"
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "baseline"
		| "first baseline"
		| "last baseline"
		| "safe center"
		| "unsafe center"
	)>
	alignSelf?: CSSProperty<(
		| "auto"
		| "normal"
		| "center"
		| "start"
		| "end"
		| "self-start"
		| "self-end"
		| "flex-start"
		| "flex-end"
		| "baseline"
		| "first baseline"
		| "last baseline"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)>
	alignmentBaseline?: (
		| "auto"
		| "baseline"
		| "before-edge"
		| "text-before-edge"
		| "middle"
		| "central"
		| "after-edge"
		| "text-after-edge"
		| "ideographic"
		| "alphabetic"
		| "hanging"
		| "mathematical"
		| "top"
		| "center"
		| "bottom"
	)
	animation?: `${string} ${number} ${"normal" | "reverse" | "alternate" | "alternate-reverse"} ${"none" | "forward" | "backward" | "both"} ${"running" | "paused"} ${string}`

	/** Specifies the amount of time to wait from applying the animation to an element before beginning to perform the animation. 
	 * The animation can start later, immediately from its beginning, or immediately and partway through the animation. 
	 */
	animationDelay?: CSSProperty<CSSTime>

	/** Whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward. */
	animationDirection?: CSSProperty<"normal" | "reverse" | "alternate" | "alternate-reverse">

	animationDuration?: string
	animationFillMode?: "none" | "forward" | "backward" | "both"
	animationIterationCount?: "infinite" | number
	animationName?: string
	animationPlayState?: "running" | "paused"
	animationTimingFunction?: CSSEasingFunction
	backfaceVisibility?: "visible" | "hidden"

	/** Sets all background style properties at once, such as color, image, origin and size, or repeat method. 
	 * Component properties not set in the background shorthand property value declaration are set to their default values.
	 */
	background?: CSSProperty<string>

	backgroundAttachment?: "scroll" | "fixed" | "local"
	backgroundClip?: "border-box" | "padding-box" | "content-box" | "text"
	backgroundColor?: CSSColor | string
	backgroundImage?: `url(${string})`
	backgroundOrigin?: "border-box" | "padding-box" | "content-box"
	backgroundPosition?: (
		| "top"
		| "right"
		| "bottom"
		| "left"
		| "center"
		| string
	)
	backgroundPositionX?: (
		| "left"
		| "center"
		| "right"
		| CSSLength
		| `${"right" | "left"} ${string}`
	)
	backgroundPositionY?: (
		| "left"
		| "center"
		| "right"
		| CSSLength
		| `${"right" | "left"} ${string}`
	)
	backgroundRepeat?: (
		| "repeat-x"
		| "repeat-y"
		| "repeat"
		| "space"
		| "round"
		| "no-repeat"
	)
	backgroundSize?: (
		| "auto"
		| "cover"
		| "contain"
		| string
	)
	baselineShift?: CSSLength | "sub" | "super"
	border?: string | null
	borderBottom?: CSSLength
	borderBottomColor?: CSSColor
	borderBottomLeftRadius?: string | number
	borderBottomRightRadius?: string | number
	borderBottomStyle?: NamedBorderStyle
	borderBottomWidth?: CSSLength
	borderCollapse?: "collapse" | "separate"
	borderColor?: CSSColor
	borderImage?: (
		| `url(${string}) ${number} ${string}`
		| string
	)
	borderImageOutset?: number | string
	borderImageRepeat?: "stretch" | "repeat" | "round" | "space"
	borderImageSlice?: string | number | CSSLength
	borderImageSource?: "none" | `url(${string})`
	borderImageWidth?: string | number | CSSLength
	borderLeft?: string | CSSLength
	borderLeftColor?: CSSColor
	borderLeftStyle?: NamedBorderStyle
	borderLeftWidth?: NamedBorderWidth | CSSLength
	borderRadius?: string | CSSLength
	borderRight?: string | CSSLength
	borderRightColor?: CSSColor
	borderRightStyle?: NamedBorderStyle
	borderRightWidth?: NamedBorderWidth | CSSLength
	borderSpacing?: string | CSSLength
	borderStyle?: NamedBorderStyle
	borderTop?: CSSLength | NamedBorderWidth | NamedBorderStyle
	borderTopColor?: CSSColor
	borderTopLeftRadius?: string | CSSLength
	borderTopRightRadius?: string | CSSLength
	borderTopStyle?: NamedBorderStyle
	borderTopWidth?: NamedBorderStyle | CSSLength
	borderWidth?: string | CSSLength
	bottom?: CSSLength | "auto"
	boxShadow?: string | null
	boxSizing?: "border-box" | "content-box"
	breakAfter?: (
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)
	breakBefore?: (
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)
	breakInside?: (
		| "auto"
		| "avoid"
		| "avoid-page"
		| "avoid-column"
		| "avoid-region"
	)
	captionSide?: (
		| "top"
		| "bottom"
		| "block-start"
		| "block-end"
		| "inline-start"
		| "inline-end"
	)
	clear?: (
		| "none"
		| "left"
		| "right"
		| "both"
		| "inline-start"
		| "inline-end"
	)
	clip?: string | null
	clipPath?: (
		| `url(${string})`
		| "margin-box"
		| "border-box"
		| "padding-box"
		| "content-box"
		| "fill-box"
		| "stroke-box"
		| "view-box"
		| `inset(${string} ${string})`
		| `circle(${string} at ${string} ${string})`
	)
	clipRule?: "nonzero" | "evenodd" | "inherit"
	color?: CSSColor | string
	colorInterpolationFilters?: string | null
	columnCount?: "auto" | number
	columnFill?: "auto" | "balance" | "balance-all"
	columnRule?: NamedBorderStyle | string
	columnRuleColor?: CSSColor | string
	columnRuleStyle?: NamedBorderStyle
	columnRuleWidth?: NamedBorderStyle | CSSLength
	columnSpan?: "none" | "all"
	columnWidth?: "auto" | CSSLength
	columns?: CSSProperty<(
		| CSSLength
		| "auto"
		| number
		| string
	)>
	content?: string | null
	counterIncrement?: string | "none"
	counterReset?: string | "none"
	cssFloat?: string | null
	float?: (
		| "left"
		| "right"
		| "none"
		| "inline-start"
		| "inline-end"
	)
	cssText?: string
	cursor?: (
		| CSSCursorTypes
		| `url(${string}), ${CSSCursorTypes}`
		| `url(${string}) ${number} ${number}, ${CSSCursorTypes}`
	)
	direction?: "ltr" | "rtl"
	display?: (
		| "block"
		| "inline"
		| "inline-block"
		| "flex"
		| "inline-flex"
		| "grid"
		| "inline-grid"
		| "flow-root"
		| "none"
		| "contents"
		| "block flow"
		| "inline flow"
		| "inline flow-root"
		| "block flex"
		| "inline flex"
		| "block grid"
		| "inline grid"
		| "block flow-root"
		| "table"
		| "table-row"
		| "list-item"
	)
	dominantBaseline?: (
		| "auto"
		| "ideographic"
		| "alphabetic"
		| "hanging"
		| "mathematical"
		| "central"
		| "middle"
		| "text-after-edge"
		| "text-before-edge"
		| "text-top"
	)
	emptyCells?: "show" | "hide"
	enableBackground?: "accumulate" | `${number} ${number} ${number} ${number}`
	fill?: string | null
	fillOpacity?: number | `${number}%`
	fillRule?: "nonzero" | "evenodd"
	filter?: (
		| `url(${string})`
		| `blur(${CSSLength})`
		| `brightness(${number})`
		| `contrast(${number}%)`
		//| `drop-shadow(${CSSLength} ${CSSLength} ${CSSLength} ${CSSColor})`
		| `grayscale(${number}%)`
		| `hue-rotate(${number}deg)`
		| `invert(${number}%)`
		| `opacity(${number}%)`
		| `saturate(${number}%)`
		| `sepia(${number}%)`
		| string
		| "none"
	)
	flex?: (
		| "none"
		| "auto"
		| "initial"
		| number
		| CSSLength
		| string
	)
	flexBasis?: (
		| "auto"
		| CSSLength
		| "min-content"
		| "max-content"
		| "fit-content"
		| "content"
	)
	flexDirection?: CSSProperty<(
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
	)>
	flexFlow?: CSSProperty<(
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
		| "nowrap"
		| "wrap"
		| "wrap-reverse"
		//| `${"row" | "row-reverse" | "column" | "column-reverse"} ${"nowrap" | "wrap" | "wrap-reverse"}`
	)>
	flexGrow?: CSSProperty<(number)>
	flexShrink?: CSSProperty<(number)>
	flexWrap?: CSSProperty<("nowrap" | "wrap" | "wrap-reverse")>
	floodColor?: CSSColor
	floodOpacity?: number | `${number}%`
	font?: string | null
	fontFamily?: (
		| "serif"
		| "sans-serif"
		| "cursive"
		| "fantasy"
		| "monospace"
		| "system-ui"
		| "ui-serif"
		| "ui-sans-serif"
		| "ui-monospace"
		| "ui-rounded"
		| "emoji"
		| "math"
		| "fangsong"
		| string
		//         | `${string} ${"serif" | "sans-serif" | "cursive" | "fantasy" | "monospace" | "system-ui" | "ui-serif" |
		// "ui-sans-serif" | "ui-monospace" | "ui-rounded" | "emoji" | "math" | "fangsong"}`
	)
	fontFeatureSettings?: (
		| "normal"
		| string
		| `${string} ${"on" | "off" | number}`
	)
	fontSize?: (
		| "xx-small"
		| "x-small"
		| "small"
		| "medium"
		| "large"
		| "x-large"
		| "xx-large"
		| "xxx-large"
		| "larger"
		| "smaller"
		| CSSLength
		| "math"
	)
	fontSizeAdjust?: (
		| "none"
		| number
		| `${"ex-height" | "cap-height" | "ch-width" | "ic-width" | "ic-height"} ${number}`
	)
	fontStretch?: (
		| "normal"
		| "ultra-condensed"
		| "extra-condensed"
		| "condensed"
		| "semi-condensed"
		| "semi-expanded"
		| "expanded"
		| "extra-expanded"
		| "ultra-expanded"
		| `${number}%`
	)
	fontStyle?: (
		| "normal"
		| "italic"
		| "oblique"
		| `oblique ${number}deg`
	)
	fontVariant?: (
		| "normal"
		| "small-caps"
		| "all-small-caps"
		| "petite-caps"
		| "all-petite-caps"
		| "unicase"
		| "titling-caps"
		| "lining-nums"
		| "oldstyle-nums"
		| "proportional-nums"
		| "tabular-nums"
		| "diagonal-fractions"
		| "stacked-fractions"
		| "ordinal"
		| "slashed-zero"
		| "jis78"
		| "jis83"
		| "jis90"
		| "jis04"
		| "simplified"
		| "traditional"
		| "full-width"
		| "proportional-width"
		| "ruby"
	)
	fontWeight?: (
		| "normal"
		| "bold"
		| "bolder"
		| "lighter"
		| 100
		| 200
		| 300
		| 400
		| 500
		| 600
		| 700
		| 800
		| 900
	)
	glyphOrientationHorizontal?: `${number} ${"deg" | "grad" | "rad"}`
	glyphOrientationVertical?: `${number} ${"deg" | "grad" | "rad"}`
	height?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	imeMode?: (
		| "auto"
		| "normal"
		| "active"
		| "inactive"
		| "disabled"
	)
	justifyContent?: CSSProperty<(
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "left"
		| "right"
		| "normal"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)>

	kerning?: "auto" | number | CSSLength
	left?: "auto" | CSSLength
	readonly length?: CSSLength
	letterSpacing?: "normal" | CSSLength
	lightingColor?: CSSColor
	lineHeight?: "normal" | number | CSSLength
	listStyle?: string | null
	listStyleImage?: "none" | `url(${string})`
	listStylePosition?: "inside" | "outside"
	listStyleType?: (
		| "none"
		| string
		| "disc"
		| "circle"
		| "square"
		| "decimal"
		| "cjk-decimal"
		| "decimal-leading-zero"
		| "lower-roman"
		| "upper-roman"
		| "lower-greek"
		| "lower-alpha"
		| "lower-latin"
		| "upper-alpha"
		| "upper-latin"
		| "arabic-indic"
		| "-moz-arabic-indic"
		| "armenian"
		| "bengali"
		| "-moz-bengali"
		| "cambodian"
		| "khmer"
		| "cjk-earthly-branch"
		| "-moz-cjk-earthly-branch"
		| "cjk-heavenly-stem"
		| "-moz-cjk-heavenly-stem"
		| "cjk-ideographic"
		| "devanagari"
		| "-moz-devanagari"
		| "ethiopic-numeric"
		| "georgian"
		| "gujarati"
		| "-moz-gujarati"
		| "gurmukhi"
		| "-moz-gurmukhi"
		| "hebrew"
		| "hiragana"
		| "hiragana-iroha"
		| "japanese-formal"
		| "japanese-informal"
		| "kannada"
		| "-moz-kannada"
		| "katakana"
		| "katakana-iroha"
		| "korean-hangul-formal"
		| "korean-hanja-formal"
		| "korean-hanja-informal"
		| "lao"
		| "-moz-lao"
		| "lower-armenian"
		| "malayalam"
		| "-moz-malayalam"
		| "mongolian"
		| "myanmar"
		| "-moz-myanmar"
		| "oriya"
		| "-moz-oriya"
		| "persian"
		| "-moz-persian"
		| "simp-chinese-formal"
		| "simp-chinese-informal"
		| "tamil"
		| "-moz-tamil"
		| "telugu"
		| "-moz-telugu"
		| "thai"
		| "-moz-thai"
		| "tibetan"
		| "trad-chinese-formal"
		| "trad-chinese-informal"
		| "upper-armenian"
		| "disclosure-open"
		| "disclosure-closed"
	)
	margin?: (
		| number
		| CSSLength
		| string
	)
	marginBottom?: CSSLength | "auto" | `${number}`
	marginLeft?: CSSLength | "auto" | `${number}`
	marginRight?: CSSLength | "auto" | `${number}`
	marginTop?: CSSLength | "auto" | `${number}`
	marker?: string | null
	markerEnd?: string | null
	markerMid?: string | null
	markerStart?: string | null
	mask?: string | null
	maxHeight?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	maxWidth?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	minHeight?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	minWidth?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	msContentZoomChaining?: string | null
	msContentZoomLimit?: string | null
	msContentZoomLimitMax?: any
	msContentZoomLimitMin?: any
	msContentZoomSnap?: string | null
	msContentZoomSnapPoints?: string | null
	msContentZoomSnapType?: string | null
	msContentZooming?: string | null
	msFlowFrom?: string | null
	msFlowInto?: string | null
	msFontFeatureSettings?: string | null
	msGridColumn?: any
	msGridColumnAlign?: string | null
	msGridColumnSpan?: any
	msGridColumns?: string | null
	msGridRow?: any
	msGridRowAlign?: string | null
	msGridRowSpan?: any
	msGridRows?: string | null
	msHighContrastAdjust?: string | null
	msHyphenateLimitChars?: string | null
	msHyphenateLimitLines?: any
	msHyphenateLimitZone?: any
	msHyphens?: string | null
	msImeAlign?: string | null
	msOverflowStyle?: string | null
	msScrollChaining?: string | null
	msScrollLimit?: string | null
	msScrollLimitXMax?: any
	msScrollLimitXMin?: any
	msScrollLimitYMax?: any
	msScrollLimitYMin?: any
	msScrollRails?: string | null
	msScrollSnapPointsX?: string | null
	msScrollSnapPointsY?: string | null
	msScrollSnapType?: string | null
	msScrollSnapX?: string | null
	msScrollSnapY?: string | null
	msScrollTranslation?: string | null
	msTextCombineHorizontal?: string | null
	msTextSizeAdjust?: any
	msTouchAction?: string | null
	msTouchSelect?: string | null
	msUserSelect?: string | null
	msWrapFlow?: string
	msWrapMargin?: any
	msWrapThrough?: string
	opacity?: number | `${number}%`
	order?: string | null
	orphans?: number
	outline?: NamedBorderStyle | string
	outlineColor?: CSSColor | "invert"
	outlineStyle?: NamedBorderStyle
	outlineWidth?: NamedBorderWidth | CSSLength
	overflow?: (
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)
	overflowX?: (
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)
	overflowY?: (
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)
	padding?: number | CSSLength | string
	paddingBottom?: CSSLength
	paddingLeft?: CSSLength
	paddingRight?: CSSLength
	paddingTop?: CSSLength
	pageBreakAfter?: (
		| "auto"
		| "always"
		| "avoid"
		| "left"
		| "right"
		| "recto"
		| "verso"
	)
	pageBreakBefore?: (
		| "auto"
		| "always"
		| "avoid"
		| "left"
		| "right"
		| "recto"
		| "verso"
	)
	pageBreakInside?: "auto" | "avoid"
	perspective?: "none" | CSSLength
	perspectiveOrigin?: string | null
	pointerEvents?: (
		| "auto"
		| "none"
		| "visiblePainted"
		| "visibleFill"
		| "visibleStroke"
		| "visible"
		| "painted"
		| "fill"
		| "stroke"
		| "all"
	)
	position?: "static" /*default*/ | "fixed" | "absolute" | "relative" | "sticky" | null
	quotes?: (
		| "none"
		| "auto"
		| `${string} ${string}`
		| `${string} ${string} ${string} ${string}`
	)
	right?: "auto" | CSSLength
	rubyAlign?: "start" | "center" | "space-between" | "space-around"
	rubyOverhang?: string | null
	rubyPosition?: "over" | "under" | "alternate" | "inter-character"
	stopColor?: "currentColor" | CSSColor
	stopOpacity?: number
	stroke?: string | null
	strokeDasharray?: "none" | "inherit" | string | CSSLength
	strokeDashoffset?: CSSLength
	strokeLinecap?: "butt" | "round" | "square"
	strokeLinejoin?: "miter" | "round" | "bevel" | "arcs" | "miter-clip"
	strokeMiterlimit?: number
	strokeOpacity?: `${number}%`
	strokeWidth?: CSSLength
	tableLayout?: "auto" | "fixed"
	textAlign?: (
		| "start"
		| "end"
		| "left"
		| "right"
		| "center"
		| "justify"
		| "justify-all"
		| "match-parent"
		| string
	)
	textAlignLast?: (
		| "auto"
		| "start"
		| "end"
		| "left"
		| "right"
		| "center"
		| "justify"
	)
	textAnchor?: "start" | "middle" | "end"
	textDecoration?: string | null
	textIndent?: CSSLength
	textJustify?: (
		| "auto"
		| "none"
		| "inter-word"
		| "inter-character"
	)
	textKashida?: string | null
	textKashidaSpace?: string | null
	textOverflow?: "clip" | "ellipsis"
	textShadow?: string | null
	textTransform?: (
		| "none"
		| "capitalize"
		| "uppercase"
		| "lowercase"
		| "full-width"
		| "full-size-kana"
	)
	textUnderlinePosition?: (
		| "auto"
		| "under"
		| "left"
		| "right"
		| `${"auto" | "under" | "left" | "right"} ${"auto" | "under" | "left" | "right"}`
	)
	top?: "auto" | CSSLength
	touchAction?: (
		| "auto"
		| "none"
		| "pan-x"
		| "pan-left"
		| "pan-right"
		| "pan-y"
		| "pan-up"
		| "pan-down"
		| "pinch-zoom"
		| "manipulation"
	)
	transform?: (
		| "none"
		| string
		| `matrix(${number}, ${number}, ${number}, ${number}, ${number}, ${number})`
		| `matrix3d(${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number})`
		| `rotate(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotate3d(${number},${number},${number},${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateX(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateY(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateZ(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `scale(${number | `${number}%`}, ${number | `${number}%`})`
		| `scale3d(${number}, ${number},${number})`
		| `scaleX(${number})`
		| `scaleY(${number})`
		| `scaleZ(${number})`
		| `skew(${`${number}${"deg" | "grad" | "rad" | "turn"}` | `${number}${"deg" | "grad" | "rad" | "turn"}, ${number}${"deg" | "grad" | "rad" | "turn"}`})`
		| `skewX(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `skewY(${number}${"deg" | "grad" | "rad" | "turn"})`
	)
	transformOrigin?: (
		| CSSLength
		| "left"
		| "right"
		| "center"
		| "bottom"
		| string
	)
	transformStyle?: "flat" | "preserve-3d"
	transition?: (
		// | `${string} ${CSSTime}`
		// | `${string} ${CSSTime} ${CSSTime}`
		// | `${string} ${CSSTime} ${CSSEasingFunction}`
		// | `${string} ${CSSTime} ${CSSEasingFunction} ${CSSTime}`
		| `all ${CSSTime} ${CSSEasingFunction}`
		| string
	)
	transitionDelay?: CSSTime | string
	transitionDuration?: CSSTime | string
	transitionProperty?: "none" | "all" | string
	transitionTimingFunction?: CSSEasingFunction
	unicodeBidi?: (
		| "normal"
		| "embed"
		| "isolate"
		| "bidi-override"
		| "isolate-override"
		| "plaintext"
	)
	verticalAlign?: (
		| "baseline"
		| "sub"
		| "super"
		| "text-top"
		| "text-bottom"
		| "middle"
		| "top"
		| "bottom"
		| CSSLength
	)
	visibility?: "visible" | "hidden" | "collapse"
	webkitAlignContent?: string | null
	webkitAlignItems?: string | null
	webkitAlignSelf?: string | null
	webkitAnimation?: string | null
	webkitAnimationDelay?: string | null
	webkitAnimationDirection?: string | null
	webkitAnimationDuration?: string | null
	webkitAnimationFillMode?: string | null
	webkitAnimationIterationCount?: string | null
	webkitAnimationName?: string | null
	webkitAnimationPlayState?: string | null
	webkitAnimationTimingFunction?: string | null
	webkitAppearance?: string | null
	webkitBackfaceVisibility?: string | null
	webkitBackgroundClip?: string | null
	webkitBackgroundOrigin?: string | null
	webkitBackgroundSize?: string | null
	webkitBorderBottomLeftRadius?: string | null
	webkitBorderBottomRightRadius?: string | null
	webkitBorderImage?: string | null
	webkitBorderRadius?: string | null
	webkitBorderTopLeftRadius?: string | number | null
	webkitBorderTopRightRadius?: string | number | null
	webkitBoxAlign?: string | null
	webkitBoxDirection?: string | null
	webkitBoxFlex?: string | null
	webkitBoxOrdinalGroup?: string | null
	webkitBoxOrient?: string | null
	webkitBoxPack?: string | null
	webkitBoxSizing?: CSSProperty<("border-box" | "content-box")>
	webkitColumnBreakAfter?: CSSProperty<(
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)>
	webkitColumnBreakBefore?: CSSProperty<(
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)>
	webkitColumnBreakInside?: CSSProperty<(
		| "auto"
		| "avoid"
		| "avoid-column"
		| "avoid-page"
		| "avoid-region"
	)>
	webkitColumnCount?: CSSProperty<(number | "auto")>
	webkitColumnGap?: CSSProperty<(
		| CSSLength
		| "normal"
	)>
	webkitColumnRule?: CSSProperty<(NamedBorderStyle | string)>
	webkitColumnRuleColor?: CSSProperty<(CSSColor | string)>
	webkitColumnRuleStyle?: CSSProperty<(NamedBorderStyle)>
	webkitColumnRuleWidth?: CSSProperty<(
		| CSSLength
		| "thin"
		| "medium"
		| "thick"
	)>
	webkitColumnSpan?: CSSProperty<("none" | "all")>
	webkitColumnWidth?: CSSProperty<(CSSLength | "auto" | string)>
	webkitColumns?: CSSProperty<(
		| CSSLength
		| "auto"
		| number
		| string
	)>
	webkitFilter?: CSSProperty<(
		| `url(${string})`
		| `blur(${CSSLength})`
		| `brightness(${number})`
		| `contrast(${number}%)`
		//| `drop-shadow(${CSSLength} ${CSSLength} ${CSSLength} ${CSSColor})`
		| `grayscale(${number}%)`
		| `hue-rotate(${number}deg)`
		| `invert(${number}%)`
		| `opacity(${number}%)`
		| `saturate(${number}%)`
		| `sepia(${number}%)`
		| string
		| "none"
	)>
	webkitFlex?: CSSProperty<(
		| "none"
		| "auto"
		| "initial"
		| number
		| CSSLength
		| string
	)>
	webkitFlexBasis?: CSSProperty<(
		| "auto"
		| CSSLength
		| "min-content"
		| "max-content"
		| "fit-content"
		| "content"
	)>
	webkitFlexDirection?: CSSProperty<(
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
	)>
	webkitFlexFlow?: CSSProperty<(
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
		| "nowrap"
		| "wrap"
		| "wrap-reverse"
	)>
	webkitFlexGrow?: number
	webkitFlexShrink?: number
	webkitFlexWrap?: CSSProperty<("nowrap" | "wrap" | "wrap-reverse")>
	webkitJustifyContent?: CSSProperty<(
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "left"
		| "right"
		| "normal"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)>
	webkitOrder?: number
	webkitPerspective?: CSSProperty<("none" | CSSLength | null)>
	webkitPerspectiveOrigin?: CSSProperty<("x-perspective" | "y-perspective" | string)>
	webkitTapHighlightColor?: string | null
	webkitTextFillColor?: string | null
	webkitTextSizeAdjust?: CSSProperty<("none" | "auto" | `${number}%`)>
	webkitTransform?: CSSProperty<(
		| "none"
		| string
		| `matrix(${number}, ${number}, ${number}, ${number}, ${number}, ${number})`
		| `matrix3d(${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number})`
		| `rotate(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotate3d(${number},${number},${number},${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateX(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateY(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateZ(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `scale(${number | `${number}%`}, ${number | `${number}%`})`
		| `scale3d(${number}, ${number},${number})`
		| `scaleX(${number})`
		| `scaleY(${number})`
		| `scaleZ(${number})`
		| `skew(${`${number}${"deg" | "grad" | "rad" | "turn"}` | `${number}${"deg" | "grad" | "rad" | "turn"}, ${number}${"deg" | "grad" | "rad" | "turn"}`})`
		| `skewX(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `skewY(${number}${"deg" | "grad" | "rad" | "turn"})`
	)>
	webkitTransformOrigin?: CSSProperty<(
		| CSSLength
		| "left"
		| "right"
		| "center"
		| "bottom"
		| string
	)>
	webkitTransformStyle?: CSSProperty<("flat" | "preserve-3d")>
	webkitTransition?: CSSProperty<(
		| `all ${CSSTime} ${CSSEasingFunction}`
		| string
	)>
	webkitTransitionDelay?: CSSTime | string
	webkitTransitionDuration?: CSSTime | string
	webkitTransitionProperty?: CSSProperty<("none" | "all" | string)>
	webkitTransitionTimingFunction?: CSSEasingFunction
	webkitUserModify?: CSSProperty<(
		| "read-only"
		| "read-write"
		| "write-only"
	)>
	webkitUserSelect?: CSSProperty<(
		| "none"
		| "auto"
		| "text"
		| "contain"
		| "all"
	)>
	webkitWritingMode?: CSSProperty<(
		| "horizontal-tb"
		| "vertical-rl"
		| "vertical-lr"
		| "sideways-rl"
		| "sideways-lr"
	)>
	whiteSpace?: (
		| "normal"
		| "nowrap"
		| "pre"
		| "pre-wrap"
		| "pre-line"
		| "break-spaces"
	)
	widows?: number
	width?: (
		| "auto"
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| CSSLength
	)
	wordBreak?: "normal" | "break-all" | "keep-all" | "break-word"
	wordSpacing?: "normal" | CSSLength
	wordWrap?: string | null
	writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr"
	zIndex?: "auto" | number
	zoom?: "normal" | "reset" | `${number}%` | number

	/** A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties */
	grid?: string

	/** Either specifies a name for the grid item,  or this property is a shorthand property for the
	 * grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties
	 */
	gridArea?: string

	/** Defines on which row-line a grid item will start */
	gridRowStart?:
	| "auto" // Default value. The item will be placed following the flow
	| `span ${number}` // the number of rows the item will span
	| number // row line
	| "inherit" | "initial" | "revert" | "unset"

	/** Defines on which column-line a grid item will start. */
	gridColumnStart?:
	| "auto" // Default value. The item will be placed following the flow
	| `span ${number}` // the number of columns the item will span
	| number // column-line
	| "inherit" | "initial" | "revert" | "unset"

	/** Defines how many rows a grid item will span, or on which row-line the item will end */
	gridRowEnd?: "auto" | number | `span ${number}` | "inherit" | "initial" | "revert" | "unset"

	/** Defines how many columns a grid item will span, or on which column-line the item will end */
	gridColumnEnd?: "auto" | number | `span ${number}` | "inherit" | "initial" | "revert" | "unset"

	/** A shorthand property for the grid-row-start and the grid-row-end properties */
	gridRow?: `${"auto" | number | `span ${number}`} ${"auto" | number | `span ${number}`}`

	/** A shorthand property for the grid-column-start and the grid-column-end properties */
	gridColumn?: `${"auto" | number | `span ${number}`} ${"auto" | number | `span ${number}`}`

	/** Specifies the size of the columns, and how many columns in a grid layout */
	gridTemplateColumns?: string

	/** Specifies the size of the rows in a grid layout */
	gridTemplateRows?: string

	/** A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties
	 * Default is none
	 */
	gridTemplate?: string | null

	/** Specifies the gap between the grid rows */
	rowGap?: string | null

	/** Specifies the gap between the columns */
	columnGap?: string | null

	/** A shorthand property for the grid-row-gap and grid-column-gap properties
	 * Either a single CSS length value to both row and column gap
	 * Or two CSS length values specifying the grid-row-gap grid-column-gap
	 */
	gridGap?: string | null

	/** A shorthand property for the row-gap and the column-gap properties
	 * Either a single CSS length value for both row and column gap
	 * Or two CSS length values specifying the row-gap and column-gap
	 */
	gap?: string | null
}

/** CSS property values augmented with one of "inherit", "initial", "revert", or "unset", 
 * which are used to set a property to its inherited value, initial value, last set value, or unset value, respectively.
 */
export type CSSProperty<T> = T | "inherit" | "initial" | "revert" | "unset" | "revert-layer"

/** CSS border width type: either a CSSLength value or one of "thin", "medium", or "thick". */
type CSSBorderWidth = CSSLength | "thin" | "medium" | "thick"

/** CSS border style type */
type CSSBorderStyle = (
	| "none"
	| "hidden"
	| "dotted"
	| "dashed"
	| "solid"
	| "double"
	| "groove"
	| "ridge"
	| "inset"
	| "outset"
)

/** CSS resolution type: a string composed of a number followed by either "dpi", "dpcm", or "dppx". */
type CSSResolution = `${number}${"dpi" | "dpcm" | "dppx"}`

/** CSS cursor property type */
type CSSCursorTypes = (
	"auto"
	| "default"
	| "none"
	| "context-menu"
	| "help"
	| "pointer"
	| "progress"
	| "wait"
	| "cell"
	| "crosshair"
	| "text"
	| "vertical-text"
	| "alias"
	| "copy"
	| "move"
	| "no-drop"
	| "not-allowed"
	| "grab"
	| "grabbing"
	| "all-scroll"
	| "col-resize"
	| "row-resize"
	| "n-resize"
	| "e-resize"
	| "s-resize"
	| "w-resize"
	| "ne-resize"
	| "nw-resize"
	| "se-resize"
	| "sw-resize"
	| "ew-resize"
	| "ns-resize"
	| "nesw-resize"
	| "nwse-resize"
	| "zoom-in"
	| "zoom-out"
	| "inherit"
	| "initial"
	| "revert"
	| "unset"
)

/** CSS easing function type */
type CSSEasingFunction = (
	| "linear"
	| `linear(${number | CSSLength})`
	| "ease"
	| "ease-in"
	| "ease-out"
	| "ease-in-out"
	| "step-start"
	| "step-end"
	| `steps(${number} ${"start" | "end" | "jump-start" | "jump-end" | "jump-both" | "jump-none"})`
	| `cubic-bezier(${number},${number},${number},${number})`
)

/** CSS time value, consisting of a number followed by "ms" or "s". */
type CSSTime = `${number}${"ms" | "s"}`

/** CSS Color literals */
export type CSSColor = (
	| string
	| keyof typeof colorConstants
	| "currentcolor"
	| "transparent"
	| `#${string}`
	| `rgb(${number},${number},${number})`
	| `rgba(${number}, ${number}, ${number}, ${number})`
)

export type CSSLength = `${number}${CSSLengthUnit}`
/** CSS Length units.
 * See https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units 
 */
export type CSSLengthUnit = (
	| "%"
	| "px" // Pixels (1px = 1/96th of 1in)
	| "pt" // Points (1pt = 1/72th of 1in)
	| "cm"  // Centimeters
	| "mm" // Millimeters
	| "Q" // Quarter-millimeters
	| "in"  // Inches
	| "pc" // Picas (1pt = 1/72th of 1in)

	| "rem" // Relative to Font size of the root element.
	| "em" // Relative to font size of parent, for typographical properties like font-size, and font size of the
	// element itself, of other properties like width.
	| "ex" // Relative to x-height of the element's font.
	| "ch" // Relative to The advance measure (width) of the glyph "0" of the element's font.
	| "lh" // Relative to Line height of the element.
	| "vw" // 1% of the viewport's width.
	| "vh" // 1% of the viewport's height.
	| "vmin" // 1% of the viewport's smaller dimension.
	| "vmax" // 1% of the viewport's larger dimension.
)

type CSSAngle = `${number} ${"deg" | "grad" | "rad"}`

/** CSS grid line type: a number representing a line number, or one of the following string values:
 * - 'auto': represents an automatic line.
 * - 'span': represents a span of multiple lines.
 * - 'span ${number}': represents a span of a specific number of lines.
 * - 'span ${number} / ${number}': represents a span of a specific number of rows and columns.
 * - 'span ${number} / auto': represents a span of a specific number of rows and an automatic number of columns.
 */
type CSSGridLine = (
	| number
	| 'auto'
	| 'span'
	| `span ${number}`
	| `span ${number} / ${number}`
	| `span ${number} / auto`
)

// type string = `${CSSGridTrackSizes} / ${CSSGridTrackSizes}`
// type CSSGridTrackSizes = `${CSSGridTrackSize} ${CSSGridTrackSize} ${CSSGridTrackSize} ...${CSSGridTrackSize}`
/*type CSSGridTrackSize = (
	| "auto"
	| "min-content"
	| "max-content"
	| `minmax(${CSSGridTrackSize}, ${CSSGridTrackSize})`
	| `${CSSGridTrackSize}`
)*/

/**
 *
 */
export type HtmlProps = Partial<HTMLAttributes<HTMLElement>>
/**
 *
 */
export type StyleProps = { style?: CSSProperties }
/**
 *
 */
export type PanelProps = Partial<{
	itemsAlignH: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	itemsAlignV: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	orientation: "vertical" | "horizontal"
}>

/**
 *
 */
export type IconProps = Partial<{
	color: string | null | undefined
	size: string | number
	style: CSSProperties
}>

//#region Attributes
/**
 *
 */
export interface Attributes {

	key?: string | number | symbol
}

/**
 *
 */
export interface ClassAttributes<T> extends Attributes {
}

/**
 *
 */
export type DOMAttributes<T> = {
	//childrenx?: Somatic.VNode[];
	// dangerouslySetInnerHTML?: {
	// 	__html: string;
	// }

	// Clipboard Events
	onCopy?: ClipboardEventHandler<T>
	onCopyCapture?: ClipboardEventHandler<T>
	onCut?: ClipboardEventHandler<T>
	onCutCapture?: ClipboardEventHandler<T>
	onPaste?: ClipboardEventHandler<T>
	onPasteCapture?: ClipboardEventHandler<T>

	// Composition Events
	onCompositionEnd?: CompositionEventHandler<T>
	onCompositionEndCapture?: CompositionEventHandler<T>
	onCompositionStart?: CompositionEventHandler<T>
	onCompositionStartCapture?: CompositionEventHandler<T>
	onCompositionUpdate?: CompositionEventHandler<T>
	onCompositionUpdateCapture?: CompositionEventHandler<T>

	// Focus Events
	onFocus?: FocusEventHandler<T>
	onFocusCapture?: FocusEventHandler<T>
	onBlur?: FocusEventHandler<T>
	onBlurCapture?: FocusEventHandler<T>

	// Form Events
	onChange?: FormEventHandler<T>
	onChangeCapture?: FormEventHandler<T>
	onInput?: FormEventHandler<T>
	onInputCapture?: FormEventHandler<T>
	onReset?: FormEventHandler<T>
	onResetCapture?: FormEventHandler<T>
	onSubmit?: FormEventHandler<T>
	onSubmitCapture?: FormEventHandler<T>
	onInvalid?: FormEventHandler<T>
	onInvalidCapture?: FormEventHandler<T>

	// Image Events
	onLoad?: SomaticEventHandler<T>
	onLoadCapture?: SomaticEventHandler<T>
	onError?: SomaticEventHandler<T> // also a Media Event
	onErrorCapture?: SomaticEventHandler<T> // also a Media Event

	// Keyboard Events
	onKeyDown?: KeyboardEventHandler<T>
	onKeyDownCapture?: KeyboardEventHandler<T>
	onKeyPress?: KeyboardEventHandler<T>
	onKeyPressCapture?: KeyboardEventHandler<T>
	onKeyUp?: KeyboardEventHandler<T>
	onKeyUpCapture?: KeyboardEventHandler<T>

	// Media Events
	onAbort?: SomaticEventHandler<T>
	onAbortCapture?: SomaticEventHandler<T>
	onCanPlay?: SomaticEventHandler<T>
	onCanPlayCapture?: SomaticEventHandler<T>
	onCanPlayThrough?: SomaticEventHandler<T>
	onCanPlayThroughCapture?: SomaticEventHandler<T>
	onDurationChange?: SomaticEventHandler<T>
	onDurationChangeCapture?: SomaticEventHandler<T>
	onEmptied?: SomaticEventHandler<T>
	onEmptiedCapture?: SomaticEventHandler<T>
	onEncrypted?: SomaticEventHandler<T>
	onEncryptedCapture?: SomaticEventHandler<T>
	onEnded?: SomaticEventHandler<T>
	onEndedCapture?: SomaticEventHandler<T>
	onLoadedData?: SomaticEventHandler<T>
	onLoadedDataCapture?: SomaticEventHandler<T>
	onLoadedMetadata?: SomaticEventHandler<T>
	onLoadedMetadataCapture?: SomaticEventHandler<T>
	onLoadStart?: SomaticEventHandler<T>
	onLoadStartCapture?: SomaticEventHandler<T>
	onPause?: SomaticEventHandler<T>
	onPauseCapture?: SomaticEventHandler<T>
	onPlay?: SomaticEventHandler<T>
	onPlayCapture?: SomaticEventHandler<T>
	onPlaying?: SomaticEventHandler<T>
	onPlayingCapture?: SomaticEventHandler<T>
	onProgress?: SomaticEventHandler<T>
	onProgressCapture?: SomaticEventHandler<T>
	onRateChange?: SomaticEventHandler<T>
	onRateChangeCapture?: SomaticEventHandler<T>
	onSeeked?: SomaticEventHandler<T>
	onSeekedCapture?: SomaticEventHandler<T>
	onSeeking?: SomaticEventHandler<T>
	onSeekingCapture?: SomaticEventHandler<T>
	onStalled?: SomaticEventHandler<T>
	onStalledCapture?: SomaticEventHandler<T>
	onSuspend?: SomaticEventHandler<T>
	onSuspendCapture?: SomaticEventHandler<T>
	onTimeUpdate?: SomaticEventHandler<T>
	onTimeUpdateCapture?: SomaticEventHandler<T>
	onVolumeChange?: SomaticEventHandler<T>
	onVolumeChangeCapture?: SomaticEventHandler<T>
	onWaiting?: SomaticEventHandler<T>
	onWaitingCapture?: SomaticEventHandler<T>

	// MouseEvents
	onClick?: MouseEventHandler<T>
	onClickCapture?: MouseEventHandler<T>
	onContextMenu?: MouseEventHandler<T>
	onContextMenuCapture?: MouseEventHandler<T>
	onDoubleClick?: MouseEventHandler<T>
	onDoubleClickCapture?: MouseEventHandler<T>
	onDrag?: DragEventHandler<T>
	onDragCapture?: DragEventHandler<T>
	onDragEnd?: DragEventHandler<T>
	onDragEndCapture?: DragEventHandler<T>
	onDragEnter?: DragEventHandler<T>
	onDragEnterCapture?: DragEventHandler<T>
	onDragExit?: DragEventHandler<T>
	onDragExitCapture?: DragEventHandler<T>
	onDragLeave?: DragEventHandler<T>
	onDragLeaveCapture?: DragEventHandler<T>
	onDragOver?: DragEventHandler<T>
	onDragOverCapture?: DragEventHandler<T>
	onDragStart?: DragEventHandler<T>
	onDragStartCapture?: DragEventHandler<T>
	onDrop?: DragEventHandler<T>
	onDropCapture?: DragEventHandler<T>
	onMouseDown?: MouseEventHandler<T>
	onMouseDownCapture?: MouseEventHandler<T>
	onMouseEnter?: MouseEventHandler<T>
	onMouseLeave?: MouseEventHandler<T>
	onMouseMove?: MouseEventHandler<T>
	onMouseMoveCapture?: MouseEventHandler<T>
	onMouseOut?: MouseEventHandler<T>
	onMouseOutCapture?: MouseEventHandler<T>
	onMouseOver?: MouseEventHandler<T>
	onMouseOverCapture?: MouseEventHandler<T>
	onMouseUp?: MouseEventHandler<T>
	onMouseUpCapture?: MouseEventHandler<T>

	// Selection Events
	onSelect?: SomaticEventHandler<T>
	onSelectCapture?: SomaticEventHandler<T>

	// Touch Events
	onTouchCancel?: TouchEventHandler<T>
	onTouchCancelCapture?: TouchEventHandler<T>
	onTouchEnd?: TouchEventHandler<T>
	onTouchEndCapture?: TouchEventHandler<T>
	onTouchMove?: TouchEventHandler<T>
	onTouchMoveCapture?: TouchEventHandler<T>
	onTouchStart?: TouchEventHandler<T>
	onTouchStartCapture?: TouchEventHandler<T>

	// Pointer Events
	onPointerDown?: PointerEventHandler<T>
	onPointerDownCapture?: PointerEventHandler<T>
	onPointerMove?: PointerEventHandler<T>
	onPointerMoveCapture?: PointerEventHandler<T>
	onPointerUp?: PointerEventHandler<T>
	onPointerUpCapture?: PointerEventHandler<T>
	onPointerCancel?: PointerEventHandler<T>
	onPointerCancelCapture?: PointerEventHandler<T>
	onPointerEnter?: PointerEventHandler<T>
	onPointerEnterCapture?: PointerEventHandler<T>
	onPointerLeave?: PointerEventHandler<T>
	onPointerLeaveCapture?: PointerEventHandler<T>
	onPointerOver?: PointerEventHandler<T>
	onPointerOverCapture?: PointerEventHandler<T>
	onPointerOut?: PointerEventHandler<T>
	onPointerOutCapture?: PointerEventHandler<T>
	onGotPointerCapture?: PointerEventHandler<T>
	onGotPointerCaptureCapture?: PointerEventHandler<T>
	onLostPointerCapture?: PointerEventHandler<T>
	onLostPointerCaptureCapture?: PointerEventHandler<T>

	// UI Events
	onScroll?: UIEventHandler<T>
	onScrollCapture?: UIEventHandler<T>

	// Wheel Events
	onWheel?: WheelEventHandler<T>
	onWheelCapture?: WheelEventHandler<T>

	// Animation Events
	onAnimationStart?: AnimationEventHandler<T>
	onAnimationStartCapture?: AnimationEventHandler<T>
	onAnimationEnd?: AnimationEventHandler<T>
	onAnimationEndCapture?: AnimationEventHandler<T>
	onAnimationIteration?: AnimationEventHandler<T>
	onAnimationIterationCapture?: AnimationEventHandler<T>

	// Transition Events
	onTransitionEnd?: TransitionEventHandler<T>
	onTransitionEndCapture?: TransitionEventHandler<T>
}
/**
 *
 */
export type HTMLAttributes<T> = DOMAttributes<T> & {
	children?: Children

	// React-specific Attributes
	defaultChecked?: boolean
	defaultValue?: string | string[]
	suppressContentEditableWarning?: boolean
	suppressHydrationWarning?: boolean

	// Standard HTML Attributes
	accessKey?: string
	className?: string
	contentEditable?: boolean
	contextMenu?: string
	dir?: string
	draggable?: boolean
	hidden?: boolean
	id?: string
	lang?: string
	placeholder?: string
	slot?: string
	spellCheck?: boolean
	style?: CSSProperties
	tabIndex?: number
	title?: string

	// Unknown
	inputMode?: string
	is?: string
	radioGroup?: string // <command>, <menuitem>

	// WAI-ARIA
	role?: string

	// RDFa Attributes
	about?: string
	datatype?: string
	inlist?: string
	prefix?: string
	property?: string
	resource?: string
	typeof?: string
	vocab?: string

	// Non-standard Attributes
	autocapitalize?: string
	autocorrect?: string
	autosave?: string
	color?: string
	itemProp?: string
	itemScope?: boolean
	itemType?: string
	itemID?: string
	itemRef?: string
	results?: number
	security?: string
	unselectable?: 'on' | 'off'
}
/**
 *
 */
export type SVGAttributes<T> = DOMAttributes<T> & {
	children?: Children

	// Attributes which also defined in HTMLAttributes
	// See comment in SVGDOMPropertyConfig.js
	className?: string
	color?: string
	height?: number | string
	id?: string
	lang?: string
	max?: number | string
	media?: string
	method?: string
	min?: number | string
	name?: string
	style?: CSSProperties
	target?: string
	type?: string
	width?: number | string

	// Other HTML properties supported by SVG elements in browsers
	role?: string
	tabIndex?: number

	// SVG Specific attributes
	accentHeight?: number | string
	accumulate?: "none" | "sum"
	additive?: "replace" | "sum"
	alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
	"text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit"
	allowReorder?: "no" | "yes"
	alphabetic?: number | string
	amplitude?: number | string
	arabicForm?: "initial" | "medial" | "terminal" | "isolated"
	ascent?: number | string
	attributeName?: string
	attributeType?: string
	autoReverse?: number | string
	azimuth?: number | string
	baseFrequency?: number | string
	baselineShift?: number | string
	baseProfile?: number | string
	bbox?: number | string
	begin?: number | string
	bias?: number | string
	by?: number | string
	calcMode?: number | string
	capHeight?: number | string
	clip?: number | string
	clipPath?: string
	clipPathUnits?: number | string
	clipRule?: number | string
	colorInterpolation?: number | string
	colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit"
	colorProfile?: number | string
	colorRendering?: number | string
	contentScriptType?: number | string
	contentStyleType?: number | string
	cursor?: number | string
	cx?: number | string
	cy?: number | string
	d?: string
	decelerate?: number | string
	descent?: number | string
	diffuseConstant?: number | string
	direction?: number | string
	display?: number | string
	divisor?: number | string
	dominantBaseline?: number | string
	dur?: number | string
	dx?: number | string
	dy?: number | string
	edgeMode?: number | string
	elevation?: number | string
	enableBackground?: number | string
	end?: number | string
	exponent?: number | string
	externalResourcesRequired?: number | string
	fill?: string
	fillOpacity?: number | string
	fillRule?: "nonzero" | "evenodd" | "inherit"
	filter?: string
	filterRes?: number | string
	filterUnits?: number | string
	floodColor?: number | string
	floodOpacity?: number | string
	focusable?: number | string
	fontFamily?: string
	fontSize?: number | string
	fontSizeAdjust?: number | string
	fontStretch?: number | string
	fontStyle?: "normal" | "italic" | "oblique"
	fontVariant?: "normal" | "small-caps"
	fontWeight?: number | string
	format?: number | string
	from?: number | string
	fx?: number | string
	fy?: number | string
	g1?: number | string
	g2?: number | string
	glyphName?: number | string
	glyphOrientationHorizontal?: number | string
	glyphOrientationVertical?: number | string
	glyphRef?: number | string
	gradientTransform?: string
	gradientUnits?: string
	hanging?: number | string
	horizAdvX?: number | string
	horizOriginX?: number | string
	href?: string
	ideographic?: number | string
	imageRendering?: number | string
	in2?: number | string
	in?: string
	intercept?: number | string
	k1?: number | string
	k2?: number | string
	k3?: number | string
	k4?: number | string
	k?: number | string
	kernelMatrix?: number | string
	kernelUnitLength?: number | string
	kerning?: number | string
	keyPoints?: number | string
	keySplines?: number | string
	keyTimes?: number | string
	lengthAdjust?: number | string
	letterSpacing?: number | string
	lightingColor?: number | string
	limitingConeAngle?: number | string
	local?: number | string
	markerEnd?: string
	markerHeight?: number | string
	markerMid?: string
	markerStart?: string
	markerUnits?: number | string
	markerWidth?: number | string
	mask?: string
	maskContentUnits?: number | string
	maskUnits?: number | string
	mathematical?: number | string
	mode?: number | string
	numOctaves?: number | string
	offset?: number | string
	opacity?: number | string
	operator?: number | string
	order?: number | string
	orient?: number | string
	orientation?: number | string
	origin?: number | string
	overflow?: number | string
	overlinePosition?: number | string
	overlineThickness?: number | string
	paintOrder?: number | string
	panose1?: number | string
	pathLength?: number | string
	patternContentUnits?: string
	patternTransform?: number | string
	patternUnits?: string
	pointerEvents?: number | string
	points?: string
	pointsAtX?: number | string
	pointsAtY?: number | string
	pointsAtZ?: number | string
	preserveAlpha?: number | string
	preserveAspectRatio?: string
	primitiveUnits?: number | string
	r?: number | string
	radius?: number | string
	refX?: number | string
	refY?: number | string
	renderingIntent?: number | string
	repeatCount?: number | string
	repeatDur?: number | string
	requiredExtensions?: number | string
	requiredFeatures?: number | string
	restart?: number | string
	result?: string
	rotate?: number | string
	rx?: number | string
	ry?: number | string
	scale?: number | string
	seed?: number | string
	shapeRendering?: number | string
	slope?: number | string
	spacing?: number | string
	specularConstant?: number | string
	specularExponent?: number | string
	speed?: number | string
	spreadMethod?: string
	startOffset?: number | string
	stdDeviation?: number | string
	stemh?: number | string
	stemv?: number | string
	stitchTiles?: number | string
	stopColor?: string
	stopOpacity?: number | string
	strikethroughPosition?: number | string
	strikethroughThickness?: number | string
	string?: number | string
	stroke?: string
	strokeDasharray?: string | number
	strokeDashoffset?: string | number
	strokeLinecap?: "butt" | "round" | "square" | "inherit"
	strokeLinejoin?: "miter" | "round" | "bevel" | "inherit"
	strokeMiterlimit?: number | string
	strokeOpacity?: number | string
	strokeWidth?: number | string
	surfaceScale?: number | string
	systemLanguage?: number | string
	tableValues?: number | string
	targetX?: number | string
	targetY?: number | string
	textAnchor?: string
	textDecoration?: number | string
	textLength?: number | string
	textRendering?: number | string
	to?: number | string
	transform?: string
	u1?: number | string
	u2?: number | string
	underlinePosition?: number | string
	underlineThickness?: number | string
	unicode?: number | string
	unicodeBidi?: number | string
	unicodeRange?: number | string
	unitsPerEm?: number | string
	vAlphabetic?: number | string
	values?: string
	vectorEffect?: number | string
	version?: string
	vertAdvY?: number | string
	vertOriginX?: number | string
	vertOriginY?: number | string
	vHanging?: number | string
	vIdeographic?: number | string
	viewBox?: string
	viewTarget?: number | string
	visibility?: number | string
	vMathematical?: number | string
	widths?: number | string
	wordSpacing?: number | string
	writingMode?: number | string
	x1?: number | string
	x2?: number | string
	x?: number | string
	xChannelSelector?: string
	xHeight?: number | string
	xlinkActuate?: string
	xlinkArcrole?: string
	xlinkHref?: string
	xlinkRole?: string
	xlinkShow?: string
	xlinkTitle?: string
	xlinkType?: string
	xmlBase?: string
	xmlLang?: string
	xmlns?: string
	xmlnsXlink?: string
	xmlSpace?: string
	y1?: number | string
	y2?: number | string
	y?: number | string
	yChannelSelector?: string
	z?: number | string
	zoomAndPan?: string
}

/**
 *
 */
export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {

	download?: string

	href?: string

	hrefLang?: string

	media?: string

	rel?: string

	target?: string

	type?: string
}

/**
 *
 */
export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}

/**
 *
 */
export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {

	alt?: string

	coords?: string

	download?: string

	href?: string

	hrefLang?: string

	media?: string

	rel?: string

	shape?: string

	target?: string
}

/**
 *
 */
export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {

	href?: string

	target?: string
}

/**
 *
 */
export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {

	cite?: string
}

/**
 *
 */
export type ButtonHTMLAttributes<T> = HTMLAttributes<T> & {
	autofocus?: boolean
	disabled?: boolean
	form?: string
	formAction?: string
	formEncType?: string
	formMethod?: string
	formNoValidate?: boolean
	formTarget?: string
	name?: string
	type?: (
		/** The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value. */
		| "submit"

		/** The button resets all the controls to their initial values, like <input type="reset">. (This behavior tends to annoy users.) */
		| "reset"

		/** The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur. */
		| "button"
	)
	value?: string | string[] | number
}

/**
 *
 */
export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {

	height?: number | string

	width?: number | string
}

/**
 *
 */
export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {

	span?: number

	width?: number | string
}

/**
 *
 */
export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {

	span?: number
}

/**
 *
 */
export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {

	open?: boolean
}

/**
 *
 */
export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {

	cite?: string

	dateTime?: string
}

/**
 *
 */
export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {

	open?: boolean
}

/**
 *
 */
export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {

	height?: number | string

	src?: string

	type?: string

	width?: number | string
}

/**
 *
 */
export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {

	disabled?: boolean

	form?: string

	name?: string
}

/**
 *
 */
export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {

	acceptCharset?: string

	action?: string

	autocomplete?: string

	encType?: string

	method?: string

	name?: string

	noValidate?: boolean

	target?: string
}

/**
 *
 */
export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {

	manifest?: string
}

/**
 *
 */
export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {

	allow?: string

	allowFullScreen?: boolean

	allowTransparency?: boolean

	frameBorder?: number | string

	height?: number | string

	marginHeight?: number

	marginWidth?: number

	name?: string

	sandbox?: string

	scrolling?: string

	seamless?: boolean

	src?: string

	srcDoc?: string

	width?: number | string
}

/**
 *
 */
export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {

	alt?: string

	crossorigin?: "anonymous" | "use-credentials" | ""

	decoding?: "async" | "auto" | "sync"

	height?: number | string

	sizes?: string

	src?: string

	srcSet?: string

	useMap?: string

	width?: number | string
}

/**
 *
 */
export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {

	cite?: string

	dateTime?: string
}

/**
 *
 */
export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {

	accept?: string

	alt?: string

	autocomplete?: string

	autofocus?: boolean

	capture?: boolean | string // https://www.w3.org/TR/html-media-capture/#the-capture-attribute

	checked?: boolean

	crossorigin?: string

	disabled?: boolean

	form?: string

	formAction?: string

	formEncType?: string

	formMethod?: string

	formNoValidate?: boolean

	formTarget?: string

	height?: number | string

	list?: string

	max?: number | string

	maxLength?: number

	min?: number | string

	minLength?: number

	multiple?: boolean

	name?: string

	pattern?: string

	placeholder?: string

	readOnly?: boolean

	required?: boolean

	size?: number

	src?: string

	step?: number | string

	type?: (
		/** A push button with no default behavior displaying the value of the value attribute, empty by default. */
		| "button"
		/** A check box allowing single values to be selected/deselected. */
		| "checkbox"
		/** A control for specifying a color; opening a color picker when active in supporting browsers. */
		| "color"
		/** A control for entering a date (year, month, and day, with no time). Opens a date picker or numeric wheels for year, month, day when active in supporting browsers.  */
		| "date"
		/**  A control for entering a date and time, with no time zone. Opens a date picker or numeric wheels for date- and time-components when active in supporting browsers. */
		| "datetime-local"
		/**  A field for editing an email address. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards. */
		| "email"
		/**  A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select. */
		| "file"
		/**  A control that is not displayed but whose value is submitted to the server. There is an example in the next column, but it's hidden! */
		| "hidden"
		/**  A graphical submit button. Displays an image defined by the src attribute. The alt attribute displays if the image src is missing. */
		| "image"
		/** A control for entering a month and year, with no time zone. */
		| "month"
		/**  A control for entering a number. Displays a spinner and adds default validation. Displays a numeric keypad in some devices with dynamic keypads. */
		| "number"
		/**  A single-line text field whose value is obscured. Will alert user if site is not secure. */
		| "password"
		/** A radio button, allowing a single value to be selected out of multiple choices with the same name value. */
		| "radio"
		/**  A control for entering a number whose exact value is not important. Displays as a range widget defaulting to the middle value. Used in conjunction min and max to define the range of acceptable values. */
		| "range"
		/** A button that resets the contents of the form to default values. Not recommended. */
		| "reset"
		/**  A single-line text field for entering search strings. Line-breaks are automatically removed from the input value. May include a delete icon in supporting browsers that can be used to clear the field. Displays a search icon instead of enter key on some devices with dynamic keypads. */
		| "search"
		/** A button that submits the form.*/
		| "submit"
		/**  A control for entering a telephone number. Displays a telephone keypad in some devices with dynamic keypads. */
		| "tel"
		/**  The default value. A single-line text field. Line-breaks are automatically removed from the input value. */
		| "text"
		/** A control for entering a time value with no time zone. */
		| "time"
		/**  A field for entering a URL. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards. */
		| "url"
		/** A control for entering a date consisting of a week-year number and a week number with no time zone. */
		| "week"
	)

	value?: string | string[] | number

	width?: number | string


	onChange?: ChangeEventHandler<T>
}

/**
 *
 */
export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {

	autofocus?: boolean

	challenge?: string

	disabled?: boolean

	form?: string

	keyType?: string

	keyParams?: string

	name?: string
}

/**
 *
 */
export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {

	form?: string

	htmlFor?: string
}

/**
 *
 */
export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {

	value?: string | string[] | number
}

/**
 *
 */
export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {

	as?: string

	crossorigin?: string

	href?: string

	hrefLang?: string

	integrity?: string

	media?: string

	rel?: string

	sizes?: string

	type?: string
}

/**
 *
 */
export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {

	name?: string
}

/**
 *
 */
export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {

	type?: string
}

/**
 *
 */
export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {

	autoPlay?: boolean

	controls?: boolean

	controlsList?: string

	crossorigin?: string

	loop?: boolean

	mediaGroup?: string

	muted?: boolean

	playsinline?: boolean

	preload?: string

	src?: string
}

/**
 *
 */
export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {

	charSet?: string

	content?: string

	httpEquiv?: string

	name?: string
}

/**
 *
 */
export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {

	form?: string

	high?: number

	low?: number

	max?: number | string

	min?: number | string

	optimum?: number

	value?: string | string[] | number
}

/**
 *
 */
export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {

	cite?: string
}

/**
 *
 */
export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {

	classID?: string

	data?: string

	form?: string

	height?: number | string

	name?: string

	type?: string

	useMap?: string

	width?: number | string

	wmode?: string
}

/**
 *
 */
export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {

	reversed?: boolean

	start?: number

	type?: '1' | 'a' | 'A' | 'i' | 'I'
}

/**
 *
 */
export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {

	disabled?: boolean

	label?: string
}

/**
 *
 */
export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {

	disabled?: boolean

	label?: string

	selected?: boolean

	value?: string | string[] | number
}

/**
 *
 */
export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {

	form?: string

	htmlFor?: string

	name?: string
}

/**
 *
 */
export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {

	name?: string

	value?: string | string[] | number
}

/**
 *
 */
export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {

	max?: number | string

	value?: string | string[] | number
}

/**
 *
 */
export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {

	async?: boolean

	charSet?: string

	crossorigin?: string

	defer?: boolean

	integrity?: string

	noModule?: boolean

	nonce?: string

	src?: string

	type?: string
}

/**
 *
 */
export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {

	autocomplete?: string

	autofocus?: boolean

	disabled?: boolean

	form?: string

	multiple?: boolean

	name?: string

	required?: boolean

	size?: number

	value?: string | string[] | number

	onChange?: ChangeEventHandler<T>
}

/**
 *
 */
export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {

	media?: string

	sizes?: string

	src?: string

	srcSet?: string

	type?: string
}

/**
 *
 */
export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {

	media?: string

	nonce?: string

	scoped?: boolean

	type?: string
}

/**
 *
 */
export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {

	cellPadding?: number | string

	cellSpacing?: number | string

	summary?: string
}

/**
 *
 */
export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {

	autocomplete?: string

	autofocus?: boolean

	cols?: number

	dirName?: string

	disabled?: boolean

	form?: string

	maxLength?: number

	minLength?: number

	name?: string

	placeholder?: string

	readOnly?: boolean

	required?: boolean

	rows?: number

	value?: string | string[] | number

	wrap?: string


	onChange?: ChangeEventHandler<T>
}

/**
 *
 */
export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {

	align?: "left" | "center" | "right" | "justify" | "char"

	colSpan?: number

	headers?: string

	rowSpan?: number

	scope?: string
}

/**
 *
 */
export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {

	align?: "left" | "center" | "right" | "justify" | "char"

	colSpan?: number

	headers?: string

	rowSpan?: number

	scope?: string
}

/**
 *
 */
export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {

	dateTime?: string
}

/**
 *
 */
export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {

	default?: boolean

	kind?: string

	label?: string

	src?: string

	srcLang?: string
}

/**
 *
 */
export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {

	height?: number | string

	playsInline?: boolean

	poster?: string

	width?: number | string
}

/**
 *
 */
export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {

	allowFullScreen?: boolean

	allowpopups?: boolean

	autofocus?: boolean

	autosize?: boolean

	blinkfeatures?: string

	disableblinkfeatures?: string

	disableguestresize?: boolean

	disablewebsecurity?: boolean

	guestinstance?: string

	httpreferrer?: string

	nodeintegration?: boolean

	partition?: string

	plugins?: boolean

	preload?: string

	src?: string

	useragent?: string

	webpreferences?: string
}

//#endregion

//#region Events
/**
 *
 */
export interface SyntheticEvent<T = Element> {

	bubbles: boolean
	/** A reference to the element on which the event listener is registered. */
	currentTarget: EventTarget & T

	cancelable: boolean

	defaultPrevented: boolean

	eventPhase: number

	isTrusted: boolean

	nativeEvent: Event
	// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
	/** A reference to the element from which the event was originally dispatched.
	 * This might be a child element to the element on which the event listener is registered.
	 *
	 * @see currentTarget
	 */
	target: EventTarget

	timeStamp: number

	type: string

	preventDefault(): void

	isDefaultPrevented(): boolean

	// If you thought this should be `EventTarget & T`, see

	stopPropagation(): void

	isPropagationStopped(): boolean

	persist(): void
}

/**
 *
 */
export interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {

	clipboardData: DataTransfer

	nativeEvent: Event
}

/**
 *
 */
export interface CompositionEvent<T = Element> extends SyntheticEvent<T> {

	data: string

	nativeEvent: Event
}

/**
 *
 */
export interface DragEvent<T = Element> extends MouseEvent<T> {

	dataTransfer: DataTransfer

	nativeEvent: Event
}

/**
 *
 */
export interface PointerEvent<T = Element> extends MouseEvent<T> {

	pointerId: number

	pressure: number

	tiltX: number

	tiltY: number

	width: number

	height: number

	pointerType: 'mouse' | 'pen' | 'touch'

	isPrimary: boolean

	nativeEvent: Event
}

/**
 *
 */
export interface FocusEvent<T = Element> extends SyntheticEvent<T> {

	nativeEvent: Event

	relatedTarget: EventTarget

	target: EventTarget & T
}

/**
 *
 */
export interface FormEvent<T = Element> extends SyntheticEvent<T> {
}

/**
 *
 */
export interface InvalidEvent<T = Element> extends SyntheticEvent<T> {

	target: EventTarget & T
}

/**
 *
 */
export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {

	target: EventTarget & T
}

/**
 *
 */
export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {

	altKey: boolean

	charCode: number

	ctrlKey: boolean
	/** See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible
	 * values
	 */
	key: string

	keyCode: number

	locale: string

	location: number

	metaKey: boolean

	nativeEvent: Event

	repeat: boolean

	shiftKey: boolean

	which: number

	/** See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}

/**
 *
 */
export interface MouseEvent<T = Element> extends SyntheticEvent<T> {

	altKey: boolean

	button: number

	buttons: number

	clientX: number

	clientY: number

	ctrlKey: boolean

	metaKey: boolean

	nativeEvent: Event

	pageX: number

	pageY: number

	relatedTarget: EventTarget

	screenX: number

	screenY: number

	shiftKey: boolean

	/** See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}

/**
 *
 */
export interface TouchEvent<T = Element> extends SyntheticEvent<T> {

	altKey: boolean

	changedTouches: TouchList

	ctrlKey: boolean

	metaKey: boolean

	nativeEvent: Event

	shiftKey: boolean

	targetTouches: TouchList

	touches: TouchList

	/** See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}

/**
 *
 */
export interface UIEvent<T = Element> extends SyntheticEvent<T> {

	detail: number

	nativeEvent: Event

	view: {
		styleMedia: StyleMedia
		document: Document
	}
}

/**
 *
 */
export interface WheelEvent<T = Element> extends MouseEvent<T> {

	deltaMode: number

	deltaX: number

	deltaY: number

	deltaZ: number

	nativeEvent: Event
}

/**
 *
 */
export interface AnimationEvent<T = Element> extends SyntheticEvent<T> {

	animationName: string

	elapsedTime: number

	nativeEvent: Event

	pseudoElement: string
}

/**
 *
 */
export interface TransitionEvent<T = Element> extends SyntheticEvent<T> {

	elapsedTime: number

	nativeEvent: Event

	propertyName: string

	pseudoElement: string
}

/**
 *
 */
export type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"]

/**
 *
 */
export type SomaticEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>

/**
 *
 */
type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>
/**
 *
 */
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>
/**
 *
 */
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>
/**
 *
 */
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>
/**
 *
 */
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>
/**
 *
 */
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>
/**
 *
 */
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>
/**
 *
 */
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>
/**
 *
 */
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>
/**
 *
 */
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>
/**
 *
 */
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>
/**
 *
 */
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>
/**
 *
 */
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>
/**
 *
 */
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>

//#endregion

/* export interface DOMElement<Attr extends HTMLAttributes<Elt> | SVGAttributes<Elt>, Elt extends Element> extends VNode<Attr, string> {
 //type: string
 }*/
/* export type DOMFactory<Attr extends DOMAttributes<Elt>, Elt extends Element> = (
 props?: ClassAttributes<Elt> & Attr | null,
 // eslint-disable-next-line fp/no-rest-parameters
 ...children: VNode[]
 ) => DOMElement<Attr, Elt>
 */

