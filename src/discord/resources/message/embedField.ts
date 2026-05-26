import { boolean, object, optional, string } from "zod";

/**
 * Discord embed field.
 * @see {@link https://docs.discord.com/developers/resources/message#embed-object-embed-field-structure}
 * @internal
 */
const embedField = object({
	inline: optional(boolean()),
	name: string(),
	value: string()
});

export default embedField;
