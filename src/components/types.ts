export interface InternalPropsCache<T = unknown> {
	set: (key: string, payload: T) => void
	get: (key: string) => T
}