import { boolean, int, literal, nullish, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";
import unfurledMediaItem from "./unfurledMediaItem.js";

/**
 * Discord thumbnail.
 * @see {@link https://docs.discord.com/developers/components/reference#thumbnail}
 * @internal
 */
const thumbnail = object({
	description: nullish(string()),
	id: optional(int()),
	media: unfurledMediaItem,
	spoiler: optional(boolean()),
	type: literal(ComponentType.THUMBNAIL)
});

export default thumbnail;
