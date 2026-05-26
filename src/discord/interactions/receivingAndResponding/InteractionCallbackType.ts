/**
 * Discord interaction callback type.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}
 * @internal
 */
enum InteractionCallbackType {
	PONG = 1,
	CHANNEL_MESSAGE_WITH_SOURCE = 4,
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
	DEFERRED_UPDATE_MESSAGE = 6,
	UPDATE_MESSAGE = 7,
	APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
	MODAL = 9,
	PREMIUM_REQUIRED = 10,
	LAUNCH_ACTIVITY = 12
}

export default InteractionCallbackType;
