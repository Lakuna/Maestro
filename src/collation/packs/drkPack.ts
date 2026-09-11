import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import striped from "../algorithms/striped.js";
import drkSet from "../sets/drkSet.js";
import defaultSeed from "../utility/defaultSeed.js";
import getMode from "../utility/getMode.js";

const uniformIntPure = purify(uniformInt);

const COMMONS = 6;
const UNCOMMONS = 2;

/**
 * Generate the collector numbers of the cards in a The Dark pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The collector numbers of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/drk.html}
 * @public
 */
export default function drkPack(seed?: number): readonly string[] {
	let rng: RandomGenerator = xoroshiro128plus(seed ?? defaultSeed());
	const out = [];

	// Whether or not the box that the pack is from uses separate halves of the common sheet. Arbitrarily assigned a 50% chance to appear here.
	const [splitCommonsBox, nextRng0] = getMode(0.5, rng);

	// Whether or not the box that the pack is from uses separate halves of the uncommon sheet. Arbitrarily assigned a 50% chance to appear here.
	const [splitUncommonsBox, nextRng1] = getMode(0.5, nextRng0);

	// Whether this pack uses the top versus bottom half of the common sheet (no effect for packs from non-split boxes). Arbitrarily assigned a 50% chance to appear here.
	const [topCommons, nextRng2] = getMode(0.5, nextRng1);
	const cTop =
		splitCommonsBox ?
			topCommons ? 0
			:	5
		:	0;
	const cHeight =
		splitCommonsBox ?
			topCommons ? 5
			:	6
		:	drkSet.height;

	// Whether this pack uses the top versus bottom half of the uncommon sheet (no effect for packs from non-split boxes). Arbitrarily assigned a 50% chance to appear here.
	const [topUncommons, nextRng3] = getMode(0.5, nextRng2);
	const uTop =
		splitUncommonsBox ?
			topUncommons ? 0
			:	5
		:	0;
	const uHeight =
		splitUncommonsBox ?
			topUncommons ? 5
			:	6
		:	drkSet.height;

	// A stripe width of 7 can very rarely appear in non-split boxes (no effect for packs from split boxes). Arbitrarily assigned a 1% chance to appear here.
	const [wideCommons, nextRng4] = getMode(0.01, nextRng3);
	const cMax =
		splitCommonsBox ? 4
		: wideCommons ? 7
		: 5;

	// A stripe width of 7 can very rarely appear in non-split boxes (no effect for packs from split boxes). Arbitrarily assigned a 1% chance to appear here.
	const [wideUncommons, nextRng5] = getMode(0.01, nextRng4);
	const uMax =
		splitUncommonsBox ? 4
		: wideUncommons ? 7
		: 5;

	// Whether or not there is a switch from one sequence to the next midway through the commons (no effect for packs from non-split boxes). Arbitrarily assigned a 5% chance to appear here.
	const [splitCommons0, nextRng6] = getMode(0.05, nextRng5);
	const splitCommons = splitCommons0 && splitCommonsBox;

	// If the commons are split, this is the index at which the split occurs.
	const [commonSplitIndex, nextRng7] = uniformIntPure(nextRng6, 0, COMMONS);
	rng = nextRng7;

	if (splitCommons) {
		const uGen = striped(drkSet, 1, rng, 2, uMax, uTop, uHeight);
		for (let i = 0; i < UNCOMMONS; i++) {
			const [uncommon, nextRng] = uGen.next().value;
			out.push(uncommon);
			rng = nextRng;
		}

		const cGen0 = striped(drkSet, 0, rng, 2, cMax, cTop, cHeight);
		let i = 0;
		for (; i < commonSplitIndex; i++) {
			const [common, nextRng] = cGen0.next().value;
			out.push(common);
			rng = nextRng;
		}

		const cGen1 = striped(drkSet, 0, rng, 2, cMax, cTop, cHeight);
		for (; i < COMMONS; i++) {
			const [common] = cGen1.next().value;
			out.push(common);
		}

		return out;
	}

	const uGen = striped(drkSet, 1, rng, 2, uMax, uTop, uHeight);
	for (let i = 0; i < UNCOMMONS; i++) {
		const [uncommon, nextRng] = uGen.next().value;
		out.push(uncommon);
		rng = nextRng;
	}

	const cGen = striped(drkSet, 0, rng, 2, cMax, cTop, cHeight);
	for (let i = 0; i < COMMONS; i++) {
		const [common] = cGen.next().value;
		out.push(common);
	}

	return out;
}
