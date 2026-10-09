import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `sealedpool` command definition.
 * @internal
 */
const sealedpoolDefinition = {
	/* eslint-disable @typescript-eslint/naming-convention */
	description:
		"Open multiple packs for a specific set and combine the results into a card pool.",
	name: "sealedpool",
	options: [
		{
			description: "The code of the set.",
			max_length: 3,
			min_length: 3,
			name: "set",
			required: true,
			type: ApplicationCommandOptionType.STRING
		},
		{
			description:
				"The comma- and/or whitespace-separated seeds to use in the PRNG.",
			name: "seeds",
			required: true,
			type: ApplicationCommandOptionType.STRING
		}
	]
	/* eslint-enable @typescript-eslint/naming-convention */
} satisfies CreateGlobalApplicationCommandParams;

export default sealedpoolDefinition;
