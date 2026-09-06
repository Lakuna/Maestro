import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import type CollationSet from "../CollationSet.js";

import defaultSeed from "../utility/defaultSeed.js";
import getCard from "../utility/getCard.js";

const MIN_STRIPE = 2;
const MAX_STRIPE = 5;

const uniformIntPure = purify(uniformInt);

/**
 * Generate a sequence of collector's numbers from the given sheet using striped collation.
 * @param set - The set that contains the sheet.
 * @param sheet - The sheet.
 * @param prng - The PRNG instance to use.
 * @returns The next collector's number and the next PRNG.
 * @see {@link https://www.lethe.xyz/mtg/collation/striped-collation.html | Striped Collation}
 * @internal
 */
export default function* striped(
	set: CollationSet,
	sheet: number,
	prng?: Readonly<RandomGenerator>
): Generator<[number, RandomGenerator], [number, RandomGenerator], never> {
	const initStripeRng = prng ?? xoroshiro128plus(defaultSeed());
	const [initStripe, initProgRng] = uniformIntPure(
		initStripeRng,
		MIN_STRIPE,
		MAX_STRIPE
	);
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

			const [nextStripe, nextRng] = uniformIntPure(rng, MIN_STRIPE, MAX_STRIPE);
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
