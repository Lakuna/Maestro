import type { infer as infer_ } from "zod";

import type deck from "../moxfield/deck.js";
import type { DeepReadonly } from "./DeepReadonly.js";
import type simpleDeck from "./simpleDeck.js";

/**
 * Simplify a Moxfield representation of a Magic deck.
 * @internal
 */
export default function simplifyDeck(
	inn: DeepReadonly<infer_<typeof deck>>
): infer_<typeof simpleDeck> {
	const out: infer_<typeof simpleDeck> = {
		boards: {},
		name: inn.name,
		url: inn.publicUrl
	};
	for (const board of [inn.boards.mainboard, inn.boards.sideboard]) {
		for (const cards of Object.values(board.cards)) {
			(out.boards[cards.boardType] ??= []).push({
				card: {
					collectorNumber: cards.card.cn,
					name: cards.card.name,
					set: cards.card.set
				},
				count: cards.quantity
			});
		}
	}

	return out;
}
