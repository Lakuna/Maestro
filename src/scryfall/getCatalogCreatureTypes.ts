import type { infer as infer_ } from "zod";

import userAgent from "../utility/userAgent.js";
import catalog from "./catalog.js";

/**
 * Get a catalog of creature types from Scryfall.
 * @returns A catalog of creature types.
 * @see {@link https://scryfall.com/docs/api/catalogs/creature-types}
 * @internal
 */
export default async function getCatalogCreatureTypes(): Promise<
	infer_<typeof catalog>
> {
	const url = new URL("https://api.scryfall.com/catalog/creature-types");

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

	const out = catalog.safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
