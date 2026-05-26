/**
 * Discord application event webhook status.
 * @see {@link https://docs.discord.com/developers/resources/application#application-object-application-event-webhook-status}
 * @internal
 */
enum ApplicationEventWebhookStatus {
	DISABLED = 1,
	ENABLED = 2,
	DISABLED_BY_DISCORD = 3
}

export default ApplicationEventWebhookStatus;
