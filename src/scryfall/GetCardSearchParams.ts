/**
 * Parameters for getting cards.
 * @see {@link https://scryfall.com/docs/api/cards/search | GET `/cards/search`}
 * @internal
 */
export default interface GetCardSearchParams {
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
