import Season from "./Season.js";

/**
 * A map of seasons to their weights.
 * @internal
 */
const seasonWeights = new Map<Season, number>([
	[Season.AUTUMN, 4],
	[Season.SPRING, 6],
	[Season.SUMMER, 3],
	[Season.WINTER, 4]
]);

export default seasonWeights;
