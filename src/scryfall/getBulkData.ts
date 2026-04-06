import type { infer as zinfer } from "zod";

import bulkData from "./bulkData.js";

/**
 * Get the Scryfall bulk data object with the given type.
 * @param type - The type of the Scryfall bulk data object.
 * @returns The Scryfall bulk data object.
 * @see {@link https://scryfall.com/docs/api/bulk-data/type | GET `/bulk-data/:type`}
 * @internal
 */
export default async function getBulkData(
	type: string
): Promise<undefined | zinfer<typeof bulkData>> {
	const response = await fetch(
		`https://api.scryfall.com/bulk-data/${type}`,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		{ headers: { Accept: "application/json", "User-Agent": "Maestro/0.1.0" } }
	);
	if (!response.ok) {
		return void 0;
	}

	try {
		return bulkData.safeParse(await response.json()).data;
	} catch {
		return void 0;
	}
}
