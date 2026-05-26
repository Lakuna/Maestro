import { boolean, nullable, object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord forum tag.
 * @see {@link https://docs.discord.com/developers/resources/channel#forum-tag-object}
 * @internal
 */
const forumTag = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	emoji_id: nullable(snowflake),
	emoji_name: nullable(snowflake),
	id: snowflake,
	moderated: boolean(),
	name: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default forumTag;
