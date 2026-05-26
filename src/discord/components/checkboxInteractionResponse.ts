import { boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord checkbox interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#checkbox-interaction-response-structure}
 * @internal
 */
const checkboxInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: int(),
	type: optional(literal(ComponentType.CHECKBOX)),
	value: boolean()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default checkboxInteractionResponse;
