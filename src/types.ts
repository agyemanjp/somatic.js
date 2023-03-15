import { DigitNonZero, Obj } from "@agyemanjp/standard"
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

export interface ComponentOptions<P extends Obj = Obj> {
	name?: string
	isPure?: boolean
	defaultProps?: Partial<P>
}

export type Children = UIElement | UIElement[] // Children can be of various types, so not meaningful to give them a

export interface UIElementBase<P = unknown> {
	props: P,
	children?: Children
}
export interface IntrinsicElement<P extends Obj = Obj> extends UIElementBase<P> {
	type: string
}
export interface ComponentElt<P extends Obj = Obj> extends UIElementBase<P> {
	type: Component<P>,
	result?: ComponentResult
}
export type ValueElement = | null | string | number | bigint | symbol | boolean | Object

/** An UI element is, basically, information for a future (component) function invocation,
 * I.e., the component function plus the arguments with which to call it
 * A component element produces another component element, recursively,
 * until an intrinsic element is obtained, at which point we can generate an actual node from it
 */
export type UIElement<P extends Obj = Obj> = ComponentElt<P> | IntrinsicElement<P> | /*FragmentElement |*/ ValueElement

export type ComponentResult = {
	element: UIElement,
	generator?: Generator<UIElement, UIElement> | AsyncGenerator<UIElement, UIElement>
}

export interface ComponentEltAugmented<P extends Obj = Obj> extends ComponentElt<P> {
	result: ComponentResult
}

export interface RenderingTrace {
	componentElts: ComponentEltAugmented[],
	leafElement: IntrinsicElement | ValueElement
}

