import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import x4edSet from "../sets/x4edSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in a Fourth Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/4ed.html}
 * @public
 */
export default function x4edPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	// Common sheet 1 versus common sheet 2. Arbitrarily assigned a 10% chance to appear here.
	const [commonSheetMode, nextRng0] = getMode(0.1, rng);
	const commonSheet = commonSheetMode ? 0 : 1;
	rng = nextRng0;

	const uGen = striped(x4edSet, 2, rng);
	for (let i = 0; i < 3; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const rGen = striped(x4edSet, 3, rng);
	const [rare, nextRng1] = rGen.next().value;
	out.push(rare);
	rng = nextRng1;

	const cGen = striped(x4edSet, commonSheet, rng);
	for (let i = 0; i < 11; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
