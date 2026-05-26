import { object, optional } from "zod";

import emoji from "../emoji/emoji.js";

/**
 * Discord poll media.
 * @see {@link https://docs.discord.com/developers/resources/poll#poll-media-object-poll-media-object-structure}
 * @internal
 */
const pollMedia = object({ emoji: optional(emoji.partial()) });

export default pollMedia;
