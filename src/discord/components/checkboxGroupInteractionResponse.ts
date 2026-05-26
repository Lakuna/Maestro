import { array, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord checkbox group interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#checkbox-group-interaction-response-structure}
 * @internal
 */
const checkboxGroupInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: int(),
	type: optional(literal(ComponentType.CHECKBOX_GROUP)),
	values: array(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default checkboxGroupInteractionResponse;
