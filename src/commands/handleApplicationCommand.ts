import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import editOriginalInteractionResponse from "../discord/interactions/receivingAndResponding/editOriginalInteractionResponse.js";
import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";
import embedForError from "../utility/embedForError.js";
import checkClassicMagicDeckDefinition from "./definitions/checkClassicMagicDeckDefinition.js";
import checkTribalWarsDeckDefinition from "./definitions/checkTribalWarsDeckDefinition.js";
import deckcheckDefinition from "./definitions/deckcheckDefinition.js";
import openpackDefinition from "./definitions/openpackDefinition.js";
import randcmDefinition from "./definitions/randcmDefinition.js";
import checkClassicMagicDeckHandler from "./handlers/checkClassicMagicDeckHandler.js";
import checkTribalWarsDeckHandler from "./handlers/checkTribalWarsDeckHandler.js";
import deckcheckHandler from "./handlers/deckcheckHandler.js";
import openpackHandler from "./handlers/openpackHandler.js";
import randcmHandler from "./handlers/randcmHandler.js";

/**
 * Respond to an application command.
 * @param data - The application command data.
 * @returns The interaction response.
 * @internal
 */
export default async function handleApplicationCommand(
	data: DeepReadonly<infer_<typeof interaction>>
): Promise<void> {
	let body: infer_<typeof editWebhookMessage> | undefined = void 0;
	try {
		if (data.type !== InteractionType.APPLICATION_COMMAND) {
			throw new Error(
				"Attempted to handle a non-application command as an application command."
			);
		}

		switch (data.data.name) {
			case checkClassicMagicDeckDefinition.name:
				body ??= await checkClassicMagicDeckHandler(data.data);
				break;
			case checkTribalWarsDeckDefinition.name:
				body ??= await checkTribalWarsDeckHandler(data.data);
				break;
			case deckcheckDefinition.name:
				body ??= await deckcheckHandler(data.data);
				break;
			case openpackDefinition.name:
				body ??= await openpackHandler(data.data);
				break;
			case randcmDefinition.name:
				body ??= randcmHandler(data.data);
				break;
			default:
				throw new Error("Invalid command name.");
		}
	} catch (e) {
		body ??= { embeds: [embedForError(e)] };
	}

	try {
		await editOriginalInteractionResponse(
			data.application_id,
			data.token,
			body
		);
	} catch (e) {
		await editOriginalInteractionResponse(data.application_id, data.token, {
			embeds: [embedForError(e)]
		});
	}
}
