import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `timer` command definition.
 * @internal
 */
const timerDefinition = {
	description: "Create a link to a countdown timer.",
	name: "timer",
	options: [
		{
			description: "The timestamp of the end of the timer. Supports `@time`.",
			name: "time",
			required: true,
			type: ApplicationCommandOptionType.STRING
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default timerDefinition;
