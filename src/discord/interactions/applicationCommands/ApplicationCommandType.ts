/**
 * Discord application command type.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-types}
 * @internal
 */
enum ApplicationCommandType {
	CHAT_INPUT = 1,
	USER = 2,
	MESSAGE = 3,
	PRIMARY_ENTRY_POINT = 4
}

export default ApplicationCommandType;
