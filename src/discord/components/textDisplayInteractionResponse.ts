import { int, literal, object, optional } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord text display interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#text-display-text-display-interaction-response-structure}
 * @internal
 */
const textDisplayInteractionResponse = object({
	id: int(),
	type: optional(literal(ComponentType.TEXT_DISPLAY))
});

export default textDisplayInteractionResponse;
