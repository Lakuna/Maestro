/**
 * Discord allowed mention type.
 * @see {@link https://docs.discord.com/developers/resources/message#allowed-mentions-object-allowed-mention-types}
 * @internal
 */
enum AllowedMentionType {
	EVERYONE_MENTIONS = "everyone",
	ROLE_MENTIONS = "roles",
	USER_MENTIONS = "users"
}

export default AllowedMentionType;
