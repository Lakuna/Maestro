import { array, boolean, object } from "zod";

import pollAnswerCount from "./pollAnswerCount.js";

/**
 * Discord poll results.
 * @see {@link https://docs.discord.com/developers/resources/poll#poll-results-object-poll-results-object-structure}
 * @internal
 */
const pollResults = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	answer_counts: array(pollAnswerCount),
	is_finalized: boolean()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default pollResults;
