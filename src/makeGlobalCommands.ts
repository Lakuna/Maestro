/* eslint-disable no-console */
import "dotenv/config";

import openpackDefinition from "./commands/definitions/openpackDefinition.js";
import createGlobalApplicationCommand from "./discord/interactions/applicationCommands/createGlobalApplicationCommand.js";

for (const definition of [openpackDefinition]) {
	// eslint-disable-next-line no-await-in-loop
	console.info(await createGlobalApplicationCommand(definition));
}
