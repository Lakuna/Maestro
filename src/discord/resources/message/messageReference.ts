import { boolean, enum as enum_, object, optional } from "zod";

import snowflake from "../../snowflake.js";
import MessageReferenceType from "./MessageReferenceType.js";

/**
 * Discord message reference.
 * @see {@link https://docs.discord.com/developers/resources/message#message-reference-structure}
 * @internal
 */
const messageReference = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	channel_id: optional(snowflake),
	fail_if_not_exists: optional(boolean()),
	guild_id: optional(snowflake),
	message_id: optional(snowflake),
	type: optional(enum_(MessageReferenceType))
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default messageReference;
