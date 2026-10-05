import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `deckcheck` command definition.
 * @internal
 */
const deckcheckDefinition = {
	/* eslint-disable @typescript-eslint/naming-convention */
	description: "Check a deck for a specific format.",
	name: "deckcheck",
	options: [
		{
			description: "Check a deck for Tribal Wars.",
			name: "tribal",
			options: [
				{
					description: "The link to the deck on Moxfield.",
					name: "url",
					required: true,
					type: ApplicationCommandOptionType.STRING
				}
			],
			type: ApplicationCommandOptionType.SUB_COMMAND
		},
		{
			description: "Check a deck for Classic Magic.",
			name: "classic",
			options: [
				{
					description: "The link to the deck on Moxfield.",
					name: "url",
					required: true,
					type: ApplicationCommandOptionType.STRING
				}
			],
			type: ApplicationCommandOptionType.SUB_COMMAND
		},
		{
			description: "Check a deck for Sealed Deck.",
			name: "sealed",
			options: [
				{
					description: "The link to the deck on Moxfield.",
					name: "url",
					required: true,
					type: ApplicationCommandOptionType.STRING
				},
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
			],
			type: ApplicationCommandOptionType.SUB_COMMAND
		}
	]
	/* eslint-enable @typescript-eslint/naming-convention */
} satisfies CreateGlobalApplicationCommandParams;

export default deckcheckDefinition;
