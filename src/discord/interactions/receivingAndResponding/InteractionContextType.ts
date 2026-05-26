/**
 * Discord interaction context type.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-context-types}
 * @internal
 */
enum InteractionContextType {
	GUILD = 0,
	BOT_DM = 1,
	PRIVATE_CHANNEL = 2
}

export default InteractionContextType;
