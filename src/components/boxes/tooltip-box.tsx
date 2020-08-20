// import * as cuid from "cuid"
// import * as Request from "request"
// import { String } from "@agyemanjp/standard"
// import { createElement, propsToCSS } from './core'
// import { Renderer, Component, CSSProperties } from './types'

// interface Props extends Component.Props.Html {
// 	explicitTooltip?: string | JSX.Element
// 	noRecursion?: boolean
// 	width?: CSSProperties["width"]
// 	height?: CSSProperties["height"]
// }

// type ReplacementEntry = {
// 	position: number,
// 	length: number,
// 	node: JSX.Element
// }

// /** The extracts from wikipedia will be stored here, so that we don't have to query it every time a tooltip is hovered */
// const tooltipsStorage = {}

// export const TooltipBox: Renderer<Props> = async (props) => {
// 	const tooltipId = cuid()
// 	let hidingTimer: number
// 	const boxWidth = 600
// 	const boxHeight = 180

// 	const attachToolTipsIfNeeded = async (el: HTMLElement) => {
// 		if (typeof props.explicitTooltip !== "string") {
// 			throw new Error(`The automatic tooltip search and replace can only work with text element`)
// 		}
// 		// If the element contains children, we process them
// 		[...el.childNodes].forEach((child: HTMLElement, index: number) => {
// 			attachToolTipsIfNeeded(child)
// 		})

// 		// Otherwise, we process the element if it's text
// 		if (el.nodeName as any === "#text") {
// 			let originalStringElem = el.textContent
// 			if (originalStringElem === null) {
// 				throw new Error(`A text node didn't have a textContent attribute`)
// 			}

// 			// We find the replacements in the children, or in the case of explicit tooltips, the whole string is replaced
// 			let replacements = props.explicitTooltip !== undefined
// 				? [
// 					{
// 						position: 0,
// 						length: props.explicitTooltip.length,
// 						node: createToolTip(el.textContent!)
// 					}
// 				]
// 				: Object.keys(statTermDefinitions).reduce((arr: ReplacementEntry[], term: string) => {
// 					let position = (originalStringElem!.toLowerCase()).search(term)
// 					if (position > -1 && !partOfAnotherTerm(position, arr)) { // We add that term to the replacement, only if it was found, and not part of another replacement ("range" inside of "interquartile range")
// 						arr.push({
// 							position: position,
// 							length: term.length,
// 							node: createToolTip(originalStringElem!.substr(position, term.length))
// 						})
// 						return arr
// 					}
// 					return arr
// 				}, [])

// 			// We sort the replacements by position: the first in the sentence will be processed first.
// 			replacements.sort((a, b) => a.position - b.position)

// 			const newElements: any[] = []
// 			// For every replacement entry, we add the previous string & the stored tooltip to the "toolTipElems" array.
// 			replacements.forEach((replacement, i) => {
// 				const prev: ReplacementEntry | undefined = replacements[i - 1]
// 				const positionFromStart = replacement.position - ((prev ? prev.position : 0) + (prev ? prev.length : 0))
// 				const previousText = originalStringElem!.slice(0, positionFromStart)
// 				originalStringElem = originalStringElem!.slice(positionFromStart + replacement.length) // Removing the text before the term + the term itself

// 				// We push the text that came before
// 				newElements.push(previousText)
// 				newElements.push(replacement.node)
// 			})
// 			newElements.push(originalStringElem)

// 			if (newElements.length > 1) {
// 				// to-do
// 				// Add an element with the tooltip to the DOM
// 				// const span = document.createElement("span")
// 				// const nodeString = renderToString(<span>{newElements}</span>)
// 				// el.parentNode?.appendChild(span)
// 				// span.innerHTML = await nodeString
// 				// hydrate(span)

// 				// // We remove the existing node
// 				// el.remove()
// 			}

// 		}
// 	}

