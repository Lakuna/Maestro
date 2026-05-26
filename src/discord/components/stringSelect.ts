import { array, boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";
import selectOption from "./selectOption.js";

/**
 * Discord string select.
 * @see {@link https://docs.discord.com/developers/components/reference#string-select}
 * @internal
 */
const stringSelect = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	disabled: optional(boolean()),
	id: optional(int()),
	max_values: optional(int()),
	min_values: optional(int()),
	options: array(selectOption),
	placeholder: optional(string()),
	required: optional(boolean()),
	type: literal(ComponentType.STRING_SELECT)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default stringSelect;
