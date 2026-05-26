import { array, int, literal, object, optional, string } from "zod";

import resolvedData from "../interactions/receivingAndResponding/resolvedData.js";
import snowflake from "../snowflake.js";
import ComponentType from "./ComponentType.js";

/**
 * Discord channel select interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#channel-select-channel-select-interaction-response-structure}
 * @internal
 */
const channelSelectInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	component_type: optional(literal(ComponentType.CHANNEL_SELECT)),
	custom_id: string(),
	id: int(),
	resolved: resolvedData,
	type: optional(literal(ComponentType.CHANNEL_SELECT)),
	values: array(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default channelSelectInteractionResponse;
