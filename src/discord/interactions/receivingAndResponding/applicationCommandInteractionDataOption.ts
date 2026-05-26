import {
	array,
	boolean,
	enum as enum_,
	int,
	number,
	object,
	optional,
	string,
	union
} from "zod";

import ApplicationCommandOptionType from "../applicationCommands/ApplicationCommandOptionType.js";

/**
 * Discord application command interaction data option.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure}
 * @internal
 */
const applicationCommandInteractionDataOption = object({
	focused: optional(boolean()),
	name: string(),
	get options() {
		return optional(array(applicationCommandInteractionDataOption));
	},
	type: enum_(ApplicationCommandOptionType),
	value: optional(union([string(), int(), number(), boolean()]))
});

export default applicationCommandInteractionDataOption;
