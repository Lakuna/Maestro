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
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	const uGen = striped(x3edSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		out.push([x3edSet.code, uGen.next().value, false]);
	}

	out.push([x3edSet.code, striped(x3edSet, 2, rng).next().value, false]);

	const cGen = striped(x3edSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		out.push([x3edSet.code, cGen.next().value, false]);
	}

	return out;
}
