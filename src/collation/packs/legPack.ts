import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import legSet from "../sets/legSet.js";
import getMode from "../utility/getMode.js";

const COMMONS = 11;
const UNCOMMONS = 3;

/**
 * Generate the collector numbers of the cards in a Legends pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/leg.html}
 * @public
 */
export default function legPack(
	seed?: number
): readonly [string, string, boolean][] {
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Ordering (rare-uncommon-common versus uncommon-rare-common). Arbitrarily assigned a 1 in 10 chance to appear here.
	const rucOrdering = getMode(1 / 10, rng);

	// "A boxes" (uncommons from the top 6 rows) versus "B boxes" (uncommons from the bottom 5 rows). Arbitrarily assigned a 1 in 2 chance to appear here.
	const aBox = getMode(1 / 2, rng);
	const top = aBox ? 0 : 6;
	const height = aBox ? 6 : 5;

	if (rucOrdering) {
		out.push([legSet.code, striped(legSet, 2, rng).next().value, false]);

		const uGen = striped(legSet, 1, rng, 2, 4, top, height);
		for (let i = 0; i < UNCOMMONS; i++) {
			out.push([legSet.code, uGen.next().value, false]);
		}

		const cGen = striped(legSet, 0, rng);
		for (let i = 0; i < COMMONS; i++) {
			out.push([legSet.code, cGen.next().value, false]);
		}

		return out;
	}

	const uGen = striped(legSet, 1, rng, 2, 4, top, height);
	for (let i = 0; i < UNCOMMONS; i++) {
		out.push([legSet.code, uGen.next().value, false]);
	}

	out.push([legSet.code, striped(legSet, 2, rng).next().value, false]);

	const cGen = striped(legSet, 0, rng);
	for (let i = 0; i < COMMONS; i++) {
		out.push([legSet.code, cGen.next().value, false]);
	}

	return out;
}
