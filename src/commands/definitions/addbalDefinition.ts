import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `addbal` command definition.
 * @internal
 */
const addbalDefinition = {
	description: "Add to one or more users' coin balances.",
	name: "addbal",
	options: [
		{
			description: "The users to set the balance of.",
			name: "users",
			required: true,
			type: ApplicationCommandOptionType.MENTIONABLE
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
