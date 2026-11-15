import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import atqSet from "../sets/atqSet.js";
import getMode from "../utility/getMode.js";

const COMMONS = 6;
const UNCOMMONS = 2;

/**
 * Generate the collector numbers of the cards in an Antiquities pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/atq.html}
 * @public
 */
export default function atqPack(
	seed?: number
): readonly [string, string, boolean][] {
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Ordering (uncommons first versus commons first). Arbitrarily assigned a 1 in 2 chance to appear here.
	const uncommonsFirst = getMode(1 / 2, rng);

	if (uncommonsFirst) {
		const uGen = striped(atqSet, 1, rng);
		for (let i = 0; i < UNCOMMONS; i++) {
			out.push([atqSet.code, uGen.next().value, false]);
		}

		const cGen = striped(atqSet, 0, rng);
		for (let i = 0; i < COMMONS; i++) {
			out.push([atqSet.code, cGen.next().value, false]);
		}

		return out;
	}

	const cGen = striped(atqSet, 0, rng);
	for (let i = 0; i < COMMONS; i++) {
		out.push([atqSet.code, cGen.next().value, false]);
	}

	const uGen = striped(atqSet, 1, rng);
	for (let i = 0; i < UNCOMMONS; i++) {
		out.push([atqSet.code, uGen.next().value, false]);
	}

	return out;
}
