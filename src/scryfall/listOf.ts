import type { SomeType } from "zod/v4/core";

import {
	array,
	boolean,
	enum as enum_,
	int,
	nullish,
	object,
	string,
	url,
	type ZodArray,
	type ZodBoolean,
	type ZodEnum,
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
	object: ZodEnum<{ list: "list" }>;
	total_cards: ZodOptional<ZodNullable<ZodInt>>;
	warnings: ZodArray<ZodString>;
	/* eslint-enable @typescript-eslint/naming-convention */
}> {
	return object({
		/* eslint-disable @typescript-eslint/naming-convention */
		data: array(element),
		has_more: boolean(),
		next_page: nullish(url()),
		object: enum_(["list"]),
		total_cards: nullish(int()),
		warnings: array(string())
		/* eslint-enable @typescript-eslint/naming-convention */
	});
}
