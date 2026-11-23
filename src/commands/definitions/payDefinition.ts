import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/**
 * The `pay` command definition.
 * @internal
 */
const payDefinition = {
	description: "Pay another user.",
	name: "pay",
	options: [
		{
			description: "The user to pay.",
			name: "user",
			required: true,
			type: ApplicationCommandOptionType.USER
		},
		{
			description: "The amount to pay the user.",
			name: "coins",
			required: true,
			type: ApplicationCommandOptionType.INTEGER
		}
	]
} satisfies CreateGlobalApplicationCommandParams;

export default payDefinition;
