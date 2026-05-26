import { array, boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";
import selectDefaultValue from "./selectDefaultValue.js";

/**
 * Discord user select.
 * @see {@link https://docs.discord.com/developers/components/reference#user-select}
 * @internal
 */
const userSelect = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	default_values: optional(array(selectDefaultValue)),
	disabled: optional(boolean()),
	id: optional(int()),
	max_values: optional(int()),
	min_values: optional(int()),
	placeholder: optional(string()),
	required: optional(boolean()),
	type: literal(ComponentType.USER_SELECT)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default userSelect;
