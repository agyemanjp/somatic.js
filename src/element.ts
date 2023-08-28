import { Obj, hasValue } from "@agyemanjp/standard"
import { Children, ComponentElt, UIElement, IntrinsicElement } from "./types"

export const isEltProper = <P extends Obj>(elt?: UIElement<P>): elt is (IntrinsicElement<P> | ComponentElt<P>) =>
	(hasValue(elt) && typeof elt === "object" && "type" in elt && (typeof elt.type === "string" || typeof elt.type === "function"))
export const isIntrinsicElt = <P extends Obj>(elt: UIElement<P>): elt is IntrinsicElement<P> => isEltProper(elt) && typeof elt.type === "string"
export const isFragmentElt = (elt: UIElement): boolean /*elt is FragmentElement*/ => isEltProper(elt) && elt.type === ""
export const isComponentElt = <P extends Obj>(elt: UIElement<P>): elt is ComponentElt<P> => isEltProper(elt) && typeof elt.type !== "string"


/** Returns a flattened array of children  */
export function normalizeChildren(children?: Children): UIElement<Obj<unknown, string>>[] {
	if (children === undefined) { return [] }
	return Array.isArray(children)
		? children.flat()
		: [children]
}

/** Returns normalized children of an element  */
export function getChildren(elt: UIElement): UIElement<Obj<unknown, string>>[] {
	return isEltProper(elt) ? normalizeChildren(elt.children) : []
}
