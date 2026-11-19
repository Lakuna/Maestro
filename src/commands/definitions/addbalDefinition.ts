import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `addbal` command definition.
 * @internal
 */
const addbalDefinition = {
	description: "Add to a user's coin balances.",
	name: "addbal",
	options: [
		{
			description: "The user to add to the balance of.",
			name: "user",
			required: true,
			type: ApplicationCommandOptionType.USER
		},
		{
			description: "The balance to add to the user.",
			name: "coins",
			required: true,
			type: ApplicationCommandOptionType.INTEGER
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default addbalDefinition;
