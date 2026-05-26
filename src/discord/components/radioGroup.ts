import { array, boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";
import radioGroupOption from "./radioGroupOption.js";

/**
 * Discord radio group.
 * @see {@link https://docs.discord.com/developers/components/reference#radio-group}
 * @internal
 */
const radioGroup = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: optional(int()),
	options: array(radioGroupOption),
	required: optional(boolean()),
	type: literal(ComponentType.RADIO_GROUP)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default radioGroup;
