import { object } from "zod";

import message from "./message.js";

/**
 * Discord message snapshot.
 * @see {@link https://docs.discord.com/developers/resources/message#message-snapshot-object}
 * @internal
 */
const messageSnapshot = object({
	get message() {
		return message.partial();
	}
});

export default messageSnapshot;
