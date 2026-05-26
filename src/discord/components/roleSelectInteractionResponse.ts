import { array, int, literal, object, optional, string } from "zod";

import resolvedData from "../interactions/receivingAndResponding/resolvedData.js";
import snowflake from "../snowflake.js";
import ComponentType from "./ComponentType.js";

/**
 * Discord role select interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#role-select-role-select-interaction-response-structure}
 * @internal
 */
const roleSelectInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	component_type: optional(literal(ComponentType.ROLE_SELECT)),
	custom_id: string(),
	id: int(),
	resolved: resolvedData,
	type: optional(literal(ComponentType.ROLE_SELECT)),
	values: array(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default roleSelectInteractionResponse;
