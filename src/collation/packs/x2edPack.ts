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
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Ordering (rare-uncommon-common versus uncommon-rare-common). Arbitrarily assigned a 1 in 10 chance to appear here.
	const rucOrdering = getMode(1 / 10, rng);

	// Mode 1: back-facing cards with rare-uncommon-common ordering. Arbitrarily assigned a 10% chance to appear here.
	if (rucOrdering) {
		out.push([x2edSet.code, striped(x2edSet, 2, rng).next().value, false]);

		const uGen = striped(x2edSet, 1, rng);
		for (let i = 0; i < UNCOMMONS; i++) {
			out.push([x2edSet.code, uGen.next().value, false]);
		}

		const cGen = striped(x2edSet, 0, rng);
		for (let i = 0; i < COMMONS; i++) {
			out.push([x2edSet.code, cGen.next().value, false]);
		}

		return out;
	}

	const uGen = striped(x2edSet, 1, rng);
	for (let i = 0; i < UNCOMMONS; i++) {
		out.push([x2edSet.code, uGen.next().value, false]);
	}

	out.push([x2edSet.code, striped(x2edSet, 2, rng).next().value, false]);

	const cGen = striped(x2edSet, 0, rng);
	for (let i = 0; i < COMMONS; i++) {
		out.push([x2edSet.code, cGen.next().value, false]);
	}

	return out;
}
