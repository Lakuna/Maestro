import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import legSet from "../sets/legSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

const COMMONS = 11;
const UNCOMMONS = 3;

/**
 * Generate the collector numbers of the cards in a Legends pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/leg.html}
 * @public
 */
export default function legPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	// Ordering (rare-uncommon-common versus uncommon-rare-common). Arbitrarily assigned a 10% chance to appear here.
	const [rucOrdering, nextRng0] = getMode(0.1, rng);

	// "A boxes" (uncommons from the top 6 rows) versus "B boxes" (uncommons from the bottom 5 rows). Arbitrarily assigned a 50% chance to appear here.
	const [aBox, nextRng1] = getMode(0.5, nextRng0);
	const top = aBox ? 0 : 6;
	const height = aBox ? 6 : 5;
	rng = nextRng1;

	if (rucOrdering) {
		const rGen = striped(legSet, 2, rng);
		const [rare, nextRng2] = rGen.next().value;
		out.push(rare);
		rng = nextRng2;

		const uGen = striped(legSet, 1, rng, 2, 4, top, height);
		for (let i = 0; i < UNCOMMONS; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(legSet, 0, rng);
		for (let i = 0; i < COMMONS; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	const uGen = striped(legSet, 1, rng, 2, 4, top, height);
	for (let i = 0; i < UNCOMMONS; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const rGen = striped(legSet, 2, rng);
	const [rare, nextRng2] = rGen.next().value;
	out.push(rare);
	rng = nextRng2;

	const cGen = striped(legSet, 0, rng);
	for (let i = 0; i < COMMONS; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
