import { int, literal, object, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord text input interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#text-input-text-input-interaction-response-structure}
 * @internal
 */
const textInputInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: int(),
	type: literal(ComponentType.TEXT_INPUT),
	value: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default textInputInteractionResponse;
