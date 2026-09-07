import "dotenv/config";

import getGlobalApplicationCommands from "./discord/interactions/applicationCommands/getGlobalApplicationCommands.js";

// eslint-disable-next-line no-console
console.info(await getGlobalApplicationCommands());
