import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "./DeepReadonly.js";
import type simpleCards from "./simpleCards.js";

import stringifyCard from "./stringifyCard.js";

/**
 * Convert a simple set of cards to a line in a deck list.
 * @param cards - The set of cards.
 * @returns A line in a deck list.
 * @internal
 */
export default function stringifyCards(
	cards: DeepReadonly<infer_<typeof simpleCards>>
): string {
	return `${cards.count.toString()} ${stringifyCard(cards.card)}`;
}
