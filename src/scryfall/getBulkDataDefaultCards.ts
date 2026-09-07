import { array, type infer as infer_ } from "zod";

import card from "./card.js";
import getBulkData from "./getBulkData.js";

/**
 * Get an array containing every card object on Scryfall in English or the printed language if the card is only available in one language.
 * @returns The array of cards.
 * @see {@link https://scryfall.com/docs/api/bulk-data | Bulk Data Files}
 * @internal
 */
export default async function getBulkDataDefaultCards(): Promise<
	infer_<typeof card>[]
> {
	const response = await fetch(
		(await getBulkData("default_cards")).download_uri
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const result = array(card).safeParse(await response.json());
	if (!result.success) {
		throw result.error;
	}

	return result.data;
}
