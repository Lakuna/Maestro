import { enum as enum_, object, optional } from "zod";

import interactionCallbackData from "./interactionCallbackData.js";
import InteractionCallbackType from "./InteractionCallbackType.js";

/**
 * Discord interaction response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
const interactionResponse = object({
	data: optional(interactionCallbackData),
	type: enum_(InteractionCallbackType)
});

export default interactionResponse;
