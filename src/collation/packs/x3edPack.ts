import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import x3edSet from "../sets/x3edSet.js";

/**
 * Generate the collector numbers of the cards in an Revised Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/3ed.html}
 * @public
 */
export default function x3edPack(
	seed?: number
): readonly [string, string, boolean][] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	const uGen = striped(x3edSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push([x3edSet.code, uncommon, false]);
		rng = nextRng;
	}

	const rGen = striped(x3edSet, 2, rng);
	const [rare, nextRng0] = rGen.next().value;
	out.push([x3edSet.code, rare, false]);
	rng = nextRng0;

	const cGen = striped(x3edSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		const [common] = cGen.next().value;
		out.push([x3edSet.code, common, false]);
	}

	return out;
}
