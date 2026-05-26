import { int, iso, object, optional } from "zod";

import snowflake from "../../snowflake.js";
import guildMember from "../guild/guildMember.js";

/**
 * Discord thread member.
 * @see {@link https://docs.discord.com/developers/resources/channel#thread-member-object}
 * @internal
 */
const threadMember = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	flags: int(),
	id: optional(snowflake),
	join_timestamp: iso.datetime({ offset: true }),
	member: optional(guildMember),
	user_id: optional(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default threadMember;
