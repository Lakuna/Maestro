import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

import ApplicationCommandType from "../../discord/interactions/applicationCommands/ApplicationCommandType.js";

/**
 * The `Check Sealed Deck` message command definition.
 * @internal
 */
const checkSealedDeckDefinition = {
	name: "Check Sealed Deck",
	type: ApplicationCommandType.MESSAGE
} satisfies CreateGlobalApplicationCommandParams;

export default checkSealedDeckDefinition;
