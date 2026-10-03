import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "./DeepReadonly.js";
import type simpleCard from "./simpleCard.js";

/**
 * Convert a simple card to a line in a deck list without a quantity.
 * @param card - The card.
 * @returns A line in a deck list without a quantity.
 * @internal
 */
export default function stringifyCard(
	card: DeepReadonly<infer_<typeof simpleCard>>
): string {
	return `${card.name ?? "`undefined`"}${card.set ? ` (${card.set.toUpperCase()})${card.collectorNumber ? ` ${card.collectorNumber}${card.foil ? " *F*" : ""}` : ""}` : ""}`;
}
