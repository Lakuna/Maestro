import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import getMode from "./collation/utility/getMode.js";

/* eslint-disable no-console */
const odds = [];
for (let i = 2; i < process.argv.length; i++) {
	const arg = process.argv[i];
	if (!arg) {
		console.warn("Rejected odd (undefined).");
		continue;
	}

	const odd = parseFloat(arg);
	if (isNaN(odd)) {
		console.warn(`Rejected odd ${arg} (not a number).`);
		continue;
	}

	if (odd <= 0 || odd >= 1) {
		console.warn(`Rejected odd ${arg} (too small or too large).`);
		continue;
	}

	odds.push(odd);
}

let i = -1;
const seeds = new Map();
while (seeds.size < 2 ** odds.length) {
	let rng: RandomGenerator = xoroshiro128plus(++i);
	const modes = [];
	for (const odd of odds) {
		const [mode, nextRng] = getMode(odd, rng);
		modes.push(mode);
		rng = nextRng;
	}

	const modeBitfield = modes.reduce(
		(bitfield, mode) => (bitfield << 1) | Number(mode),
		0
	);
	if (seeds.has(modeBitfield)) {
		continue;
	}

	seeds.set(modeBitfield, i);
}

console.info(seeds);
