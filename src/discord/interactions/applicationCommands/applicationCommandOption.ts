import {
	array,
	boolean,
	enum as enum_,
	int,
	nullish,
	number,
	object,
	optional,
	partialRecord,
	string,
	union
} from "zod";

import Locale from "../../Locale.js";
import ChannelType from "../../resources/channel/ChannelType.js";
import applicationCommandOptionChoice from "./applicationCommandOptionChoice.js";
import ApplicationCommandOptionType from "./ApplicationCommandOptionType.js";

/**
 * Discord application command option.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-option-structure}
 * @internal
 */
const applicationCommandOption = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	autocomplete: optional(boolean()),
	channel_types: optional(array(enum_(ChannelType))),
	choices: optional(array(applicationCommandOptionChoice)),
	description: string(),
	description_localizations: nullish(partialRecord(enum_(Locale), string())),
	max_length: optional(int()),
	max_value: optional(union([int(), number()])),
	min_length: optional(int()),
	min_value: optional(union([int(), number()])),
	name: string(),
	name_localizations: nullish(partialRecord(enum_(Locale), string())),
	get options() {
		return optional(array(applicationCommandOption));
	},
	required: optional(boolean()),
	type: enum_(ApplicationCommandOptionType)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default applicationCommandOption;
