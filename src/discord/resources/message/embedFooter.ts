import { object, optional, string } from "zod";

/**
 * Discord embed footer.
 * @see {@link https://docs.discord.com/developers/resources/message#embed-object-embed-footer-structure}
 * @internal
 */
const embedFooter = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	icon_url: optional(string()),
	proxy_icon_url: optional(string()),
	text: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default embedFooter;
