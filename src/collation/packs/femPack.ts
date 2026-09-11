import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import femSet from "../sets/femSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

const UNCOMMONS = 2;

/**
 * Generate the collector numbers of the cards in a Fallen Empires pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/fem.html}
 * @public
 */
export default function femPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	// Ordering (uncommons first versus commons first). Arbitrarily assigned a 50% chance to appear here.
	const [uncommonsFirst, nextRng0] = getMode(0.5, rng);

	// Uncommons on a split sheet versus a full sheet. Arbitrarily assigned a 50% chance to appear here.
	const [splitUncommons, nextRng1] = getMode(0.5, nextRng0);

	// Uncommons from the top half versus bottom half of the sheet (no effect for non-split sheets). Arbitrarily assigned a 50% chance to appear here.
	const [topUncommons, nextRng2] = getMode(0.5, nextRng1);
	const uTop =
		splitUncommons ?
			topUncommons ? 0
			:	5
		:	0;
	const uHeight =
		splitUncommons ?
			topUncommons ? 5
			:	6
		:	femSet.height;
	rng = nextRng2;

	if (uncommonsFirst) {
		const uGen = striped(femSet, 1, rng, 2, 5, uTop, uHeight);
		for (let i = 0; i < UNCOMMONS; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(femSet, 0, rng);
		for (let i = 0; i < 6; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	const cGen0 = striped(femSet, 0, rng);
	for (let i = 0; i < 3; i++) {
		const [common, nextRng] = cGen0.next().value;
		out.push(common);
		rng = nextRng;
	}

	const cGen1 = striped(femSet, 0, rng);
	for (let i = 0; i < 3; i++) {
		const [common, nextRng] = cGen1.next().value;
		out.push(common);
		rng = nextRng;
	}

	const uGen = striped(femSet, 1, rng, 2, 5, uTop, uHeight);
	for (let i = 0; i < UNCOMMONS; i++) {
		const [uncommon] = uGen.next().value;
		out.push(uncommon);
	}

	return out;
}
