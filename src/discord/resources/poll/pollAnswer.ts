import { int, object, optional } from "zod";

import pollMedia from "./pollMedia.js";

/**
 * Discord poll answer.
 * @see {@link https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure}
 * @internal
 */
const pollAnswer = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	answer_id: optional(int()),
	poll_media: pollMedia
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default pollAnswer;
