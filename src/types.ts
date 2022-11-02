/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {DigitNonZero, Obj} from "@agyemanjp/standard"
import {colorConstants} from "./common"

/** Main component type */
export type Component<P extends Obj = Obj> =
    ((props: P & { children?: Children, key?: string }/*, extra: { invalidate: () => void }*/) =>
        // UIElement generic types below should not be generic type since we don't know their props in advance
        | AsyncGenerator<UIElement, UIElement, typeof props>
        | Generator<UIElement, UIElement, typeof props>
        | Promise<UIElement>
        | UIElement
        )
    & ComponentOptions<P>

export interface ComponentOptions<P extends Obj = Obj> {
    name?: string
    isPure?: boolean
    defaultProps?: Partial<P>
}

export type Children = UIElement | UIElement[] // Children can be of various types, so not meaningful to give them a
                                               // generic type
export interface UIElementBase<P = unknown> {
    props: P,
    children?: Children
}

export interface IntrinsicElement<P extends Obj = Obj> extends UIElementBase<P> {
    type: string
}

// export interface FragmentElement extends UIElementBase<undefined> { type: "" }
export interface ComponentElt<P extends Obj = Obj> extends UIElementBase<P> {
    type: Component<P>,
    result?: ComponentResult
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ValueElement = | null | string | number | bigint | symbol | boolean | Object

/** An UI element is, basically, information for a future (component) function invocation,
 * I.e., the component function plus the arguments with which to call it
 * A component element produces another component element, recursively,
 * until an intrinsic element is obtained, at which point we can generate an actual node from it
 */
// eslint-disable-next-line @typescript-eslint/ban-types
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
    alignContent?: (

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
        );
    alignItems?: (
        | GlobalValues
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
        );
    alignSelf?: (
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
        );
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
        );
    animation?: `${string} ${number} ${"normal" | "reverse" | "alternate" | "alternate-reverse"} ${"none" | "forward" | "backward" | "both"} ${"running" | "paused"} ${string}`;
    animationDelay?: string;
    animationDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    animationDuration?: string;
    animationFillMode?: "none" | "forward" | "backward" | "both";
    animationIterationCount?: "infinite" | number;
    animationName?: string;
    animationPlayState?: "running" | "paused";
    animationTimingFunction?: CSSEasingFunction;
    backfaceVisibility?: "visible" | "hidden";
    background?: string;
    backgroundAttachment?: "scroll" | "fixed" | "local";
    backgroundClip?: "border-box" | "padding-box" | "content-box" | "text";
    backgroundColor?: CSSColor | string;
    backgroundImage?: `url(${string})`
    backgroundOrigin?: "border-box" | "padding-box" | "content-box";
    backgroundPosition?: (
        | "top"
        | "right"
        | "bottom"
        | "left"
        | "center"
        | string
        );
    backgroundPositionX?: (
        | "left"
        | "center"
        | "right"
        | CSSLength
        | `${"right" | "left"} ${string}`
        );
    backgroundPositionY?: (
        | "left"
        | "center"
        | "right"
        | CSSLength
        | `${"right" | "left"} ${string}`
        );
    backgroundRepeat?: (
        | "repeat-x"
        | "repeat-y"
        | "repeat"
        | "space"
        | "round"
        | "no-repeat"
        );
    backgroundSize?: (
        | "auto"
        | "cover"
        | "contain"
        | string
        );
    baselineShift?: CSSLength | "sub" | "super";
    border?: string | null;
    borderBottom?: CSSLength;
    borderBottomColor?: CSSColor;
    borderBottomLeftRadius?: string | number;
    borderBottomRightRadius?: string | number;
    borderBottomStyle?: NamedBorderStyle;
    borderBottomWidth?: CSSLength;
    borderCollapse?: "collapse" | "separate";
    borderColor?: CSSColor;
    borderImage?: (
        | `url(${string}) ${number} ${string}`
        | string
        );
    borderImageOutset?: number | string;
    borderImageRepeat?: "stretch" | "repeat" | "round" | "space";
    borderImageSlice?: string | number | CSSLength;
    borderImageSource?: "none" | `url(${string})`;
    borderImageWidth?: string | number | CSSLength;
    borderLeft?: string | CSSLength;
    borderLeftColor?: CSSColor;
    borderLeftStyle?: NamedBorderStyle;
    borderLeftWidth?: NamedBorderWidth | CSSLength;
    borderRadius?: string | CSSLength;
    borderRight?: string | CSSLength;
    borderRightColor?: CSSColor;
    borderRightStyle?: NamedBorderStyle;
    borderRightWidth?: NamedBorderWidth | CSSLength;
    borderSpacing?: string | CSSLength;
    borderStyle?: NamedBorderStyle;
    borderTop?: CSSLength | NamedBorderWidth | NamedBorderStyle;
    borderTopColor?: CSSColor;
    borderTopLeftRadius?: string | CSSLength;
    borderTopRightRadius?: string | CSSLength;
    borderTopStyle?: NamedBorderStyle;
    borderTopWidth?: NamedBorderStyle | CSSLength;
    borderWidth?: string | CSSLength;
    bottom?: CSSLength | "auto";
    boxShadow?: string | null;
    boxSizing?: "border-box" | "content-box";
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
        );
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
        );
    breakInside?: (
        | "auto"
        | "avoid"
        | "avoid-page"
        | "avoid-column"
        | "avoid-region"
        );
    captionSide?: (
        | "top"
        | "bottom"
        | "block-start"
        | "block-end"
        | "inline-start"
        | "inline-end"
        );
    clear?: (
        | "none"
        | "left"
        | "right"
        | "both"
        | "inline-start"
        | "inline-end"
        );
    clip?: string | null;
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
        );
    clipRule?: "nonzero" | "evenodd" | "inherit";
    color?: CSSColor | string;
    colorInterpolationFilters?: string | null;
    columnCount?: "auto" | number;
    columnFill?: "auto" | "balance" | "balance-all";
    columnRule?: NamedBorderStyle | string;
    columnRuleColor?: CSSColor | string;
    columnRuleStyle?: NamedBorderStyle;
    columnRuleWidth?: NamedBorderStyle | CSSLength;
    columnSpan?: "none" | "all";
    columnWidth?: "auto" | CSSLength;
    columns?: (
        | CSSLength
        | "auto"
        | number
        | string
        );
    content?: string | null;
    counterIncrement?: string | "none";
    counterReset?: string | "none";
    cssFloat?: string | null;
    float?: (
        | "left"
        | "right"
        | "none"
        | "inline-start"
        | "inline-end"
        );
    cssText?: string;
    cursor?: (
        | CursorKeywords
        | `url(${string}), ${CursorKeywords}`
        | `url(${string}) ${number} ${number}, ${CursorKeywords}`
        );
    direction?: "ltr" | "rtl";
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
        );
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
        );
    emptyCells?: "show" | "hide";
    enableBackground?: "accumulate" | `${number} ${number} ${number} ${number}`;
    fill?: string | null;
    fillOpacity?: number | `${number}%`;
    fillRule?: "nonzero" | "evenodd";
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
        );
    flex?: (
        | "none"
        | "auto"
        | "initial"
        | number
        | CSSLength
        | string
        );
    flexBasis?: (
        | "auto"
        | CSSLength
        | "min-content"
        | "max-content"
        | "fit-content"
        | "content"
        );
    flexDirection?: (
        | "row"
        | "row-reverse"
        | "column"
        | "column-reverse"
        );
    flexFlow?: (
        | "row"
        | "row-reverse"
        | "column"
        | "column-reverse"
        | "nowrap"
        | "wrap"
        | "wrap-reverse"
        //| `${"row" | "row-reverse" | "column" | "column-reverse"} ${"nowrap" | "wrap" | "wrap-reverse"}`
        );
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    floodColor?: CSSColor;
    floodOpacity?: number | `${number}%`;
    font?: string | null;
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
        );
    fontFeatureSettings?: (
        | "normal"
        | string
        | `${string} ${"on" | "off" | number}`
        );
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
        );
    fontSizeAdjust?: (
        | "none"
        | number
        | `${"ex-height" | "cap-height" | "ch-width" | "ic-width" | "ic-height"} ${number}`
        );
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
        );
    fontStyle?: (
        | "normal"
        | "italic"
        | "oblique"
        | `oblique ${number}deg`
        );
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
        );
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
        );
    glyphOrientationHorizontal?: `${number} ${"deg" | "grad" | "rad"}`;
    glyphOrientationVertical?: `${number} ${"deg" | "grad" | "rad"}`;
    height?: (
        | "max-content"
        | "min-content"
        //| `fit-content(${CSSLength})`
        | "auto"
        | CSSLength
        );
    imeMode?: (
        | "auto"
        | "normal"
        | "active"
        | "inactive"
        | "disabled"
        );
    justifyContent?: (
        | GlobalValues
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
        );
    kerning?: "auto" | number | CSSLength;
    left?: "auto" | CSSLength;
    readonly length?: CSSLength;
    letterSpacing?: "normal" | CSSLength;
    lightingColor?: CSSColor;
    lineHeight?: "normal" | number | CSSLength;
    listStyle?: string | null;
    listStyleImage?: "none" | `url(${string})`;
    listStylePosition?: "inside" | "outside";
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
        );
    margin?: (
        | number
        | CSSLength
        | string
        );
    marginBottom?: CSSLength | "auto";
    marginLeft?: CSSLength | "auto";
    marginRight?: CSSLength | "auto";
    marginTop?: CSSLength | "auto";
    marker?: string | null;
    markerEnd?: string | null;
    markerMid?: string | null;
    markerStart?: string | null;
    mask?: string | null;
    maxHeight?: (
        | "max-content"
        | "min-content"
        //| `fit-content(${CSSLength})`
        | "auto"
        | CSSLength
        );
    maxWidth?: (
        | "max-content"
        | "min-content"
        //| `fit-content(${CSSLength})`
        | "auto"
        | CSSLength
        );
    minHeight?: (
        | "max-content"
        | "min-content"
        //| `fit-content(${CSSLength})`
        | "auto"
        | CSSLength
        );
    minWidth?: (
        | "max-content"
        | "min-content"
        //| `fit-content(${CSSLength})`
        | "auto"
        | CSSLength
        );
    msContentZoomChaining?: string | null;
    msContentZoomLimit?: string | null;
    msContentZoomLimitMax?: any;
    msContentZoomLimitMin?: any;
    msContentZoomSnap?: string | null;
    msContentZoomSnapPoints?: string | null;
    msContentZoomSnapType?: string | null;
    msContentZooming?: string | null;
    msFlowFrom?: string | null;
    msFlowInto?: string | null;
    msFontFeatureSettings?: string | null;
    msGridColumn?: any;
    msGridColumnAlign?: string | null;
    msGridColumnSpan?: any;
    msGridColumns?: string | null;
    msGridRow?: any;
    msGridRowAlign?: string | null;
    msGridRowSpan?: any;
    msGridRows?: string | null;
    msHighContrastAdjust?: string | null;
    msHyphenateLimitChars?: string | null;
    msHyphenateLimitLines?: any;
    msHyphenateLimitZone?: any;
    msHyphens?: string | null;
    msImeAlign?: string | null;
    msOverflowStyle?: string | null;
    msScrollChaining?: string | null;
    msScrollLimit?: string | null;
    msScrollLimitXMax?: any;
    msScrollLimitXMin?: any;
    msScrollLimitYMax?: any;
    msScrollLimitYMin?: any;
    msScrollRails?: string | null;
    msScrollSnapPointsX?: string | null;
    msScrollSnapPointsY?: string | null;
    msScrollSnapType?: string | null;
    msScrollSnapX?: string | null;
    msScrollSnapY?: string | null;
    msScrollTranslation?: string | null;
    msTextCombineHorizontal?: string | null;
    msTextSizeAdjust?: any;
    msTouchAction?: string | null;
    msTouchSelect?: string | null;
    msUserSelect?: string | null;
    msWrapFlow?: string;
    msWrapMargin?: any;
    msWrapThrough?: string;
    opacity?: number | `${number}%`;
    order?: string | null;
    orphans?: number;
    outline?: NamedBorderStyle | string;
    outlineColor?: CSSColor | "invert";
    outlineStyle?: NamedBorderStyle;
    outlineWidth?: NamedBorderWidth | CSSLength;
    overflow?: (
        | "visible"
        | "hidden"
        | "clip"
        | "scroll"
        | "auto"
        );
    overflowX?: (
        | "visible"
        | "hidden"
        | "clip"
        | "scroll"
        | "auto"
        );
    overflowY?: (
        | "visible"
        | "hidden"
        | "clip"
        | "scroll"
        | "auto"
        );
    padding?: number | CSSLength | string;
    paddingBottom?: CSSLength;
    paddingLeft?: CSSLength;
    paddingRight?: CSSLength;
    paddingTop?: CSSLength;
    pageBreakAfter?: (
        | "auto"
        | "always"
        | "avoid"
        | "left"
        | "right"
        | "recto"
        | "verso"
        );
    pageBreakBefore?: (
        | "auto"
        | "always"
        | "avoid"
        | "left"
        | "right"
        | "recto"
        | "verso"
        );
    pageBreakInside?: "auto" | "avoid";
    perspective?: "none" | CSSLength;
    perspectiveOrigin?: string | null;
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
        );
    position?: "static" /*default*/ | "fixed" | "absolute" | "relative" | "sticky" | null;
    quotes?: (
        | "none"
        | "auto"
        | `${string} ${string}`
        | `${string} ${string} ${string} ${string}`
        );
    right?: "auto" | CSSLength;
    rubyAlign?: "start" | "center" | "space-between" | "space-around";
    rubyOverhang?: string | null;
    rubyPosition?: "over" | "under" | "alternate" | "inter-character";
    stopColor?: "currentColor" | CSSColor;
    stopOpacity?: number;
    stroke?: string | null;
    strokeDasharray?: "none" | "inherit" | string | CSSLength;
    strokeDashoffset?: CSSLength;
    strokeLinecap?: "butt" | "round" | "square";
    strokeLinejoin?: "miter" | "round" | "bevel" | "arcs" | "miter-clip";
    strokeMiterlimit?: number;
    strokeOpacity?: `${number}%`;
    strokeWidth?: CSSLength;
    tableLayout?: "auto" | "fixed";
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
        );
    textAlignLast?: (
        | "auto"
        | "start"
        | "end"
        | "left"
        | "right"
        | "center"
        | "justify"
        );
    textAnchor?: "start" | "middle" | "end";
    textDecoration?: string | null;
    textIndent?: CSSLength;
    textJustify?: (
        | "auto"
        | "none"
        | "inter-word"
        | "inter-character"
        );
    textKashida?: string | null;
    textKashidaSpace?: string | null;
    textOverflow?: "clip" | "ellipsis";
    textShadow?: string | null;
    textTransform?: (
        | "none"
        | "capitalize"
        | "uppercase"
        | "lowercase"
        | "full-width"
        | "full-size-kana"
        );
    textUnderlinePosition?: (
        | "auto"
        | "under"
        | "left"
        | "right"
        | `${"auto" | "under" | "left" | "right"} ${"auto" | "under" | "left" | "right"}`
        );
    top?: "auto" | CSSLength;
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
        );
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
        );
    transformOrigin?: (
        | CSSLength
        | "left"
        | "right"
        | "center"
        | "bottom"
        | string
        );
    transformStyle?: "flat" | "preserve-3d";
    transition?: (
        // | `${string} ${CSSTime}`
        // | `${string} ${CSSTime} ${CSSTime}`
        // | `${string} ${CSSTime} ${CSSEasingFunction}`
        // | `${string} ${CSSTime} ${CSSEasingFunction} ${CSSTime}`
        | `all ${CSSTime} ${CSSEasingFunction}`
        | string
        );
    transitionDelay?: CSSTime | string;
    transitionDuration?: CSSTime | string;
    transitionProperty?: "none" | "all" | string;
    transitionTimingFunction?: CSSEasingFunction;
    unicodeBidi?: (
        | "normal"
        | "embed"
        | "isolate"
        | "bidi-override"
        | "isolate-override"
        | "plaintext"
        );
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
        );
    visibility?: "visible" | "hidden" | "collapse";
    webkitAlignContent?: string | null;
    webkitAlignItems?: string | null;
    webkitAlignSelf?: string | null;
    webkitAnimation?: string | null;
    webkitAnimationDelay?: string | null;
    webkitAnimationDirection?: string | null;
    webkitAnimationDuration?: string | null;
    webkitAnimationFillMode?: string | null;
    webkitAnimationIterationCount?: string | null;
    webkitAnimationName?: string | null;
    webkitAnimationPlayState?: string | null;
    webkitAnimationTimingFunction?: string | null;
    webkitAppearance?: string | null;
    webkitBackfaceVisibility?: string | null;
    webkitBackgroundClip?: string | null;
    webkitBackgroundOrigin?: string | null;
    webkitBackgroundSize?: string | null;
    webkitBorderBottomLeftRadius?: string | null;
    webkitBorderBottomRightRadius?: string | null;
    webkitBorderImage?: string | null;
    webkitBorderRadius?: string | null;
    webkitBorderTopLeftRadius?: string | number | null;
    webkitBorderTopRightRadius?: string | number | null;
    webkitBoxAlign?: string | null;
    webkitBoxDirection?: string | null;
    webkitBoxFlex?: string | null;
    webkitBoxOrdinalGroup?: string | null;
    webkitBoxOrient?: string | null;
    webkitBoxPack?: string | null;
    webkitBoxSizing?: string | null;
    webkitColumnBreakAfter?: string | null;
    webkitColumnBreakBefore?: string | null;
    webkitColumnBreakInside?: string | null;
    webkitColumnCount?: any;
    webkitColumnGap?: any;
    webkitColumnRule?: string | null;
    webkitColumnRuleColor?: any;
    webkitColumnRuleStyle?: string | null;
    webkitColumnRuleWidth?: any;
    webkitColumnSpan?: string | null;
    webkitColumnWidth?: any;
    webkitColumns?: string | null;
    webkitFilter?: string | null;
    webkitFlex?: string | null;
    webkitFlexBasis?: string | null;
    webkitFlexDirection?: string | null;
    webkitFlexFlow?: string | null;
    webkitFlexGrow?: string | null;
    webkitFlexShrink?: string | null;
    webkitFlexWrap?: string | null;
    webkitJustifyContent?: string | null;
    webkitOrder?: string | null;
    webkitPerspective?: string | null;
    webkitPerspectiveOrigin?: string | null;
    webkitTapHighlightColor?: string | null;
    webkitTextFillColor?: string | null;
    webkitTextSizeAdjust?: any;
    webkitTransform?: string | null;
    webkitTransformOrigin?: string | null;
    webkitTransformStyle?: string | null;
    webkitTransition?: string | null;
    webkitTransitionDelay?: string | null;
    webkitTransitionDuration?: string | null;
    webkitTransitionProperty?: string | null;
    webkitTransitionTimingFunction?: string | null;
    webkitUserModify?: string | null;
    webkitUserSelect?: string | null;
    webkitWritingMode?: string | null;
    whiteSpace?: (
        | "normal"
        | "nowrap"
        | "pre"
        | "pre-wrap"
        | "pre-line"
        | "break-spaces"
        );
    widows?: number;
    width?: (
        | "auto"
        | "max-content"
        | "min-content"
        //| `fit-content(${CSSLength})`
        | CSSLength
        );
    wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
    wordSpacing?: "normal" | CSSLength;
    wordWrap?: string | null;
    writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr";
    zIndex?: "auto" | number;
    zoom?: "normal" | "reset" | `${number}%` | number;

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
    gridTemplateColumns?: string;

    /** Specifies the size of the rows in a grid layout */
    gridTemplateRows?: string;

    /** A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties
     * Default is none
     */
    gridTemplate?: string | null;

    /** Specifies the gap between the grid rows */
    rowGap?: string | null;

    /** Specifies the gap between the columns */
    columnGap?: string | null;

    /** A shorthand property for the grid-row-gap and grid-column-gap properties
     * Either a single CSS length value to both row and column gap
     * Or two CSS length values specifying the grid-row-gap grid-column-gap
     */
    gridGap?: string | null;

    /** A shorthand property for the row-gap and the column-gap properties
     * Either a single CSS length value for both row and column gap
     * Or two CSS length values specifying the row-gap and column-gap
     */
    gap?: string | null;
}

