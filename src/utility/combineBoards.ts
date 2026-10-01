import type { infer as infer_ } from "zod";

import { isDeepStrictEqual } from "node:util";

import type { DeepReadonly } from "./DeepReadonly.js";
import type simpleCards from "./simpleCards.js";

/**
 * Combine multiple boards from a deck into one.
 * @param boards - The boards to combine.
 * @returns The combined board.
 * @internal
 */
export default function combineBoards(
	...boards: readonly (readonly DeepReadonly<infer_<typeof simpleCards>>[])[]
): infer_<typeof simpleCards>[] {
	const out: infer_<typeof simpleCards>[] = [];
	for (const board of boards) {
		for (const cards of board) {
			// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
			const existingEntry = out.find((cards2) =>
				isDeepStrictEqual(cards, cards2)
			);
			if (existingEntry) {
				existingEntry.count += cards.count;
				continue;
			}

			out.push(structuredClone(cards));
		}
	}

	return out;
}
