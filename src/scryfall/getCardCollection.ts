import type { infer as infer_ } from "zod";

import type GetCardCollectionParams from "./GetCardCollectionParams.js";

import userAgent from "../utility/userAgent.js";
import card from "./card.js";
import listOf from "./listOf.js";

/**
 * Get a list of cards from Scryfall.
 * @param params - The card identifiers.
 * @returns A list of cards.
 * @see {@link https://scryfall.com/docs/api/cards/collection | GET `/cards/collection`}
 * @internal
 */
export default async function getCardSearch(
	params: GetCardCollectionParams
): Promise<infer_<ReturnType<typeof listOf<typeof card>>>> {
	const url = new URL("https://api.scryfall.com/cards/collection");

	const response = await fetch(url, {
		body: JSON.stringify(params),
		headers: {
			/* eslint-disable @typescript-eslint/naming-convention */
			Accept: "application/json",
			"User-Agent": userAgent
			/* eslint-enable @typescript-eslint/naming-convention */
		},
		method: "POST"
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = listOf(card).safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
