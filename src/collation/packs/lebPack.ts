import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import lebSet from "../sets/lebSet.js";
import defaultSeed from "../utility/defaultSeed.js";

/**
 * Generate the collector's numbers of the cards in a Limited Edition Beta pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector's numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/leb.html}
 * @public
 */
export default function lebPack(seed?: number): readonly number[] {
	const actualSeed = seed ?? defaultSeed();
	let rng: RandomGenerator = xoroshiro128plus(actualSeed);
	const out = [];

	const cGen = striped(lebSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		const [common, nextRng] = cGen.next().value;
		out.push(common);
		rng = nextRng;
	}

	const uGen = striped(lebSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const rGen = striped(lebSet, 2, rng);
	const [rare] = rGen.next().value;
	out.push(rare);

	return out;
}
