import { enum as enum_, object, string } from "zod";

import snowflake from "../../snowflake.js";
import StickerFormatType from "./StickerFormatType.js";

/**
 * Discord sticker item.
 * @see {@link https://docs.discord.com/developers/resources/sticker#sticker-item-object}
 * @internal
 */
const stickerItem = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	format_type: enum_(StickerFormatType),
	id: snowflake,
	name: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default stickerItem;
