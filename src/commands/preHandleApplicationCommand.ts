import type { infer as infer_ } from "zod";

import type { applicationCommandInteraction } from "../discord/interactions/receivingAndResponding/interaction.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import checkSealedDeckDefinition from "./definitions/checkSealedDeck.js";
import deckcheckDefinition from "./definitions/deckcheckDefinition.js";
import checkSealedDeckHandler from "./handlers/checkSealedDeckHandler.js";
import deckcheckPreHandler from "./handlers/deckcheckPreHandler.js";

/**
 * Handle special cases for an application command.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default function preHandleApplicationCommand(
	data: DeepReadonly<infer_<typeof applicationCommandInteraction>>
): infer_<typeof interactionResponse> | undefined {
	switch (data.data.name) {
		case checkSealedDeckDefinition.name:
			return checkSealedDeckHandler(data.data);
		case deckcheckDefinition.name:
			return deckcheckPreHandler(data.data);
		default:
			return void 0;
	}
}
