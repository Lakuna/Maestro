import { nullable, object } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord default reaction.
 * @see {@link https://docs.discord.com/developers/resources/channel#default-reaction-object}
 * @internal
 */
const defaultReaction = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	emoji_id: nullable(snowflake),
	emoji_name: nullable(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default defaultReaction;
