import { array, boolean, enum as enum_, int, object, optional } from "zod";

import LayoutType from "./LayoutType.js";
import pollAnswer from "./pollAnswer.js";
import pollMedia from "./pollMedia.js";

/**
 * Discord poll create request.
 * @see {@link https://docs.discord.com/developers/resources/poll#poll-create-request-object}
 * @internal
 */
const pollCreateRequest = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	allow_multiselect: optional(boolean()),
	answers: array(pollAnswer),
	duration: optional(int()),
	layout_type: optional(enum_(LayoutType)),
	question: pollMedia
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default pollCreateRequest;
