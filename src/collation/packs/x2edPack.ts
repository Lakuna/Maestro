import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformFloat32 } from "pure-rand/distribution/uniformFloat32";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import striped from "../algorithms/striped.js";
import x2edSet from "../sets/x2edSet.js";
import defaultSeed from "../utility/defaultSeed.js";

const uniformFloat32Pure = purify(uniformFloat32);

/**
 * Generate the collector numbers of the cards in an Unlimited Edition pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/2ed.html}
 * @public
 */
export default function x2edPack(seed?: number): readonly number[] {
	const actualSeed = seed ?? defaultSeed();
	let rng: RandomGenerator = xoroshiro128plus(actualSeed);
	const out = [];

	const [mode, nextRng0] = uniformFloat32Pure(rng);
	rng = nextRng0;

	// Mode 1: back-facing cards with rare-uncommon-common ordering. Arbitrarily assigned a one-in-ten chance to appear here.
	if (mode < 1 / 10) {
		const rGen = striped(x2edSet, 2, rng);
		const [rare, nextRng1] = rGen.next().value;
		out.push(rare);
		rng = nextRng1;

		const uGen = striped(x2edSet, 1, rng);
		for (let i = 0; i < 3; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen = striped(x2edSet, 0, rng);
		for (let i = 0; i < 11; i++) {
			const [common] = cGen.next().value;
			out.push(common);
		}

		return out;
	}

	// Mode 2: front-facing cards with uncommon-rare-common ordering.
	const uGen = striped(x2edSet, 1, rng);
	for (let i = 0; i < 3; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const rGen = striped(x2edSet, 2, rng);
	const [rare, nextRng1] = rGen.next().value;
	out.push(rare);
	rng = nextRng1;

	const cGen = striped(x2edSet, 0, rng);
	for (let i = 0; i < 11; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
