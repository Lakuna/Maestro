import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import leaSet from "../sets/leaSet.js";
import lebSet from "../sets/lebSet.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in a Limited Edition Beta pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/leb.html}
 * @public
 */
export default function lebPack(
	seed?: number
): readonly [string, string, boolean][] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// LEB packs could occasionally contain rares from the LEA rare sheet instead. Arbitrarily assigned a 1 in 10 chance here.
	const [leaRares, nextRng0] = getMode(1 / 10, rng);
	rng = nextRng0;

	const cGen = striped(lebSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		const [common, nextRng] = cGen.next().value;
		out.push([lebSet.code, common, false]);
		rng = nextRng;
	}

	const uGen = striped(lebSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push([lebSet.code, uncommon, false]);
		rng = nextRng;
	}

	const rGen = striped(leaRares ? leaSet : lebSet, 2, rng);
	const [rare] = rGen.next().value;
	out.push([leaRares ? leaSet.code : lebSet.code, rare, false]);

	return out;
}
