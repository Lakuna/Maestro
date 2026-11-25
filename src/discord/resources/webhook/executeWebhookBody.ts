import { array, boolean, int, object, optional, string } from "zod";

import component from "../../components/component.js";
import allowedMentions from "../message/allowedMentions.js";
import attachmentRequest from "../message/attachmentRequest.js";
import embed from "../message/embed.js";
import pollCreateRequest from "../poll/pollCreateRequest.js";

/**
 * Discord JSON/form parameters for executing a webhook.
 * @see {@link https://docs.discord.com/developers/resources/webhook#execute-webhook}
 * @internal
 */
const executeWebhookBody = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	allowed_mentions: optional(allowedMentions),
	applied_tags: optional(array(string())),
	attachments: optional(array(attachmentRequest.partial())),
	avatar_url: optional(string()),
	components: optional(array(component)),
	content: optional(string()),
	embeds: optional(array(embed)),
	// `files[n]` fields can't be passed via JSON. See https://docs.discord.com/developers/reference#uploading-files.
	flags: optional(int()),
	payload_json: optional(string()),
	poll: optional(pollCreateRequest),
	thread_name: optional(string()),
	tts: optional(boolean()),
	username: optional(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default executeWebhookBody;
