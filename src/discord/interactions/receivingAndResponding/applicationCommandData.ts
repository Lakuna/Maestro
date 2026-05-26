import { array, enum as enum_, object, optional, string } from "zod";

import snowflake from "../../snowflake.js";
import ApplicationCommandType from "../applicationCommands/ApplicationCommandType.js";
import applicationCommandInteractionDataOption from "./applicationCommandInteractionDataOption.js";
import resolvedData from "./resolvedData.js";

/**
 * Discord application command data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-application-command-data-structure}
 * @internal
 */
const applicationCommandData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	guild_id: optional(snowflake),
	id: snowflake,
	name: string(),
	options: optional(array(applicationCommandInteractionDataOption.partial())),
	resolved: optional(resolvedData),
	target_id: optional(snowflake),
	type: enum_(ApplicationCommandType)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default applicationCommandData;
