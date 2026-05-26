import { boolean, nullable, object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord user primary guild.
 * @see {@link https://docs.discord.com/developers/resources/user#user-object-user-primary-guild}
 * @internal
 */
const userPrimaryGuild = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	badge: nullable(string()),
	identity_enabled: nullable(boolean()),
	identity_guild_id: nullable(snowflake),
	tag: nullable(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default userPrimaryGuild;
