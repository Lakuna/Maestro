import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import type CollationSet from "../CollationSet.js";

import defaultSeed from "../utility/defaultSeed.js";
import getCard from "../utility/getCard.js";

const uniformIntPure = purify(uniformInt);

/**
 * Generate a sequence of collector numbers from the given sheet using striped collation.
 * @param set - The set that contains the sheet.
 * @param sheet - The sheet.
 * @param prng - The PRNG instance to use.
 * @param min - The minimum possible stripe width.
 * @param max - The maximum possible stripe width.
 * @returns The next collector number and the next PRNG.
 * @see {@link https://www.lethe.xyz/mtg/collation/striped-collation.html | Striped Collation}
 * @internal
 */
export default function* striped(
	set: CollationSet,
	sheet: number,
	prng?: Readonly<RandomGenerator>,
	min = 2,
	max = 5
): Generator<[string, RandomGenerator], [string, RandomGenerator], never> {
	const initStripeRng = prng ?? xoroshiro128plus(defaultSeed());
	const [initStripe, initProgRng] = uniformIntPure(initStripeRng, min, max);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const [initProg, initXRng] = uniformIntPure(initProgRng, 0, initStripe - 1);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const [initX, initYRng] = uniformIntPure(initXRng, 0, set.width - 1);
	const [initY, initRng] = uniformIntPure(initYRng, 0, set.height - 1);

	let rng = initRng;
	let stripe = initStripe; // Stripe width.
	let prog = initProg; // Progress through current stripe.
	let x = initX;
	let y = initY;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true) {
		yield [getCard(set, sheet, x, y), rng];

		prog++;
		if (prog < stripe) {
			y--;
			if (y < 0) {
				y += set.height;
			}

			continue;
		}

		prog = 0;
		x--;
		if (x < 0) {
			x += set.width;
			y--;
			if (y < 0) {
				y += set.height;
			}

			const [nextStripe, nextRng] = uniformIntPure(rng, min, max);
			rng = nextRng;
			stripe = nextStripe;
			continue;
		}

		y += stripe - 1;
		if (y >= set.height) {
			y -= set.height;
		}
	}
}
