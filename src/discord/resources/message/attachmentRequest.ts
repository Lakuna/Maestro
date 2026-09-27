import { boolean, int, number, object, optional, string, union } from "zod";

/**
 * Discord attachment request.
 * @see {@link https://docs.discord.com/developers/resources/message#attachment-object-attachment-request-structure}
 * @internal
 */
const attachmentRequest = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	description: optional(string()),
	duration_secs: optional(number()),
	filename: optional(string()),
	id: union([string(), int()]),
	is_spoiler: optional(boolean()),
	title: optional(string()),
	waveform: optional(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default attachmentRequest;
