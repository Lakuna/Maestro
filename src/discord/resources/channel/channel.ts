import {
	array,
	boolean,
	enum as enum_,
	int,
	iso,
	nullish,
	object,
	optional,
	string
} from "zod";

import snowflake from "../../snowflake.js";
import user from "../user/user.js";
import ChannelType from "./ChannelType.js";
import defaultReaction from "./defaultReaction.js";
import ForumLayoutType from "./ForumLayoutType.js";
import forumTag from "./forumTag.js";
import overwrite from "./overwrite.js";
import SortOrderType from "./SortOrderType.js";
import threadMember from "./threadMember.js";
import threadMetadata from "./threadMetadata.js";
import VideoQualityMode from "./VideoQualityMode.js";

/**
 * Discord channel.
 * @see {@link https://docs.discord.com/developers/resources/channel#channel-object}
 * @internal
 */
const channel = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	application_id: optional(snowflake),
	applied_tags: optional(array(snowflake)),
	available_tags: optional(array(forumTag)),
	bitrate: optional(int()),
	default_auto_archive_duration: optional(int()),
	default_forum_layout: optional(enum_(ForumLayoutType)),
	default_reaction_emoji: nullish(defaultReaction),
	default_sort_order: nullish(enum_(SortOrderType)),
	default_thread_rate_limit_per_user: optional(int()),
	flags: optional(int()),
	guild_id: optional(snowflake),
	icon: nullish(string()),
	id: snowflake,
	last_message_id: nullish(snowflake),
	last_pin_timestamp: nullish(iso.datetime()),
	managed: optional(boolean()),
	member: optional(threadMember),
	member_count: optional(int()),
	message_count: optional(int()),
	name: nullish(string()),
	nsfw: optional(boolean()),
	owner_id: optional(snowflake),
	parent_id: nullish(snowflake),
	permission_overwrites: optional(array(overwrite)),
	permissions: optional(string()),
	position: optional(int()),
	rate_limit_per_user: optional(int()),
	recipients: optional(array(user)),
	rtc_region: nullish(string()),
	thread_metadata: optional(threadMetadata),
	topic: nullish(string()),
	total_message_sent: optional(int()),
	type: enum_(ChannelType),
	user_limit: optional(int()),
	video_quality_mode: optional(enum_(VideoQualityMode))
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default channel;
