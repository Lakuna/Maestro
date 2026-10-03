import type { infer as infer_ } from "zod";

import type { CardIdentifier } from "../scryfall/CardIdentifier.js";
import type simpleDeck from "./simpleDeck.js";

import getCardCollection from "../scryfall/getCardCollection.js";

/**
 * Fills out information in the given `simpleDeck` where possible.
 * @param deck - The deck to fill out.
 * @returns The filled out deck.
 * @internal
 */
export default async function informDeck<T extends infer_<typeof simpleDeck>>(
	deck: T
): Promise<T> {
	// Make a deep copy of `deck` so that it is not modified in-place.
	const out = structuredClone(deck);

	// Basic deck information.
	out.name ??= "Unnamed Deck";

	// Information-gathering loop.
	const identifiers: CardIdentifier[] = [];
	for (const board of Object.values(out.boards)) {
		if (!board) {
			continue;
		}

		// Determine a unique identifier for each card.
		for (const { card } of board) {
			if (card.set) {
				if (card.collectorNumber) {
					identifiers.push({
						// eslint-disable-next-line @typescript-eslint/naming-convention
						collector_number: card.collectorNumber,
						set: card.set
					});
					continue;
				}

				if (card.name) {
					identifiers.push({ name: card.name, set: card.set });
					continue;
				}
			}

			if (card.name) {
				identifiers.push({ name: card.name });
			}
		}
	}

	// Fetch full card data from Scryfall.
	const collection = await getCardCollection({ identifiers });

	// Information-filling loop.
	for (const boardName of ["mainboard", "sideboard"]) {
		out.boards[boardName] ??= [];
		const board = out.boards[boardName];
		for (const { card } of board) {
			// Get matching data.
			const data = collection.data.find(
				// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
				(value) =>
					(!card.collectorNumber ||
						card.collectorNumber === value.collector_number) &&
					(!card.name || card.name === value.name) &&
					(!card.set || card.set === value.set)
			);
			if (!data) {
				continue;
			}

			// Add data where missing.
			card.collectorNumber ??= data.collector_number;
			card.foil ??= false;
			card.name ??= data.name;
			card.set ??= data.set;
			card.typeLine ??= data.type_line ?? void 0;
		}
	}

	return out;
}
