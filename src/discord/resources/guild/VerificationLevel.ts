/**
 * Discord verification level.
 * @see {@link https://docs.discord.com/developers/resources/guild#guild-object-verification-level}
 * @internal
 */
enum VerificationLevel {
	NONE = 0,
	LOW = 1,
	MEDIUM = 2,
	HIGH = 3,
	VERY_HIGH = 4
}

export default VerificationLevel;
