/**
 * Discord message flag.
 * @see {@link https://docs.discord.com/developers/resources/message#message-object-message-flags}
 * @internal
 */
enum MessageFlag {
	CROSSPOSTED = 0b1, // `1 << 0`
	IS_CROSSPOST = 0b10, // `1 << 1`
	SUPPRESS_EMBEDS = 0b100, // `1 << 2`
	SOURCE_MESSAGE_DELETED = 0b1000, // `1 << 3`
	URGENT = 0b10000, // `1 << 4`
	HAS_THREAD = 0b100000, // `1 << 5`
	EPHEMERAL = 0b1000000, // `1 << 6`
	LOADING = 0b10000000, // `1 << 7`
	FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 0b100000000, // `1 << 8`
	SUPPRESS_NOTIFICATIONS = 0b1000000000000, // `1 << 12`
	IS_VOICE_MESSAGE = 0b10000000000000, // `1 << 13`
	HAS_SNAPSHOT = 0b100000000000000, // `1 << 14`
	IS_COMPONENTS_V2 = 0b1000000000000000 // `1 << 15`
}

export default MessageFlag;
