import "dotenv/config";

import openpackDefinition from "./commands/definitions/openpackDefinition.js";
import randcmDefinition from "./commands/definitions/randcmDefinition.js";
import createGlobalApplicationCommand from "./discord/interactions/applicationCommands/createGlobalApplicationCommand.js";

for (const definition of [openpackDefinition, randcmDefinition]) {
	// eslint-disable-next-line no-await-in-loop
	await createGlobalApplicationCommand(definition);
}
