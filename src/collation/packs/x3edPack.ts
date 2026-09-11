import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import x3edSet from "../sets/x3edSet.js";
import defaultSeed from "../utility/defaultSeed.js";

/**
 * Generate the collector numbers of the cards in an Revised Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/3ed.html}
 * @public
 */
export default function x3edPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	const uGen = striped(x3edSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const rGen = striped(x3edSet, 2, rng);
	const [rare, nextRng0] = rGen.next().value;
	out.push(rare);
	rng = nextRng0;

	const cGen = striped(x3edSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
