import { Component, Message } from "../types"
import { Obj } from "@sparkwave/standard"

export interface InternalPropsCache<T = unknown> {
	set: (key: string, payload: T) => void
	get: (key: string) => T
}

export type ComponentFactory<Props extends Obj, Internal extends Obj, Msg extends Message> =
	(args: { internalPropsCache: InternalPropsCache<Internal> }) => Component<Props, Msg>