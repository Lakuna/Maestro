import { boolean, object, optional, string } from "zod";

/**
 * A simplified representation of a Magic card.
 * @internal
 */
const simpleCard = object({
	collectorNumber: optional(string()),
	foil: optional(boolean()),
	name: optional(string()),
	set: optional(string()),
	typeLine: optional(string())
});

export default simpleCard;
