import type CreateGlobalApplicationCommandParams from "../../discord/interactions/applicationCommands/CreateGlobalApplicationCommandParams.js";

/**
 * The `leaderboard` command definition.
 * @internal
 */
const leaderboardDefinition = {
	description: "Show the coin balance leaderboard.",
	name: "leaderboard"
} satisfies CreateGlobalApplicationCommandParams;

export default leaderboardDefinition;
