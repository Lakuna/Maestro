import { array, iso, nullish, object } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord message call.
 * @see {@link https://docs.discord.com/developers/resources/message#message-call-object}
 * @internal
 */
const messageCall = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	ended_timestamp: nullish(iso.datetime({ offset: true })),
	participants: array(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default messageCall;
