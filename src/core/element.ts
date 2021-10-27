/* eslint-disable @typescript-eslint/ban-types */
import { isIterable, isAsyncIterable, hasValue, first, last, union, Sequence } from "@agyemanjp/standard"
import { ComponentElement, ComponentElementAugmented, UIElement, IntrinsicElement, RenderingTrace } from "./types"

export const isEltProper = (elt: UIElement): elt is (IntrinsicElement | ComponentElement) => (typeof elt === "object")
export const isIntrinsicElt = (elt: UIElement): elt is IntrinsicElement => isEltProper(elt) && typeof elt.type === "string"
export const isComponentElt = (elt: UIElement): elt is ComponentElement => isEltProper(elt) && typeof elt.type !== "string"

/** Augment an element with results info */
export async function augmentAsync(elt: ComponentElementAugmented): Promise<Required<ComponentElementAugmented>> {
	return {
		...elt,
		result: elt.result ?? await (async () => {
			const result = elt.type({ ...elt.props, children: elt.children })
			if (isIterable(result) || isAsyncIterable(result)) {
				// Get next() twice on generator so latest props is used for second next
				return {
					generator: result,
					next: (result.next(elt.props), (await result.next()).value)
				}
			}
			else {
				return result
			}
		})()
	}
}

/** Render to leaf (intrinsic or value) element, returning the trace */
export async function traceToLeafAsync(eltUI: UIElement): Promise<RenderingTrace> {
	if (isIntrinsicElt(eltUI)) {
		return { leafElement: eltUI, componentElts: [] }
	}
	else if (isComponentElt(eltUI)) {
		const result = (await augmentAsync(eltUI)).result
		const eltResult = "next" in result ? result.next : await result
		if (hasValue(eltResult) && isComponentElt(eltResult)) {
			const trace = await traceToLeafAsync(eltResult)
			return { componentElts: [eltUI, ...trace.componentElts], leafElement: trace.leafElement }
		}
		else { // intrinsic or value element
			return { componentElts: [eltUI], leafElement: eltResult }
		}
	}
	else { // eltUI is a value
		return { componentElts: [], leafElement: eltUI }
	}
}

/** Update a render to leaf trace, to reflect a changed state of the world. 
 * @argument eltComp A UI element that, if passed, is used as the starting point of the trace, instead of the trace's 1st element
 * @returns A promise of the updated trace
 */
export async function updateTraceAsync(trace: RenderingTrace, eltComp?: ComponentElement): Promise<RenderingTrace> {
	const firstElt = first(trace.componentElts)
	if (!firstElt) {
		return trace // trace does not contain any component element, i.e., it is already intrinsic
	}

	if (eltComp) {
		// invariant check
		if (firstElt.type !== eltComp.type)
			throw new Error(`updateTraceAsync: trace argument not compatible with eltComp argument`)

		// Update the trace's 1st component element to match the incoming elt to be used as a starting point
		Object.assign(firstElt.props, eltComp.props)
		firstElt.children = eltComp.children
	}

	const initialAugElts: Promise<Required<ComponentElementAugmented> | null>[] = [augmentAsync(firstElt)]
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const rendersAugmented = await Promise.all([...new Sequence(trace.componentElts)
		.skip(1)
		.reduce(initialAugElts, (eltPromisesAccum, eltCurrent/*, index*/) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const lastEltPromise = last(eltPromisesAccum)
			if (!lastEltPromise) throw new Error(``)
			const elt = lastEltPromise!.then(async lastElt => {
				if (!lastElt) return null
				const next = "generator" in lastElt.result ? lastElt.result.next : await lastElt.result
				return (isEltProper(next) && next.type === eltCurrent.type)
					? augmentAsync({ ...eltCurrent, props: next.props })
					: null
			})
			const ret = [...eltPromisesAccum, elt]
			return ret
		})
		.takeWhile(renderPromises => last(renderPromises) !== null)
		.last()!]
	) as ComponentElementAugmented[]

	const _trace = await traceToLeafAsync(last(rendersAugmented)!)
	return {
		componentElts: [...union([rendersAugmented, _trace.componentElts])],
		leafElement: _trace.leafElement
	}
}
