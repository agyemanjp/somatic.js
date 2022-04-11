/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import {
	UIElement,
	Children,
	HTMLAttributes,
	MetaHTMLAttributes,
	StyleHTMLAttributes,
	LinkHTMLAttributes,
	SVGAttributes,
	HtmlHTMLAttributes,
	AnchorHTMLAttributes,
	AudioHTMLAttributes,
	ButtonHTMLAttributes,
	CanvasHTMLAttributes,
	FormHTMLAttributes,
	ImgHTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	LiHTMLAttributes,
	OlHTMLAttributes,
	OptgroupHTMLAttributes,
	OptionHTMLAttributes,
	ScriptHTMLAttributes,
	SelectHTMLAttributes,
	TableHTMLAttributes,
	TdHTMLAttributes,
	TextareaHTMLAttributes,
	ThHTMLAttributes
} from "./types"

declare global {
	export namespace JSX {
		type Element = (
			| AsyncGenerator<Element, Element>
			| Generator<Element, Element>
			| UIElement
			// | Promise<Element>
		)

		/** This interface declaration is important for type-checking JSX children properly */
		interface ElementChildrenAttribute {
			children: {}; // specify children name to use
		}

		type Intrinsic<T> = T & {
			children?: Children
		}

		/** Elements that are intrinsic to the runtime
		 * Descriptions from https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms
		 */
		interface IntrinsicElements {
			/** Represents the root (top-level element) of an HTML document, so it is also referred to as the root element. 
			 * All other elements must be descendants of this element.
			 * */
			html: Intrinsic<HtmlHTMLAttributes<HTMLHtmlElement>>
			/** Represents the content of an HTML document. There can be only one <body> element in a document. */
			body: HTMLAttributes<HTMLBodyElement>

			//#region Document metadata
			/** Specifies the base URL to use for all relative URLs in a document. There can be only one <base> element in a document. */
			base: HTMLAttributes<HTMLBaseElement>
			/** Contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets. */
			head: Intrinsic<HtmlHTMLAttributes<HTMLHeadElement>>
			/** Specifies relationships between the current document and an external resource. 
			 * This element is most commonly used to link to CSS, but is also used to establish site icons 
			 * (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things. 
			 * */
			link: LinkHTMLAttributes<HTMLLinkElement>
			/** Represents Metadata that cannot be represented by other HTML meta-related elements, like base, link, script, style or title. */
			meta: MetaHTMLAttributes<HTMLMetaElement>
			/** Contains style information for a document, or part of a document. 
			 * It contains CSS, which is applied to the contents of the document containing the <style> element. 
			 * */
			style: Intrinsic<StyleHTMLAttributes<HTMLStyleElement>>
			/** Defines the document's title that is shown in a Browser's title bar or a page's tab. 
			 * It only contains text; tags within the element are ignored. 
			 */
			title: HTMLAttributes<HTMLTitleElement>
			//#endregion

			//#region Content sectioning
			/** indicates that the enclosed HTML provides contact information for a person or people, or for an organization. */
			address: HTMLAttributes<HTMLElement>
			/** Represents a self-contained composition in a document, page, application, or site, 
			 * which is intended to be independently distributable or reusable (e.g., in syndication). 
			 * Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, 
			 * or any other independent item of content.
			 */
			article: HTMLAttributes<HTMLElement>
			/** Represents a portion of a document whose content is only indirectly related to the document's main content. 
			 * Asides are frequently presented as sidebars or call-out boxes. 
			 */
			aside: HTMLAttributes<HTMLElement>;
			/** Represents introductory content, typically a group of introductory or navigational aids. 
			 * It may contain some heading elements but also a logo, a search form, an author name, and other elements. 
			 */
			header: HTMLAttributes<HTMLElement>
			/** Represents a footer for its nearest sectioning content or sectioning root element. 
			 * A <footer> typically contains information about the author of the section, copyright data or links to related documents
			 */
			footer: HTMLAttributes<HTMLElement>
			/** Represents the dominant content of the body of a document.
			 * The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application. 
			 */
			main: HTMLAttributes<HTMLElement>
			/** Represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. 
			 * Common examples of navigation sections are menus, tables of contents, and indexes.
			 */
			nav: HTMLAttributes<HTMLElement>
			/** Represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. 
			 * Sections should always have a heading, with very few exceptions.
			 */
			section: HTMLAttributes<HTMLElement>
			/** Represents a thematic break between paragraph-level elements: 
			 * for example, a change of scene in a story, or a shift of topic within a section. 
			 */
			hr: HTMLAttributes<HTMLHRElement>
			/** Level 1 section heading. */
			h1: HTMLAttributes<HTMLHeadingElement>
			/** Level 2 section heading. */
			h2: HTMLAttributes<HTMLHeadingElement>
			/** Level 3 section heading. */
			h3: HTMLAttributes<HTMLHeadingElement>
			/** Level 4 section heading. */
			h4: HTMLAttributes<HTMLHeadingElement>
			/** Level 5 section heading. */
			h5: HTMLAttributes<HTMLHeadingElement>
			/** Level 6 section heading. */
			h6: HTMLAttributes<HTMLHeadingElement>
			//#endregion

			//#region Text content
			/** Indicates that the enclosed text is an extended quotation. 
			 * Usually, this is rendered visually by indentation (see Notes for how to change it). 
			 * A URL for the source of the quotation may be given using the cite attribute, 
			 * while a text representation of the source can be given using the cite element. 
			 */
			blockquote: HTMLAttributes<HTMLElement>
			/** Provides the description, definition, or value for the preceding term (dt) in a description list (dl). */
			dd: HTMLAttributes<HTMLElement>
			/** Generic container for flow content. 
			 * It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).
			 */
			div: HTMLAttributes<HTMLDivElement>
			/** Represents a description list. 
			 * The element encloses a list of groups of terms (specified using the dt element) and descriptions (provided by dd elements). 
			 * Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
			 */
			dl: HTMLAttributes<HTMLElement>
			/** Specifies a term in a description or definition list, and as such must be used inside a dl element. 
			 * It is usually followed by a dd element; however, multiple <dt> elements in a row indicate several terms that are all defined by the immediate next dd element.
			 */
			dt: HTMLAttributes<HTMLElement>
			/** Represents a caption or legend describing the rest of the contents of its parent figure element. */
			figcaption: HTMLAttributes<HTMLElement>
			/** Represents self-contained content, potentially with an optional caption, which is specified using the figcaption element.
			 * The figure, its caption, and its contents are referenced as a single unit.
			 */
			figure: HTMLAttributes<HTMLElement>
			/** Used to represent an item in a list. 
			 * It must be contained in a parent element: an ordered list (ol), an unordered list (ul), or a menu (menu). 
			 * In menus and unordered lists, list items are usually displayed using bullet points. 
			 * In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.
			 */
			li: Intrinsic<LiHTMLAttributes<HTMLLIElement>>
			/** Represents an unordered list of items, typically rendered as a bulleted list. */
			ul: HTMLAttributes<HTMLUListElement>
			/** Represents an ordered list of items, typically rendered as a numbered list. */
			ol: Intrinsic<OlHTMLAttributes<HTMLOListElement>>
			/** Represents preformatted text which is to be presented exactly as written in the HTML file. 
			 * The text is typically rendered using a non-proportional, or "monospaced, font. 
			 * Whitespace inside this element is displayed as written.
			 */
			pre: HTMLAttributes<HTMLElement>
			/** Represents a paragraph. 
			 * Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, 
			 * but HTML paragraphs can be any structural grouping of related content, such as images or form fields.
			 */
			p: Intrinsic<HtmlHTMLAttributes<HTMLParagraphElement>>
			//#endregion

			//#region Inline text semantics
			/** Creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address. */
			a: Intrinsic<AnchorHTMLAttributes<HTMLAnchorElement>>
			/** Represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. 
			 * If present, title must contain this full description and nothing else.
			 */
			abbr: HTMLAttributes<HTMLElement>
			/** Represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. 
			 * Historically, these have been presented using italicized type, which is the original source of the <i> naming of this element.
			 */
			i: Intrinsic<HtmlHTMLAttributes<HTMLElement>>
			/** Used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. 
			 * This was formerly known as the Boldface element, and most browsers still draw the text in boldface. 
			 * However, you should not use <b> for styling text; instead, you should use the CSS font-weight property to create boldface text, or the strong element to indicate that text is of special importance.
			 */
			b: Intrinsic<HtmlHTMLAttributes<HTMLElement>>
			/** produces a line break in text (carriage-return). 
			 * It is useful for writing a poem or an address, where the division of lines is significant. 
			 */
			br: HtmlHTMLAttributes<HTMLBRElement>
			/** Tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. 
			 * It's particularly useful when a website dynamically inserts some text and doesn't know the directionality of the text being inserted.
			 */
			bdi: HTMLAttributes<HTMLElement>
			/** Overrides the current directionality of text, so that the text within is rendered in a different direction. */
			bdo: HTMLAttributes<HTMLElement>
			/** Used to describe a reference to a cited creative work, and must include the title of that work. 
			 * The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.
			 */
			cite: HTMLAttributes<HTMLElement>
			/** Displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code.
			 * By default, the content text is displayed using the user agent default monospace font.
			 */
			code: HTMLAttributes<HTMLElement>
			/** Links a given piece of content with a machine-readable translation. 
			 * If the content is time- or date-related, the time element must be used.
			 */
			data: HTMLAttributes<HTMLElement>
			/** Used to indicate the term being defined within the context of a definition phrase or sentence. 
			 * The p element, the dt/dd pairing, or the section element which is the nearest ancestor of the <dfn> is considered to be the definition of the term.
			 */
			dfn: HTMLAttributes<HTMLElement>
			/** Marks text that has stress emphasis. 
			 * It can be nested, with each level of nesting indicating a greater degree of emphasis.
			 */
			em: HTMLAttributes<HTMLElement>
			/** Represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. 
			 * By convention, the user agent defaults to rendering the contents of a <kbd> element using its default monospace font, although this is not mandated by the HTML standard.
			 */
			kbd: HTMLAttributes<HTMLElement>
			/** Represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context. */
			mark: HTMLAttributes<HTMLElement>
			/** Indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. 
			 * This element is intended for short quotations that don't require paragraph breaks; for long quotations use the blockquote element. 
			 */
			q: HTMLAttributes<HTMLElement>
			/** Used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the ruby element. 
			 * One <rp> element should enclose each of the opening and closing parentheses that wrap the rt element that contains the annotation's text.
			 */
			rp: HTMLAttributes<HTMLElement>
			/** Specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. 
			 *The <rt> element must always be contained within a ruby element. 
			 */
			rt: HTMLAttributes<HTMLElement>
			/** Represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. 
			 * It can also be used for annotating other kinds of text, but this usage is less common.
			 */
			ruby: HTMLAttributes<HTMLElement>
			/** Renders text with a strikethrough, or a line through it. 
			 * Use the <s> element to represent things that are no longer relevant or no longer accurate. 
			 * However, <s> is not appropriate when indicating document edits; for that, use the del and ins elements, as appropriate. 
			 */
			s: HTMLAttributes<HTMLElement>
			/** Used to enclose inline text which represents sample (or quoted) output from a computer program. 
			 * Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console).
			 */
			samp: HTMLAttributes<HTMLElement>
			/** The <small> HTML element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. 
			 * By default, it renders text within it one font-size smaller, such as from small to x-small. 
			 */
			small: HTMLAttributes<HTMLElement>
			/** A generic inline container for phrasing content, which does not inherently represent anything. 
			 * It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. 
			 * It should be used only when no other semantic element is appropriate. 
			 * <span> is very much like a div element, but div is a block-level element whereas a <span> is an inline element.
			 */
			span: HTMLAttributes<HTMLSpanElement>
			/** Indicates that its contents have strong importance, seriousness, or urgency. 
			 * Browsers typically render the contents in bold type. 
			 */
			strong: HTMLAttributes<HTMLElement>
			/** Specifies inline text which should be displayed as subscript for solely typographical reasons. 
			 * Subscripts are typically rendered with a lowered baseline using smaller text.
			 */
			sub: HTMLAttributes<HTMLElement>
			/** Specifies inline text which is to be displayed as superscript for solely typographical reasons.
			 * Superscripts are usually rendered with a raised baseline using smaller text
			*/
			sup: HTMLAttributes<HTMLElement>
			/** The <time> HTML element represents a specific period in time. 
			 * It may include the datetime attribute to translate dates into machine-readable format, 
			 * allowing for better search engine results or custom features such as reminders.
			 */
			time: HTMLAttributes<HTMLTimeElement>

			/** The <u> HTML element represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. 
			 * This is rendered by default as a simple solid underline, but may be altered using CSS.
			 */
			u: HTMLAttributes<HTMLTimeElement>
			/** The <var> HTML element represents the name of a variable in a mathematical expression or a programming context. 
			 * It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.
			 */
			var: HTMLAttributes<HTMLTimeElement>
			/** Represents a word break opportunity—a position within text where the browser may optionally break a line, 
			 * though its line-breaking rules would not otherwise create a break at that location.
			 */
			wbr: HTMLAttributes<HTMLTimeElement>
			//#endregion

			//#region Image and multimedia
			/** Defines an area inside an image map that has predefined clickable areas.
			 * An image map allows geometric areas on an image to be associated with Hyperlink.
			 */
			area: HTMLAttributes<HTMLAreaElement>
			/** Embeds an image into the document. */
			img: ImgHTMLAttributes<HTMLImageElement>
			/** Used to embed sound content in documents.
			 * It may contain one or more audio sources, represented using the src attribute or the source element: the browser will choose the most suitable one. 
			 * It can also be the destination for streamed media, using a MediaStream.
			 */
			audio: AudioHTMLAttributes<HTMLAudioElement>
			/** Embeds a media player which supports video playback into the document. 
			 * You can use <video> for audio content as well, but the audio element may provide a more appropriate user experience.
			 */
			video: Intrinsic<HTMLAttributes<HTMLVideoElement> & {
				height?: number | string;
				width?: number | string;
				controls?: boolean;
				poster?: string;
			}>
			/** Used as a child of the media elements: audio and video. 
			 * It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. 
			 * The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks.
			 */
			track: HTMLAttributes<HTMLTrackElement>
			/** Used with area elements to define an image map (a clickable link area). */
			map: HTMLAttributes<HTMLMapElement>
			//#endregion

			//#region Embedded content
			/** Embeds external content at the specified point in the document. 
			 * This content is provided by an external application or other source of interactive content such as a browser plug-in. 
			 */
			embed: HTMLAttributes<HTMLElement>;
			/** Represents a nested browsing context, embedding another HTML page into the current one. */
			iframe: HTMLAttributes<HTMLElement>
			/** Represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin. */
			object: HTMLAttributes<HTMLElement>
			/** Defines parameters for an object element. */
			param: HTMLAttributes<HTMLElement>
			/** Contains zero or more source elements and one img element to offer alternative versions of an image for different display/device scenarios. */
			picture: HTMLAttributes<HTMLElement>
			/** Enables the embedding of another HTML page into the current one for the purposes of allowing smoother navigation into new pages. */
			portal: HTMLAttributes<HTMLElement>
			/** The <source> HTML element specifies multiple media resources for the picture, the audio element, or the video element. 
			 * It is an empty element, meaning that it has no content and does not have a closing tag. 
			 * It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats. 
			 */
			source: Intrinsic<HTMLAttributes<HTMLSourceElement> & {
				src?: string
				type?: string
			}>

			//#endregion

			//#region Scripting
			script: ScriptHTMLAttributes<HTMLScriptElement>,
			noscript: HtmlHTMLAttributes<HTMLElement>,
			canvas: CanvasHTMLAttributes<HTMLCanvasElement>,
			//#endregion

			//#region Table content
			table: Intrinsic<TableHTMLAttributes<HTMLTableElement>>,
			th: ThHTMLAttributes<HTMLTableHeaderCellElement>,
			tr: HTMLAttributes<HTMLTableRowElement>,
			td: Intrinsic<TdHTMLAttributes<HTMLTableDataCellElement>>,
			tbody: HTMLAttributes<HTMLElement>,
			colgroup: HTMLAttributes<HTMLElement>,
			col: HTMLAttributes<HTMLElement>,
			caption: HTMLAttributes<HTMLElement>,
			tfoot: HTMLAttributes<HTMLElement>,
			thead: HTMLAttributes<HTMLElement>,
			//#endregion

			//#region Interactive elements
			details: HTMLAttributes<HTMLElement>
			dialog: HTMLAttributes<HTMLElement>;
			menu: HTMLAttributes<HTMLElement>;
			summary: HTMLAttributes<HTMLElement>;
			//#endregion

			//#region Forms
			/** Represents a document section containing interactive controls for submitting information. */
			form: Intrinsic<FormHTMLAttributes<HTMLFormElement>>
			/** Represents a control that provides a menu of options */
			select: Intrinsic<SelectHTMLAttributes<HTMLSelectElement>>
			/** Represents a clickable button, used to submit forms or anywhere in a document for accessible, standard button functionality. */
			button: Intrinsic<ButtonHTMLAttributes<HTMLButtonElement>>
			/** Used to create interactive controls for web-based forms in order to accept data from the user.
			 * A wide variety of types of input data and control widgets are available, depending on the device and user agent. 
			 * The <input> element is one of the most powerful and complex in all of HTML due to the sheer number of combinations of input types and attributes. 
			 */
			input: Intrinsic<InputHTMLAttributes<HTMLInputElement>>
			label: Intrinsic<LabelHTMLAttributes<HTMLLabelElement>>
			/** Used to group several controls as well as labels (label) within a web form. */
			fieldset: HTMLAttributes<HTMLFieldSetElement>
			/** Represents a caption for the content of its parent fieldset. */
			legend: HTMLAttributes<HTMLLegendElement>
			/** Represents either a scalar value within a known range or a fractional value. */
			meter: HTMLAttributes<HTMLMeterElement>
			/** Contains a set of option elements that represent the permissible or recommended options available to choose from within other controls. */
			datalist: HTMLAttributes<HTMLDataListElement>
			/** Used to define an item contained in a select, an optgroup, or a datalist element. 
			 * As such, <option> can represent menu items in popups and other lists of items in an HTML document. 
			 */
			option: Intrinsic<OptionHTMLAttributes<HTMLOptionElement>>
			/** Creates a grouping of options within a select element. */
			optgroup: Intrinsic<OptgroupHTMLAttributes<HTMLOptGroupElement>>
			/** Represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form. */
			textarea: Intrinsic<TextareaHTMLAttributes<HTMLTextAreaElement>>
			/** Container element into which a site or app can inject the results of a calculation or the outcome of a user action. */
			output: HTMLAttributes<HTMLOutputElement>
			/** Displays an indicator showing the completion progress of a task, typically displayed as a progress bar. */
			progress: HTMLAttributes<HTMLProgressElement>
			//#endregion

			//#region Misc
			math: HTMLAttributes<HTMLElement>
			frame: HTMLAttributes<HTMLFrameElement>
			/** Represents a range of text that has been deleted from a document. 
			 * This can be used when rendering "track changes" or source code diff information, for example. 
			 * The ins element can be used for the opposite purpose: to indicate text that has been added to the document.
			 */
			del: HTMLAttributes<HTMLElement>
			/** Represents a range of text that has been added to a document. 
			 * You can use the del element to similarly represent a range of text that has been deleted from the document.
			 */
			ins: HTMLAttributes<HTMLElement>
			//#endregion

			//#region SVG
			svg: SVGAttributes<SVGSVGElement>,
			g: SVGAttributes<SVGGElement>,
			circle: SVGAttributes<SVGCircleElement>,
			animate: SVGAttributes<SVGAnimateElement>,
			animateTransform: SVGAttributes<SVGAnimateTransformElement>,
			rect: SVGAttributes<SVGRectElement>,
			line: SVGAttributes<SVGLineElement>,
			polyline: SVGAttributes<SVGPolylineElement>,
			path: SVGAttributes<SVGPathElement>,
			polygon: SVGAttributes<SVGPolygonElement>,
			switch: SVGAttributes<SVGSwitchElement>,
			desc: SVGAttributes<SVGDescElement>,
			foreignObject: SVGAttributes<SVGForeignObjectElement>,
			text: SVGAttributes<SVGTextElement>,
			defs: SVGAttributes<SVGDefsElement>,
			linearGradient: SVGAttributes<SVGLinearGradientElement>,
			stop: SVGAttributes<SVGStopElement>,
			filter: SVGAttributes<SVGFilterElement>,
			clipPath: SVGAttributes<SVGClipPathElement>,
			use: SVGAttributes<SVGUseElement>,
			//#endregion
		}
	}
}

export { createElement, Fragment, renderAsync, renderToStringAsync, renderToIntrinsicAsync, updateAsync, mountElement, invalidateUI, } from './core'
export { getChildren, normalizeChildren, isEltProper, isIntrinsicElt, isComponentElt } from "./element"
export { stringifyAttributes, stringifyStyle } from "./html"
export * from './components'
export * from './types'
export { colorConstants, colorLuminance } from "./common"