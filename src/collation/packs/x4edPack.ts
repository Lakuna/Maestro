import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformFloat32 } from "pure-rand/distribution/uniformFloat32";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import striped from "../algorithms/striped.js";
import x4edSet from "../sets/x4edSet.js";
import defaultSeed from "../utility/defaultSeed.js";

const uniformFloat32Pure = purify(uniformFloat32);

/**
 * Generate the collector numbers of the cards in a Fourth Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/4ed.html}
 * @public
 */
export default function x4edPack(seed?: number): readonly string[] {
	const actualSeed = seed ?? defaultSeed();
	let rng: RandomGenerator = xoroshiro128plus(actualSeed);
	const out = [];

	const [mode, nextRng0] = uniformFloat32Pure(rng);
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

	// Mode 1: common sheet 1. Arbitrarily assigned a one-in-ten chance to appear here.
	// Mode 2: common sheet 2.
	const cGen = striped(x4edSet, mode < 1 / 10 ? 0 : 1, rng);
	for (let i = 0; i < 11; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
