import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import x2edSet from "../sets/x2edSet.js";
import getMode from "../utility/getMode.js";

const COMMONS = 11;
const UNCOMMONS = 3;

/**
 * Generate the collector numbers of the cards in an Unlimited Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/2ed.html}
 * @public
 */
export default function x2edPack(
	seed?: number
): readonly [string, string, boolean][] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Ordering (rare-uncommon-common versus uncommon-rare-common). Arbitrarily assigned a 1 in 10 chance to appear here.
	const [rucOrdering, nextRng0] = getMode(1 / 10, rng);
	rng = nextRng0;

	// Mode 1: back-facing cards with rare-uncommon-common ordering. Arbitrarily assigned a 10% chance to appear here.
	if (rucOrdering) {
		const rGen = striped(x2edSet, 2, rng);
		const [rare, nextRng1] = rGen.next().value;
		out.push([x2edSet.code, rare, false]);
		rng = nextRng1;

		const uGen = striped(x2edSet, 1, rng);
		for (let i = 0; i < UNCOMMONS; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push([x2edSet.code, uncommon, false]);
			rng = nextRng;
		}

		const cGen = striped(x2edSet, 0, rng);
		for (let i = 0; i < COMMONS; i++) {
			const [common] = cGen.next().value;
			out.push([x2edSet.code, common, false]);
		}

		return out;
	}

	const uGen = striped(x2edSet, 1, rng);
	for (let i = 0; i < UNCOMMONS; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push([x2edSet.code, uncommon, false]);
		rng = nextRng;
	}

	const rGen = striped(x2edSet, 2, rng);
	const [rare, nextRng1] = rGen.next().value;
	out.push([x2edSet.code, rare, false]);
	rng = nextRng1;

	const cGen = striped(x2edSet, 0, rng);
	for (let i = 0; i < COMMONS; i++) {
		const [common] = cGen.next().value;
		out.push([x2edSet.code, common, false]);
	}

	return out;
}
