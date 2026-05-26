import { nullable, object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord welcome screen channel.
 * @see {@link https://docs.discord.com/developers/resources/guild#welcome-screen-object-welcome-screen-channel-structure}
 * @internal
 */
const welcomeScreenChannel = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	channel_id: snowflake,
	description: string(),
	emoji_id: nullable(snowflake),
	emoji_name: nullable(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default welcomeScreenChannel;
