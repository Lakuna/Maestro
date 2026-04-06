import { array, type infer as zinfer } from "zod";

import card from "./card.js";
import getBulkData from "./getBulkData.js";

/**
 * An array of Magic: the Gathering cards as returned by the Scryfall API.
 * @see {@link https://scryfall.com/docs/api/cards | Card Objects}
 * @internal
 */
const cardArray = array(card);

/**
 * Get an array containing every card object on Scryfall in English or the printed language if the card is only available in one language.
 * @returns The array of cards.
 * @see {@link https://scryfall.com/docs/api/bulk-data | Bulk Data Files}
 * @internal
 */
export default async function getBulkDataDefaultCards(): Promise<
	undefined | zinfer<typeof cardArray>
> {
	const bulkData = await getBulkData("default_cards");
	if (!bulkData) {
		return void 0;
	}

	const response = await fetch(bulkData.download_uri);
	if (!response.ok) {
		return void 0;
	}

	try {
		return cardArray.safeParse(await response.json()).data;
	} catch {
		return void 0;
	}
}
