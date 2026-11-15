import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import type CollationSet from "../CollationSet.js";

import defaultSeed from "../../utility/defaultSeed.js";
import getCard from "../utility/getCard.js";

/**
 * Generate a sequence of collector numbers from the given sheet using striped collation.
 * @param set - The set that contains the sheet.
 * @param sheet - The index of the sheet.
 * @param rng - The PRNG instance to use.
 * @param min - The minimum possible stripe width.
 * @param max - The maximum possible stripe width.
 * @param top - The index of the top row.
 * @param height - The number of rows.
 * @returns The next collector number and the next PRNG.
 * @see {@link https://www.lethe.xyz/mtg/collation/striped-collation.html | Striped Collation}
 * @internal
 */
export default function* striped(
	set: CollationSet,
	sheet: number,
	rng: Readonly<RandomGenerator> = xoroshiro128plus(defaultSeed()),
	min = 2,
	max = 5,
	top = 0,
	height = set.height
): Generator<string, string, never> {
	if (top + height > set.height || height < max) {
		throw new Error("Invalid bounds.");
	}

	let stripe = uniformInt(rng, min, max); // Stripe width.
	let prog = uniformInt(rng, 0, stripe - 1); // Progress through current stripe.
	let x = uniformInt(rng, 0, set.width - 1);
	let y = uniformInt(rng, top, height - 1);

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true) {
		yield getCard(set, sheet, x, y);

		y--;
		if (y < top) {
			y += height;
		}

		prog++;
		if (prog < stripe) {
			continue;
		}

		prog = 0;
		x--;
		if (x < 0) {
			x += set.width;

			stripe = uniformInt(rng, min, max);
			continue;
		}

		y += stripe;
		if (y >= top + height) {
			y -= height;
		}
	}
}
