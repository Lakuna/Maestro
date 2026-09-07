import "dotenv/config";

import deleteGlobalApplicationCommand from "./discord/interactions/applicationCommands/deleteGlobalApplicationCommand.js";

const [, , id] = process.argv;
if (!id) {
	throw new Error("Missing command ID.");
}

await deleteGlobalApplicationCommand(id);
