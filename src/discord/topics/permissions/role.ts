import { boolean, int, nullish, object, optional, string } from "zod";

import snowflake from "../../snowflake.js";
import roleColors from "./roleColors.js";
import roleTags from "./roleTags.js";

/**
 * Discord role.
 * @see {@link https://docs.discord.com/developers/topics/permissions#role-object}
 * @internal
 */
const role = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	color: int(),
	colors: roleColors,
	flags: int(),
	hoist: boolean(),
	icon: nullish(string()),
	id: snowflake,
	managed: boolean(),
	mentionable: boolean(),
	name: string(),
	permissions: string(),
	position: int(),
	tags: optional(roleTags),
	unicode_emoji: nullish(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default role;
