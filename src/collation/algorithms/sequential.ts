import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import type CollationSet from "../CollationSet.js";

import defaultSeed from "../../utility/defaultSeed.js";

/**
 * Generate a sequence of collector numbers from the given run using sequential collation.
 * @param set - The set that contains the run.
 * @param run - The index of the run.
 * @param rng - The PRNG instance to use.
 * @returns The next collector number and the next PRNG.
 * @see {@link https://www.lethe.xyz/mtg/collation/sequential-collation.html}
 * @internal
 */
export default function* sequential(
	set: CollationSet,
	run: number,
	rng: Readonly<RandomGenerator> = xoroshiro128plus(defaultSeed())
): Generator<string, string, never> {
	if (!set.runs) {
		throw new Error(
			"Can't use sequential collation on a set with no defined runs."
		);
	}

	const runn = set.runs[run];
	if (!runn) {
		throw new Error("Invalid run.");
	}

	const [start, end] = runn;

	let i = uniformInt(rng, start, end);

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true) {
		const collectorNumber = set.cards[i];
		if (typeof collectorNumber === "undefined") {
			throw new Error("Out of bounds.");
		}

		yield collectorNumber;

		i++;
		if (i > end) {
			i = start;
		}
	}
}
