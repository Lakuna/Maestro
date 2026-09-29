import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandType from "../../discord/interactions/applicationCommands/ApplicationCommandType.js";

/**
 * The `Check Tribal Wars Deck` message command definition.
 * @internal
 */
const checkTribalWarsDeckDefinition = {
	name: "Check Tribal Wars Deck",
	type: ApplicationCommandType.MESSAGE
} satisfies CreateGlobalApplicationCommandParams;

export default checkTribalWarsDeckDefinition;
