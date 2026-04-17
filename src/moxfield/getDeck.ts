import type { infer as zinfer } from "zod";

import userAgent from "../scryfall/userAgent.js";
import deck from "./deck.js";

/**
 * Get a deck from Moxfield.
 * @param id - The ID of the deck.
 * @returns The deck.
 * @internal
 */
export default async function getDeck(
	id: string
): Promise<zinfer<typeof deck>> {
	const response = await fetch(
		`https://api2.moxfield.com/v3/decks/all/${id}`,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		{ headers: { "User-Agent": userAgent } }
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = deck.safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
