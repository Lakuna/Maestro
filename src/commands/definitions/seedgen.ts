import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `seedgen` command definition.
 * @internal
 */
const seedgenDefinition = {
	description: "Generate random seeds for a random number generator.",
	name: "seedgen",
	options: [
		{
			description: "The number of seeds to generate.",
			name: "count",
			required: false,
			type: ApplicationCommandOptionType.INTEGER
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default seedgenDefinition;
