import {
	array,
	boolean,
	enum as enum_,
	iso,
	nullable,
	object,
	optional
} from "zod";

import LayoutType from "./LayoutType.js";
import pollAnswer from "./pollAnswer.js";
import pollMedia from "./pollMedia.js";
import pollResults from "./pollResults.js";

/**
 * Discord poll.
 * @see {@link https://docs.discord.com/developers/resources/poll#poll-object}
 * @internal
 */
const poll = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	allow_multiselect: boolean(),
	answers: array(pollAnswer),
	expiry: nullable(iso.datetime({ offset: true })),
	layout_type: enum_(LayoutType),
	question: pollMedia,
	results: optional(pollResults)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default poll;
