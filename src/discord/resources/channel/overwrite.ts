import { int, object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord overwrite.
 * @see {@link https://docs.discord.com/developers/resources/channel#overwrite-object}
 * @internal
 */
const overwrite = object({
	allow: string(),
	deny: string(),
	id: snowflake,
	type: int()
});

export default overwrite;
