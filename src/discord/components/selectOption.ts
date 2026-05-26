import { boolean, object, optional, string } from "zod";

import emoji from "../resources/emoji/emoji.js";

/**
 * Discord select option.
 * @see {@link https://docs.discord.com/developers/components/reference#string-select-select-option-structure}
 * @internal
 */
const selectOption = object({
	default: optional(boolean()),
	description: string(),
	emoji: optional(emoji.partial()),
	label: string(),
	value: string()
});

export default selectOption;
