import { int, literal, nullable, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord radio group interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#radio-group-interaction-response-structure}
 * @internal
 */
const radioGroupInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: int(),
	type: optional(literal(ComponentType.RADIO_GROUP)),
	value: nullable(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default radioGroupInteractionResponse;
