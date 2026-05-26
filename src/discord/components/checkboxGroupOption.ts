import { boolean, object, optional, string } from "zod";

/**
 * Discord checkbox group option.
 * @see {@link https://docs.discord.com/developers/components/reference#checkbox-group-option-structure}
 * @internal
 */
const checkboxGroupOption = object({
	default: optional(boolean()),
	description: optional(string()),
	label: string(),
	value: string()
});

export default checkboxGroupOption;
