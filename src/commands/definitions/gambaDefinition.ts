import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `gamba` command definition.
 * @internal
 */
const gambaDefinition = {
	description: "Start a gambling instance.",
	name: "gamba",
	options: [
		{
			description: "A comma-separated list of options that can be bet on.",
			name: "options",
			required: true,
			type: ApplicationCommandOptionType.STRING
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default gambaDefinition;
