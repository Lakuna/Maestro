import type { SomeType } from "zod/v4/core";

import {
	array,
	boolean,
	int,
	nullish,
	object,
	string,
	url,
	type ZodArray,
	type ZodBoolean,
	type ZodInt,
	type ZodNullable,
	type ZodObject,
	type ZodOptional,
	type ZodString,
	type ZodURL
} from "zod";

/**
 * A list of objects as returned by the Scryfall API.
 * @see {@link https://scryfall.com/docs/api/lists | List Objects}
 * @internal
 */
export default function listOf<T extends SomeType>(
	element: T
): ZodObject<{
	/* eslint-disable @typescript-eslint/naming-convention */
	data: ZodArray<T>;
	has_more: ZodBoolean;
	next_page: ZodOptional<ZodNullable<ZodURL>>;
	total_cards: ZodOptional<ZodNullable<ZodInt>>;
	warnings: ZodOptional<ZodNullable<ZodArray<ZodString>>>;
	/* eslint-enable @typescript-eslint/naming-convention */
}> {
	return object({
		/* eslint-disable @typescript-eslint/naming-convention */
		data: array(element),
		has_more: boolean(),
		next_page: nullish(url()),
		total_cards: nullish(int()),
		warnings: nullish(array(string()))
		/* eslint-enable @typescript-eslint/naming-convention */
	});
}
