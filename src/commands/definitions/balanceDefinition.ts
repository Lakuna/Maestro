import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `balance` command definition.
 * @internal
 */
const balanceDefinition = {
	description: "Check a user's coin balance.",
	name: "balance",
	options: [
		{
			description: "The user to check the balance of.",
			name: "user",
			required: false,
			type: ApplicationCommandOptionType.USER
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default balanceDefinition;
