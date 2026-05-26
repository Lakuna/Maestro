import {
	array,
	boolean,
	int,
	iso,
	nullish,
	number,
	object,
	optional,
	string
} from "zod";

import snowflake from "../../snowflake.js";
import application from "../application/application.js";
import user from "../user/user.js";

/**
 * Discord attachment.
 * @see {@link https://docs.discord.com/developers/resources/message#attachment-object}
 * @internal
 */
const attachment = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	application: nullish(application),
	clip_created_at: optional(iso.datetime()),
	clip_participants: optional(array(user)),
	content_type: optional(string()),
	description: optional(string()),
	duration_secs: optional(number()),
	ephemeral: optional(boolean()),
	filename: string(),
	flags: optional(int()),
	height: nullish(int()),
	id: snowflake,
	placeholder: optional(string()),
	placeholder_version: optional(int()),
	proxy_url: string(),
	size: int(),
	title: optional(string()),
	url: string(),
	waveform: optional(string()),
	width: nullish(int())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default attachment;
