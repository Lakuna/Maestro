import { array, boolean, int, literal, object, optional, string } from "zod";

import checkboxGroupOption from "./checkboxGroupOption.js";
import ComponentType from "./ComponentType.js";

/**
 * Discord checkbox group.
 * @see {@link https://docs.discord.com/developers/components/reference#checkbox-group}
 * @internal
 */
const checkboxGroup = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: optional(int()),
	max_values: optional(int()),
	min_values: optional(int()),
	options: array(checkboxGroupOption),
	required: optional(boolean()),
	type: literal(ComponentType.CHECKBOX_GROUP)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default checkboxGroup;