// 	const tooltipBoxStyle = {
// 		all: "initial" as "initial",
// 		display: "none",
// 		flexDirection: "column" as "column",
// 		position: "fixed" as "fixed",
// 		// color: config.theme.colors.blackish,
// 		// border: `solid 1px ${config.theme.colors.grayish}`,
// 		padding: "1em",
// 		background: "#f0f6ff",
// 		textAlign: "left" as "left",
// 		borderRadius: ".25em",
// 		zIndex: 1,
// 		maxWidth: `${boxWidth}px`,
// 		maxHeight: `${boxHeight}px`,
// 		width: props.width || `${boxWidth}px`,
// 		height: props.height || `${boxHeight}px`
// 	}

// 	const handleMouseLeave = async (className: string) => {
// 		// We hide the tooltip after half a second
// 		hidingTimer = setTimeout(() => {
// 			const tooltipBox = document.getElementsByClassName(`${className}-tooltip`)
// 			for (let item of tooltipBox) {
// 				item.setAttribute("style", propsToCSS({
// 					...tooltipBoxStyle,
// 					display: "none",
// 				}))
// 			}
// 		}, 200) as unknown as number
// 	}

// 	const handleMouseEnter = async (ev: MouseEvent, className: string, lowerCasedWord?: string) => {
// 		// We cancel the hiding timer, if any
// 		clearTimeout(hidingTimer)

// 		// We immediately hide all tooltip boxes (we'll re-show that one immediately)
// 		const allTooltipBoxes = document.getElementsByClassName("tooltipBox")
// 		for (let item of allTooltipBoxes) {
// 			item.setAttribute("style", propsToCSS({
// 				display: "none",
// 			}))
// 		}

// 		// We show the tooltip
// 		const tooltipBox = document.getElementsByClassName(`${className}-tooltip`)
// 		for (let item of tooltipBox) {
// 			// to-do
// 			const proposedLeftPos = (ev.currentTarget.getBoundingClientRect() as any).x + ev.currentTarget.getBoundingClientRect().width
// 			const proposedTopPos = (ev.currentTarget.getBoundingClientRect() as any).y + ev.currentTarget.getBoundingClientRect().height
// 			const actualLeftPos = proposedLeftPos + (item.clientWidth + 34) > window.innerWidth
// 				? proposedLeftPos - ((proposedLeftPos + (item.clientWidth + 34)) - window.innerWidth)
// 				: proposedLeftPos
// 			const actualTopPos = proposedTopPos + (item.clientHeight + 34) > window.innerHeight
// 				? proposedTopPos - ((proposedTopPos + (item.clientHeight + 34)) - window.innerHeight)
// 				: proposedTopPos

// 			item.setAttribute("style", propsToCSS({
// 				...tooltipBoxStyle,
// 				display: "flex",
// 				left: `${actualLeftPos}px`,
// 				top: `${actualTopPos}px`
// 			}))
// 		}

// 		if (lowerCasedWord) {
// 			const isUrl = statTermDefinitions[lowerCasedWord] && statTermDefinitions[lowerCasedWord].slice(0, 4) === "http"

// 			// We insert the content, if it's not already present
// 			const tooltipContents = document.getElementsByClassName(`tooltip-${lowerCasedWord}-content`)

// 			if (tooltipsStorage[lowerCasedWord] === undefined && isUrl) { // We only fetch the tooltip if it's not yet stored, and is a URL
// 				await getTooltipFromUrl(statTermDefinitions[lowerCasedWord]).then(response => {
// 					const foundPages = JSON.parse(response).query.pages
// 					tooltipsStorage[lowerCasedWord] = foundPages[Object.keys(foundPages)[0]].extract
// 				}).catch(err => {
// 					tooltipsStorage[lowerCasedWord] = err
// 				})

// 			}
// 			for (let item of tooltipContents) {
// 				item.innerHTML = props.explicitTooltip
// 					? props.explicitTooltip
// 					: tooltipsStorage[lowerCasedWord]
// 			}
// 		}
// 	}

// 	const createToolTip = (contentReplaced: string) => {
// 		const className__ = cuid()
// 		const lowerCasedWord = contentReplaced.toLowerCase()
// 		const isUrl = statTermDefinitions[lowerCasedWord] && statTermDefinitions[lowerCasedWord].slice(0, 4) === "http"

