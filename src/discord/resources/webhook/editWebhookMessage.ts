import { array, int, object, optional, string } from "zod";

import component from "../../components/component.js";
import allowedMentions from "../message/allowedMentions.js";
import attachmentRequest from "../message/attachmentRequest.js";
import embed from "../message/embed.js";
import pollCreateRequest from "../poll/pollCreateRequest.js";

/**
 * Discord JSON/form parameters for editing a webhook message.
 * @see {@link https://docs.discord.com/developers/resources/webhook#edit-webhook-message}
 * @internal
 */
const editWebhookMessage = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	allowed_mentions: optional(allowedMentions),
	attachments: optional(array(attachmentRequest)),
	components: optional(array(component)),
	content: optional(string()),
	embeds: optional(array(embed)),
	// `files[n]` fields can't be passed via JSON. See https://docs.discord.com/developers/reference#uploading-files.
	flags: optional(int()),
	payload_json: optional(string()),
	poll: optional(pollCreateRequest)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default editWebhookMessage;
