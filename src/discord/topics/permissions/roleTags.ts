import { null as null_, object, optional } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord role tags.
 * @see {@link https://docs.discord.com/developers/topics/permissions#role-object-role-tags-structure}
 * @internal
 */
const roleTags = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	available_for_purchase: optional(null_()),
	bot_id: optional(snowflake),
	guild_connections: optional(null_()),
	integration_id: optional(snowflake),
	premium_subscriber: optional(null_()),
	subscription_listing_id: optional(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default roleTags;
