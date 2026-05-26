import { boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";
import unfurledMediaItem from "./unfurledMediaItem.js";

/**
 * Discord file.
 * @see {@link https://docs.discord.com/developers/components/reference#file}
 * @internal
 */
const file = object({
	file: unfurledMediaItem,
	id: optional(int()),
	name: optional(string()),
	size: optional(int()),
	spoiler: optional(boolean()),
	type: literal(ComponentType.FILE)
});

export default file;