// 		return <span style={{
// 			position: "relative"
// 		}}><span
// 			className={className__}
// 			style={{ borderBottom: "1px dotted", cursor: "help" }}
// 			onMouseEnter={ev => { handleMouseEnter(ev, className__) }}
// 			onMouseLeave={() => { handleMouseLeave(className__) }}>
// 				{contentReplaced}
// 			</span>
// 			<div
// 				style={tooltipBoxStyle}
// 				className={`tooltipBox ${className__}-tooltip`}
// 				onClick={e => {
// 					e.stopPropagation()
// 				}}
// 				onMouseEnter={() => { clearTimeout(hidingTimer) }}
// 				onMouseLeave={() => { handleMouseLeave(className__) }}>
// 				{
// 					isUrl
// 						? <div className="tooltip-title" style={{
// 							marginBottom: "0.5em"
// 						}}>
// 							<span style={{
// 								fontWeight: 700
// 							}}>
// 								{
// 									new String__(contentReplaced as string).toTitleCase().toString()
// 								}
// 							</span>
// 							<span style={{ float: "right" }}>
// 								From Wikipedia
// 							<a style={{
// 									marginLeft: "0.5em"
// 								}}
// 									target="_blank" href={`https://en.wikipedia.org/wiki/${statTermDefinitions[lowerCasedWord].split("=").pop()}`}>
// 									{/* <Icons.ExternalLink style={{ height: "1em", cursor: "pointer" }} /> */}
// 								</a>
// 							</span>
// 						</div>
// 						: null
// 				}<span className={`tooltip-${lowerCasedWord}-content`} style={{ overflow: "auto", paddingRight: ".5em" }}>{
// 					isUrl
// 						? "Loading definition..."
// 						: props.explicitTooltip !== undefined
// 							? props.explicitTooltip
// 							: statTermDefinitions[lowerCasedWord]
// 				}</span></div></span>
// 	}

// 	// Turn the element and its children into elements + tooltips
// 	const assignTooltips = async (id: string) => {
// 		const elementToProcess = document.getElementById(id)
// 		if (elementToProcess === undefined || elementToProcess === null) {
// 			return <div />
// 		}

// 		[...elementToProcess.childNodes].forEach((child: HTMLElement) => {
// 			attachToolTipsIfNeeded(child)
// 		})

// 	}

// 	if (props.noRecursion) {
// 		const className__ = cuid()
// 		return <div
// 			className={className__}
// 			onClick={e => {
// 				e.stopPropagation()
// 			}}
// 			onMouseEnter={ev => {
// 				clearTimeout(hidingTimer)
// 				handleMouseEnter(ev, className__)
// 			}}
// 			onMouseLeave={() => { handleMouseLeave(className__) }}
// 			style={{
// 				...props.style
// 			}}>
// 			{props.children}
// 			<div
// 				style={{
// 					...tooltipBoxStyle,
// 					width: "auto",
// 					height: "auto"
// 				}}
// 				className={`tooltipBox ${className__}-tooltip`}>
// 				{props.explicitTooltip}
// 			</div>
// 		</div>
// 	}
// 	else { // We indicate that on element load, we need to apply tooltips
// 		return <div style={{
// 			...props.style,
// 			display: "contents",
// 			width: "100%",
// 			height: "100%"
// 		}}
// 			id={tooltipId}>
// 			<style onLoad={() => { assignTooltips(tooltipId) }} />
// 			{props.children}
// 		</div>
// 	}

// }

// const getTooltipFromUrl = async (url: string): Promise<string> => {
// 	return new Promise((resolve, reject) => {
// 		Request.get(
// 			{
// 				uri: url
// 			},
// 			(err: Error, response: Request.Response, body: any) => {
// 				if (err) {
// 					reject(err.message)
// 				}
// 				else {
// 					resolve(response.body)
// 				}
// 			})
// 	})
// }

// /** Indicates if that term is already tolltiped as being part of another term ("quartile" when "interquartile range" has already been tooltiped) */
// const partOfAnotherTerm = (index: number, replacements: ReplacementEntry[]) => {
// 	return replacements.some(replacement =>
// 		index >= replacement.position && index <= replacement.position + replacement.length
// 	)
// }

