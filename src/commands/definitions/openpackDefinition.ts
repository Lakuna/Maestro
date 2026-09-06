import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `openpack` command definition.
 * @internal
 */
const openpackDefinition = {
	/* eslint-disable @typescript-eslint/naming-convention */
	description: "Open a pack for a specific set.",
	name: "openpack",
	options: [
		{
			description: "The set code of the set.",
			max_length: 3,
			min_length: 3,
			name: "set",
			required: true,
			type: ApplicationCommandOptionType.STRING
		},
		{
			description: "The seed to use in the PRNG.",
			name: "seed",
			required: false,
			type: ApplicationCommandOptionType.INTEGER
		}
	]
	/* eslint-enable @typescript-eslint/naming-convention */
} satisfies CreateGlobalApplicationCommandParams;

export default openpackDefinition;
