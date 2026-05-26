import { enum as enum_, object } from "zod";

import snowflake from "../snowflake.js";

/**
 * Discord select default value.
 * @see {@link https://docs.discord.com/developers/components/reference#user-select-select-default-value-structure}
 * @internal
 */
const selectDefaultValue = object({
	id: snowflake,
	type: enum_(["user", "role", "channel"])
});

export default selectDefaultValue;
