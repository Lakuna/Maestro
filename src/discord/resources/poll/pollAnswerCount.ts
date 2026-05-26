import { boolean, int, object } from "zod";

/**
 * Discord poll answer count.
 * @see {@link https://docs.discord.com/developers/resources/poll#poll-results-object-poll-answer-count-object-structure}
 * @internal
 */
const pollAnswerCount = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	count: int(),
	id: int(),
	me_voted: boolean()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default pollAnswerCount;