export type DOMElement = SVGElement | HTMLElement
export type DOMAugmented = DOMElement & { renderTrace: RenderingTrace }

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
	animation?: `${string} ${number} ${"normal" | "reverse" | "alternate" | "alternate-reverse"} ${"none" | "forward" | "backward" | "both"} ${"running" | "paused"} ${string}`
	animationDelay?: CSSProperty<(CSSTime)>
	animationDirection?: CSSProperty<"normal" | "reverse" | "alternate" | "alternate-reverse">
	animationDuration?: CSSProperty<(CSSTime)>
	animationFillMode?: CSSProperty<("none" | "forward" | "backward" | "both")>
	animationIterationCount?: CSSProperty<("infinite" | number)>
	animationName?: CSSProperty<(string)>
	animationPlayState?: CSSProperty<("running" | "paused")>
	animationTimingFunction?: CSSEasingFunction
	backfaceVisibility?: CSSProperty<("visible" | "hidden")>
	background?: CSSProperty<(string)>
	backgroundAttachment?: CSSProperty<("scroll" | "fixed" | "local")>
	backgroundClip?: CSSProperty<("border-box" | "padding-box" | "content-box" | "text")>
	backgroundColor?: CSSProperty<(CSSColor | string)>
	backgroundImage?: CSSProperty<(`url(${string})`)>
	backgroundOrigin?: CSSProperty<("border-box" | "padding-box" | "content-box")>
	backgroundPosition?: CSSProperty<(
		| "top"
		| "right"
		| "bottom"
		| "left"
		| "center"
		| string
	)>
	backgroundPositionX?: CSSProperty<(
		| "left"
		| "center"
		| "right"
		| CSSLength
		| `${"right" | "left"} ${string}`
	)>
	backgroundPositionY?: CSSProperty<(
		| "left"
		| "center"
		| "right"
		| CSSLength
		| `${"right" | "left"} ${string}`
	)>
	backgroundRepeat?: CSSProperty<(
		| "repeat-x"
		| "repeat-y"
		| "repeat"
		| "space"
		| "round"
		| "no-repeat"
	)>
	backgroundSize?: CSSProperty<(
		| "auto"
		| "cover"
		| "contain"
		| string
	)>
	baselineShift?: CSSLength | "sub" | "super"
	border?: CSSProperty<(CSSBorderStyle | CSSLength | string)>
	borderBottom?: CSSProperty<(CSSLength | CSSBorderStyle)>
	borderBottomColor?: CSSProperty<CSSColor>
	borderBottomLeftRadius?: CSSProperty<(CSSLength)>
	borderBottomRightRadius?: CSSProperty<(CSSLength)>
	borderBottomStyle?: CSSProperty<(CSSBorderStyle)>
	borderBottomWidth?: CSSProperty<(CSSLength)>
	borderCollapse?: CSSProperty<("collapse" | "separate")>
	borderColor?: CSSProperty<(CSSColor)>
	borderImage?: CSSProperty<(
		| `url(${string}) ${number} ${string}`
		| string
	)>
	borderImageOutset?: CSSProperty<(CSSLength | string)>
	borderImageRepeat?: CSSProperty<("stretch" | "repeat" | "round" | "space")>
	borderImageSlice?: CSSProperty<(string | number | CSSLength)>
	borderImageSource?: CSSProperty<("none" | `url(${string})`)>
	borderImageWidth?: CSSProperty<(string | number | CSSLength)>
	borderLeft?: CSSProperty<(string | CSSLength | CSSBorderStyle)>
	borderLeftColor?: CSSProperty<(CSSColor)>
	borderLeftStyle?: CSSProperty<(CSSBorderStyle)>
	borderLeftWidth?: CSSProperty<(CSSBorderWidth | CSSLength)>
	borderRadius?: CSSProperty<(string | CSSLength)>
	borderRight?: CSSProperty<(string | CSSLength | CSSBorderStyle)>
	borderRightColor?: CSSProperty<(CSSColor)>
	borderRightStyle?: CSSProperty<(CSSBorderStyle)>
	borderRightWidth?: CSSProperty<(CSSBorderWidth | CSSLength)>
	borderSpacing?: CSSProperty<(string | CSSLength)>
	borderStyle?: CSSProperty<(CSSBorderStyle)>
	borderTop?: CSSProperty<(CSSLength | CSSBorderWidth | CSSBorderStyle)>
	borderTopColor?: CSSProperty<(CSSColor)>
	borderTopLeftRadius?: CSSProperty<(string | CSSLength)>
	borderTopRightRadius?: CSSProperty<(string | CSSLength)>
	borderTopStyle?: CSSProperty<(CSSBorderStyle)>
	borderTopWidth?: CSSProperty<(CSSBorderStyle | CSSLength)>
	borderWidth?: CSSProperty<(string | CSSLength | CSSBorderWidth)>
	bottom?: CSSProperty<(CSSLength | "auto")>
	boxShadow?: CSSProperty<("none" | CSSLength | CSSColor | string)>
	boxSizing?: CSSProperty<("border-box" | "content-box")>
	breakAfter?: CSSProperty<(
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
	breakBefore?: CSSProperty<(
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
	breakInside?: CSSProperty<(
		| "auto"
		| "avoid"
		| "avoid-page"
		| "avoid-column"
		| "avoid-region"
	)>
	captionSide?: CSSProperty<(
		| "top"
		| "bottom"
		| "block-start"
		| "block-end"
		| "inline-start"
		| "inline-end"
	)>
	clear?: CSSProperty<(
		| "none"
		| "left"
		| "right"
		| "both"
		| "inline-start"
		| "inline-end"
	)>
	clip?: CSSProperty<(string | "auto")>
	clipPath?: CSSProperty<(
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
	)>
	clipRule?: "nonzero" | "evenodd" | "inherit"
	color?: CSSColor | "inherit"
	colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB"
	columnCount?: CSSProperty<("auto" | number)>
	columnFill?: CSSProperty<("auto" | "balance" | "balance-all")>
	columnRule?: CSSProperty<(CSSBorderStyle | string)>
	columnRuleColor?: CSSProperty<(CSSColor | string)>
	columnRuleStyle?: CSSProperty<(CSSBorderStyle)>
	columnRuleWidth?: CSSProperty<(CSSBorderStyle | CSSLength)>
	columnSpan?: CSSProperty<("none" | "all")>
	columnWidth?: CSSProperty<("auto" | CSSLength)>
	columns?: CSSProperty<(
		| CSSLength
		| "auto"
		| number
		| string
	)>
	content?: CSSProperty<(string | null)>
	counterIncrement?: CSSProperty<(string | "none")>
	counterReset?: CSSProperty<(string | "none")>
	cssFloat?: string | null
	float?: CSSProperty<(
		| "left"
		| "right"
		| "none"
		| "inline-start"
		| "inline-end"
	)>
	cssText?: string
	cursor?: CSSProperty<(
		| CursorKeywords
		| `url(${string}), ${CursorKeywords}`
		| `url(${string}) ${number} ${number}, ${CursorKeywords}`
	)>
	direction?: CSSProperty<("ltr" | "rtl")>
	display?: CSSProperty<(
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
	)>
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
	emptyCells?: CSSProperty<("show" | "hide")>
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
	flex?: CSSProperty<(
		| "none"
		| "auto"
		| "initial"
		| number
		| CSSLength
		| string
	)>
	flexBasis?: CSSProperty<(
		| "auto"
		| CSSLength
		| "min-content"
		| "max-content"
		| "fit-content"
		| "content"
	)>
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
	fontFamily?: CSSProperty<(
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
	)>
	fontFeatureSettings?: CSSProperty<(
		| "normal"
		| string
		| `${string} ${"on" | "off" | number}`
	)>
	fontSize?: CSSProperty<(
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
	)>
	fontSizeAdjust?: CSSProperty<(
		| "none"
		| number
		| `${"ex-height" | "cap-height" | "ch-width" | "ic-width" | "ic-height"} ${number}`
	)>
	fontStretch?: CSSProperty<(
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
	)>
	fontStyle?: CSSProperty<(
		| "normal"
		| "italic"
		| "oblique"
		| `oblique ${number}deg`
	)>
	fontVariant?: CSSProperty<(
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
	)>
	fontWeight?: CSSProperty<(
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
	)>
	glyphOrientationHorizontal?: `${number} ${"deg" | "grad" | "rad"}`
	glyphOrientationVertical?: `${number} ${"deg" | "grad" | "rad"}`
	height?: CSSProperty<(
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)>
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
	letterSpacing?: CSSProperty<("normal" | CSSLength)>
	lightingColor?: CSSColor
	lineHeight?: CSSProperty<("normal" | number | CSSLength)>
	listStyle?: CSSProperty<(string | null)>
	listStyleImage?: CSSProperty<("none" | `url(${string})` | `linear-gradient(${string})`)>
	listStylePosition?: CSSProperty<("inside" | "outside")>
	listStyleType?: CSSProperty<(
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
	)>
	margin?: CSSProperty<(
		| number
		| CSSLength
		| string
	)>
	marginBottom?: CSSProperty<(CSSLength | "auto" | `${number}`)>
	marginLeft?: CSSProperty<(CSSLength | "auto" | `${number}`)>
	marginRight?: CSSProperty<(CSSLength | "auto" | `${number}`)>
	marginTop?: CSSProperty<(CSSLength | "auto" | `${number}`)>
	marker?: string | null
	markerEnd?: string | null
	markerMid?: string | null
	markerStart?: string | null
	mask?: CSSProperty<(string | "none" | null)>
	maxHeight?: CSSProperty<(
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "none"
		| CSSLength
	)>
	maxWidth?: CSSProperty<(
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "none"
		| CSSLength
	)>
	minHeight?: CSSProperty<(
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| CSSLength
	)>
	minWidth?: CSSProperty<(
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| CSSLength
	)>
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
	opacity?: CSSProperty<(number | `${number}%`)>
	order?: CSSProperty<(string | null)>
	orphans?: CSSProperty<(number)>
	outline?: CSSProperty<(CSSBorderStyle | string)>
	outlineColor?: CSSProperty<(CSSColor | "invert")>
	outlineStyle?: CSSProperty<(CSSBorderStyle)>
	outlineWidth?: CSSProperty<(CSSBorderWidth | CSSLength)>
	overflow?: CSSProperty<(
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)>
	overflowX?: CSSProperty<(
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)>
	overflowY?: CSSProperty<(
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)>
	padding?: CSSProperty<(number | CSSLength | string)>
	paddingBottom?: CSSProperty<(CSSLength)>
	paddingLeft?: CSSProperty<(CSSLength)>
	paddingRight?: CSSProperty<(CSSLength)>
	paddingTop?: CSSProperty<(CSSLength)>
	pageBreakAfter?: CSSProperty<(
		| "auto"
		| "always"
		| "avoid"
		| "left"
		| "right"
		| "recto"
		| "verso"
	)>
	pageBreakBefore?: CSSProperty<(
		| "auto"
		| "always"
		| "avoid"
		| "left"
		| "right"
		| "recto"
		| "verso"
	)>
	pageBreakInside?: CSSProperty<("auto" | "avoid")>
	perspective?: CSSProperty<("none" | CSSLength)>
	perspectiveOrigin?: CSSProperty<(string | null)>
	pointerEvents?: CSSProperty<(
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
	)>
	position?: CSSProperty<("static" /*default*/ | "fixed" | "absolute" | "relative" | "sticky" | null)>
	quotes?: CSSProperty<(
		| "none"
		| "auto"
		| string
	)>
	right?: CSSProperty<("auto" | CSSLength)>
	rubyAlign?: CSSProperty<("start" | "center" | "space-between" | "space-around")>
	rubyOverhang?: string | null
	rubyPosition?: CSSProperty<("over" | "under" | "alternate" | "inter-character")>
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
	tableLayout?: CSSProperty<("auto" | "fixed")>
	textAlign?: CSSProperty<(
		| "start"
		| "end"
		| "left"
		| "right"
		| "center"
		| "justify"
		| "justify-all"
		| "match-parent"
		| string
	)>
	textAlignLast?: CSSProperty<(
		| "auto"
		| "start"
		| "end"
		| "left"
		| "right"
		| "center"
		| "justify"
	)>
	textAnchor?: "start" | "middle" | "end"
	textDecoration?: CSSProperty<("none" | "underline" | "overline" | CSSColor)>
	textIndent?: CSSProperty<(CSSLength | "each-line" | "hanging")>
	textJustify?: CSSProperty<(
		| "auto"
		| "none"
		| "inter-word"
		| "inter-character"
		| "distribute"
	)>
	textKashida?: string | null
	textKashidaSpace?: string | null
	textOverflow?: CSSProperty<("clip" | "ellipsis")>
	textShadow?: CSSProperty<(string | null)>
	textTransform?: CSSProperty<(
		| "none"
		| "capitalize"
		| "uppercase"
		| "lowercase"
		| "full-width"
		| "full-size-kana"
	)>
	textUnderlinePosition?: CSSProperty<(
		| "auto"
		| "under"
		| "left"
		| "right"
		| `${"auto" | "under" | "left" | "right"} ${"auto" | "under" | "left" | "right"}`
	)>
	top?: CSSProperty<("auto" | CSSLength)>
	touchAction?: CSSProperty<(
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
	)>
	transform?: CSSProperty<(
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
	transformOrigin?: CSSProperty<(
		| CSSLength
		| "left"
		| "right"
		| "center"
		| "bottom"
		| string
	)>
	transformStyle?: CSSProperty<("flat" | "preserve-3d")>
	transition?: CSSProperty<(
		// | `${string} ${CSSTime}`
		// | `${string} ${CSSTime} ${CSSTime}`
		// | `${string} ${CSSTime} ${CSSEasingFunction}`
		// | `${string} ${CSSTime} ${CSSEasingFunction} ${CSSTime}`
		| `all ${CSSTime} ${CSSEasingFunction}`
		| string
	)>
	transitionDelay?: CSSProperty<(CSSTime | string)>
	transitionDuration?: CSSProperty<(CSSTime | string)>
	transitionProperty?: CSSProperty<("none" | "all" | string)>
	transitionTimingFunction?: CSSProperty<(CSSEasingFunction)>
	unicodeBidi?: CSSProperty<(
		| "normal"
		| "embed"
		| "isolate"
		| "bidi-override"
		| "isolate-override"
		| "plaintext"
	)>
	verticalAlign?: CSSProperty<(
		| "baseline"
		| "sub"
		| "super"
		| "text-top"
		| "text-bottom"
		| "middle"
		| "top"
		| "bottom"
		| CSSLength
	)>
	visibility?: CSSProperty<("visible" | "hidden" | "collapse")>
	/** Aligns the content within a flex container when there is extra space along the cross-axis.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
	 */
	webkitAlignContent?: CSSProperty<('flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' | 'baseline' | 'safe' | 'unsafe')> | null

	/** Aligns flex items along the cross-axis of the flex container.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
	 */
	webkitAlignItems?: CSSProperty<('stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe' | 'unsafe')> | null

	/** Aligns a flex item within its flex container.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
	 */
	webkitAlignSelf?: CSSProperty<('auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe' | 'unsafe')> | null

	/** A shorthand property for all the animation-* properties, except animation-play-state.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation
	 */
	webkitAnimation?: string | null

	/** Defines a length of time to elapse before an animation starts, allowing an animation to begin execution some time after it is applied.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
	 */
	webkitAnimationDelay?: CSSProperty<(CSSTime)>

	/** Defines whether an animation should run forwards, backwards, or alternating back and forth.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
	 */
	webkitAnimationDirection?: CSSProperty<('normal' | 'reverse' | 'alternate' | 'alternate-reverse')> | null

	/** Defines the length of time that an animation takes to complete one cycle.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
	 */
	webkitAnimationDuration?: CSSProperty<(CSSTime)>

	/** Defines how the animation applies styles to its target before and after it is executed.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
	 */
	webkitAnimationFillMode?: CSSProperty<('none' | 'forwards' | 'backwards' | 'both')> | null

	/** Defines the number of times an animation cycle should be played before stopping.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
	 */
	webkitAnimationIterationCount?: CSSProperty<('infinite' | number)> | null

	/** Specifies the name of the keyframe to use for the animation.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
	 */
	webkitAnimationName?: CSSProperty<(string)> | null

	/** Defines whether the animation is running or paused.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
	 */
	webkitAnimationPlayState?: CSSProperty<('running' | 'paused')> | null

	/** Specifies the speed curve of an animation.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
	 */
	webkitAnimationTimingFunction?: CSSEasingFunction


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

export type CSSProperty<T> = T | "inherit" | "initial" | "revert" | "unset"

type CSSBorderWidth = "thin" | "medium" | "thick"
type CSSBorderStyle = (
	"none"
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
type CursorKeywords = (
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
type CSSEasingFunction = (
	"linear"
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
type CSSTime = `${number}${CSSTimeUnit}`
type CSSTimeUnit = (
	| "ms"
	| "s"
)
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

/** CSS Length units. See https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units */
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

type SpaceRepeated<S extends string, Max extends DigitNonZero> = Max extends 1 ? S : S | `${S} ${SpaceRepeated<S, Dec<Max>>}`
type Dec<N extends DigitNonZero> = (N extends 9 ? 8
	: N extends 8 ? 7
	: N extends 7 ? 6
	: N extends 6 ? 5
	: N extends 5 ? 4
	: N extends 4 ? 3
	: N extends 3 ? 2
	: N extends 2 ? 1
	: 1
)

export type HtmlProps = Partial<HTMLAttributes<HTMLElement>>
export type StyleProps = { style?: CSSProperties }
export type PanelProps = Partial<{
	itemsAlignH: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	itemsAlignV: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	orientation: "vertical" | "horizontal"
}>

export type IconProps = Partial<{
	color: string | null | undefined
	size: string | number
	style: CSSProperties
}>

//#region Attributes
export interface Attributes {
	key?: string | number | symbol
}

export interface ClassAttributes<T> extends Attributes {
}

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

export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
	download?: string
	href?: string
	hrefLang?: string
	media?: string
	rel?: string
	target?: string
	type?: string
}

export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}

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

export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
	href?: string
	target?: string
}

export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
}

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

export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
	height?: number | string
	width?: number | string
}

export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
	span?: number
	width?: number | string
}

