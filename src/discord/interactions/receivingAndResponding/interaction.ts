import {
	array,
	enum as enum_,
	int,
	intersection,
	literal,
	object,
	optional,
	string,
	union
} from "zod";

import Locale from "../../Locale.js";
import channel from "../../resources/channel/channel.js";
import entitlement from "../../resources/entitlement/entitlement.js";
import guild from "../../resources/guild/guild.js";
import guildMember from "../../resources/guild/guildMember.js";
import message from "../../resources/message/message.js";
import user from "../../resources/user/user.js";
import snowflake from "../../snowflake.js";
import applicationCommandData from "./applicationCommandData.js";
import authorizingIntegrationOwners from "./authorizingIntegrationOwners.js";
import InteractionContextType from "./InteractionContextType.js";
import InteractionType from "./InteractionType.js";
import messageComponentData from "./messageComponentData.js";
import modalSubmitData from "./modalSubmitData.js";

/**
 * Discord interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
const interaction = intersection(
	object({
		/* eslint-disable @typescript-eslint/naming-convention */
		app_permissions: string(),
		application_id: snowflake,
		attachment_size_limit: int(),
		authorizing_integration_owners: authorizingIntegrationOwners,
		channel: optional(channel.partial()),
		channel_id: optional(snowflake),
		context: optional(enum_(InteractionContextType)),
		entitlements: array(entitlement),
		guild: optional(guild.partial()),
		guild_id: optional(snowflake),
		guild_locale: optional(enum_(Locale)),
		id: snowflake,
		locale: optional(enum_(Locale)),
		member: optional(guildMember),
		message: optional(message),
		token: string(),
		user: optional(user),
		version: int()
		/* eslint-enable @typescript-eslint/naming-convention */
	}),
	union([
		object({ type: literal(InteractionType.PING) }),
		object({
			data: applicationCommandData,
			type: literal(InteractionType.APPLICATION_COMMAND)
		}),
		object({
			data: messageComponentData,
			type: literal(InteractionType.MESSAGE_COMPONENT)
		}),
		object({
			data: applicationCommandData,
			type: literal(InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE)
		}),
		object({
			data: modalSubmitData,
			type: literal(InteractionType.MODAL_SUBMIT)
		})
	])
);

export default interaction;
