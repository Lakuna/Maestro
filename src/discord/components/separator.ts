import { boolean, int, literal, object, optional } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord separator.
 * @see {@link https://docs.discord.com/developers/components/reference#separator}
 * @internal
 */
const separator = object({
	divider: optional(boolean()),
	id: optional(int()),
	spacing: optional(int()),
	type: literal(ComponentType.SEPARATOR)
});

export default separator;
