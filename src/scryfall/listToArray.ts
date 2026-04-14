import type { infer as zinfer } from "zod";
import type { SomeType } from "zod/v4/core";

import listOf from "./listOf.js";
import userAgent from "./userAgent.js";

/**
 * Create an array from the values in a Scryfall API list.
 * @param list - The list.
 * @param type - The Zod type of the list items.
 * @returns The array.
 * @see {@link https://scryfall.com/docs/api/lists | List Objects}
 * @internal
 */
export default async function listToArray<T extends SomeType>(
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	list: zinfer<ReturnType<typeof listOf<T>>>,
	type: T
): Promise<zinfer<T>[]> {
	let nextList = list;
	let out: zinfer<T>[] = [];
	while (nextList.data.length) {
		out = out.concat(nextList.data);

		if (!nextList.has_more || !nextList.next_page) {
			break;
		}

		// eslint-disable-next-line no-await-in-loop
		const response = await fetch(
			nextList.next_page,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			{ headers: { Accept: "application/json", "User-Agent": userAgent } }
		);
		if (!response.ok) {
			// eslint-disable-next-line no-await-in-loop
			throw new Error(await response.text());
		}

		// eslint-disable-next-line no-await-in-loop
		const result = listOf(type).safeParse(await response.json());
		if (!result.success) {
			throw result.error;
		}

		nextList = result.data;
	}

	return out;
}
