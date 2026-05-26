import { array, boolean, int, object, optional, string } from "zod";

import component from "../../components/component.js";
import allowedMentions from "../../resources/message/allowedMentions.js";
import attachment from "../../resources/message/attachment.js";
import embed from "../../resources/message/embed.js";
import pollCreateRequest from "../../resources/poll/pollCreateRequest.js";

/**
 * Discord interaction callback data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure}
 * @internal
 */
const interactionCallbackData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	allowed_mentions: optional(allowedMentions),
	attachments: optional(array(attachment.partial())),
	components: optional(array(component)),
	content: optional(string()),
	embeds: optional(array(embed)),
	flags: optional(int()),
	poll: optional(pollCreateRequest),
	tts: optional(boolean())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default interactionCallbackData;
