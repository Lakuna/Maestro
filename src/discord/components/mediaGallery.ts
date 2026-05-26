import { array, int, literal, object, optional } from "zod";

import ComponentType from "./ComponentType.js";
import mediaGalleryItem from "./mediaGalleryItem.js";

/**
 * Discord media gallery.
 * @see {@link https://docs.discord.com/developers/components/reference#media-gallery}
 * @internal
 */
const mediaGallery = object({
	id: optional(int()),
	items: array(mediaGalleryItem),
	type: literal(ComponentType.MEDIA_GALLERY)
});

export default mediaGallery;
