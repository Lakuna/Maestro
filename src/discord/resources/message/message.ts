import {
	array,
	boolean,
	enum as enum_,
	int,
	iso,
	nullable,
	nullish,
	object,
	optional,
	string,
	union
} from "zod";

import component from "../../components/component.js";
import messageInteraction from "../../interactions/receivingAndResponding/messageInteraction.js";
import resolvedData from "../../interactions/receivingAndResponding/resolvedData.js";
import snowflake from "../../snowflake.js";
import application from "../application/application.js";
import channel from "../channel/channel.js";
import poll from "../poll/poll.js";
import sticker from "../sticker/sticker.js";
import stickerItem from "../sticker/stickerItem.js";
import user from "../user/user.js";
import attachment from "./attachment.js";
import channelMention from "./channelMention.js";
import embed from "./embed.js";
import messageActivity from "./messageActivity.js";
import messageCall from "./messageCall.js";
import messageInteractionMetadata from "./messageInteractionMetadata.js";
import messageReference from "./messageReference.js";
import messageSnapshot from "./messageSnapshot.js";
import MessageType from "./MessageType.js";
import reaction from "./reaction.js";
import roleSubscription from "./roleSubscription.js";
import sharedClientTheme from "./sharedClientTheme.js";

/**
 * Discord message.
 * @see {@link https://docs.discord.com/developers/resources/message#message-object}
 * @internal
 */
const message = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	activity: optional(messageActivity),
	application: optional(application.partial()),
	application_id: optional(snowflake),
	attachments: array(attachment),
	author: user,
	call: optional(messageCall),
	channel_id: snowflake,
	components: optional(array(component)),
	content: string(),
	edited_timestamp: nullable(iso.datetime()),
	embeds: array(embed),
	flags: optional(int()),
	id: snowflake,
	interaction: optional(messageInteraction),
	interaction_metadata: optional(messageInteractionMetadata),
	mention_channels: optional(array(channelMention)),
	mention_everyone: boolean(),
	mention_roles: array(snowflake),
	mentions: array(user),
	message_reference: optional(messageReference),
	get message_snapshots() {
		return optional(array(messageSnapshot));
	},
	nonce: optional(union([int(), string()])),
	pinned: boolean(),
	poll: optional(poll),
	position: optional(int()),
	reactions: optional(array(reaction)),
	get referenced_message() {
		return nullish(message);
	},
	get resolved() {
		return optional(resolvedData);
	},
	role_subscription_data: optional(roleSubscription),
	shared_client_theme: optional(sharedClientTheme),
	sticker_items: optional(array(stickerItem)),
	stickers: optional(array(sticker)),
	thread: optional(channel),
	timestamp: iso.datetime(),
	tts: boolean(),
	type: enum_(MessageType),
	webhook_id: optional(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default message;