export type NamedBorderWidth = "thin" | "medium" | "thick";
export type NamedBorderStyle = (
    "none"
    | "hidden"
    | "dotted"
    | "dashed"
    | "solid"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset");

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
    | "unset");

export type CSSEasingFunction = (
    "linear"
    | `linear(${number | CSSLength})`
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "step-start"
    | "step-end"
    | `steps(${number} ${"start" | "end" | "jump-start" | "jump-end" | "jump-both" | "jump-none"})`
    | `cubic-bezier(${number},${number},${number},${number})`);

export type CSSTime = `${number}${CSSTimeUnit}`
export type CSSTimeUnit = (
    | "ms"
    | "s"
    )

export type GlobalValues = (
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "revert-layer"
    )

export type CSSProperty<T> = T | "inherit" | "initial" | "revert" | "unset"
export type CSSLength = `${number}${CSSLengthUnit}`;
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

export type CSSColor = (
    | string
    | keyof typeof colorConstants
    | "currentcolor"
    | "transparent"
    | `#${string}`
    | `rgb(${number},${number},${number})`
    | `rgba(${number}, ${number}, ${number}, ${number})`
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
    color: string | null | undefined;
    size: string | number;
    style: CSSProperties
}>

//#region Attributes
export interface Attributes {
    key?: string | number | symbol
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClassAttributes<T> extends Attributes {
}

export type DOMAttributes<T> = {
    //childrenx?: Somatic.VNode[];
    // dangerouslySetInnerHTML?: {
    // 	__html: string;
    // }

    // Clipboard Events
    onCopy?: ClipboardEventHandler<T>;
    onCopyCapture?: ClipboardEventHandler<T>;
    onCut?: ClipboardEventHandler<T>;
    onCutCapture?: ClipboardEventHandler<T>;
    onPaste?: ClipboardEventHandler<T>;
    onPasteCapture?: ClipboardEventHandler<T>;

    // Composition Events
    onCompositionEnd?: CompositionEventHandler<T>;
    onCompositionEndCapture?: CompositionEventHandler<T>;
    onCompositionStart?: CompositionEventHandler<T>;
    onCompositionStartCapture?: CompositionEventHandler<T>;
    onCompositionUpdate?: CompositionEventHandler<T>;
    onCompositionUpdateCapture?: CompositionEventHandler<T>;

    // Focus Events
    onFocus?: FocusEventHandler<T>;
    onFocusCapture?: FocusEventHandler<T>;
    onBlur?: FocusEventHandler<T>;
    onBlurCapture?: FocusEventHandler<T>;

    // Form Events
    onChange?: FormEventHandler<T>;
    onChangeCapture?: FormEventHandler<T>;
    onInput?: FormEventHandler<T>;
    onInputCapture?: FormEventHandler<T>;
    onReset?: FormEventHandler<T>;
    onResetCapture?: FormEventHandler<T>;
    onSubmit?: FormEventHandler<T>;
    onSubmitCapture?: FormEventHandler<T>;
    onInvalid?: FormEventHandler<T>;
    onInvalidCapture?: FormEventHandler<T>;

    // Image Events
    onLoad?: SomaticEventHandler<T>;
    onLoadCapture?: SomaticEventHandler<T>;
    onError?: SomaticEventHandler<T>; // also a Media Event
    onErrorCapture?: SomaticEventHandler<T>; // also a Media Event

    // Keyboard Events
    onKeyDown?: KeyboardEventHandler<T>;
    onKeyDownCapture?: KeyboardEventHandler<T>;
    onKeyPress?: KeyboardEventHandler<T>;
    onKeyPressCapture?: KeyboardEventHandler<T>;
    onKeyUp?: KeyboardEventHandler<T>;
    onKeyUpCapture?: KeyboardEventHandler<T>;

    // Media Events
    onAbort?: SomaticEventHandler<T>;
    onAbortCapture?: SomaticEventHandler<T>;
    onCanPlay?: SomaticEventHandler<T>;
    onCanPlayCapture?: SomaticEventHandler<T>;
    onCanPlayThrough?: SomaticEventHandler<T>;
    onCanPlayThroughCapture?: SomaticEventHandler<T>;
    onDurationChange?: SomaticEventHandler<T>;
    onDurationChangeCapture?: SomaticEventHandler<T>;
    onEmptied?: SomaticEventHandler<T>;
    onEmptiedCapture?: SomaticEventHandler<T>;
    onEncrypted?: SomaticEventHandler<T>;
    onEncryptedCapture?: SomaticEventHandler<T>;
    onEnded?: SomaticEventHandler<T>;
    onEndedCapture?: SomaticEventHandler<T>;
    onLoadedData?: SomaticEventHandler<T>;
    onLoadedDataCapture?: SomaticEventHandler<T>;
    onLoadedMetadata?: SomaticEventHandler<T>;
    onLoadedMetadataCapture?: SomaticEventHandler<T>;
    onLoadStart?: SomaticEventHandler<T>;
    onLoadStartCapture?: SomaticEventHandler<T>;
    onPause?: SomaticEventHandler<T>;
    onPauseCapture?: SomaticEventHandler<T>;
    onPlay?: SomaticEventHandler<T>;
    onPlayCapture?: SomaticEventHandler<T>;
    onPlaying?: SomaticEventHandler<T>;
    onPlayingCapture?: SomaticEventHandler<T>;
    onProgress?: SomaticEventHandler<T>;
    onProgressCapture?: SomaticEventHandler<T>;
    onRateChange?: SomaticEventHandler<T>;
    onRateChangeCapture?: SomaticEventHandler<T>;
    onSeeked?: SomaticEventHandler<T>;
    onSeekedCapture?: SomaticEventHandler<T>;
    onSeeking?: SomaticEventHandler<T>;
    onSeekingCapture?: SomaticEventHandler<T>;
    onStalled?: SomaticEventHandler<T>;
    onStalledCapture?: SomaticEventHandler<T>;
    onSuspend?: SomaticEventHandler<T>;
    onSuspendCapture?: SomaticEventHandler<T>;
    onTimeUpdate?: SomaticEventHandler<T>;
    onTimeUpdateCapture?: SomaticEventHandler<T>;
    onVolumeChange?: SomaticEventHandler<T>;
    onVolumeChangeCapture?: SomaticEventHandler<T>;
    onWaiting?: SomaticEventHandler<T>;
    onWaitingCapture?: SomaticEventHandler<T>;

    // MouseEvents
    onClick?: MouseEventHandler<T>;
    onClickCapture?: MouseEventHandler<T>;
    onContextMenu?: MouseEventHandler<T>;
    onContextMenuCapture?: MouseEventHandler<T>;
    onDoubleClick?: MouseEventHandler<T>;
    onDoubleClickCapture?: MouseEventHandler<T>;
    onDrag?: DragEventHandler<T>;
    onDragCapture?: DragEventHandler<T>;
    onDragEnd?: DragEventHandler<T>;
    onDragEndCapture?: DragEventHandler<T>;
    onDragEnter?: DragEventHandler<T>;
    onDragEnterCapture?: DragEventHandler<T>;
    onDragExit?: DragEventHandler<T>;
    onDragExitCapture?: DragEventHandler<T>;
    onDragLeave?: DragEventHandler<T>;
    onDragLeaveCapture?: DragEventHandler<T>;
    onDragOver?: DragEventHandler<T>;
    onDragOverCapture?: DragEventHandler<T>;
    onDragStart?: DragEventHandler<T>;
    onDragStartCapture?: DragEventHandler<T>;
    onDrop?: DragEventHandler<T>;
    onDropCapture?: DragEventHandler<T>;
    onMouseDown?: MouseEventHandler<T>;
    onMouseDownCapture?: MouseEventHandler<T>;
    onMouseEnter?: MouseEventHandler<T>;
    onMouseLeave?: MouseEventHandler<T>;
    onMouseMove?: MouseEventHandler<T>;
    onMouseMoveCapture?: MouseEventHandler<T>;
    onMouseOut?: MouseEventHandler<T>;
    onMouseOutCapture?: MouseEventHandler<T>;
    onMouseOver?: MouseEventHandler<T>;
    onMouseOverCapture?: MouseEventHandler<T>;
    onMouseUp?: MouseEventHandler<T>;
    onMouseUpCapture?: MouseEventHandler<T>;

    // Selection Events
    onSelect?: SomaticEventHandler<T>;
    onSelectCapture?: SomaticEventHandler<T>;

    // Touch Events
    onTouchCancel?: TouchEventHandler<T>;
    onTouchCancelCapture?: TouchEventHandler<T>;
    onTouchEnd?: TouchEventHandler<T>;
    onTouchEndCapture?: TouchEventHandler<T>;
    onTouchMove?: TouchEventHandler<T>;
    onTouchMoveCapture?: TouchEventHandler<T>;
    onTouchStart?: TouchEventHandler<T>;
    onTouchStartCapture?: TouchEventHandler<T>;

    // Pointer Events
    onPointerDown?: PointerEventHandler<T>;
    onPointerDownCapture?: PointerEventHandler<T>;
    onPointerMove?: PointerEventHandler<T>;
    onPointerMoveCapture?: PointerEventHandler<T>;
    onPointerUp?: PointerEventHandler<T>;
    onPointerUpCapture?: PointerEventHandler<T>;
    onPointerCancel?: PointerEventHandler<T>;
    onPointerCancelCapture?: PointerEventHandler<T>;
    onPointerEnter?: PointerEventHandler<T>;
    onPointerEnterCapture?: PointerEventHandler<T>;
    onPointerLeave?: PointerEventHandler<T>;
    onPointerLeaveCapture?: PointerEventHandler<T>;
    onPointerOver?: PointerEventHandler<T>;
    onPointerOverCapture?: PointerEventHandler<T>;
    onPointerOut?: PointerEventHandler<T>;
    onPointerOutCapture?: PointerEventHandler<T>;
    onGotPointerCapture?: PointerEventHandler<T>;
    onGotPointerCaptureCapture?: PointerEventHandler<T>;
    onLostPointerCapture?: PointerEventHandler<T>;
    onLostPointerCaptureCapture?: PointerEventHandler<T>;

    // UI Events
    onScroll?: UIEventHandler<T>;
    onScrollCapture?: UIEventHandler<T>;

    // Wheel Events
    onWheel?: WheelEventHandler<T>;
    onWheelCapture?: WheelEventHandler<T>;

    // Animation Events
    onAnimationStart?: AnimationEventHandler<T>;
    onAnimationStartCapture?: AnimationEventHandler<T>;
    onAnimationEnd?: AnimationEventHandler<T>;
    onAnimationEndCapture?: AnimationEventHandler<T>;
    onAnimationIteration?: AnimationEventHandler<T>;
    onAnimationIterationCapture?: AnimationEventHandler<T>;

    // Transition Events
    onTransitionEnd?: TransitionEventHandler<T>;
    onTransitionEndCapture?: TransitionEventHandler<T>;
}
export type HTMLAttributes<T> = DOMAttributes<T> & {
    children?: Children

    // React-specific Attributes
    defaultChecked?: boolean;
    defaultValue?: string | string[];
    suppressContentEditableWarning?: boolean;
    suppressHydrationWarning?: boolean;

    // Standard HTML Attributes
    accessKey?: string;
    className?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    id?: string;
    lang?: string;
    placeholder?: string;
    slot?: string;
    spellCheck?: boolean;
    style?: CSSProperties;
    tabIndex?: number;
    title?: string;

    // Unknown
    inputMode?: string;
    is?: string;
    radioGroup?: string; // <command>, <menuitem>

    // WAI-ARIA
    role?: string;

    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;

    // Non-standard Attributes
    autocapitalize?: string;
    autocorrect?: string;
    autosave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: 'on' | 'off';
}
export type SVGAttributes<T> = DOMAttributes<T> & {
    children?: Children

    // Attributes which also defined in HTMLAttributes
    // See comment in SVGDOMPropertyConfig.js
    className?: string;
    color?: string;
    height?: number | string;
    id?: string;
    lang?: string;
    max?: number | string;
    media?: string;
    method?: string;
    min?: number | string;
    name?: string;
    style?: CSSProperties;
    target?: string;
    type?: string;
    width?: number | string;

    // Other HTML properties supported by SVG elements in browsers
    role?: string;
    tabIndex?: number;

    // SVG Specific attributes
    accentHeight?: number | string;
    accumulate?: "none" | "sum";
    additive?: "replace" | "sum";
    alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
        "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit";
    allowReorder?: "no" | "yes";
    alphabetic?: number | string;
    amplitude?: number | string;
    arabicForm?: "initial" | "medial" | "terminal" | "isolated";
    ascent?: number | string;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: number | string;
    azimuth?: number | string;
    baseFrequency?: number | string;
    baselineShift?: number | string;
    baseProfile?: number | string;
    bbox?: number | string;
    begin?: number | string;
    bias?: number | string;
    by?: number | string;
    calcMode?: number | string;
    capHeight?: number | string;
    clip?: number | string;
    clipPath?: string;
    clipPathUnits?: number | string;
    clipRule?: number | string;
    colorInterpolation?: number | string;
    colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
    colorProfile?: number | string;
    colorRendering?: number | string;
    contentScriptType?: number | string;
    contentStyleType?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    decelerate?: number | string;
    descent?: number | string;
    diffuseConstant?: number | string;
    direction?: number | string;
    display?: number | string;
    divisor?: number | string;
    dominantBaseline?: number | string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    elevation?: number | string;
    enableBackground?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: number | string;
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: "nonzero" | "evenodd" | "inherit";
    filter?: string;
    filterRes?: number | string;
    filterUnits?: number | string;
    floodColor?: number | string;
    floodOpacity?: number | string;
    focusable?: number | string;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: number | string;
    fontStyle?: CSSProperty<"normal" | "italic" | "oblique">;
    fontVariant?: CSSProperty<"normal" | "small-caps">;
    fontWeight?: number | string;
    format?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    g1?: number | string;
    g2?: number | string;
    glyphName?: number | string;
    glyphOrientationHorizontal?: number | string;
    glyphOrientationVertical?: number | string;
    glyphRef?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: number | string;
    horizAdvX?: number | string;
    horizOriginX?: number | string;
    href?: string;
    ideographic?: number | string;
    imageRendering?: number | string;
    in2?: number | string;
    in?: string;
    intercept?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    k?: number | string;
    kernelMatrix?: number | string;
    kernelUnitLength?: number | string;
    kerning?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    letterSpacing?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mathematical?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    opacity?: number | string;
    operator?: number | string;
    order?: number | string;
    orient?: number | string;
    orientation?: number | string;
    origin?: number | string;
    overflow?: number | string;
    overlinePosition?: number | string;
    overlineThickness?: number | string;
    paintOrder?: number | string;
    panose1?: number | string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    pointerEvents?: number | string;
    points?: string;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    preserveAlpha?: number | string;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    renderingIntent?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    shapeRendering?: number | string;
    slope?: number | string;
    spacing?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stemh?: number | string;
    stemv?: number | string;
    stitchTiles?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
    strikethroughPosition?: number | string;
    strikethroughThickness?: number | string;
    string?: number | string;
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeLinecap?: "butt" | "round" | "square" | "inherit";
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
    strokeMiterlimit?: number | string;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    textAnchor?: string;
    textDecoration?: number | string;
    textLength?: number | string;
    textRendering?: number | string;
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    underlinePosition?: number | string;
    underlineThickness?: number | string;
    unicode?: number | string;
    unicodeBidi?: number | string;
    unicodeRange?: number | string;
    unitsPerEm?: number | string;
    vAlphabetic?: number | string;
    values?: string;
    vectorEffect?: number | string;
    version?: string;
    vertAdvY?: number | string;
    vertOriginX?: number | string;
    vertOriginY?: number | string;
    vHanging?: number | string;
    vIdeographic?: number | string;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: number | string;
    vMathematical?: number | string;
    widths?: number | string;
    wordSpacing?: number | string;
    writingMode?: number | string;
    x1?: number | string;
    x2?: number | string;
    x?: number | string;
    xChannelSelector?: string;
    xHeight?: number | string;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    xmlBase?: string;
    xmlLang?: string;
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    y1?: number | string;
    y2?: number | string;
    y?: number | string;
    yChannelSelector?: string;
    z?: number | string;
    zoomAndPan?: string;
}

export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    target?: string;
    type?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}

