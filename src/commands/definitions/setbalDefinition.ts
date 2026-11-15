import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `setbal` command definition.
 * @internal
 */
const setbalDefinition = {
	description: "Set a user's coin balance.",
	name: "setbal",
	options: [
		{
			description: "The user to set the balance of.",
			name: "user",
			required: true,
			type: ApplicationCommandOptionType.USER
		},
		{
			description: "The balance to set the user to.",
			name: "coins",
			required: true,
			type: ApplicationCommandOptionType.INTEGER
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default setbalDefinition;
