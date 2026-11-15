import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import striped from "../algorithms/striped.js";
import drkSet from "../sets/drkSet.js";
import getMode from "../utility/getMode.js";

const COMMONS = 6;
const UNCOMMONS = 2;

/**
 * Generate the collector numbers of the cards in a The Dark pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/drk.html}
 * @public
 */
export default function drkPack(
	seed?: number
): readonly [string, string, boolean][] {
	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	// Whether or not the box that the pack is from uses separate halves of the common sheet. Arbitrarily assigned a 1 in 2 chance to appear here.
	const splitCommonsBox = getMode(1 / 2, rng);

	// Whether or not the box that the pack is from uses separate halves of the uncommon sheet. Arbitrarily assigned a 1 in 2 chance to appear here.
	const splitUncommonsBox = getMode(1 / 2, rng);

	// Whether this pack uses the top versus bottom half of the common sheet (no effect for packs from non-split boxes). Arbitrarily assigned a 1 in 2 chance to appear here.
	const topCommons = getMode(1 / 2, rng);
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

	// Whether this pack uses the top versus bottom half of the uncommon sheet (no effect for packs from non-split boxes). Arbitrarily assigned a 1 in 2 chance to appear here.
	const topUncommons = getMode(1 / 2, rng);
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

	// A stripe width of 7 can very rarely appear in non-split boxes (no effect for packs from split boxes). Arbitrarily assigned a 1 in 100 chance to appear here.
	const wideCommons = getMode(1 / 100, rng);
	const cMax =
		splitCommonsBox ? 4
		: wideCommons ? 7
		: 5;

	// A stripe width of 7 can very rarely appear in non-split boxes (no effect for packs from split boxes). Arbitrarily assigned a 1 in 100 chance to appear here.
	const wideUncommons = getMode(1 / 100, rng);
	const uMax =
		splitUncommonsBox ? 4
		: wideUncommons ? 7
		: 5;

	// Whether or not there is a switch from one sequence to the next midway through the commons (no effect for packs from non-split boxes). Arbitrarily assigned a 1 in 20 chance to appear here.
	const splitCommons0 = getMode(1 / 20, rng);
	const splitCommons = splitCommons0 && splitCommonsBox;

	// If the commons are split, this is the index at which the split occurs.
	const commonSplitIndex = uniformInt(rng, 0, COMMONS);

	if (splitCommons) {
		const uGen = striped(drkSet, 1, rng, 2, uMax, uTop, uHeight);
		for (let i = 0; i < UNCOMMONS; i++) {
			out.push([drkSet.code, uGen.next().value, false]);
		}

		const cGen0 = striped(drkSet, 0, rng, 2, cMax, cTop, cHeight);
		let i = 0;
		for (; i < commonSplitIndex; i++) {
			out.push([drkSet.code, cGen0.next().value, false]);
		}

		const cGen1 = striped(drkSet, 0, rng, 2, cMax, cTop, cHeight);
		for (; i < COMMONS; i++) {
			out.push([drkSet.code, cGen1.next().value, false]);
		}

		return out;
	}

	const uGen = striped(drkSet, 1, rng, 2, uMax, uTop, uHeight);
	for (let i = 0; i < UNCOMMONS; i++) {
		out.push([drkSet.code, uGen.next().value, false]);
	}

	const cGen = striped(drkSet, 0, rng, 2, cMax, cTop, cHeight);
	for (let i = 0; i < COMMONS; i++) {
		out.push([drkSet.code, cGen.next().value, false]);
	}

	return out;
}
