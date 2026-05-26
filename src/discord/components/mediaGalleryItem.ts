import { boolean, nullish, object, optional, string } from "zod";

import unfurledMediaItem from "./unfurledMediaItem.js";

/**
 * Discord media gallery item.
 * @see {@link https://docs.discord.com/developers/components/reference#media-gallery-media-gallery-item-structure}
 * @internal
 */
const mediaGalleryItem = object({
	description: nullish(string()),
	media: unfurledMediaItem,
	spoiler: optional(boolean())
});

export default mediaGalleryItem;
