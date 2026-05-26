import {
	enum as enum_,
	int,
	nullish,
	number,
	object,
	partialRecord,
	string,
	union
} from "zod";

import Locale from "../../Locale.js";

/**
 * Discord application command option choice.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-option-choice-structure}
 * @internal
 */
const applicationCommandOptionChoice = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	name: string(),
	name_localizations: nullish(partialRecord(enum_(Locale), string())),
	value: union([string(), int(), number()])
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default applicationCommandOptionChoice;
