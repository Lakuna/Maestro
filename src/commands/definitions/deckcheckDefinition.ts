import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `deckcheck` command definition.
 * @internal
 */
const deckcheckDefinition = {
	description: "Check a deck for a specific format.",
	name: "deckcheck",
	options: [
		{
			description: "Check a deck for Tribal Wars.",
			name: "tribalwars",
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
			name: "classicmagic",
			options: [
				{
					description: "The link to the deck on Moxfield.",
					name: "url",
					required: true,
					type: ApplicationCommandOptionType.STRING
				}
			],
			type: ApplicationCommandOptionType.SUB_COMMAND
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default deckcheckDefinition;
