import {
	array,
	boolean,
	enum as enum_,
	nullable,
	nullish,
	object,
	optional,
	partialRecord,
	string
} from "zod";

import Locale from "../../Locale.js";
import ApplicationIntegrationType from "../../resources/application/ApplicationIntegrationType.js";
import snowflake from "../../snowflake.js";
import InteractionContextType from "../receivingAndResponding/InteractionContextType.js";
import applicationCommandOption from "./applicationCommandOption.js";
import ApplicationCommandType from "./ApplicationCommandType.js";
import EntryPointCommandHandlerType from "./EntryPointCommandHandlerType.js";

/**
 * Discord application command.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#application-command-object}
 * @internal
 */
const applicationCommand = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	application_id: snowflake,
	contexts: nullish(array(enum_(InteractionContextType))),
	default_member_permissions: nullable(string()),
	default_permission: nullish(boolean()),
	description: string(),
	description_localizations: nullish(partialRecord(enum_(Locale), string())),
	dm_permission: optional(boolean()),
	guild_id: optional(snowflake),
	handler: optional(enum_(EntryPointCommandHandlerType)),
	id: snowflake,
	integration_types: optional(array(enum_(ApplicationIntegrationType))),
	name: string(),
	name_localizations: nullish(partialRecord(enum_(Locale), string())),
	nsfw: optional(boolean()),
	options: optional(array(applicationCommandOption)),
	type: optional(enum_(ApplicationCommandType)),
	version: snowflake
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default applicationCommand;