export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    coords?: string;
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    shape?: string;
    target?: string;
}

export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
}

export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}

export type ButtonHTMLAttributes<T> = HTMLAttributes<T> & {
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: string;
    value?: string | string[] | number;
}

export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
}

export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
    width?: number | string;
}

export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
}

export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}

export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}

export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}

export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
}

export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    name?: string;
}

export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string;
    action?: string;
    autocomplete?: string;
    encType?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;
}

export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string;
}

export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    frameBorder?: number | string;
    height?: number | string;
    marginHeight?: number;
    marginWidth?: number;
    name?: string;
    sandbox?: string;
    scrolling?: string;
    seamless?: boolean;
    src?: string;
    srcDoc?: string;
    width?: number | string;
}

export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    crossorigin?: "anonymous" | "use-credentials" | "";
    decoding?: "async" | "auto" | "sync";
    height?: number | string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    useMap?: string;
    width?: number | string;
}

export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}

export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    alt?: string;
    autocomplete?: string;
    autofocus?: boolean;
    capture?: boolean | string; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean;
    crossorigin?: string;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxLength?: number;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: string;
    value?: string | string[] | number;
    width?: number | string;

    onChange?: ChangeEventHandler<T>;
}

export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: boolean;
    challenge?: string;
    disabled?: boolean;
    form?: string;
    keyType?: string;
    keyParams?: string;
    name?: string;
}

