/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Obj, UnionOfRepeats } from "@agyemanjp/standard/utility"
import { colorConstants } from "./common"

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

export interface IntrinsicElement<P extends Obj = Obj> extends UIElementBase<P> { type: string }

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
    /* align-content does not take left and right values */
    | "center"		/* Pack items around the center */
    | "start"		/* Pack items from the start */
    | "end"			/* Pack items from the end */
    | "flex-start"	/* Pack flex items from the start */
    | "flex-end"	/* Pack flex items from the end */

    /* Normal alignment */
    | "normal"

    /* Baseline alignment */
    | "baseline"
    | "first baseline"
    | "last baseline"

    /* Distributed alignment */
    | "space-between" /* Distribute items evenly; The first item is flush with the start, the last is flush with the end */
    | "space-around"  /* Distribute items evenly; Items have a half-size space on either end */
    | "space-evenly"  /* Distribute items evenly; Items have equal space around them */
    | "stretch"       /* Distribute items evenly; Stretch 'auto'-sized items to fit the container */

    /* Overflow alignment */
    | "safe center"
    | "unsafe center";

    /* Global values */
    // | "inherit"
    // | "initial"
    // | "revert"
    // | "revert-layer"
    // | "unset"

    alignItems?: string | null;
    alignSelf?: string | null;
    alignmentBaseline?: string | null;
    animation?: string | null;
    animationDelay?: string | null;
    animationDirection?: string | null;
    animationDuration?: string | null;
    animationFillMode?: string | null;
    animationIterationCount?: string | null;
    animationName?: string | null;
    animationPlayState?: string | null;
    animationTimingFunction?: string | null;
    backfaceVisibility?: string | null;
    background?: string | null;
    backgroundAttachment?: string | null;
    backgroundClip?: string | null;
    backgroundColor?: CSSColor;
    backgroundImage?: string | null;
    backgroundOrigin?: string | null;
    backgroundPosition?: string | null;
    backgroundPositionX?: string | null;
    backgroundPositionY?: string | null;
    backgroundRepeat?: string | null;
    backgroundSize?: string | null;
    baselineShift?: string | null;
    border?: string | null;
    borderBottom?: string | null;
    borderBottomColor?: string | null;
    borderBottomLeftRadius?: string | number | null;
    borderBottomRightRadius?: string | number | null;
    borderBottomStyle?: string | null;
    borderBottomWidth?: string | null;
    borderCollapse?: string | null;
    borderColor?: string | null;
    borderImage?: string | null;
    borderImageOutset?: string | null;
    borderImageRepeat?: string | null;
    borderImageSlice?: string | null;
    borderImageSource?: string | null;
    borderImageWidth?: string | number | null;
    borderLeft?: string | number | null;
    borderLeftColor?: string | null;
    borderLeftStyle?: string | null;
    borderLeftWidth?: string | number | null;
    borderRadius?: string | number | null;
    borderRight?: string | null;
    borderRightColor?: string | null;
    borderRightStyle?: string | null;
    borderRightWidth?: string | number | null;
    borderSpacing?: string | null;
    borderStyle?: string | null;
    borderTop?: string | null;
    borderTopColor?: string | null;
    borderTopLeftRadius?: string | number | null;
    borderTopRightRadius?: string | number | null;
    borderTopStyle?: string | null;
    borderTopWidth?: string | number | null;
    borderWidth?: string | number | null;
    bottom?: string | number | null;
    boxShadow?: string | null;
    boxSizing?: string | null;
    breakAfter?: string | null;
    breakBefore?: string | null;
    breakInside?: string | null;
    captionSide?: string | null;
    clear?: string | null;
    clip?: string | null;
    clipPath?: string | null;
    clipRule?: string | null;
    color?: CSSColor;
    colorInterpolationFilters?: string | null;
    columnCount?: any;
    columnFill?: string | null;
    columnRule?: string | null;
    columnRuleColor?: any;
    columnRuleStyle?: string | null;
    columnRuleWidth?: any;
    columnSpan?: string | null;
    columnWidth?: any;
    columns?: string | null;
    content?: string | null;
    counterIncrement?: string | null;
    counterReset?: string | null;
    cssFloat?: string | null;
    float?: string | null;
    cssText?: string;
    cursor?: string | null;
    direction?: string | null;
    display?: string | null;
    dominantBaseline?: string | null;
    emptyCells?: string | null;
    enableBackground?: string | null;
    fill?: string | null;
    fillOpacity?: string | null;
    fillRule?: string | null;
    filter?: string | null;
    flex?: string | null;
    flexBasis?: string | null;
    flexDirection?: string | null;
    flexFlow?: string | number | null;
    flexGrow?: string | number | null;
    flexShrink?: string | number | null;
    flexWrap?: string | null;
    floodColor?: string | null;
    floodOpacity?: string | number | null;
    font?: string | null;
    fontFamily?: string | null;
    fontFeatureSettings?: string | null;
    fontSize?: string | null;
    fontSizeAdjust?: string | null;
    fontStretch?: string | null;
    fontStyle?: string | null;
    fontVariant?: string | null;
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
    gridTemplate?: `${string} / ${string}}` | UnionOfRepeats<string | ".", 9, " "> | "none" | "initial" | "inherit"

    /** Specifies the gap between the grid rows */
    rowGap?: CSSLength | "normal" | "initial" | "inherit" | "unset" | "revert"

    /** Specifies the gap between the columns */
    columnGap?: CSSLength | "normal" | "initial" | "inherit" | "unset" | "revert"

    /** A shorthand property for the grid-row-gap and grid-column-gap properties
     * Either a single CSS length value to both row and column gap
     * Or two CSS length values specifying the grid-row-gap grid-column-gap
     */
    gridGap?: UnionOfRepeats<CSSLength, 2, " "> | "normal" | "initial" | "inherit" | "unset" | "revert"

    /** A shorthand property for the row-gap and the column-gap properties
     * Either a single CSS length value for both row and column gap
     * Or two CSS length values specifying the row-gap and column-gap
     */
    gap?: CSSLength | `${CSSLength} ${CSSLength}` | "normal" | "initial" | "inherit"
}

