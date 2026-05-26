/**
 * Discord explicit content filter level.
 * @see {@link https://docs.discord.com/developers/resources/guild#guild-object-explicit-content-filter-level}
 * @internal
 */
enum ExplicitContentFilterLevel {
	DISABLED = 0,
	MEMBERS_WITHOUT_ROLES = 1,
	ALL_MEMBERS = 2
}

export default ExplicitContentFilterLevel;
