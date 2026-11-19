import { array, object, optional, record, string } from "zod";

import simpleCards from "./simpleCards.js";

/**
 * A simplified representation of a Magic deck.
 * @internal
 */
const simpleDeck = object({
	boards: record(string(), optional(array(simpleCards))),
	name: optional(string()),
	url: optional(string())
});

export default simpleDeck;