// const statTermDefinitions = {
// 	"adjusted p value": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Holm%E2%80%93Bonferroni_method#Adjusted_p-values",
// 	"anova": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Analysis_of_variance",
// 	"bar graph": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Bar_chart",
// 	"cohen's D": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Effect_size#Cohen%27s_d",
// 	"confidence interval": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Confidence_interval",
// 	"correlation matrix": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Correlation_and_dependence#Correlation_matrices",
// 	"covariance matrix": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Covariance_matrix",
// 	"degrees of Freedom": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Degrees_of_freedom_(statistics)",
// 	"effect size": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Effect_size",
// 	"equimax (rotation method)": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Factor_analysis#Rotation_methods",
// 	"f-value": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Analysis_of_variance#The_F-test",
// 	"factor analysis": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Factor_analysis",
// 	"frequency": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Frequency_(statistics)",
// 	"gaussian distribution": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Normal_distribution",
// 	"histogram": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Histogram",
// 	"interquartile range": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Interquartile_range",
// 	"kernel density estimation": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Kernel_density_estimation",
// 	"likelihood": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Likelihood_function",
// 	"mann Whitney test": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Mann%E2%80%93Whitney_U_test",
// 	"matrix": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Matrix_(mathematics)",
// 	"maximum": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Sample_maximum_and_minimum",
// 	"maximum likelihood factor analysis": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Exploratory_factor_analysis#Maximum_likelihood_(ML)",
// 	"mean": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Mean",
// 	"mean squares": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Analysis_of_variance#Partitioning_of_the_sum_of_squares",
// 	"median": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Median",
// 	"minimum": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Sample_maximum_and_minimum",
// 	"missing values": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Missing_data ",
// 	"mode": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Mode_(statistics)",
// 	"oblimin (rotation method)": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Factor_analysis#Rotation_methods",
// 	"one sample t test": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Student%27s_t-test#One-sample_t-test",
// 	"p value": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=P-value",
// 	"pearson's r": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Pearson_correlation_coefficient",
// 	"principal axis factor analysis": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Exploratory_factor_analysis#Principal_axis_factoring_(PAF)",
// 	"principal component analysis": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Principal_component_analysis",
// 	"promax (rotation method)": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Factor_analysis#Rotation_methods",
// 	"quartile": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Quartile",
// 	"quatimax (rotation method)": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Factor_analysis#Rotation_methods",
// 	"randomized control trial": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Randomized_controlled_trial",
// 	"range": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Range_(statistics)",
// 	"rotation": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Factor_analysis#Rotation_methods",
// 	"sample": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Sample_(statistics)",
// 	"screeplot": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Scree_plot ",
// 	"significance": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Statistical_significance",
// 	"standard deviation": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Standard_deviation",
// 	"standard error": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Standard_error",
// 	"statistic": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Statistic",
// 	"statistical power": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Power_(statistics)",
// 	"sum of squares": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Analysis_of_variance#Partitioning_of_the_sum_of_squares",
// 	"t test equal variance": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Student%27s_t-test#Equal_or_unequal_sample_sizes,_equal_variance",
// 	"t test not equal variance": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Student%27s_t-test#Equal_or_unequal_sample_sizes,_unequal_variances",
// 	"tukey test": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Tukey%27s_range_test",
// 	"uniform distribution": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Uniform_distribution_(continuous)",
// 	"variable": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Variable_and_attribute_(research)",
// 	"variance": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Variance",
// 	"varimax (rotation method)": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Varimax_rotation",
// 	"correlation coefficient": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Correlation_coefficient",
// 	"kendall's  τ": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Kendall_rank_correlation_coefficient",
// 	"spearman's ρ": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Spearman%27s_rank_correlation_coefficient",
// 	"beta": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Linear_regression#Introduction",
// 	"scatter plot": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Scatter_plot",
// 	"linear prediction": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Linear_regression#Interpretation",
// 	"coefficient": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Linear_regression#Introduction",
// 	"individual correlation": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Correlation_coefficient",
// 	"normalised coefficient": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Standardized_coefficient",
// 	"r²": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Coefficient_of_determination",
// 	"adjusted R²": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Coefficient_of_determination#Adjusted_R2",
// 	"root mean square error": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Root-mean-square_deviation",
// 	"distribution": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Probability_distribution",
// 	"correlation": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=Correlation_and_dependence"
// }