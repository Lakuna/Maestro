import { boolean, int, object, record, string } from "zod";

import card from "./card.js";

/**
 * A Moxfield board. Type information is inferred based on examples.
 * @internal
 */
const board = object({
	cards: record(
		string(),
		object({
			boardType: string(),
			card,
			excludedFromColor: boolean(),
			finish: string(),
			isAlter: boolean(),
			isFoil: boolean(),
			isProxy: boolean(),
			quantity: int(),
			useCmcOverride: boolean(),
			useColorIdentityOverride: boolean(),
			useManaCostOverride: boolean()
		})
	),
	count: int()
});

export default board;
