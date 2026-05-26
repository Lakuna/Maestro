import { object, optional, string } from "zod";

/**
 * Discord embed author.
 * @see {@link https://docs.discord.com/developers/resources/message#embed-object-embed-author-structure}
 * @internal
 */
const embedAuthor = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	icon_url: optional(string()),
	name: string(),
	proxy_icon_url: optional(string()),
	url: optional(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default embedAuthor;