export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
}

export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number;
}

export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string;
    crossorigin?: string;
    href?: string;
    hrefLang?: string;
    integrity?: string;
    media?: string;
    rel?: string;
    sizes?: string;
    type?: string;
}

export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
}

export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
}

export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean;
    controls?: boolean;
    controlsList?: string;
    crossorigin?: string;
    loop?: boolean;
    mediaGroup?: string;
    muted?: boolean;
    playsinline?: boolean;
    preload?: string;
    src?: string;
}

export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | string[] | number;
}

export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}

export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    useMap?: string;
    width?: number | string;
    wmode?: string;
}

export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean;
    start?: number;
    type?: '1' | 'a' | 'A' | 'i' | 'I';
}

export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
}

export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string | string[] | number;
}

export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
    name?: string;
}

export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
    value?: string | string[] | number;
}

export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string;
    value?: string | string[] | number;
}

export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean;
    charSet?: string;
    crossorigin?: string;
    defer?: boolean;
    integrity?: string;
    noModule?: boolean;
    nonce?: string;
    src?: string;
    type?: string;
}

export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: string;
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: string | string[] | number;
    onChange?: ChangeEventHandler<T>;
}

export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    type?: string;
}

export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    nonce?: string;
    scoped?: boolean;
    type?: string;
}

