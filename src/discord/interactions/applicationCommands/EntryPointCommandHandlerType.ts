/**
 * Discord entry point command handler type.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#application-command-object-entry-point-command-handler-types}
 * @internal
 */
enum EntryPointCommandHandlerType {
	APP_HANDLER = 1,
	DISCORD_LAUNCH_ACTIVITY = 2
}

export default EntryPointCommandHandlerType;
