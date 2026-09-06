import type { CardIdentifier } from "./CardIdentifier.js";

/**
 * Parameters for getting cards.
 * @see {@link https://scryfall.com/docs/api/cards/collection | GET `/cards/collection`}
 * @internal
 */
export default interface GetCardCollectionParams {
	readonly identifiers: readonly CardIdentifier[];
}
