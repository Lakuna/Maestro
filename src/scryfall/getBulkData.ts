import type { infer as zinfer } from "zod";

import bulkData from "./bulkData.js";
import userAgent from "./userAgent.js";

/**
 * Get the Scryfall bulk data object with the given type.
 * @param type - The type of the Scryfall bulk data object.
 * @returns The Scryfall bulk data object.
 * @see {@link https://scryfall.com/docs/api/bulk-data/type | GET `/bulk-data/:type`}
 * @internal
 */
export default async function getBulkData(
	type: string
): Promise<zinfer<typeof bulkData>> {
	const response = await fetch(
		`https://api.scryfall.com/bulk-data/${type}`,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		{ headers: { Accept: "application/json", "User-Agent": userAgent } }
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const result = bulkData.safeParse(await response.json());
	if (!result.success) {
		throw result.error;
	}

	return result.data;
}
