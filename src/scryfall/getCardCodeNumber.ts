import type { infer as infer_ } from "zod";

import userAgent from "../utility/userAgent.js";
import card from "./card.js";

/**
 * Get a card from Scryfall using its set code and collector number.
 * @param code - The set code.
 * @param number - The collector number.
 * @param lang - The language code.
 * @returns A card.
 * @see {@link https://scryfall.com/docs/api/cards/collector | GET `/cards/:code/:number(/:lang)`}
 */
export default async function getCardCodeNumber(
	code: string,
	number: number,
	lang?: string
): Promise<infer_<typeof card>> {
	const url = new URL(
		`https://api.scryfall.com/cards/${code}/${String(number)}${lang ? `/${lang}` : ""}`
	);

	const response = await fetch(url, {
		headers: {
			/* eslint-disable @typescript-eslint/naming-convention */
			Accept: "application/json",
			"User-Agent": userAgent
			/* eslint-enable @typescript-eslint/naming-convention */
		}
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = card.safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
