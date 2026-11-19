import type { infer as infer_ } from "zod";

import type card from "../scryfall/card.js";
import type { CardIdentifier } from "../scryfall/CardIdentifier.js";
import type GetCardCollectionParams from "../scryfall/GetCardCollectionParams.js";
import type listOf from "../scryfall/listOf.js";

import getCardCollection from "../scryfall/getCardCollection.js";

/**
 * Get a list of cards from Scryfall of any size.
 * @param params - The card identifiers.
 * @returns A list of cards.
 * @see {@link https://scryfall.com/docs/api/cards/collection | GET `/cards/collection`}
 * @internal
 */
export default async function getCardCollectionBulk(
	params: GetCardCollectionParams
): Promise<infer_<ReturnType<typeof listOf<typeof card>>>> {
	const out: infer_<ReturnType<typeof listOf<typeof card>>> = { data: [] };

	const addIdentifiers = async (
		identifiers: readonly CardIdentifier[]
	): Promise<void> => {
		const result = await getCardCollection({ identifiers });

		out.data.push(...result.data);
		out.has_more = result.has_more;
		out.next_page = result.next_page;

		out.total_cards ??= 0;
		out.total_cards += result.total_cards ?? 0;

		if (result.warnings) {
			out.warnings ??= [];
			out.warnings.push(...result.warnings);
		}
	};

	let batch: CardIdentifier[] = [];
	for (const identifier of params.identifiers) {
		// Maximum batch size.
		if (batch.length >= 75) {
			// eslint-disable-next-line no-await-in-loop
			await addIdentifiers(batch);

			// Reset for the next batch.
			batch = [];
		}

		batch.push(identifier);
	}

	// Get the last batch.
	if (batch.length) {
		await addIdentifiers(batch);
	}

	return out;
}
