import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { purify } from "pure-rand/utils/purify";

import totalWeightOf from "./totalWeightOf.js";

const uniformIntPure = purify(uniformInt);

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
): [T, RandomGenerator] {
	const [init, nextRng] = uniformIntPure(rng, 0, totalWeightOf(weights) - 1);
	let i = init;
	for (const [out, weight] of weights) {
		if (i < weight) {
			return [out, nextRng];
		}

		i -= weight;
	}

	throw new Error("Something went wrong with the weighted randomization.");
}
