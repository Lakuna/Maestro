import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformFloat32 } from "pure-rand/distribution/uniformFloat32";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import striped from "../algorithms/striped.js";
import arnSet from "../sets/arnSet.js";
import defaultSeed from "../utility/defaultSeed.js";

const uniformFloat32Pure = purify(uniformFloat32);

/**
 * Generate the collector numbers of the cards in an Arabian Nights pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/arn.html}
 * @public
 */
export default function arnPack(seed?: number): readonly string[] {
	const actualSeed = seed ?? defaultSeed();
	let rng: RandomGenerator = xoroshiro128plus(actualSeed);
	const out = [];

	const [mode0, nextRng0] = uniformFloat32Pure(rng);
	const [mode1, nextRng1] = uniformFloat32Pure(nextRng0);
	rng = nextRng1;

	// A stripe width of 5 is supposedly extremely rare in Antiquities. Arbitrarily assigned a 1% chance to appear here.
	const max = mode1 < 0.01 ? 5 : 4;

	// Mode 1: uncommons first. Arbitrarily assigned a 50% chance to appear here.
	if (mode0 < 0.5) {
		const uGen = striped(arnSet, 1, rng, 2, max);
		for (let i = 0; i < 2; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(arnSet, 0, rng, 2, max);
		for (let i = 0; i < 6; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	// Mode 2: commons first.
	const cGen = striped(arnSet, 0, rng, 2, max);
	for (let i = 0; i < 6; i++) {
		const [common, nextRng] = cGen.next().value;
		out.push(common);
		rng = nextRng;
	}

	const uGen = striped(arnSet, 1, rng, 2, max);
	for (let i = 0; i < 2; i++) {
		const [uncommon] = uGen.next().value;
		out.push(uncommon);
	}

	return out;
}
