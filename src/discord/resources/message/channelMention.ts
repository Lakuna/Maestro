import { enum as enum_, object, string } from "zod";

import snowflake from "../../snowflake.js";
import ChannelType from "../channel/ChannelType.js";

/**
 * Discord channel mention.
 * @see {@link https://docs.discord.com/developers/resources/message#channel-mention-object}
 * @internal
 */
const channelMention = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	guild_id: snowflake,
	id: snowflake,
	name: string(),
	type: enum_(ChannelType)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default channelMention;
