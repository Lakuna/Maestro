/**
 * Make a type read-only.
 * @internal
 */
export type DeepReadonly<T> =
	T extends (infer U)[] ? readonly DeepReadonly<U>[]
	: T extends (...args: never) => unknown ? (...args: never) => unknown
	: T extends object ? { readonly [U in keyof T]: DeepReadonly<T[U]> }
	: T;
