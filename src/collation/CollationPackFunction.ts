/**
 * A function that takes an optional seed and returns a list of set codes, collector numbers, and foil statuses of cards in a given set.
 * @internal
 */
export type CollationPackFunction = (
	seed?: number
) => readonly [string, string, boolean][];
