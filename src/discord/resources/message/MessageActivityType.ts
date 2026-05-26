/**
 * Discord message activity type.
 * @see {@link https://docs.discord.com/developers/resources/message#message-object-message-activity-types}
 * @internal
 */
enum MessageActivityType {
	JOIN = 1,
	SPECTATE = 2,
	LISTEN = 3,
	JOIN_REQUEST = 5
}

export default MessageActivityType;
