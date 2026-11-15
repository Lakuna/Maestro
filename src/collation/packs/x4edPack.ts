import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import x4edSet from "../sets/x4edSet.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in a Fourth Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/4ed.html}
 * @public
 */
export default function x4edPack(
	seed?: number
): readonly [string, string, boolean][] {
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Common sheet 1 versus common sheet 2. Arbitrarily assigned a 1 in 10 chance to appear here.
	const commonSheetMode = getMode(1 / 10, rng);
	const commonSheet = commonSheetMode ? 0 : 1;

	const uGen = striped(x4edSet, 2, rng);
	for (let i = 0; i < 3; i++) {
		out.push([x4edSet.code, uGen.next().value, false]);
	}

	out.push([x4edSet.code, striped(x4edSet, 3, rng).next().value, false]);

	const cGen = striped(x4edSet, commonSheet, rng);
	for (let i = 0; i < 11; i++) {
		out.push([x4edSet.code, cGen.next().value, false]);
	}

	return out;
}
