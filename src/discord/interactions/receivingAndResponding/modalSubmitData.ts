import { array, object, optional, string } from "zod";

import componentInteractionResponse from "./componentInteractionResponse.js";
import resolvedData from "./resolvedData.js";

/**
 * Discord modal submit data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-modal-submit-data-structure}
 * @internal
 */
const modalSubmitData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	components: array(componentInteractionResponse),
	custom_id: string(),
	resolved: optional(resolvedData)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default modalSubmitData;
