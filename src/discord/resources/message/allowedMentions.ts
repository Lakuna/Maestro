import { array, boolean, enum as enum_, object, optional } from "zod";

import snowflake from "../../snowflake.js";
import AllowedMentionType from "./AllowedMentionType.js";

/**
 * Discord allowed mentions.
 * @see {@link https://docs.discord.com/developers/resources/message#allowed-mentions-object}
 * @internal
 */
const allowedMentions = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	parse: optional(array(enum_(AllowedMentionType))),
	replied_user: optional(boolean()),
	roles: optional(array(snowflake)),
	users: optional(array(snowflake))
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default allowedMentions;
