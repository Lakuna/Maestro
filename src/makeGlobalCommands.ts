/* eslint-disable no-console */
import "dotenv/config";

import deckcheckDefinition from "./commands/deckcheck.js";
import createGlobalApplicationCommand from "./discord/interactions/applicationCommands/createGlobalApplicationCommand.js";

console.info(await createGlobalApplicationCommand(deckcheckDefinition));
