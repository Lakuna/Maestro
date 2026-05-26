import { array, enum as enum_, int, iso, object, optional, string } from "zod";

import embedAuthor from "./embedAuthor.js";
import embedField from "./embedField.js";
import embedFooter from "./embedFooter.js";
import embedImage from "./embedImage.js";
import embedProvider from "./embedProvider.js";
import EmbedType from "./EmbedType.js";
import embedVideo from "./embedVideo.js";

/**
 * Discord embed.
 * @see {@link https://docs.discord.com/developers/resources/message#embed-object}
 * @internal
 */
const embed = object({
	author: optional(embedAuthor),
	color: optional(int()),
	description: optional(string()),
	fields: optional(array(embedField)),
	flags: optional(int()),
	footer: optional(embedFooter),
	image: optional(embedImage),
	provider: optional(embedProvider),
	thumbnail: optional(embedImage),
	timestamp: optional(iso.datetime({ offset: true })),
	title: optional(string()),
	type: optional(enum_(EmbedType)),
	url: optional(string()),
	video: optional(embedVideo)
});

export default embed;
