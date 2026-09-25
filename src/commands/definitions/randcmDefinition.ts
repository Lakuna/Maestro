import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `randcm` command definition.
 * @internal
 */
const randcmDefinition = {
	description: "Generate random champions meeting conditions.",
	name: "randcm",
	options: [
		{
			description: "The seed to use in the PRNG.",
			name: "seed",
			required: false,
			type: ApplicationCommandOptionType.INTEGER
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default randcmDefinition;
