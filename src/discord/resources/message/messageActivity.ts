import { enum as enum_, object, optional, string } from "zod";

import MessageActivityType from "./MessageActivityType.js";

/**
 * Discord message activity.
 * @see {@link https://docs.discord.com/developers/resources/message#message-object-message-activity-structure}
 * @internal
 */
const messageActivity = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	party_id: optional(string()),
	type: enum_(MessageActivityType)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default messageActivity;
