import type { infer as infer_ } from "zod";

import type simpleCards from "./simpleCards.js";

import setMap from "../collation/setMap.js";

/**
 * Make a pool of cards from a list of booster packs (set code and seeds).
 * @param setCode - The set code of the booster packs.
 * @param seeds - The seeds of the packs. May be a string of comma- and/or whitespace-separated numbers.
 * @returns The pool of cards.
 * @internal
 */
export default function poolFromPacks(
	setCode: string,
	seeds: readonly number[]
): infer_<typeof simpleCards>[] {
	// Get the collation details for the specified set.
	const setResult = Array.from(setMap.entries()).find(
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		([{ code }]) => code === setCode
	);
	if (!setResult) {
		throw new Error(
			`Invalid set code. The valid set codes are: ${Array.from(setMap.keys())
				.map(({ code }) => `\`${code}\``)
				.join(", ")}.`
		);
	}

	const [, packFn] = setResult;
	const pool: infer_<typeof simpleCards>[] = [];
	for (const seed of seeds) {
		for (const [sc, cn, foil] of packFn(seed)) {
			// Skip marketing cards.
			if (cn === "NaN") {
				continue;
			}

			const entry = pool.find(
				// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
				({ card }) =>
					card.collectorNumber === cn && card.foil === foil && card.set === sc
			);
			if (entry) {
				entry.count++;
				continue;
			}

			pool.push({ card: { collectorNumber: cn, foil, set: sc }, count: 1 });
		}
	}

	return pool;
}