export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    cellPadding?: number | string;
    cellSpacing?: number | string;
    summary?: string;
}

export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: string;
    autofocus?: boolean;
    cols?: number;
    dirName?: string;
    disabled?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | string[] | number;
    wrap?: string;

    onChange?: ChangeEventHandler<T>;
}

export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}

export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}

export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string;
}

export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srcLang?: string;
}

export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string;
    playsInline?: boolean;
    poster?: string;
    width?: number | string;
}

export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean;
    allowpopups?: boolean;
    autofocus?: boolean;
    autosize?: boolean;
    blinkfeatures?: string;
    disableblinkfeatures?: string;
    disableguestresize?: boolean;
    disablewebsecurity?: boolean;
    guestinstance?: string;
    httpreferrer?: string;
    nodeintegration?: boolean;
    partition?: string;
    plugins?: boolean;
    preload?: string;
    src?: string;
    useragent?: string;
    webpreferences?: string;
}

//#endregion

//#region Events
export interface SyntheticEvent<T = Element> {
    bubbles: boolean;
    /** A reference to the element on which the event listener is registered. */
    currentTarget: EventTarget & T;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
    /**
     * A reference to the element from which the event was originally dispatched.
     * This might be a child element to the element on which the event listener is registered.
     *
     * @see currentTarget
     */
    target: EventTarget;
    timeStamp: number;
    type: string;

