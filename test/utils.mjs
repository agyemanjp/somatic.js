/* eslint-disable fp/no-mutating-methods */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable init-declarations */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-mutation */

//@ts-check

/** Get attributes
 * @param { HTMLElement } node
 */
export function getAttributeNames(node) {
	let index, rv, attrs

	rv = []
	attrs = node.attributes
	for (index = 0; index < attrs.length; ++index) {
		rv.push(attrs[index].nodeName)
	}
	rv.sort()
	return rv
}

/** Check two elements for equivalence
 * @param { HTMLElement } elm1
 * @param { HTMLElement } elm2
 */
export function equivElms(elm1, elm2) {
	// eslint-disable-next-line fp/no-let
	let attrs1, attrs2, name, node1, node2

	// Compare attributes without order sensitivity
	attrs1 = getAttributeNames(elm1)
	attrs2 = getAttributeNames(elm2)
	if (attrs1.join(",") !== attrs2.join(",")) {
		return false
	}

	// ...and values unless you want to compare DOM0 event handlers (onclick="...")
	for (let index = 0; index < attrs1.length; ++index) {
		const _name = attrs1[index]
		if (elm1.getAttribute(_name) !== elm2.getAttribute(_name)) {
			return false
		}
	}

	// Walk the children
	// eslint-disable-next-line fp/no-loops
	for (let _node1 = elm1.firstChild, _node2 = elm2.firstChild; _node1 && _node2; _node1 = _node1.nextSibling, _node2 = _node2.nextSibling) {
		if (_node1.nodeType !== _node2.nodeType) {
			return false
		}
		if (_node1.nodeType === 1) { // Element
			if (!equivElms(/** @type { HTMLElement } */(_node1), /** @type { HTMLElement } */(_node2))) {
				return false
			}
		}
		else if (_node1.nodeValue !== _node2.nodeValue) {
			return false
		}
	}
	if (node1 || node2) {
		// One of the elements had more nodes than the other
		return false
	}

	// Seem the same
	return true
}