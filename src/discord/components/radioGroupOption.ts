import { boolean, object, optional, string } from "zod";

/**
 * Discord radio group option.
 * @see {@link https://docs.discord.com/developers/components/reference#radio-group-option-structure}
 * @internal
 */
const radioGroupOption = object({
	default: optional(boolean()),
	description: optional(string()),
	label: string(),
	value: string()
});

export default radioGroupOption;
