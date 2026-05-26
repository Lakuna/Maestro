import { object, optional, record } from "zod";

import channel from "../../resources/channel/channel.js";
import guildMember from "../../resources/guild/guildMember.js";
import attachment from "../../resources/message/attachment.js";
import message from "../../resources/message/message.js";
import user from "../../resources/user/user.js";
import snowflake from "../../snowflake.js";
import role from "../../topics/permissions/role.js";

/**
 * Discord resolved data.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
const resolvedData = object({
	attachments: optional(record(snowflake, attachment)),
	channels: optional(record(snowflake, channel.partial())),
	members: optional(record(snowflake, guildMember.partial())),
	get messages() {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore TypeScript struggles with circular type references. This directive is required in some environments and not others (hence ts-ignore over ts-expect-error).
		return optional(record(snowflake, message.partial()));
	},
	roles: optional(record(snowflake, role)),
	users: optional(record(snowflake, user))
});

export default resolvedData;