export type CSSProperty<T> = T | "inherit" | "initial" | "revert" | "unset"

export type CSSColor = (
    | null
    | keyof typeof colorConstants
    | "currentcolor"
    | "transparent"
    | `#${string}`
    | `rgb(${number},${number},${number})`
    | `rgba(${number}, ${number}, ${number}, ${number})`
)
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

// eslint-disable-next-line fp/no-let, @typescript-eslint/no-unused-vars, prefer-const
let c: CSSColor = "#001227"

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
export interface Attributes { key?: string | number | symbol }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClassAttributes<T> extends Attributes { }

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
    dir?: (
        | "ltr"
        | "rtl"
        | "auto"
    );
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
    inputMode?: (
        | "none"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal"
        | "search"
    );
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
    color?: CSSColor;
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
    bbox?: string;
    begin?: string;
    bias?: number;
    by?: number | string;
    calcMode?: "discrete" | "linear" | "paced" | "spline";
    capHeight?: number;
    clip?: CSSProperty<"auto" | `rect(${string},${string},${string},${string},)`>;
    clipPath?: string;
    clipPathUnits?: "userSpaceOnUse" | "objectBoundingBox";
    clipRule?: "nonzero" | "evenodd" | "inherit";
    colorInterpolation?: "auto" | "sRGB" | "linearRGB" | "inherit";
    colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
    colorProfile?: "auto" | "sRGB" | "string";
    colorRendering?: number | string;
    contentScriptType?: string;
    contentStyleType?: string;
    cursor?: (
        | "auto"
        | "crosshair"
        | "default"
        | "pointer"
        | "move"
        | "e-resize"
        | "ne-resize"
        | "nw-resize"
        | "n-resize"
    );
    cx?: number | `${number}%`;
    cy?: number | `${number}%`;
    d?: string;
    decelerate?: number | string;
    descent?: number;
    diffuseConstant?: number;
    direction?: "ltr" | "rtl" | "inherit";
    display?: (
        | "inline"
        | "block"
        | "list-item"
        | "run-in"
        | "compact"
        | "marker"
        | "table"
        | "inline-table"
        | "table-row-group"
    );
    divisor?: number;
    dominantBaseline?: (
        | "auto"
        | "text-bottom"
        | "alphabetic"
        | "ideographic"
        | "middle"
        | "central"
        | "mathematical"
        | "hanging"
        | "text-top"
    );
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: "duplicate" | "wrap" | "none";
    elevation?: number;
    enableBackground?: number | string;
    end?: number | string;
    exponent?: number;
    externalResourcesRequired?: number | string;
    fill?: string;
    fillOpacity?: number | `${number}%`;
    fillRule?: "nonzero" | "evenodd" | "inherit";
    filter?: string;
    filterRes?: number | string;
    filterUnits?: "userSpaceOnUse" | "objectBoundingBox";
    floodColor?: CSSColor;
    floodOpacity?: number;
    focusable?: number | string;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number;
    fontStretch?: number | string;
    fontStyle?: CSSProperty<"normal" | "italic" | "oblique">;
    fontVariant?: CSSProperty<"normal" | "small-caps">;
    fontWeight?: number | string;
    format?: number | "normal" | "bold" | "bolder" | "lighter";
    from?: number | string;
    fx?: CSSLength;
    fy?: CSSLength;
    g1?: number | string;
    g2?: number | string;
    glyphName?: number | string;
    glyphOrientationHorizontal?: `${number}${"deg" | "grad" | "rad"}`;
    glyphOrientationVertical?: `${number}${"deg" | "grad" | "rad"}`;
    glyphRef?: string;
    gradientTransform?: string;
    gradientUnits?: "userSpaceOnUse" | "objectBoundingBox";
    hanging?: number;
    horizAdvX?: number;
    horizOriginX?: number;
    href?: string;
    ideographic?: number;
    imageRendering?: "auto" | "optimizeSpeed" | "optimizeQuality";
    in2?: string;
    in?: string;
    intercept?: number;
    k1?: number;
    k2?: number;
    k3?: number;
    k4?: number;
    k?: number;
    kernelMatrix?: string;
    kernelUnitLength?: number | string;
    kerning?: "auto" | CSSLength;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: "spacing" | "spacingAndGlyphs";
    letterSpacing?: "normal" | CSSLength;
    lightingColor?: CSSColor;
    limitingConeAngle?: number;
    local?: number | string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: "userSpaceOnUse" | "strokeWidth";
    markerWidth?: CSSLength;
    mask?: string;
    maskContentUnits?: "userSpaceOnUse" | "objectBoundingBox";
    maskUnits?: "userSpaceOnUse" | "objectBoundingBox";
    mathematical?: number;
    mode?: (
        | "normal"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "color-burn"
        | "hard-light"
        | "soft-light"
        | "difference"
        | "exclusion"
        | "hue"
        | "saturation"
        | "color"
        | "luminosity"
    );
    numOctaves?: number;
    offset?: number | string;
    opacity?: number;
    operator?: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
    order?: number | string;
    orient?: (
        | "auto"
        | "auto-start-reverse"
        | `${number}${"deg" | "grad" | "rad"}`
        | number
    );
    orientation?: "h" | "v";
    origin?: "default";
    overflow?: "visible" | "hidden" | "scroll" | "auto";
    overlinePosition?: number;
    overlineThickness?: number;
    paintOrder?: "normal" | "fill" | "stroke" | "markers";
    panose1?: number | string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    pointerEvents?: number | string;
    points?: string;
    pointsAtX?: number;
    pointsAtY?: number;
    pointsAtZ?: number;
    preserveAlpha?: boolean;
    preserveAspectRatio?: string;
    primitiveUnits?: "userSpaceOnUse" | "objectBoundingBox";
    r?: CSSLength;
    radius?: number | string;
    refX?: number | `${number}%` | "left" | "right" | "center";
    refY?: number | `${number}%` | "top" | "center" | "bottom";
    renderingIntent?: number | "indefinite";
    repeatCount?: number | "indefinite";
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: string;
    restart?: "always" | "whenNotActive" | "never";
    result?: string;
    rotate?: "auto" | "auto-reverse" | number;
    rx?: CSSLength | "auto";
    ry?: CSSLength | "auto";
    scale?: number;
    seed?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
    slope?: number;
    spacing?: "auto" | "exact";
    specularConstant?: number;
    specularExponent?: number;
    speed?: number;
    spreadMethod?: "pad" | "reflect" | "repeat";
    startOffset?: number | `${number}%`;
    stdDeviation?: number | string;
    stemh?: number;
    stemv?: number;
    stitchTiles?: "noStitch" | "stitch";
    stopColor?: CSSColor;
    stopOpacity?: number;
    strikethroughPosition?: number;
    strikethroughThickness?: number;
    string?: number | string;
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: CSSLength;
    strokeLinecap?: "butt" | "round" | "square" | "inherit";
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
    strokeMiterlimit?: number;
    strokeOpacity?: number | `${number}%`;
    strokeWidth?: CSSLength;
    surfaceScale?: number;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    textAnchor?: "start" | "middle" | "end";
    textDecoration?: string;
    textLength?: number | `${number}%`;
    textRendering?: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    underlinePosition?: number | string;
    underlineThickness?: number | string;
    unicode?: string;
    unicodeBidi?: number | string;
    unicodeRange?: number | string;
    unitsPerEm?: number;
    vAlphabetic?: number;
    values?: string;
    vectorEffect?: "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";
    version?: number;
    vertAdvY?: number;
    vertOriginX?: number;
    vertOriginY?: number;
    vHanging?: number;
    vIdeographic?: number;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: "visible" | "hidden" | "collapse";
    vMathematical?: number;
    widths?: CSSLength | "normal";
    wordSpacing?: CSSLength | "normal";
    writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr";
    x1?: CSSLength;
    x2?: CSSLength;
    x?: number | string;
    xChannelSelector?: "R" | "G" | "B" | "A";
    xHeight?: number;
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
    y1?: CSSLength;
    y2?: CSSLength;
    y?: number | string;
    yChannelSelector?: "R" | "G" | "B" | "A";
    z?: number;
    zoomAndPan?: "disable" | "magnify";
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
export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> { }

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
    autocomplete?: (
        | "off"
        | "on"
        | "name"
        | "honorific-prefix"
        | "given-name"
        | "additional-name"
        | "family-name"
        | "honorific-suffix"
        | "nickname"
        | "email"
        | "username"
        | "new-password"
        | "current-password"
        | "one-time-code"
        | "organization-title"
        | "organization"
        | "street-address"
        | "address-line1"
        | "address-line2"
        | "address-line3"
        | "address-level4"
        | "address-level3"
        | "address-level2"
        | "address-level1"
        | "country"
        | "country-name"
        | "postal-code"
        | "cc-name"
        | "cc-given-name"
        | "cc-additional-name"
        | "cc-family-name"
        | "cc-number"
        | "cc-exp"
        | "cc-exp-month"
        | "cc-exp-year"
        | "cc-csc"
        | "cc-type"
        | "transaction-currency"
        | "transaction-amount"
        | "language"
        | "bday"
        | "bday-day"
        | "bday-month"
        | "bday-year"
        | "sex"
        | "tel"
        | "tel-country-code"
        | "tel-national"
        | "tel-area-code"
        | "tel-local"
        | "tel-local-prefix"
        | "tel-local-suffix"
        | "tel-extension"
        | "impp"
        | "url"
        | "photo"
    );
    autofocus?: boolean;
    capture?: boolean | "user" | "environment"; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean;
    crossorigin?: "anonymous" | "use-credentials" | "";
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: (
        | "application/x-www-form-urlencoded"
        | "multipart/form-data"
        | "text/plain"
    );
    formMethod?: (
        | "get"
        | "post"
        | "dialog"

    );
    formNoValidate?: boolean;
    formTarget?: (
        | "_self"
        | "_blank"
        | "_parent"
        | "_top"
        | string
    );
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
    step?: number;
    type?: (
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week"
    );
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


