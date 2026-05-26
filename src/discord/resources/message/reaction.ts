import { array, boolean, int, object } from "zod";

import emoji from "../emoji/emoji.js";
import reactionCountDetails from "./reactionCountDetails.js";

/**
 * Discord reaction.
 * @see {@link https://docs.discord.com/developers/resources/message#reaction-object}
 * @internal
 */
const reaction = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	burst_colors: array(int()),
	count: int(),
	count_details: reactionCountDetails,
	emoji: emoji.partial(),
	me: boolean(),
	me_burst: boolean()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default reaction;
