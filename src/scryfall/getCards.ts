import type { infer as zinfer } from "zod";

import card from "./card.js";
import listOf from "./listOf.js";
import userAgent from "./userAgent.js";

/**
 * Parameters for getting cards.
 * @see {@link https://scryfall.com/docs/api/cards/search | GET `/cards/search`}
 * @internal
 */
export interface GetCardsParameters {
	/* eslint-disable @typescript-eslint/naming-convention */
	/** The direction to sort cards. */
	readonly dir?: "asc" | "auto" | "desc";

	/** Whether to include extra cards (tokens, planes, et cetera). */
	readonly include_extras?: boolean;

	/** Whether to include cards in every language supported by Scryfall. */
	readonly include_multilingual?: boolean;

	/** Whether to include rare card variants. */
	readonly include_variations?: boolean;

	/** The method to sort returned cards. */
	readonly order?:
		| "artist"
		| "cmc"
		| "color"
		| "edhrec"
		| "eur"
		| "name"
		| "penny"
		| "power"
		| "rarity"
		| "released"
		| "review"
		| "set"
		| "tix"
		| "toughness"
		| "usd";

	/** The page number to return. */
	readonly page?: number;

	/**
	 * The search query.
	 * @see {@link https://scryfall.com/docs/syntax | Scryfall Search Reference}
	 */
	readonly q: string;

	/** The strategy for omitting similar cards. */
	readonly unique?: "art" | "cards" | "prints";
	/* eslint-enable @typescript-eslint/naming-convention */
}

/**
 * Get a list of cards from Scryfall.
 * @param params - The search query.
 * @returns A list of cards.
 * @see {@link https://scryfall.com/docs/api/cards/search | GET `/cards/search`}
 * @see {@link https://scryfall.com/docs/syntax | Scryfall Search Reference}
 * @internal
 */
export default async function getCards(
	params: GetCardsParameters
): Promise<zinfer<ReturnType<typeof listOf<typeof card>>>> {
	const url = new URL("https://api.scryfall.com/cards/search");
	url.searchParams.set("q", params.q);
	if (params.unique) {
		url.searchParams.set("unique", params.unique);
	}
	if (params.order) {
		url.searchParams.set("order", params.order);
	}
	if (params.dir) {
		url.searchParams.set("dir", params.dir);
	}
	if (params.include_extras) {
		url.searchParams.set("include_extras", String(params.include_extras));
	}
	if (params.include_multilingual) {
		url.searchParams.set(
			"include_multilingual",
			String(params.include_multilingual)
		);
	}
	if (params.include_variations) {
		url.searchParams.set(
			"include_variations",
			String(params.include_variations)
		);
	}
	if (params.page) {
		url.searchParams.set("page", String(params.page));
	}

	const response = await fetch(
		url,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		{ headers: { Accept: "application/json", "User-Agent": userAgent } }
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = listOf(card).safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
