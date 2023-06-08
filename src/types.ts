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
	/**
	 * Sets the alignment of items within a flex container when there is extra space in the cross-axis.
	 */
	alignContent?: CSSProperty<(
		| "center" // Centers items
		| "start" // Aligns items to the start of the container
		| "end" // Aligns items to the end of the container
		| "flex-start" // Aligns items to the start of the container, ignoring the flex container's padding
		| "flex-end" // Aligns items to the end of the container, ignoring the flex container's padding
		| "normal" // Default value, same as stretch
		| "baseline" // Aligns items to their baseline
		| "first baseline" // Aligns the first baseline of items to the container's baseline
		| "last baseline" // Aligns the last baseline of items to the container's baseline
		| "space-between" // Distributes items evenly with the first item at the start and last item at the end
		| "space-around" // Distributes items evenly with equal space around them
		| "space-evenly" // Distributes items evenly with equal space around them, including the outer edges
		| "stretch" // Stretches items to fill the container
		| "safe center" // Centers items inside a container, taking padding into account
		| "unsafe center" // Centers items inside a container, ignoring padding
	)>
	/**
	 * This represents the alignItems CSS property that sets the alignment of items along the cross-axis of a flex container.
	 */
	alignItems?: CSSProperty<(
		| "normal" // Default value, same as stretch
		| "stretch" // Stretches items to fill the container
		| "center" // Centers items
		| "start" // Aligns items to the start of the container
		| "end" // Aligns items to the end of the container
		| "flex-start" // Aligns items to the start of the container, ignoring the flex container's padding
		| "flex-end" // Aligns items to the end of the container, ignoring the flex container's padding
		| "baseline" // Aligns items to their baseline
		| "first baseline" // Aligns the first baseline of items to the container's baseline
		| "last baseline" // Aligns the last baseline of items to the container's baseline
		| "safe center" // Centers items inside a container, taking padding into account
		| "unsafe center" // Centers items inside a container, ignoring padding
	)>
	/**
	 * This represents the alignSelf CSS property that sets the alignment for a flex item when the items are laid out in a flex container.
	 */
	alignSelf?: CSSProperty<(
		| "auto" // The value is inherited from its parent element.
		| "normal" // The item is placed in the default position as specified by the layout mode of the parent element.
		| "center" // The flex item is centered in the cross-axis of the flex container.
		| "start" // The flex item is aligned to the start of the cross-axis of the flex container.
		| "end" // The flex item is aligned to the end of the cross-axis of the flex container.
		| "self-start" // The flex item is aligned to the start of the cross-axis of the flex container if the item's inline-axis is the same as the container's axis; otherwise, it is treated as align-start.
		| "self-end" // The flex item is aligned to the end of the cross-axis of the flex container if the item's inline-axis is the same as the container's axis; otherwise, it is treated as align-end.
		| "flex-start" // The flex item is aligned to the start of the cross-axis of the flex container.
		| "flex-end" // The flex item is aligned to the end of the cross-axis of the flex container.
		| "baseline" // The flex item is aligned so that its baseline is aligned with the baseline of the parent container.
		| "first baseline" // The flex item is aligned so that its first text line is aligned with the first baseline of the parent container.
		| "last baseline" // The flex item is aligned so that its last text line is aligned with the last baseline of the parent container.
		| "stretch" // The flex item is stretched to fill the cross-axis of the flex container.
		| "safe center" // The flex item is centered in the safe area of the container.
		| "unsafe center" // The flex item is centered in the unsafe area of the container.
	)>
	/**
	 * This represents the CSS alignment-baseline property that sets the baseline alignment of an element
	 * with respect to the element's parent.
	 */
	alignmentBaseline?: CSSProperty<(
		| "auto" // The baseline alignment depends on the parent element.
		| "baseline" // Aligns the dominant baseline of the parent element with the corresponding baseline of the element.
		| "before-edge" // Aligns the before edge of the extent of the element's box with the before-edge of the line box.
		| "text-before-edge" // Aligns the before edge of the extent of the element's text box with the before-edge of the line box.
		| "middle" // Aligns the geometric middle of the element with the baseline plus half the x-height of the parent.
		| "central" // Same as middle, but may be relative to a different point, depending on the script and the rendering mode.
		| "after-edge" // Aligns the after edge of the extent of the element's box with the after-edge of the line box.
		| "text-after-edge" // Aligns the after edge of the extent of the element's text box with the after-edge of the line box.
		| "ideographic" // Aligns the baseline of the element with the ideographic baseline of the parent.
		| "alphabetic" // Aligns the baseline of the element with the alphabetic baseline of the parent.
		| "hanging" // Aligns the hanging baseline of the element with the hanging baseline of the parent.
		| "mathematical" // Aligns the baseline of the element with the mathematical baseline of the parent.
		| "top" // Aligns the top of the element's bounding box with the top of the parent's content area.
		| "center" // Aligns the center of the element's bounding box with the center of the parent's content area.
		| "bottom" // Aligns the bottom of the element's bounding box with the bottom of the parent's content area.
	)>
	/**
	 * This represents the CSS `animation` property that sets a list of animations for an element.
	 * It is a shorthand property that combines several animation properties into a single property.
	 * The animation is created by gradually changing from one set of CSS styles to another.
	 * @example
	 * // Apply a simple animation to an element
	 * animation: slidein 3s ease-in forwards;
	 */
	animation?: `${string} ${number} ${
	// The direction of the animation
	"normal" | "reverse" | "alternate" | "alternate-reverse"
	} ${
	// Controls what happens to the element when the animation is not playing (before it starts, after it ends, or both)
	"none" | "forward" | "backward" | "both"
	} ${
	// Whether the animation is running or paused
	"running" | "paused"
	} ${string}`
	/**
	 * This represents the animation-delay CSS property that specifies the amount of time to wait before 
	 * starting an animation after it is applied to an element.
	 */
	animationDelay?: CSSProperty<(CSSTime)>
	/**
	 * Specifies whether an animation should be played forwards, backwards, or in alternate cycles.
	 */
	animationDirection?: CSSProperty<(
		| "normal" // The animation should be played forwards.
		| "reverse" // The animation should be played backwards.
		| "alternate" // The animation should be played forwards and backwards in alternate cycles.
		| "alternate-reverse" // The animation should be played backwards and forwards in alternate cycles.
	)>
	/**
	 * This property defines the duration of an animation in seconds or milliseconds.
	 */
	animationDuration?: CSSProperty<(CSSTime)>
	/**
	 * This represents the animation-fill-mode CSS property that specifies how a CSS animation should apply styles before and after the animation.
	 */
	animationFillMode?: CSSProperty<(
		| "none" // The animation does not apply any styles to the element before or after the animation.
		| "forward" // The animation applies the styles defined in the last keyframe after the animation ends.
		| "backward" // The animation applies the styles defined in the first keyframe before the animation starts.
		| "both" // The animation applies the styles defined in the first keyframe before the animation starts and the last keyframe after the animation ends.
	)>
	/**
	 * The `animation-iteration-count` CSS property defines the number of times an animation cycle should be played before stopping.
	 */
	animationIterationCount?: CSSProperty<(
		| "infinite" // The animation will repeat indefinitely.
		| number // The number of times the animation should repeat.
	)>
	/**
	 * Represents the animation-name property that defines the list of animations that apply to the element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
	 */
	animationName?: CSSProperty<(string)>
	/**
	 * Specifies whether the animation is currently playing or paused.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
	 */
	animationPlayState?: CSSProperty<(
		| "running" // The animation is playing
		| "paused" // The animation is paused
	)>
	/**
	 * Defines how an animation progresses over one cycle of its duration.
	 */
	animationTimingFunction?: CSSEasingFunction
	/**
	 * Sets whether or not the back face of an element should be visible when facing the viewer.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility|backface-visibility} - MDN reference
	 */
	backfaceVisibility?: CSSProperty<(
		| "visible" // The back face of the element is visible
		| "hidden" // The back face of the element is hidden
	)>
	/**
	 * Sets one or more background properties of an element.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background|background} - MDN reference
	 */
	background?: CSSProperty<(string)>
	/**
	 * Sets whether the background image scrolls with the containing block or remains fixed.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment|background-attachment} - MDN reference
	 */
	backgroundAttachment?: CSSProperty<(
		| "scroll" // The background image scrolls with the containing block
		| "fixed" // The background image remains fixed
		| "local" // The background image scrolls with the element's contents
	)>
	/**
	 * Specifies the painting area of the background of an element.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip|background-clip} - MDN reference
	 */
	backgroundClip?: CSSProperty<(
		| "border-box" // The background extends to the outside edge of the border
		| "padding-box" // The background extends to the outside edge of the padding
		| "content-box" // The background extends to the edge of the content box
		| "text" // The background is painted within the foreground text
	)>
	/**
	 * Sets the background color of an element.
	 */
	backgroundColor?: CSSProperty<(CSSColor)>
	/**
	 * Sets the background image of an element.
	 */
	backgroundImage?: CSSProperty<(`url(${string})`)>
	/**
	 * Sets the background positioning area of a background image in an element.
	 */
	backgroundOrigin?: CSSProperty<(
		| "border-box" // The background is positioned relative to the border box
		| "padding-box" // The background is positioned relative to the padding box
		| "content-box" // The background is positioned relative to the content box
	)>
	/**
	 * Sets the position of the background image within an element.
	 */
	backgroundPosition?: CSSProperty<(
		| "top" // The background image is positioned at the top
		| "right" // The background image is positioned at the right
		| "bottom" // The background image is positioned at the bottom
		| "left" // The background image is positioned at the left
		| "center" // The background image is centered
	)>
	/**
	 * Sets the horizontal position of the background image within an element.
	 */
	backgroundPositionX?: CSSProperty<(
		| "left" // The background image is positioned at the left
		| "center" // The background image is centered
		| "right" // The background image is positioned at the right
		| CSSLength
		| `${"right" | "left"} ${string}`
	)>
	/**
	 * Sets the vertical position of the background image within an element.
	 */
	backgroundPositionY?: CSSProperty<(
		| "left" // The background image is positioned at the left
		| "center" // The background image is centered
		| "right" // The background image is positioned at the right
		| CSSLength
		| `${"right" | "left"} ${string}`
	)>
	/**
	 * Sets how a background image will be repeated or not within an element.
	 */
	backgroundRepeat?: CSSProperty<(
		| "repeat-x" // The image is repeated horizontally
		| "repeat-y" // The image is repeated vertically
		| "repeat" // The image is repeated in both directions
		| "space" // The image is repeated as much as possible without clipping
		| "round" // The image is repeated and sized until all space is filled
		| "no-repeat" // The image is not repeated
	)>
	/**
	 * Sets the size of the background image within an element.
	 */
	backgroundSize?: CSSProperty<(
		| "auto" // The original size of the image
		| "cover" // The image is scaled to cover all the area of the element
		| "contain" // The image is scaled to fit inside the element
	)>
	/**
	 * Sets the vertical alignment of an element's baseline relative to its parent's baseline.
	 */
	baselineShift?: CSSLength | "sub" | "super"
	/**
	 * Sets the width, style, and color of an element's four borders.
	 */
	border?: string
	/**
	 * Sets the width and style of an element's bottom border.
	 */
	borderBottom?: CSSProperty<(CSSLength | CSSBorderStyle)>
	/**
	 * Sets the color of an element's bottom border.
	 */
	borderBottomColor?: CSSProperty<CSSColor>
	/**
	 * Sets the size of an element's bottom-left corner's border radius.
	 */
	borderBottomLeftRadius?: CSSProperty<(CSSLength)>
	/**
	 * Sets the size of an element's bottom-right corner's border radius.
	 */
	borderBottomRightRadius?: CSSProperty<(CSSLength)>
	/**
	 * Sets the style of an element's bottom border.
	 */
	borderBottomStyle?: CSSProperty<(CSSBorderStyle)>
	/**
	 * Sets the width of an element's bottom border.
	 */
	borderBottomWidth?: CSSProperty<(CSSLength)>
	/**
	 * Sets whether table cell borders are collapsed into a single border or separated.
	 */
	borderCollapse?: CSSProperty<(
		| "collapse" // Borders are collapsed into a single border when possible.
		| "separate" // Borders are separated and don't overlap.
	)>
	/**
	 * The CSS `border-color` property sets the color of an element's border(s). This property can have from one to four values.
	 * If four values are specified, they apply to the top, right, bottom, and left borders in that order.
	 */
	borderColor?: string
	/**
	 * CSS property for setting an image as a border of an element.
	 */
	borderImage?: CSSProperty<(
		| `url(${string}) ${number} ${string}` // url([image-source] [top] [right] [bottom] [left])
		| `linear-gradient(${string}) ${number}` // linear-gradient([direction], [color-stop1], [color-stop2], ...)
		| `radial-gradient(${string})` // radial-gradient([shape], [starting-color], [ending-color])
		| `repeating-linear-gradient(${string})` // repeating-linear-gradient([direction], [color-stop1], [color-stop2], ...)
		| `repeating-radial-gradient(${string})` // repeating-radial-gradient([shape], [starting-color], [ending-color])
		| `conic-gradient(${string})` // conic-gradient([angle], [starting-color], [ending-color])
	)>
	/**
	 * The borderImageOutset CSS property specifies the amount by which the border image area extends beyond the border box.
	 * Allows for one to four values of type `<length>` or `<number>`.
	 */
	borderImageOutset?: CSSProperty<([
		CSSLength | number,
		(CSSLength | number)?,
		(CSSLength | number)?,
		(CSSLength | number)?,
	])>
	/**
	 * The borderImageRepeat CSS property specifies how the border image is repeated or stretched.
	 */
	borderImageRepeat?: CSSProperty<(
		| "stretch" // Specifies that the border image is stretched to fill the entire border image area.
		| "repeat" // Specifies that the border image is repeated to fill the entire border image area.
		| "round" // Specifies that the border image is repeated and stretched to fill the entire border image area, without distortion
		| "space" //  Specifies that the border image is repeated and spaced out to fill the entire border image area.
	)>
	/**
	 * The borderImageSlice CSS property specifies how the border image is sliced into regions.
	 */
	borderImageSlice?: CSSProperty<(
		| number // A number sets the slice value as a pixel length.
		| `${number}%` // A percentage value sets the slice value as a percentage of the corresponding dimension of the border image area.
		| 'fill' // 'fill' is a keyword that sets the slice value to 100% for the corresponding dimension of the border image area.
		| `${(number | `${number}%` | 'fill')} ${(number | `${number}%` | 'fill')}` // The value can be set as a string with one to four values separated by spaces, which represent the slice values for the top, right, bottom, and left sides of the border image, respectively. If less than four values are provided, the missing values are set to the same as the previous value.
		| `${(number | `${number}%` | 'fill')} ${(number | `${number}%` | 'fill')} ${(number | `${number}%` | 'fill')}`
		| `${(number | `${number}%` | 'fill')} ${(number | `${number}%` | 'fill')} ${(number | `${number}%` | 'fill')} ${(number | `${number}%` | 'fill')}`
	)>
	/**
	 * The `border-image-source` property specifies the source image for the border image. It can be either an image file, a gradient, or "none".
	 */
	borderImageSource?: CSSProperty<(
		| "none" // No border image is displayed.
		| `url(${string})` // Specifies the path to the image file to be used as the border image.
		| `linear-gradient(${string}) ${number}` // Specifies a linear gradient as the border image.
		| `radial-gradient(${string})` // Specifies a radial gradient as the border image.
		| `repeating-linear-gradient(${string})` // Specifies a repeating linear gradient as the border image.
		| `repeating-radial-gradient(${string})` // Specifies a repeating radial gradient as the border image.
		| `conic-gradient(${string})` // Specifies a conic gradient as the border image.
	)>
	/**
	 * The border-image-width CSS property sets the width of an element's border image..
	 */
	borderImageWidth?: CSSProperty<(string)>
	/**
	 * The border-left CSS property sets the width, style, and color of an element's left border.
	 */
	borderLeft?: CSSProperty<(string)>
	/**
	 * The border-left-color CSS property sets the color of an element's left border.
	 */
	borderLeftColor?: CSSProperty<(
		CSSColor // The value can be any valid CSS color value (e.g. "red", "#00FF00", "rgb(0, 255, 0)").
	)>
	/**
	 * The border-left-style CSS property sets the style of an element's left border.
	 */
	borderLeftStyle?: CSSProperty<(
		CSSBorderStyle // The value can be one of the following border styles: "none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", or "outset".
	)>
	/**
	 * The border-left-width CSS property sets the width of an element's left border.
	 */
	borderLeftWidth?: CSSProperty<(
		| CSSBorderWidth // It can also be one of the three predefined CSS keywords: "thin", "medium", or "thick".
		| CSSLength // The value can be a CSSLength, which is a string with a unit (e.g. "10px", "2em") that sets a fixed width for the left border.
	)>
	/**
	 * The border-radius CSS property sets the rounded corners of an element's outer border edge.
	 */
	borderRadius?: CSSProperty<(string)>
	/**
	 * The border-right CSS property sets the width, style, and color of an element's right border.
	 */
	borderRight?: CSSProperty<(string)>
	/**
	 * The border-right-color CSS property sets the color of an element's right border.
	 */
	borderRightColor?: CSSProperty<(
		CSSColor // The value can be any valid CSS color value (e.g. "red", "#00FF00", "rgb(0, 255, 0)").
	)>
	/**
	 * The border-right-style CSS property sets the style of an element's right border.
	 */
	borderRightStyle?: CSSProperty<(
		CSSBorderStyle // The value can be one of the following border styles: "none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", or "outset".
	)>
	/**
	 * The border-right-width CSS property sets the width of an element's right border.
	 */
	borderRightWidth?: CSSProperty<(
		| CSSBorderWidth // It can also be one of the three predefined CSS keywords: "thin", "medium", or "thick".
		| CSSLength // The value can be a CSSLength, which is a string with a unit (e.g. "10px", "2em") that sets a fixed width for the right border.
	)>
	/**
	 * The border-spacing CSS property sets the distance between adjacent borders of an HTML table element.
	 */
	borderSpacing?: CSSProperty<(
		| CSSLength // The value can be a CSS length (e.g. "10px", "2em", "3%"),
		| `${CSSLength} ${CSSLength}` // Two space-separated CSS lengths that represent the horizontal and vertical distances between adjacent borders (e.g. "5px", "10px 20px").
	)>
	/**
	 * The border-style CSS property sets the line style for an element's four borders.
	 */
	borderStyle?: CSSProperty<(
		CSSBorderStyle // The value can be one of the following border styles: "none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", or "outset".
	)>
	/**
	 * The border-top CSS property sets the width, style, and color of the top border of an element.
	 */
	borderTop?: CSSProperty<(string)>
	/**
	 * The border-top-color CSS property sets the color of the top border of an element.
	 */
	borderTopColor?: CSSProperty<(
		CSSColor // The value can be any valid CSS color value (e.g. "red", "#00FF00", "rgb(0, 255, 0)").
	)>
	/**
	 * The border-top-left-radius CSS property sets the radii of the top-left border of an element.
	 */
	borderTopLeftRadius?: CSSProperty<(
		| CSSLength // The value can be a CSS length (e.g. "10px", "2em", "3%"),
		| `${CSSLength} ${CSSLength}` // a space-separated pair of CSS lengths (e.g. "10px 20px", "2em 3em", "3% 4%"). When a single value is provided, it applies to both the horizontal and vertical radii. When a pair of values is provided, the first value applies to the horizontal radius and the second value applies to the vertical radius
	)>
	/**
	 * The border-top-left-radius CSS property sets the radii of the top-right border of an element.
	 */
	borderTopRightRadius?: CSSProperty<(
		| CSSLength // The value can be a CSS length (e.g. "10px", "2em", "3%"),
		| `${CSSLength} ${CSSLength}` // a space-separated pair of CSS lengths (e.g. "10px 20px", "2em 3em", "3% 4%"). When a single value is provided, it applies to both the horizontal and vertical radii. When a pair of values is provided, the first value applies to the horizontal radius and the second value applies to the vertical radius
	)>
	/**
	 * The border-top-style CSS property sets the line style of the top border of an element.
	 */
	borderTopStyle?: CSSProperty<(
		CSSBorderStyle // The value can be one of the following border styles: "none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", or "outset".
	)>
	/**
	 * The border-top-width CSS property sets the width of the top border of an element.
	 */
	borderTopWidth?: CSSProperty<(
		| CSSBorderWidth // It can also be one of the three predefined CSS keywords: "thin", "medium", or "thick".
		| CSSLength // The value can be a CSSLength, which is a string with a unit (e.g. "10px", "2em") that sets a fixed width for the top border.
	)>
	/**
	 * The border-width CSS property sets the width of an element's four borders.
	 */
	borderWidth?: CSSProperty<(string)>
	/**
	 * The bottom CSS property sets the vertical position of an element relative to the bottom edge of its containing element.
	 */
	bottom?: CSSProperty<(
		| CSSLength // The value can be a CSS length (e.g. "10px", "2em", "3%")
		| "auto" //  or "auto" to specify automatic positioning.
	)>
	/**
	 * The boxShadow CSS property adds shadow effects to an element.
	 */
	boxShadow?: CSSProperty<(string)>
	/**
	 * The boxSizing CSS property sets how an element's dimensions are calculated.
	 */
	boxSizing?: CSSProperty<(
		| "border-box" // The value can be "border-box" to include the element's border and padding in its total width and height,
		| "content-box" // or "content-box" to exclude the border and padding from the total dimensions.
	)>
	/**
	 * Sets the page/column/region break behavior after an element.
	 */
	breakAfter?: CSSProperty<(
		| "auto" // Default. Automatic page/column/region break behavior.
		| "avoid" // Avoids any page/column/region break immediately after the element.
		| "always" // Always breaks to the next page/column/region after the element.
		| "all" // Always breaks to the next page/column/region, allowing multiple elements on the same page/column/region.
		| "avoid-page" // Avoids any page break immediately after the element.
		| "page" // Always breaks to the next page after the element.
		| "left" // Always breaks to the next left page/column after the element.
		| "right" // Always breaks to the next right page/column after the element.
		| "recto" // Always breaks to the next odd-numbered page/column after the element.
		| "verso" // Always breaks to the next even-numbered page/column after the element.
		| "avoid-column" // Avoids any column break immediately after the element.
		| "region" // Always breaks to the next region after the element.
	)>
	/**
	 * The `breakBefore` CSS property sets the page-breaking behavior before an element.
	 */
	breakBefore?: CSSProperty<(
		| "auto" // Default value. The behavior is determined by the layout mode of the parent element.
		| "avoid" // Avoids breaks before the element as much as possible.
		| "always" // Always force a page/column/region break before the element.
		| "all" // Always force a page/column/region break before the element, but also allows multiple elements to share the same page/column/region.
		| "avoid-page" // Avoids a page break before the element.
		| "page" // Always force a page break before the element.
		| "left" // Force a page break before the element, placing it on the left-hand side of the next page.
		| "right" // Force a page break before the element, placing it on the right-hand side of the next page.
		| "recto" // Force a page break before the element, placing it on the next available odd-numbered page.
		| "verso" // Force a page break before the element, placing it on the next available even-numbered page.
		| "avoid-column" // Avoids a column break before the element.
		| "region" // Force a region break before the element, placing it in the next available region.
	)>
	/**
	 * Sets the page, column, or region break behavior inside an element.
	 */
	breakInside?: CSSProperty<(
		| "auto" // The default value. The browser will determine if a break is allowed based on other factors, such as available space and the presence of other elements with page/column/region break properties.
		| "avoid" // A break is avoided inside the element if possible, but allowed if necessary.
		| "avoid-page" // A break is avoided inside the element, and the element is prevented from straddling a page break.
		| "avoid-column" // A break is avoided inside the element, and the element is prevented from straddling a column break.
		| "avoid-region" // A break is avoided inside the element, and the element is prevented from straddling a region break.
	)>
	/**
	 * Sets the placement of a table caption with respect to the table box.
	 */
	captionSide?: CSSProperty<(
		| "top" // The caption is placed above the table box.
		| "bottom" // The caption is placed below the table box.
		| "block-start" // The caption is placed above the table box in vertical writing modes, and to the left of the table box in horizontal writing modes.
		| "block-end" // The caption is placed below the table box in vertical writing modes, and to the right of the table box in horizontal writing modes.
		| "inline-start" // The caption is placed to the left of the table box in horizontal writing modes, and at the top of the table box in vertical writing modes, before the first row.
		| "inline-end" // The caption is placed to the right of the table box in horizontal writing modes, and at the bottom of the table box in vertical writing modes, after the last row.
	)>
	/**
	 * Sets the behavior of an element when it clears floating elements.
	 */
	clear?: CSSProperty<(
		| "none" // The default value. The element does not clear any floating elements.
		| "left" // The element clears any floating elements on the left side.
		| "right" // The element clears any floating elements on the right side.
		| "both" //  The element clears any floating elements on both sides.
		| "inline-start" // The element clears any floating elements on the start side in horizontal writing modes, and on the top side in vertical writing modes.
		| "inline-end" // The element clears any floating elements on the end side in horizontal writing modes, and on the bottom side in vertical writing modes.
	)>
	/**
	 * Defines the visible portion of an element, by specifying the rectangular region of an element to display.
	 */
	clip?: CSSProperty<("auto" | `rect(${string})`)>
	/**
	 * Sets a clipping path on an element. The clipping path restricts the region to which paint can be applied.
	 */
	clipPath?: CSSProperty<(
		| `url(${string})` // Reference to a <clipPath> element defined elsewhere in the document.
		| "margin-box" // The clipping path is applied to the margin box of the element.
		| "border-box" // The clipping path is applied to the border box of the element.
		| "padding-box" // The clipping path is applied to the padding box of the element.
		| "content-box" // The clipping path is applied to the content box of the element.
		| "fill-box" // The clipping path is applied to the bounding box of the element's fill.
		| "stroke-box" // The clipping path is applied to the bounding box of the element's stroke.
		| "view-box" // The clipping path is applied to the viewBox of a <svg> element.
		| `inset(${string} ${string})` // The clipping path is a rectangle inset from the border box.
		| `circle(${string} at ${string} ${string})` //  The clipping path is a circle with a given radius and center point.
	)>
	/**
	 * Determines the algorithm used to determine which parts of a shape are included or excluded in the final clipping path.
	 */
	clipRule?: (
		| "nonzero" // Specifies the nonzero winding rule.A point is inside the shape if a line drawn in any direction from the point crosses the shape's path an odd number of times.
		| "evenodd" // Specifies the even-odd winding rule. A point is inside the shape if a line drawn in any direction from the point crosses the shape's path an odd number of times only if the line also crosses the shape's path a nonzero number of times.
		| "inherit" // Inherits the clip-rule property from its parent element.
	)
	/**
	 * Sets the foreground color (text color) of an element.
	 */
	color?: CSSProperty<(
		CSSColor // Specifies the color of the text. It can be a keyword, a hexadecimal RGB value, an RGB value, or a color name.
	)>
	/**
	 * Specifies the color space for operations that are performed by the <filter> element.
	 */
	colorInterpolationFilters?: (
		| "auto" // The filter operation should perform in the default color space.
		| "sRGB" // The filter operation should perform in the sRGB color space.
		| "linearRGB" // The filter operation should perform in the linearized RGB color space.
	)
	/**
	 * Specifies the number of columns an element should be divided into.
	 */
	columnCount?: CSSProperty<(
		| "auto"// The number of columns is determined by other properties, such as column - width or width.
		| number // A positive integer that specifies the number of columns.
	)>
	/**
	 * Specifies how to fill columns with content that is shorter than the height of the column.
	 */
	columnFill?: CSSProperty<(
		| "auto" // The browser decides how to fill the columns.
		| "balance" // The height of the columns is balanced by adding empty space at the end of the content of the shorter column(s).
		| "balance-all" // The height of all columns in the element is balanced by adding empty space at the end of the content of the shorter column(s).
	)>
	/**
	 * Sets the style of the rule between columns.
	 */
	columnRule?: CSSProperty<(string)>
	/**
	 * Sets the color of the rule between columns.
	 */
	columnRuleColor?: CSSProperty<(CSSColor)>
	/**
	 * Sets the style of the rule between columns.
	 */
	columnRuleStyle?: CSSProperty<(CSSBorderStyle)>
	/**
	 * Sets the width of the rule between columns.
	 */
	columnRuleWidth?: CSSProperty<(CSSBorderStyle | CSSLength)>
	/**
	 * Specifies how many columns an element should span across.
	 */
	columnSpan?: CSSProperty<(
		| "none" // The element should not span across any columns. It will be rendered within a single column.
		| "all" // The element should span across all columns.
	)>
	/**
	 * Sets the width of columns in a multi-column element.
	 */
	columnWidth?: CSSProperty<("auto" | CSSLength)>
	/**
	 * A shorthand property that specifies the width and the number of columns in a multi-column element.
	 */
	columns?: CSSProperty<(
		| CSSLength
		| "auto"
		| number
		| `${('auto' | `${CSSLength}` | number)} ${('auto' | `${CSSLength}` | number)}`
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
	webkitAlignContent?: CSSProperty<(
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'stretch'
		| 'baseline'
		| 'safe'
		| 'unsafe'
	)> | null

	/** Aligns flex items along the cross-axis of the flex container.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
	 */
	webkitAlignItems?: CSSProperty<(
		| 'stretch'
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'baseline'
		| 'first baseline'
		| 'last baseline'
		| 'start'
		| 'end'
		| 'self-start'
		| 'self-end'
		| 'safe'
		| 'unsafe'
	)> | null

	/** Aligns a flex item within its flex container.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
	 */
	webkitAlignSelf?: CSSProperty<(
		| 'auto'
		| 'stretch'
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'baseline'
		| 'first baseline'
		| 'last baseline'
		| 'start'
		| 'end'
		| 'self-start'
		| 'self-end'
		| 'safe'
		| 'unsafe'
	)> | null

	/** A shorthand property for all the animation-* properties, except animation-play-state.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation
	 */
	webkitAnimation?: true | false

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


	webkitBackgroundSize?: CSSProperty<('cover' | 'contain')>

	webkitBorderBottomLeftRadius?: string | null

	webkitBorderBottomRightRadius?: string | null
	webkitBorderImage?: CSSProperty<(string | null)>

	webkitBorderRadius?: CSSProperty<(number | string | null)>

	webkitBorderTopLeftRadius?: string | null

	webkitBorderTopRightRadius?: string | null

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
	webkitColumnCount?: CSSProperty<(number | "auto")> | null

	/** The gap between columns for a multi-column element.
	 */
	webkitColumnGap?: CSSProperty<(CSSLength | "normal")> | null

	/** Possible values for the `-webkit-column-rule-style` CSS property.
	 */
	webkitColumnRuleStyle?: CSSProperty<("none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset")> | null

	/** The color of the column rule for a multi-column element.
	 */
	webkitColumnRuleColor?: CSSProperty<(CSSColor)> | null

	/** The width of the column rule for a multi-column element.
	 */
	webkitColumnRuleWidth?: CSSProperty<(CSSLength | "thin" | "medium" | "thick")> | null

	/** Whether the element should span across all columns when using a multi-column layout.
	 */
	webkitColumnSpan?: CSSProperty<("none" | "all")> | null

	/** The width of each column for a multi-column element.
	 */
	webkitColumnWidth?: CSSProperty<(CSSLength | "auto")> | null

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
	webkitBoxFlex?: number | "inherit" | null

	/** Possible values for the `-webkit-box-ordinal-group` CSS property.
	 */
	webkitBoxOrdinalGroup?: CSSProperty<(number)> | null

	/** Possible values for the `-webkit-box-sizing` CSS property.
	 */
	webkitBoxSizing?: CSSProperty<("content-box" | "border-box")> | null

	/** The appearance of the element.
	 */
	webkitAppearance?: CSSProperty<(string)> | null

	/** The visibility of the back face of the element when it is facing away from the viewer.
	 */
	webkitBackfaceVisibility?: CSSProperty<("visible" | "hidden")> | null

	/** The part of the element's background to clip.
	 */
	webkitBackgroundClip?: CSSProperty<("border-box" | "padding-box" | "content-box" | "text")> | null

	/** The origin of the element's background image.
	 */
	webkitBackgroundOrigin?: CSSProperty<("border-box" | "padding-box" | "content-box")> | null


	/** Specifies the number of columns an element should be divided into	 */
	webkitColumns?: CSSProperty<(`${CSSLength} ${number}` | `${number} ${CSSLength}` | `${CSSLength}` | `${number}` | "auto")> | null

	/** Sets the initial main size of a flex item.
	 */
	webkitFlexBasis?: CSSProperty<(CSSLength | "auto" | "content" | "fit-content" | "max-content" | "min-content")> | null

	/** The webkitFlexDirection CSS property sets the direction of the main axis of a flex container.
	 */
	webkitFlexDirection?: CSSProperty<("row" | "row-reverse" | "column" | "column-reverse")> | null

	/** The webkitFlexFlow CSS property is a shorthand property that sets the values of webkitFlexDirection and webkitFlexWrap.
	 */
	webkitFlexFlow?: CSSProperty<(
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
		| "nowrap"
		| "wrap"
		| "wrap-reverse"
	)>

	/** The webkitFlexGrow CSS property sets the flex grow factor of a flex item.
	 */
	webkitFlexGrow?: CSSProperty<(number)> | null

	/** The webkitFlexShrink CSS property sets the flex shrink factor of a flex item.
	 */
	webkitFlexShrink?: CSSProperty<(number)> | null

	/** Specifies the filter or effect to apply to an element
	 */
	webkitFilter?: string | null

	/** Specifies the size of the flexible items
	 */
	webkitFlex?: CSSProperty<"none" | "auto" | CSSLength | number> | null

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
	whiteSpace?: CSSProperty<(
		| "normal"
		| "nowrap"
		| "pre"
		| "pre-wrap"
		| "pre-line"
		| "break-spaces"
	)>
	widows?: number
	width?: CSSProperty<(
		| "auto"
		| "max-content"
		| "min-content"
		| `fit-content(${CSSLength})`
		| CSSLength
	)>
	wordBreak?: CSSProperty<("normal" | "break-all" | "keep-all" | "break-word")>
	wordSpacing?: CSSProperty<("normal" | CSSLength)>
	wordWrap?: string | null
	writingMode?: CSSProperty<("horizontal-tb" | "vertical-rl" | "vertical-lr")>
	zIndex?: CSSProperty<("auto" | number)>
	zoom?: CSSProperty<("normal" | "reset" | `${number}%` | number)>

	/** A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties */
	grid?: string

	/** Either specifies a name for the grid item,  or this property is a shorthand property for the
	 * grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties
	 */
	gridArea?: string

	/** Defines on which row-line a grid item will start */
	gridRowStart?: string

	/** Defines on which column-line a grid item will start. */
	gridColumnStart?: string

	/** Defines how many rows a grid item will span, or on which row-line the item will end */
	gridRowEnd?: string

	/** Defines how many columns a grid item will span, or on which column-line the item will end */
	gridColumnEnd?: string

	/** A shorthand property for the grid-row-start and the grid-row-end properties */
	gridRow?: string

	/** A shorthand property for the grid-column-start and the grid-column-end properties */
	gridColumn?: string

	/** Specifies the size of the columns, and how many columns in a grid layout */
	gridTemplateColumns?: string

	/** Specifies the size of the rows in a grid layout */
	gridTemplateRows?: string

	/** A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties
	 * Default is none
	 */
	gridTemplate?: string | null

	/** Specifies the gap between the grid rows */
	rowGap?: CSSProperty<(CSSLength | number)>

	/** Specifies the gap between the columns */
	columnGap?: CSSProperty<(CSSLength | number)>

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
	| keyof typeof colorConstants
	| "currentcolor"
	| "transparent"
	| `#${string}`
	| `rgb(${number},${number},${number})`
	| `rgba(${number}, ${number}, ${number}, ${number})`
	| `hsl(${number}, ${number}%, ${number}%)`
	| `hsla(${number}, ${number}%, ${number}%, ${number})`

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