export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
	span?: number
}

export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
	open?: boolean
}

export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
	dateTime?: string
}

export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
	open?: boolean
}

export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
	height?: number | string
	src?: string
	type?: string
	width?: number | string
}

export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean
	form?: string
	name?: string
}

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

export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
	manifest?: string
}

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

export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
	dateTime?: string
}

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

export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
	autofocus?: boolean
	challenge?: string
	disabled?: boolean
	form?: string
	keyType?: string
	keyParams?: string
	name?: string
}

export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
	form?: string
	htmlFor?: string
}

export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
	value?: string | string[] | number
}

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

export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
	name?: string
}

export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
	type?: string
}

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

export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
	charSet?: string
	content?: string
	httpEquiv?: string
	name?: string
}

export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
	form?: string
	high?: number
	low?: number
	max?: number | string
	min?: number | string
	optimum?: number
	value?: string | string[] | number
}

export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
}

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

export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
	reversed?: boolean
	start?: number
	type?: '1' | 'a' | 'A' | 'i' | 'I'
}

export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean
	label?: string
}

export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean
	label?: string
	selected?: boolean
	value?: string | string[] | number
}

export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
	form?: string
	htmlFor?: string
	name?: string
}

export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
	name?: string
	value?: string | string[] | number
}

export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
	max?: number | string
	value?: string | string[] | number
}

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

