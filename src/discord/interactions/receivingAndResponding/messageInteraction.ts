import { enum as enum_, object, optional, string } from "zod";

import guildMember from "../../resources/guild/guildMember.js";
import user from "../../resources/user/user.js";
import snowflake from "../../snowflake.js";
import InteractionType from "./InteractionType.js";

/**
 * Discord message interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure}
 * @internal
 */
const messageInteraction = object({
	id: snowflake,
	member: optional(guildMember.partial()),
	name: string(),
	type: enum_(InteractionType),
	user
});

export default messageInteraction;
