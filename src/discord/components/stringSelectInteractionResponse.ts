import { array, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord string select interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#string-select-string-select-interaction-response-structure}
 * @internal
 */
const stringSelectInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	component_type: optional(literal(ComponentType.STRING_SELECT)),
	custom_id: string(),
	id: int(),
	type: optional(literal(ComponentType.STRING_SELECT)),
	values: array(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default stringSelectInteractionResponse;
