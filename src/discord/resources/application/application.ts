import {
	array,
	boolean,
	enum as enum_,
	int,
	nullable,
	nullish,
	object,
	optional,
	record,
	string
} from "zod";

import EventType from "../../events/webhookEvents/EventType.js";
import snowflake from "../../snowflake.js";
import team from "../../topics/teams/team.js";
import guild from "../guild/guild.js";
import user from "../user/user.js";
import ApplicationEventWebhookStatus from "./ApplicationEventWebhookStatus.js";
import ApplicationIntegrationType from "./ApplicationIntegrationType.js";
import installParams from "./installParams.js";
import integrationTypeConfiguration from "./integrationTypeConfiguration.js";

/**
 * Discord application.
 * @see {@link https://docs.discord.com/developers/resources/application#application-object}
 * @internal
 */
const application = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	approximate_guild_count: optional(int()),
	approximate_user_authorization_count: optional(int()),
	approximate_user_install_count: optional(int()),
	bot: optional(user.partial()),
	bot_public: boolean(),
	bot_require_code_grant: boolean(),
	cover_image: optional(string()),
	custom_install_url: optional(string()),
	description: string(),
	event_webhooks_status: enum_(ApplicationEventWebhookStatus),
	event_webhooks_types: optional(array(enum_(EventType))),
	event_webhooks_url: nullish(string()),
	flags: optional(int()),
	guild: optional(guild.partial()),
	guild_id: optional(snowflake),
	icon: nullable(string()),
	id: snowflake,
	install_params: optional(installParams),
	integration_types_config: optional(
		record(enum_(ApplicationIntegrationType), integrationTypeConfiguration)
	),
	interactions_endpoint_url: nullish(string()),
	name: string(),
	owner: optional(user.partial()),
	primary_sku_id: optional(snowflake),
	privacy_policy_url: optional(string()),
	redirect_uris: optional(array(string())),
	role_connections_verification_url: nullish(string()),
	rpc_origins: array(string()),
	slug: optional(string()),
	tags: optional(array(string())),
	team: nullable(team),
	terms_of_service_url: optional(string()),
	verify_key: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default application;
