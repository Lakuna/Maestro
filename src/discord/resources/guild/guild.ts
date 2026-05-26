import {
	array,
	boolean,
	enum as enum_,
	int,
	nullable,
	nullish,
	object,
	optional,
	string
} from "zod";

import Locale from "../../Locale.js";
import snowflake from "../../snowflake.js";
import role from "../../topics/permissions/role.js";
import emoji from "../emoji/emoji.js";
import sticker from "../sticker/sticker.js";
import DefaultMessageNotificationLevel from "./DefaultMessageNotificationLevel.js";
import ExplicitContentFilterLevel from "./ExplicitContentFilterLevel.js";
import GuildAgeRestrictionLevel from "./GuildAgeRestrictionLevel.js";
import GuildFeature from "./GuildFeature.js";
import incidentsData from "./incidentsData.js";
import MfaLevel from "./MfaLevel.js";
import PremiumTier from "./PremiumTier.js";
import VerificationLevel from "./VerificationLevel.js";
import welcomeScreen from "./welcomeScreen.js";

/**
 * Discord guild.
 * @see {@link https://docs.discord.com/developers/resources/guild#guild-object}
 * @internal
 */
const guild = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	afk_channel_id: nullable(snowflake),
	afk_timeout: int(),
	application_id: nullable(snowflake),
	approximate_presence_count: optional(int()),
	banner: nullable(string()),
	default_message_notifications: enum_(DefaultMessageNotificationLevel),
	description: nullable(string()),
	discovery_splash: nullable(string()),
	emojis: array(emoji),
	explicit_content_filter: enum_(ExplicitContentFilterLevel),
	features: array(enum_(GuildFeature)),
	icon: nullable(string()),
	icon_hash: nullish(string()),
	id: snowflake,
	incidents_data: nullable(incidentsData),
	max_members: optional(int()),
	max_presences: nullish(int()),
	max_stage_video_channel_users: optional(int()),
	max_video_channel_users: optional(int()),
	mfa_level: enum_(MfaLevel),
	name: string(),
	nsfw_level: enum_(GuildAgeRestrictionLevel),
	owner: optional(boolean()),
	owner_id: snowflake,
	permissions: optional(string()),
	preferred_locale: enum_(Locale),
	premium_progress_bar_enabled: boolean(),
	premium_subscription_count: optional(int()),
	premium_tier: enum_(PremiumTier),
	public_updates_channel_id: nullable(snowflake),
	region: nullish(string()),
	roles: array(role),
	rules_channel_id: nullable(snowflake),
	safety_alerts_channel_id: nullable(snowflake),
	splash: nullable(string()),
	stickers: optional(array(sticker)),
	system_channel_flags: int(),
	system_channel_id: nullable(snowflake),
	vanity_url_code: nullable(string()),
	verification_level: enum_(VerificationLevel),
	welcome_screen: optional(welcomeScreen),
	widget_channel_id: nullish(snowflake),
	widget_enabled: optional(boolean())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default guild;
