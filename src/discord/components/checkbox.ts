import { boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord checkbox.
 * @see {@link https://docs.discord.com/developers/components/reference#checkbox}
 * @internal
 */
const checkbox = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	default: optional(boolean()),
	id: optional(int()),
	type: literal(ComponentType.CHECKBOX)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default checkbox;
