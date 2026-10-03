import "dotenv/config";

import checkClassicMagicDeckDefinition from "./commands/definitions/checkClassicMagicDeckDefinition.js";
import checkSealedDeckDefinition from "./commands/definitions/checkSealedDeck.js";
import checkTribalWarsDeckDefinition from "./commands/definitions/checkTribalWarsDeckDefinition.js";
import deckcheckDefinition from "./commands/definitions/deckcheckDefinition.js";
import openpackDefinition from "./commands/definitions/openpackDefinition.js";
import randcmDefinition from "./commands/definitions/randcmDefinition.js";
import sealedpoolDefinition from "./commands/definitions/sealedpool.js";
import createGlobalApplicationCommand from "./discord/interactions/applicationCommands/createGlobalApplicationCommand.js";

const [, , ...nameParts] = process.argv;
const name = nameParts.join(" ");
if (!name) {
	throw new Error("Missing command name.");
}

const definitions = [
	checkClassicMagicDeckDefinition,
	checkSealedDeckDefinition,
	checkTribalWarsDeckDefinition,
	deckcheckDefinition,
	openpackDefinition,
	randcmDefinition,
	sealedpoolDefinition
];
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const definition = definitions.find((value) => value.name === name);
if (!definition) {
	throw new Error(
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		`Unknown command name \`${name}\` (expected one of ${definitions.map((value) => `\`${value.name}\``).join(", ")}).`
	);
}

await createGlobalApplicationCommand(definition);
