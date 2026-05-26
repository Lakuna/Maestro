import { array, enum as enum_, object, optional, string } from "zod";

import ComponentType from "../../components/ComponentType.js";
import resolvedData from "./resolvedData.js";

/**
 * Discord message component data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @internal
 */
const messageComponentData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	component_type: enum_(ComponentType),
	custom_id: string(),
	resolved: optional(resolvedData),
	values: optional(array(string()))
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default messageComponentData;
