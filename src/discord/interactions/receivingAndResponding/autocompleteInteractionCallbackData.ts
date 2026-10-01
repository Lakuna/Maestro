import { array, object } from "zod";

import applicationCommandOptionChoice from "../applicationCommands/applicationCommandOptionChoice.js";

/**
 * Discord interaction callback data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure}
 * @internal
 */
const autocompleteInteractionCallbackData = object({
	choices: array(applicationCommandOptionChoice)
});

export default autocompleteInteractionCallbackData;
