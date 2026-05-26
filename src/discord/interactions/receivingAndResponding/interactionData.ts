import { undefined as undefined_, union } from "zod";

import applicationCommandData from "./applicationCommandData.js";
import messageComponentData from "./messageComponentData.js";
import modalSubmitData from "./modalSubmitData.js";

/**
 * Discord interaction data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-data}
 * @internal
 */
const interactionData = union([
	undefined_(),
	applicationCommandData,
	messageComponentData,
	modalSubmitData
]);

export default interactionData;
