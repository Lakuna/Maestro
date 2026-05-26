import { array, boolean, nullable, object, optional, string } from "zod";

import snowflake from "../../snowflake.js";
import role from "../../topics/permissions/role.js";
import user from "../user/user.js";

/**
 * Discord emoji.
 * @see {@link https://docs.discord.com/developers/resources/emoji#emoji-object}
 * @internal
 */
const emoji = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	animated: optional(boolean()),
	available: optional(boolean()),
	id: nullable(snowflake),
	managed: optional(boolean()),
	name: nullable(string()),
	require_colons: optional(boolean()),
	roles: optional(array(role)),
	user: optional(user)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default emoji;
