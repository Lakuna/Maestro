import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import atqSet from "../sets/atqSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in an Antiquities pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/atq.html}
 * @public
 */
export default function atqPack(seed?: number): readonly string[] {
	const actualSeed = seed ?? defaultSeed();
	let rng: RandomGenerator = xoroshiro128plus(actualSeed);
	const out = [];

	// Ordering (uncommons first versus commons first). Arbitrarily assigned a 50% chance to appear here.
	const [uncommonsFirst, nextRng0] = getMode(0.5, rng);
	rng = nextRng0;

	if (uncommonsFirst) {
		const uGen = striped(atqSet, 1, rng);
		for (let i = 0; i < 2; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(atqSet, 0, rng);
		for (let i = 0; i < 6; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	const cGen = striped(atqSet, 0, rng);
	for (let i = 0; i < 6; i++) {
		const [common, nextRng] = cGen.next().value;
		out.push(common);
		rng = nextRng;
	}

	const uGen = striped(atqSet, 1, rng);
	for (let i = 0; i < 2; i++) {
		const [uncommon] = uGen.next().value;
		out.push(uncommon);
	}

	return out;
}
