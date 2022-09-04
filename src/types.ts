/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {DigitNonZero, Obj} from "@agyemanjp/standard/utility"
import {borderStyles, borderWidthValues, colorConstants, cursorKeywords} from "./common"

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
    alignContent?:
    // align-content does not take left and right values
        | "center"
        | "start"
        | "end"
        | "flex-start"
        | "flex-end"
        //Normal alignment
        | "normal"
        // Baseline alignment
        | "baseline"
        | "first baseline"
        | "last baseline"

        // Distributed alignment
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch"

        // Overflow alignment
        | "safe center"
        | "unsafe center";
    alignItems?:
    // Basic keywords
        | "normal"
        | "stretch"
        // Positional alignment
        // align-items does not take left and right values
        | "center"
        | "start"
        | "end"
        | "flex-start"
        | "flex-end"
        // Baseline alignment
        | "baseline"
        | "first baseline"
        | "last baseline"
        | "safe center"
        | "unsafe center";
    alignSelf?:
    // Keyword values
        | "auto"
        | "normal"
        // Positional alignment
        // align-self does not take left and right values
        | "center"
        | "start"
        | "end"
        | "self-start"
        | "self-end"
        | "flex-start"
        | "flex-end"
        // Baseline alignment
        | "baseline"
        | "first baseline"
        | "last baseline"
        | "stretch"
        // Overflow alignment
        | "safe center"
        | "unsafe center";
    alignmentBaseline?:
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
        // Positional alignment
        //align-self does not take left and right values
        | "center"
        // Positional alignment
        //align-self does not take left and right values
        | "bottom";
    animation?: string | null;
    animationDelay?: string | null;
    animationDirection?: | "normal" | "reverse" | "alternate" | "alternate-reverse";
    animationDuration?: string | null;
    animationFillMode?: | "none" | "forward" | "backward" | "both";
    animationIterationCount?: | "infinite" | number;
    animationName?: string | null;
    animationPlayState?: | "running" | "paused";
    animationTimingFunction?:
        | "ease"
        | "ease-in"
        | "ease-out"
        | "ease-in-out"
        | "linear"
        | "step-start"
        | "step-end"
        | `cubic-beizier(${number})`
        | `steps(${number},${'jump-start' | 'jump-end' | 'jump-none' | 'jump-both' | 'start' | 'end'})`;
    backfaceVisibility?: "visible" | "hidden";
    background?:
        | keyof typeof colorConstants
        | `border-box ${keyof typeof colorConstants}`;
    backgroundAttachment?: | "scroll" | "fixed" | "local";
    backgroundClip?: "border-box" | "padding-box" | "content-box" | "text";
    backgroundColor?:
        | keyof typeof colorConstants
        | "currentcolor"
        | "transparent"
        | `rgb(${number},${number},${number})`
        | `rgba(${number},${number},${number},${number})`
        | `hsl(${number}, ${CSSLength}, ${CSSLength})`
        | `hsla(${number}, ${CSSLength}, ${CSSLength},${number})`;
    backgroundImage?: `url(${string})`;
    backgroundOrigin?: "border-box" | "padding-box" | "content-box";
    backgroundPosition?:
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "center"
        | `${CSSLength} ${CSSLength}`;
    backgroundPositionX?:
    // Keyword Values
        | "left"
        | "center"
        | "right"
        | CSSLength
        | `${"right" | "left"} ${CSSLength}`;
    backgroundPositionY?:
    // Keyword Values
        | "top"
        | "center"
        | "bottom"
        | CSSLength
        | `${"bottom" | "top"} ${CSSLength}`;
    backgroundRepeat?:
    // Keyword Values
        | "repeat-x"
        | "repeat-y"
        | "repeat"
        | "space"
        | "round"
        | "no-repeat";
    backgroundSize?:
    /**Keyword values*/
        | "cover"
        | "contain"
        | "auto"
        | CSSLength
        | `${CSSLength} ${CSSLength}`;
    baselineShift?:
        | CSSLength
        | "sub"
        | "super";
    border?: string | null;
    borderBottom?: CSSLength;
    borderBottomColor?:
        | keyof typeof colorConstants
        | `rgb(${number},${number},${number})`
        | `hsla(${CSSLength},${CSSLength},${CSSLength},${number})`
        | "currentcolor"
        | "transparent";
    borderBottomLeftRadius?: CSSLength | `${CSSLength} ${CSSLength}`;
    borderBottomRightRadius?: CSSLength | `${CSSLength} ${CSSLength}`;
    borderBottomStyle?: keyof typeof borderStyles;
    borderBottomWidth?:
    // Keyword values
        | keyof typeof borderWidthValues
        // <Length> values
        | CSSLength;
    borderCollapse?:
    // Keyword values
        | "collapse"
        | "separate";
    borderColor?: keyof typeof colorConstants;
    borderImage?:
        | `linear-gradient(${keyof typeof colorConstants}, ${keyof typeof colorConstants}) ${number}`
        | `url(${string}) ${number} ${string}`;
    //| `linear-gradient(${keyof typeof colorConstants}, ${keyof typeof colorConstants} ${number}/${CSSLength}`;
    borderImageOutset?:
        | CSSLength
        | number
        | `${number} ${number}`
        | `${CSSLength} ${number} ${CSSLength}`
        | `${CSSLength} ${CSSLength} ${CSSLength} ${CSSLength}`;
    borderImageRepeat?:
    // Keyword values
        | "stretch"
        | "repeat"
        | "round"
        | "space";
    borderImageSlice?:
        | CSSLength
        | number
        | `${CSSLength}|${number} ${CSSLength}|${number}`
        | `${CSSLength}|${number} fill ${CSSLength}|${number} ${CSSLength}|${number}`
        | `${CSSLength}|${number} ${CSSLength}|${number} ${CSSLength}|${number} ${CSSLength}|${number}`;
    borderImageSource?:
        | "none"
        | `url(${string})`;
    borderImageWidth?:
        | "auto"
        | CSSLength
        | number
        | `${CSSLength | number} ${CSSLength | number}`
        | `${CSSLength | number} ${CSSLength | number} ${CSSLength | number}`;
    borderLeft?:
        | CSSLength
        | `${CSSLength} ${string}`;
    borderLeftColor?:
        | keyof typeof colorConstants
        | `rgb(${number},${number},${number})`
        | `hsla(${CSSLength},${CSSLength},${CSSLength},${number})`
        | "currentcolor"
        | "transparent";
    borderLeftStyle?:
    // Keyword values
        | keyof typeof borderStyles;
    borderLeftWidth?:
    // Keyword values
        | keyof typeof borderWidthValues
        // <Length> values
        | CSSLength;
    borderRadius?:
        | CSSLength
        | `${CSSLength} ${CSSLength}`
        | `${CSSLength} ${CSSLength} ${CSSLength}`
        | `${CSSLength} ${CSSLength} ${CSSLength} ${CSSLength}`
        | `${CSSLength}/${CSSLength}`
        | `${CSSLength} ${CSSLength}/${CSSLength} ${CSSLength}`;
    borderRight?:
        | CSSLength
        | `${CSSLength} ${string}`;
    borderRightColor?:
        | keyof typeof colorConstants
        | `rgb(${number},${number},${number})`
        | `hsla(${CSSLength},${CSSLength},${CSSLength},${number})`
        | "currentcolor"
        | "transparent";
    borderRightStyle?:
    // Keyword values
        | keyof typeof borderStyles;
    borderRightWidth?:
    // Keyword values
        | keyof typeof borderWidthValues
        // <Length> values
        | CSSLength;
    borderSpacing?:
    // <length>
        | CSSLength
        // horizontal <length> | vertical <length>
        | `${CSSLength} ${CSSLength}`;
    borderStyle?:
    // Keyword values
        | keyof typeof borderStyles;
    borderTop?:
        | CSSLength
        | keyof typeof borderWidthValues
        | keyof typeof borderStyles;
    borderTopColor?:
        | keyof typeof colorConstants
        | `rgb(${number},${number},${number})`
        | `hsla(${CSSLength},${CSSLength},${CSSLength},${number})`
        | "currentcolor"
        | "transparent";
    borderTopLeftRadius?:
        | CSSLength
        | `${CSSLength} ${CSSLength}`;
    borderTopRightRadius?:
        | CSSLength
        | `${CSSLength} ${CSSLength}`;
    borderTopStyle?: | keyof typeof borderStyles
    borderTopWidth?:
    // Keyword values
        | keyof typeof borderWidthValues
        // <Length> values
        | CSSLength;
    borderWidth?:
    // Keyword values
        | keyof typeof borderWidthValues
        // <Length> values
        | CSSLength
        | `${CSSLength} ${CSSLength}`;
    bottom?: CSSLength | "auto";
    boxShadow?: string | null;
    boxSizing?:
        | "border-box"
        | "content-box";
    breakAfter?:
    // Generic break values
        | "auto"
        | "avoid"
        | "always"
        | "all"
        // Page break values
        | "avoid-page"
        | "page"
        | "left"
        | "right"
        | "recto"
        | "verso"
        // Column break values
        | "avoid-column"
        | "column"
        // Region break values
        | "avoid-region"
        | "region";
    breakBefore?:
    // Generic break values
        | "auto"
        | "avoid"
        | "always"
        | "all"
        // Page break values
        | "avoid-page"
        | "page"
        | "left"
        | "right"
        | "recto"
        | "verso"
        // Column break values
        | "avoid-column"
        | "column"
        // Region break values
        | "avoid-region"
        | "region";
    breakInside?:
    // Keyword values
        | "auto"
        | "avoid"
        | "avoid-page"
        | "avoid-column"
        | "avoid-region";
    captionSide?:
    // Directional values
        | "top"
        | "bottom"
        //Logical values*
        // | "block-start"
        | "block-end"
        | "inline-start"
        | "inline-end";
    clear?:
    /*Keyword values*/
        | "none"
        | "left"
        | "right"
        | "both"
        | "inline-start"
        | "inline-end";
    clip?: string | null;
    clipPath?:
    // <clip-source> values
        | `url(${string})`
        // <geometry-box> values
        | "margin-box"
        | "border-box"
        | "padding-box"
        | "content-box"
        | "fill-box"
        | "stroke-box"
        | "view-box"
        // <basic-shape> values
        | `inset(${CSSLength} ${CSSLength})`
        | `circle(${CSSLength} at ${CSSLength} ${CSSLength})`
        | `ellipse(${CSSLength} ${CSSLength} at ${CSSLength} ${CSSLength})`

        | `path(${string})`;
    clipRule?: "nonezero" | "evenodd" | "inherit"
    color?:
    // Keyword values
        | "currentcolor"
        // <named-color> values
        | keyof typeof colorConstants
        // rgb() values
        | `rgb(${number}, ${number}, ${number})`
        | `rgba(${number}, ${number}, ${number},${number})`
        // hsl() values
        | `hsl(${CSSLength}, ${CSSLength}, ${CSSLength})`
        | `hsla(${CSSLength}, ${CSSLength}, ${CSSLength},${number})`
        // hwb() values
        | `hwb(${CSSLength} ${CSSLength} ${CSSLength})`
        | `hwb(${CSSLength} ${CSSLength} ${CSSLength} / ${number})`;
    colorInterpolationFilters?: string | null;
    columnCount?: | "auto" | number;
    columnFill?:
    // Keyword values
        | "auto"
        | "balance"
        | "balance-all";
    columnRule?:
        | keyof typeof borderStyles
        | `${keyof typeof borderStyles} ${keyof typeof colorConstants}`
        | `${keyof typeof borderStyles} ${CSSLength}`;
    columnRuleColor?:
        | keyof typeof colorConstants
        | `rgb(${number},${number},${number})`
        | `hsla(${number}, ${CSSLength}, ${CSSLength}, ${number})`
        | "transparent";
    columnRuleStyle?: keyof typeof borderStyles;
    columnRuleWidth?:
    // Keyword values
        | keyof typeof borderWidthValues
        | CSSLength;
    columnSpan?:
    // Keyword values
        | "none"
        | "all";
    columnWidth?:
    // Keyword value
        | "auto"
        | CSSLength;
    columns?:
        | CSSLength
        | "auto"
        | number
        | `${number | CSSLength | "auto"} ${number | CSSLength | "auto"}`;
    content?: string | null;
    counterIncrement?:
        | "none"
        | string
        | `${string} ${number}`;
    counterReset?:
        | "none"
        | string
        | `${string} ${number}`;
    cssFloat?: string | null;
    float?:
    // Keyword values
        | "left"
        | "right"
        | "none"
        | "inline-start"
        | "inline-end";
    cssText?: string;
    cursor?:
    // Keyword values
        | keyof typeof cursorKeywords
        // url with mandatory keyword fallback
        | `url(${string}), ${keyof typeof cursorKeywords}`
        // url and coordinates with mandatory keyword fallback
        | `url(${string}) ${number} ${number}, ${keyof typeof cursorKeywords}`
    // urls and fallback urls, with mandatory keyword fallback;
    direction?:
    // Keyword values
        | "ltr"
        | "rtl";
    display?:
    // precomposed values
        | "block"
        | "inline"
        | "inline-block"
        | "flex"
        | "inline-flex"
        | "grid"
        | "inline-grid"
        | "flow-root"
        // box generation
        | "none"
        | "contents"
        // two-value syntax
        | "block flow"
        | "inline flow"
        | "inline flow-root"
        | "block flex"
        | "inline flex"
        | "block grid"
        | "inline grid"
        | "block flow-root"
        // other values
        | "table"
        | "table-row" /* all table elements have an equivalent CSS display value */
        | "list-item";
    dominantBaseline?:
        | "auto"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical"
        | "central"
        | "middle"
        | "text-after-edge"
        | "text-before-edge"
        | "text-top";
    emptyCells?: "show" | "hide";// keyword values
    enableBackground?: "accumulate" | `${number} ${number} ${number} ${number}`;
    fill?: string | null;
    fillOpacity?: number | `${number}%`;
    fillRule?: "nonzero" | "evenodd";
    filter?:
    // url to SVG filter
        | `url(${string})`
        // <filter-function> values
        | `blur(${CSSLength})`
        | `brightness(${number})`
        | `contrast(${number}%)`
        | `drop-shadow(${CSSLength} ${CSSLength} ${CSSLength} ${keyof typeof colorConstants})`
        | `grayscale(${number}%)`
        | `hue-rotate(${number}deg)`
        | `invert(${number}%)`
        | `opacity(${number}%)`
        | `saturate(${number}%)`
        | `sepia(${number}%)`
        // use no filter
        | "none"
    // multiple filters
    ;
    flex?:
    // keyword values
        | "none"
        | "auto"
        | "initial"
        // One value, unitless number: flex-grow     flex-basis is then equal to 0.
        | number
        // One value, width/height: flex-basis
        | CSSLength
        // Two values, flex-grow and flex-basis
        | `${number} ${CSSLength}`
        // Two values, flex-grow and flex-shrink
        | `${number} ${number}`
        // Three values, flex-grow, flex-shrink and flex-basis
        | `${number} ${number} ${CSSLength}`;
    flexBasis?:
    // Specify <width>
        | "auto"
        | CSSLength
        // Intrinsic sizing keywords
        | "min-content"
        | "max-content"
        | "fit-content"
        // Automatically size based on flex item's content
        | "content";
    flexDirection?:
    // The direction text is laid out in a line
        | "row"
        // Like <row>, but reversed
        | "row-reverse"
        // The direction in which lines of text are stacked
        | "column"
        // Like <column>, but reversed
        | "column-reverse";
    flexFlow?:
    // flex-flow: <flex-direction>
        | "row"
        | "row-reverse"
        | "column"
        | "column-reverse"
        // flex-flow: <flex-wrap>
        | "nowrap"
        | "wrap"
        | "wrap-reverse"
        // flex-flow: <flex-direction> and <flex-wrap>
        | `${"row" | "row-reverse" | "column" | "column-reverse"} ${"nowrap" | "wrap" | "wrap-reverse"}`;
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?:
        | "nowrap" // Default value
        | "wrap"
        | "wrap-reverse";
    floodColor?: keyof typeof colorConstants;
    floodOpacity?: number | `${number}%`;
    font?: string | null;
    fontFamily?:
    // generic family name only
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
        // family name and generic family name
        | `${string} ${"serif" | "sans-serif" | "cursive" | "fantasy" | "monospace" | "system-ui" | "ui-serif" | "ui-sans-serif" | "ui-monospace" | "ui-rounded" | "emoji" | "math" | "fangsong"}`;
    fontFeatureSettings?:
    // use default settings
        | "normal"
        | string
        | `${string} ${"on" | "off" | number}`;
    fontSize?:
    // <absolute size values>
        | "xx-small"
        | "x-small"
        | "small"
        | "medium"
        | "large"
        | "x-large"
        | "xx-large"
        | "xxx-large"
        // <relative size> values
        | "larger"
        | "smaller"
        // <length> values | <percentage> values
        | CSSLength
        // math value
        | "math";
    fontSizeAdjust?:
    // use the specified font size
        | "none"
        // Use a font size that makes lowercase
        //    letters half the specified font size
        | number
        // Two values
        | `${"ex-height" | "cap-height" | "ch-width" | "ic-width" | "ic-height"} ${number}`;
    fontStretch?:
    // keyword values
        | "normal"
        | "ultra-condensed"
        | "extra-condensed"
        | "condensed"
        | "semi-condensed"
        | "semi-expanded"
        | "expanded"
        | "extra-expanded"
        | "ultra-expanded"
        // percentage values
        | `${number}%`;
    fontStyle?:
        | "normal"
        | "italic"
        | "oblique"
        | `oblique ${number}deg`;
    fontVariant?:
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
        | "ruby";
    fontWeight?: string | number | null;
    glyphOrientationHorizontal?: string | null;
    glyphOrientationVertical?: string | null;
    height?: string | null;
    imeMode?: string | null;
    justifyContent?: string | null;
    kerning?: string | null;
    left?: string | number | null;
    readonly length?: number;
    letterSpacing?: string | null;
    lightingColor?: string | null;
    lineHeight?: string | null;
    listStyle?: string | null;
    listStyleImage?: string | null;
    listStylePosition?: string | null;
    listStyleType?: string | null;
    margin?: string | number | null;
    marginBottom?: string | number | null;
    marginLeft?: string | number | null;
    marginRight?: string | number | null;
    marginTop?: string | number | null;
    marker?: string | null;
    markerEnd?: string | null;
    markerMid?: string | null;
    markerStart?: string | null;
    mask?: string | null;
    maxHeight?: string | null;
    maxWidth?: string | null;
    minHeight?: string | null;
    minWidth?: string | null;
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
    opacity?: string | number | null;
    order?: string | null;
    orphans?: string | null;
    outline?: string | null;
    outlineColor?: string | null;
    outlineStyle?: string | null;
    outlineWidth?: string | null;
    overflow?: string | null;
    overflowX?: string | null;
    overflowY?: string | null;
    padding?: string | number | null;
    paddingBottom?: string | number | null;
    paddingLeft?: string | number | null;
    paddingRight?: string | number | null;
    paddingTop?: string | number | null;
    pageBreakAfter?: string | null;
    pageBreakBefore?: string | null;
    pageBreakInside?: string | null;
    perspective?: string | null;
    perspectiveOrigin?: string | null;
    pointerEvents?: string | null;
    position?: "static" /*default*/ | "fixed" | "absolute" | "relative" | "sticky" | null;
    quotes?: string | null;
    right?: string | number | null;
    rubyAlign?: string | null;
    rubyOverhang?: string | null;
    rubyPosition?: string | null;
    stopColor?: string | null;
    stopOpacity?: string | null;
    stroke?: string | null;
    strokeDasharray?: string | null;
    strokeDashoffset?: string | null;
    strokeLinecap?: string | null;
    strokeLinejoin?: string | null;
    strokeMiterlimit?: string | number | null;
    strokeOpacity?: string | null;
    strokeWidth?: string | number | null;
    tableLayout?: string | null;
    textAlign?: string | null;
    textAlignLast?: string | null;
    textAnchor?: string | null;
    textDecoration?: string | null;
    textIndent?: string | number | null;
    textJustify?: string | null;
    textKashida?: string | null;
    textKashidaSpace?: string | null;
    textOverflow?: string | null;
    textShadow?: string | null;
    textTransform?: string | null;
    textUnderlinePosition?: string | null;
    top?: string | number | null;
    touchAction?: string | null;
    transform?: string | null;
    transformOrigin?: string | null;
    transformStyle?: string | null;
    transition?: string | null;
    transitionDelay?: string | null;
    transitionDuration?: string | null;
    transitionProperty?: string | null;
    transitionTimingFunction?: string | null;
    unicodeBidi?: string | null;
    verticalAlign?: string | null;
    visibility?: string | null;
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
    whiteSpace?: string | null;
    widows?: string | null;
    width?: string | null;
    wordBreak?: string | null;
    wordSpacing?: string | null;
    wordWrap?: string | null;
    writingMode?: string | null;
    zIndex?: string | number | null;
    zoom?: string | null;

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
    gridTemplate?: `${string} / ${string}}` | SpaceRepeated<string | ".", 9> | "none" | "initial" | "inherit"

    /** Specifies the gap between the grid rows */
    rowGap?: CSSLength | "normal" | "initial" | "inherit" | "unset" | "revert"

    /** Specifies the gap between the columns */
    columnGap?: CSSLength | "normal" | "initial" | "inherit" | "unset" | "revert"

    /** A shorthand property for the grid-row-gap and grid-column-gap properties
     * Either a single CSS length value to both row and column gap
     * Or two CSS length values specifying the grid-row-gap grid-column-gap
     */
    gridGap?: SpaceRepeated<CSSLength, 2> | "normal" | "initial" | "inherit" | "unset" | "revert"

    /** A shorthand property for the row-gap and the column-gap properties
     * Either a single CSS length value for both row and column gap
     * Or two CSS length values specifying the row-gap and column-gap
     */
    gap?: CSSLength | `${CSSLength} ${CSSLength}` | "normal" | "initial" | "inherit"
}

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


