import {
	array,
	boolean,
	int,
	iso,
	nullable,
	nullish,
	object,
	optional,
	string
} from "zod";

import snowflake from "../../snowflake.js";
import avatarDecorationData from "../user/avatarDecorationData.js";
import collectibles from "../user/collectibles.js";
import user from "../user/user.js";

/**
 * Discord guild member.
 * @see {@link https://docs.discord.com/developers/resources/guild#guild-member-object}
 * @internal
 */
const guildMember = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	avatar: nullish(string()),
	avatar_decoration_data: nullish(avatarDecorationData),
	banner: nullish(string()),
	collectibles: nullish(collectibles),
	communication_disabled_until: nullish(iso.datetime()),
	deaf: boolean(),
	flags: int(),
	joined_at: nullable(iso.datetime()),
	mute: boolean(),
	nick: nullish(string()),
	pending: optional(boolean()),
	permissions: optional(string()),
	premium_since: nullish(iso.datetime()),
	roles: array(snowflake),
	user: optional(user)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default guildMember;
