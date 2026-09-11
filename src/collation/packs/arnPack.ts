import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import striped from "../algorithms/striped.js";
import arnSet from "../sets/arnSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

const COMMONS = 6;
const UNCOMMONS = 2;

/**
 * Generate the collector numbers of the cards in an Arabian Nights pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/arn.html}
 * @public
 */
export default function arnPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	// Ordering (uncommons first versus commons first). Arbitrarily assigned a 50% chance to appear here.
	const [uncommonsFirst, nextRng0] = getMode(0.5, rng);

	// A stripe width of 5 is apparently extremely rare in Arabian Nights. Arbitrarily assigned a 1% chance to appear here.
	const [wideCommons, nextRng1] = getMode(0.01, nextRng0);
	const cMax = wideCommons ? 5 : 4;
	rng = nextRng1;

	if (uncommonsFirst) {
		const uGen = striped(arnSet, 1, rng);
		for (let i = 0; i < UNCOMMONS; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(arnSet, 0, rng, 2, cMax);
		for (let i = 0; i < COMMONS; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	const cGen = striped(arnSet, 0, rng, 2, cMax);
	for (let i = 0; i < COMMONS; i++) {
		const [common, nextRng] = cGen.next().value;
		out.push(common);
		rng = nextRng;
	}

	const uGen = striped(arnSet, 1, rng);
	for (let i = 0; i < UNCOMMONS; i++) {
		const [uncommon] = uGen.next().value;
		out.push(uncommon);
	}

	return out;
}
