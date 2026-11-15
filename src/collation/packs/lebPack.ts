import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import leaSet from "../sets/leaSet.js";
import lebSet from "../sets/lebSet.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in a Limited Edition Beta pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/leb.html}
 * @public
 */
export default function lebPack(
	seed?: number
): readonly [string, string, boolean][] {
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// LEB packs could occasionally contain rares from the LEA rare sheet instead. Arbitrarily assigned a 1 in 10 chance here.
	const leaRares = getMode(1 / 10, rng);

	const cGen = striped(lebSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		out.push([lebSet.code, cGen.next().value, false]);
	}

	const uGen = striped(lebSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		out.push([lebSet.code, uGen.next().value, false]);
	}

	out.push([
		leaRares ? leaSet.code : lebSet.code,
		striped(leaRares ? leaSet : lebSet, 2, rng).next().value,
		false
	]);

	return out;
}
