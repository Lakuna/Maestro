import { object, optional, string } from "zod";

/**
 * Discord embed provider.
 * @see {@link https://docs.discord.com/developers/resources/message#embed-object-embed-provider-structure}
 * @internal
 */
const embedProvider = object({
	name: optional(string()),
	url: optional(string())
});

export default embedProvider;
