import {
	array,
	enum as enum_,
	int,
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

const base = {
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
};

/**
 * Discord ping interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
export const pingInteraction = object({
	...base,
	type: literal(InteractionType.PING)
});

/**
 * Discord application command interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
export const applicationCommandInteraction = object({
	...base,
	data: applicationCommandData,
	type: literal(InteractionType.APPLICATION_COMMAND)
});

/**
 * Discord message component interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
export const messageComponentInteraction = object({
	...base,
	data: messageComponentData,
	type: literal(InteractionType.MESSAGE_COMPONENT)
});

/**
 * Discord application command autocomplete interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
export const applicationCommandAutocompleteInteraction = object({
	...base,
	data: applicationCommandData,
	type: literal(InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE)
});

/**
 * Discord modal submit interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
export const modalSubmitInteraction = object({
	...base,
	data: modalSubmitData,
	type: literal(InteractionType.MODAL_SUBMIT)
});

/**
 * Discord interaction.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object}
 * @internal
 */
const interaction = union([
	pingInteraction,
	applicationCommandInteraction,
	messageComponentInteraction,
	applicationCommandAutocompleteInteraction,
	modalSubmitInteraction
]);

export default interaction;
