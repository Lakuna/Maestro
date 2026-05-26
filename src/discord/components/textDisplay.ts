import { int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord text display.
 * @see {@link https://docs.discord.com/developers/components/reference#text-display}
 * @internal
 */
const textDisplay = object({
	content: string(),
	id: optional(int()),
	type: literal(ComponentType.TEXT_DISPLAY)
});

export default textDisplay;
