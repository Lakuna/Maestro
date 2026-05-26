/**
 * Discord guild age-restriction level.
 * @see {@link https://docs.discord.com/developers/resources/guild#guild-object-guild-nsfw-level}
 * @internal
 */
enum GuildAgeRestrictionLevel {
	DEFAULT = 0,
	EXPLICIT = 1,
	SAFE = 2,
	AGE_RESTRICTED = 3
}

export default GuildAgeRestrictionLevel;
