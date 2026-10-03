import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import arnSet from "../sets/arnSet.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in an Arabian Nights pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/arn.html}
 * @public
 */
export default function arnPack(
	seed?: number
): readonly [string, string, boolean][] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Ordering (uncommons first versus commons first). Arbitrarily assigned a 1 in 2 chance to appear here.
	const [uncommonsFirst, nextRng0] = getMode(1 / 2, rng);

	// A stripe width of 5 is apparently extremely rare in Arabian Nights. Arbitrarily assigned a 1 in 100 chance to appear here.
	const [wideCommons, nextRng1] = getMode(1 / 100, nextRng0);
	const cMax = wideCommons ? 5 : 4;
	rng = nextRng1;

	if (uncommonsFirst) {
		const uGen = striped(arnSet, 1, rng);
		for (let i = 0; i < 2; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push([arnSet.code, uncommon, false]);
			rng = nextRng;
		}

		const cGen = striped(arnSet, 0, rng, 2, cMax);
		for (let i = 0; i < 6; i++) {
			const [common] = cGen.next().value;
			out.push([arnSet.code, common, false]);
		}

		return out;
	}

	const cGen = striped(arnSet, 0, rng, 2, cMax);
	for (let i = 0; i < 6; i++) {
		const [common, nextRng] = cGen.next().value;
		out.push([arnSet.code, common, false]);
		rng = nextRng;
	}

	const uGen = striped(arnSet, 1, rng);
	for (let i = 0; i < 2; i++) {
		const [uncommon] = uGen.next().value;
		out.push([arnSet.code, uncommon, false]);
	}

	return out;
}
