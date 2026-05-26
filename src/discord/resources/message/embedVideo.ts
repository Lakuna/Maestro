import { int, object, optional, string } from "zod";

/**
 * Discord embed video.
 * @see {@link https://docs.discord.com/developers/resources/message#embed-object-embed-video-structure}
 * @internal
 */
const embedVideo = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	content_type: optional(string()),
	description: optional(string()),
	flags: optional(int()),
	height: optional(int()),
	placeholder: optional(string()),
	placeholder_version: optional(int()),
	proxy_url: optional(string()),
	url: optional(string()),
	width: optional(int())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default embedVideo;
