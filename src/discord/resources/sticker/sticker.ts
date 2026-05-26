import {
	boolean,
	enum as enum_,
	int,
	nullable,
	object,
	optional,
	string
} from "zod";

import snowflake from "../../snowflake.js";
import user from "../user/user.js";
import StickerFormatType from "./StickerFormatType.js";
import StickerType from "./StickerType.js";

/**
 * Discord sticker.
 * @see {@link https://docs.discord.com/developers/resources/sticker#sticker-object}
 * @internal
 */
const sticker = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	available: optional(boolean()),
	description: nullable(string()),
	format_type: enum_(StickerFormatType),
	guild_id: optional(snowflake),
	id: snowflake,
	name: string(),
	pack_id: optional(snowflake),
	sort_value: optional(int()),
	tags: string(),
	type: enum_(StickerType),
	user: optional(user)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default sticker;