    preventDefault(): void;

    isDefaultPrevented(): boolean;

    // If you thought this should be `EventTarget & T`, see

    stopPropagation(): void;

    isPropagationStopped(): boolean;

    persist(): void;
}

export interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {
    clipboardData: DataTransfer;
    nativeEvent: Event;
}

export interface CompositionEvent<T = Element> extends SyntheticEvent<T> {
    data: string;
    nativeEvent: Event;
}

export interface DragEvent<T = Element> extends MouseEvent<T> {
    dataTransfer: DataTransfer;
    nativeEvent: Event;
}

export interface PointerEvent<T = Element> extends MouseEvent<T> {
    pointerId: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    width: number;
    height: number;
    pointerType: 'mouse' | 'pen' | 'touch';
    isPrimary: boolean;
    nativeEvent: Event;
}

export interface FocusEvent<T = Element> extends SyntheticEvent<T> {
    nativeEvent: Event;
    relatedTarget: EventTarget;
    target: EventTarget & T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormEvent<T = Element> extends SyntheticEvent<T> {
}

export interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    /**
     * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible
     * values
     */
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    nativeEvent: Event;
    repeat: boolean;
    shiftKey: boolean;
    which: number;

    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
     * (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
}

export interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    metaKey: boolean;
    nativeEvent: Event;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget;
    screenX: number;
    screenY: number;
    shiftKey: boolean;

    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
     * (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
}

export interface TouchEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    metaKey: boolean;
    nativeEvent: Event;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;

    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
     * (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
}

export interface UIEvent<T = Element> extends SyntheticEvent<T> {
    detail: number;
    nativeEvent: Event;
    view: {
        styleMedia: StyleMedia;
        document: Document;
    };
}

export interface WheelEvent<T = Element> extends MouseEvent<T> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
    nativeEvent: Event;
}

export interface AnimationEvent<T = Element> extends SyntheticEvent<T> {
    animationName: string;
    elapsedTime: number;
    nativeEvent: Event;
    pseudoElement: string;
}

export interface TransitionEvent<T = Element> extends SyntheticEvent<T> {
    elapsedTime: number;
    nativeEvent: Event;
    propertyName: string;
    pseudoElement: string;
}

export type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];

export type SomaticEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;

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
