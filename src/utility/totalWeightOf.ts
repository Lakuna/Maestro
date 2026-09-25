/**
 * Get the sum of weights of items in a weighted list.
 * @param map - A map of values to their weights.
 * @returns The sum of weights.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function totalWeightOf(map: Map<unknown, number>): number {
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	return Array.from(map).reduce((sum, [, weight]) => sum + weight, 0);
}
