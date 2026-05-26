import { int, nullish, object, optional, string } from "zod";

import snowflake from "../snowflake.js";

/**
 * Discord unfurled media item.
 * @see {@link https://docs.discord.com/developers/components/reference#unfurled-media-item}
 * @internal
 */
const unfurledMediaItem = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	attachment_id: optional(snowflake),
	content_type: optional(string()),
	flags: optional(int()),
	height: nullish(int()),
	placeholder: optional(string()),
	placeholder_version: optional(int()),
	proxy_url: optional(string()),
	url: string(),
	width: nullish(int())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default unfurledMediaItem;
