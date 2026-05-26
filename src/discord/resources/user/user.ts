import {
	boolean,
	enum as enum_,
	int,
	nullable,
	nullish,
	object,
	optional,
	string
} from "zod";

import Locale from "../../Locale.js";
import snowflake from "../../snowflake.js";
import avatarDecorationData from "./avatarDecorationData.js";
import collectibles from "./collectibles.js";
import PremiumType from "./PremiumType.js";
import userPrimaryGuild from "./userPrimaryGuild.js";

/**
 * Discord user.
 * @see {@link https://docs.discord.com/developers/resources/user#user-object}
 * @internal
 */
const user = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	accent_color: nullish(int()),
	avatar: nullable(string()),
	avatar_decoration_data: nullish(avatarDecorationData),
	banner: nullish(string()),
	bot: optional(boolean()),
	collectibles: nullish(collectibles),
	discriminator: string(),
	email: nullish(string()),
	flags: optional(int()),
	global_name: nullable(string()),
	id: snowflake,
	locale: optional(enum_(Locale)),
	mfa_enabled: optional(boolean()),
	premium_type: optional(enum_(PremiumType)),
	primary_guild: nullish(userPrimaryGuild),
	public_flags: optional(int()),
	system: optional(boolean()),
	username: string(),
	verified: optional(boolean())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default user;
