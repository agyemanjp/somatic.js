/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-assign */
/* eslint-disable @typescript-eslint/ban-types */
import { Obj, hasValue, firstOrDefault, skip, last, shallowEquals, isGenerator, union, Sequence } from "@agyemanjp/standard"
import { ComponentElt, ComponentResult, ComponentEltAugmented, UIElement, IntrinsicElement, RenderingTrace } from "./types"

export const isEltProper = (elt: UIElement): elt is (IntrinsicElement | ComponentElt) => (hasValue(elt) && typeof elt === "object" && "type" in elt)
export const isIntrinsicElt = (elt: UIElement): elt is IntrinsicElement => isEltProper(elt) && typeof elt.type === "string"
export const isComponentElt = (elt: UIElement): elt is ComponentElt => isEltProper(elt) && typeof elt.type !== "string"

/** Return a copy of a component element augmented with its invocation results
 * @argument elt The input component element (possibly with a result member, which is recomputed)
 */
export async function updateResultAsync<P extends Obj = Obj>(elt: ComponentElt<P>): Promise<ComponentEltAugmented<P>> {
	const getNextAsync = async (generator: Generator<UIElement, UIElement> | AsyncGenerator<UIElement, UIElement>, newProps?: any): Promise<ComponentResult | undefined> => {
		let nextInfo = await generator.next(newProps)
		// If new props were passed, call next() on generator again so latest props is used
		if (hasValue(newProps)) nextInfo = await generator.next()

		const next: UIElement | undefined = (nextInfo.done === true && nextInfo.value === undefined)
			? undefined
			: nextInfo.value
		return next ? { generator, element: next } : undefined
	}

	const getResultAsync = async (): Promise<ComponentResult> => {
		if (elt.result && elt.result.generator) {
			const next = await getNextAsync(elt.result.generator, elt.props)
			if (hasValue(next))
				return next
			else
				console.warn(`Component generator is done yielding values.\nThis situation is normally unintended, since generator components can yield values infinitely while responding to props changes`)
		}

		const resultElt = await elt.type({ ...elt.props, children: elt.children }/*, { invalidate: ()=>{} }*/)
		if (isGenerator(resultElt)) {
			// No need to inject props again since call to elt.type above already used them
			const next = await getNextAsync(resultElt)
			if (hasValue(next))
				return next
			else
				// Cannot use a generator component that does not yield at least one value
				throw new Error(`Component "${elt.type.name}" not yielding values.`)
		}
		else {
			return { element: resultElt }
		}
	}

	return { ...elt, result: await getResultAsync() }
}

/** Render to leaf (intrinsic or value) element, returning the trace */
export async function traceToLeafAsync(eltUI: UIElement): Promise<RenderingTrace> {
	// let ret: RenderingTrace | undefined = undefined
	if (isComponentElt(eltUI)) {
		const eltUIAugmented = eltUI.result ? eltUI as ComponentEltAugmented : await updateResultAsync(eltUI)
		const eltResult = eltUIAugmented.result.element

		if (isComponentElt(eltResult)) {
			const trace = await traceToLeafAsync(eltResult)
			// ret = { componentElts: [eltUI, ...trace.componentElts], leafElement: trace.leafElement ?? "" }
			return { componentElts: [eltUIAugmented, ...trace.componentElts], leafElement: trace.leafElement ?? "" }
		}
		else { // intrinsic or value element
			// ret = { componentElts: [eltUI], leafElement: eltResult ?? "" }
			return { componentElts: [eltUIAugmented], leafElement: eltResult ?? "" }
		}
	}
	else { // eltUI is intrinsic or a value
		// ret = { componentElts: [], leafElement: eltUI ?? "" }
		return { componentElts: [], leafElement: eltUI ?? "" }
	}

	// eslint-disable-next-line fp/no-mutation
	// (self as any).leafElement = ret.leafElement
	// console.assert(ret.leafElement !== undefined, `Leaf elt in traceToLeafAsync return is misisng`)
	// console.log(`Returning leaf elt from traceToLeafAsync: ${ret.leafElement}`)

	// return ret
}

/** Return an updated render-to-leaf trace, to reflect a changed state of the world. Does not mutate input trace
 * @argument trace The original rendering trace to update. If intrinsic, it is returned as is.
 * @argument eltComp A UI element that, if passed, is used as the starting point of the trace, instead of the trace's 1st element
 * @returns A promise of the updated trace
 */
export async function updateTraceAsync(trace: RenderingTrace, eltComp?: ComponentElt): Promise<RenderingTrace> {
	const firstElt = firstOrDefault(trace.componentElts)
	if (!firstElt) return trace // trace does not contain any component element, i.e., it is already intrinsic

	if (eltComp) {
		if (firstElt.type !== eltComp.type) // invariant check
			throw new Error(`updateTraceAsync: trace argument not compatible with component element argument`)

		// Update the trace's 1st component element to match the incoming elt to be used as a starting point
		Object.assign(firstElt.props, eltComp.props)
		firstElt.children = eltComp.children
	}

	const initialAugElts: Promise<ComponentEltAugmented | null>[] = [updateResultAsync(firstElt)]
	const rendersAugmented = await Promise.all([...new Sequence(trace.componentElts)
		.skip(1)

		.reduce(initialAugElts, (eltPromisesAccum, eltCurrent/*, index*/) => {
			const lastEltPromise = last(eltPromisesAccum)
			const elt = lastEltPromise.then(async lastElt => {
				if (!lastElt) // Last element accumulated for trace must not be null (since the takeWhile combinator below excludes such)
					throw new Error(`Last element of accumulated trace is null in reducer`)

				const eltResult = lastElt.result.element
				if (isEltProper(eltResult) && eltResult.type === eltCurrent.type) {
					const childrenResult = getChildren(eltResult)
					const childrenCurr = getChildren(eltCurrent)

					return eltResult.type.isPure && childrenCurr.length === 0 && childrenResult.length === 0 && shallowEquals(eltResult.props, eltCurrent.props)
						? eltCurrent // no need to update results
						: updateResultAsync({
							...eltCurrent,
							props: eltResult.props,
							children: eltResult.children
						})
				}
				else {
					return null
				}

			})

			return [...eltPromisesAccum, elt]
		})

		// Take while last elt promise accumulated not null (i.e continues to be compatible with the render trace)
		.takeWhile(eltPromises => last(eltPromises) !== null)

		.last()]

	) as ComponentEltAugmented[]

	const _trace = await traceToLeafAsync(last(rendersAugmented))
	return {
		componentElts: [...union([rendersAugmented, skip(_trace.componentElts, 1)])],
		leafElement: _trace.leafElement
	}
}

/** Returns a flattened array of children  */
export function getChildren(elt: UIElement) {
	return isEltProper(elt) && elt.children
		? Array.isArray(elt.children)
			? elt.children.flat()
			: [elt.children]
		: []
}
