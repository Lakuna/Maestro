import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";

import totalWeightOf from "./totalWeightOf.js";

/**
 * Get a random item from a weighted list.
 * @param rng - The PRNG.
 * @param weights - A map of items to their weights.
 * @returns The random item and the new PRNG instance.
 * @internal
 */
export default function weightedRandom<T>(
	rng: Readonly<RandomGenerator>,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	weights: Map<T, number>
): T {
	let i = uniformInt(rng, 0, totalWeightOf(weights) - 1);
	for (const [out, weight] of weights) {
		if (i < weight) {
			return out;
		}

		i -= weight;
	}

	throw new Error("Something went wrong with the weighted randomization.");
}