export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
	media?: string
	sizes?: string
	src?: string
	srcSet?: string
	type?: string
}

export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
	media?: string
	nonce?: string
	scoped?: boolean
	type?: string
}

export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
	cellPadding?: number | string
	cellSpacing?: number | string
	summary?: string
}

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

export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
	align?: "left" | "center" | "right" | "justify" | "char"
	colSpan?: number
	headers?: string
	rowSpan?: number
	scope?: string
}

export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
	align?: "left" | "center" | "right" | "justify" | "char"
	colSpan?: number
	headers?: string
	rowSpan?: number
	scope?: string
}

export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
	dateTime?: string
}

export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
	default?: boolean
	kind?: string
	label?: string
	src?: string
	srcLang?: string
}

export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
	height?: number | string
	playsInline?: boolean
	poster?: string
	width?: number | string
}

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
	/**
	 * A reference to the element from which the event was originally dispatched.
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

export interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {
	clipboardData: DataTransfer
	nativeEvent: Event
}

export interface CompositionEvent<T = Element> extends SyntheticEvent<T> {
	data: string
	nativeEvent: Event
}

export interface DragEvent<T = Element> extends MouseEvent<T> {
	dataTransfer: DataTransfer
	nativeEvent: Event
}

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

export interface FocusEvent<T = Element> extends SyntheticEvent<T> {
	nativeEvent: Event
	relatedTarget: EventTarget
	target: EventTarget & T
}

export interface FormEvent<T = Element> extends SyntheticEvent<T> {
}

export interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
	target: EventTarget & T
}

export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
	target: EventTarget & T
}

export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
	altKey: boolean
	charCode: number
	ctrlKey: boolean
	/**
	 * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible
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

	/**
	 * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}

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

	/**
	 * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}

export interface TouchEvent<T = Element> extends SyntheticEvent<T> {
	altKey: boolean
	changedTouches: TouchList
	ctrlKey: boolean
	metaKey: boolean
	nativeEvent: Event
	shiftKey: boolean
	targetTouches: TouchList
	touches: TouchList

	/**
	 * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}

export interface UIEvent<T = Element> extends SyntheticEvent<T> {
	detail: number
	nativeEvent: Event
	view: {
		styleMedia: StyleMedia
		document: Document
	}
}

export interface WheelEvent<T = Element> extends MouseEvent<T> {
	deltaMode: number
	deltaX: number
	deltaY: number
	deltaZ: number
	nativeEvent: Event
}

export interface AnimationEvent<T = Element> extends SyntheticEvent<T> {
	animationName: string
	elapsedTime: number
	nativeEvent: Event
	pseudoElement: string
}

export interface TransitionEvent<T = Element> extends SyntheticEvent<T> {
	elapsedTime: number
	nativeEvent: Event
	propertyName: string
	pseudoElement: string
}

export type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"]

export type SomaticEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>

type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>
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



