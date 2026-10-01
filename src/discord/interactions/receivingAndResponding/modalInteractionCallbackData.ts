import { array, object, string } from "zod";

import component from "../../components/component.js";

/**
 * Discord interaction callback data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure}
 * @internal
 */
const modalInteractionCallbackData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	components: array(component),
	custom_id: string(),
	title: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default modalInteractionCallbackData;
