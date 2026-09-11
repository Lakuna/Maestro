import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import x2edSet from "../sets/x2edSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

const COMMONS = 11;
const UNCOMMONS = 3;

/**
 * Generate the collector numbers of the cards in an Unlimited Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/2ed.html}
 * @public
 */
export default function x2edPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	// Ordering (rare-uncommon-common versus uncommon-rare-common). Arbitrarily assigned a 10% chance to appear here.
	const [rucOrdering, nextRng0] = getMode(0.1, rng);
	rng = nextRng0;

	// Mode 1: back-facing cards with rare-uncommon-common ordering. Arbitrarily assigned a 10% chance to appear here.
	if (rucOrdering) {
		const rGen = striped(x2edSet, 2, rng);
		const [rare, nextRng1] = rGen.next().value;
		out.push(rare);
		rng = nextRng1;

		const uGen = striped(x2edSet, 1, rng);
		for (let i = 0; i < UNCOMMONS; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(x2edSet, 0, rng);
		for (let i = 0; i < COMMONS; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	const uGen = striped(x2edSet, 1, rng);
	for (let i = 0; i < UNCOMMONS; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const rGen = striped(x2edSet, 2, rng);
	const [rare, nextRng1] = rGen.next().value;
	out.push(rare);
	rng = nextRng1;

	const cGen = striped(x2edSet, 0, rng);
	for (let i = 0; i < COMMONS; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
