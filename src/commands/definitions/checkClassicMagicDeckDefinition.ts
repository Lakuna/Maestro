import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandType from "../../discord/interactions/applicationCommands/ApplicationCommandType.js";

/**
 * The `Check Classic Magic Deck` message command definition.
 * @internal
 */
const checkClassicMagicDeckDefinition = {
	name: "Check Classic Magic Deck",
	type: ApplicationCommandType.MESSAGE
} satisfies CreateGlobalApplicationCommandParams;

export default checkClassicMagicDeckDefinition;
