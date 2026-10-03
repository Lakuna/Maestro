import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "./DeepReadonly.js";
import type simpleDeck from "./simpleDeck.js";

import stringifyCards from "./stringifyCards.js";

/**
 * Convert a simple deck to a deck list (Moxfield format).
 * @param deck - The deck.
 * @returns A line in a deck list.
 * @internal
 */
export default function stringifyDeck(
	deck: DeepReadonly<infer_<typeof simpleDeck>>
): string {
	const { mainboard, sideboard } = deck.boards;
	return `${mainboard?.map((cards) => stringifyCards(cards)).join("\n") ?? ""}${sideboard?.length ? `\n\nSIDEBOARD:\n${sideboard.map((cards) => stringifyCards(cards)).join("\n")}` : ""}`.trim();
}
