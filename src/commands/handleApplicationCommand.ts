import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import editOriginalInteractionResponse from "../discord/interactions/receivingAndResponding/editOriginalInteractionResponse.js";
import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";
import embedForError from "../utility/embedForError.js";
import addbalDefinition from "./definitions/addbalDefinition.js";
import balanceDefinition from "./definitions/balanceDefinition.js";
import checkClassicMagicDeckDefinition from "./definitions/checkClassicMagicDeckDefinition.js";
import checkTribalWarsDeckDefinition from "./definitions/checkTribalWarsDeckDefinition.js";
import deckcheckDefinition from "./definitions/deckcheckDefinition.js";
import openpackDefinition from "./definitions/openpackDefinition.js";
import payDefinition from "./definitions/payDefinition.js";
import randcmDefinition from "./definitions/randcmDefinition.js";
import sealedpoolDefinition from "./definitions/sealedpool.js";
import seedgenDefinition from "./definitions/seedgen.js";
import setbalDefinition from "./definitions/setbalDefinition.js";
import timerDefinition from "./definitions/timerDefinition.js";
import addbalHandler from "./handlers/addbalHandler.js";
import balanceHandler from "./handlers/balanceHandler.js";
import checkClassicMagicDeckHandler from "./handlers/checkClassicMagicDeckHandler.js";
import checkTribalWarsDeckHandler from "./handlers/checkTribalWarsDeckHandler.js";
import deckcheckHandler from "./handlers/deckcheckHandler.js";
import openpackHandler from "./handlers/openpackHandler.js";
import payHandler from "./handlers/payHandler.js";
import randcmHandler from "./handlers/randcmHandler.js";
import sealedpoolHandler from "./handlers/sealedpoolHandler.js";
import seedgenHandler from "./handlers/seedgenHandler.js";
import setbalHandler from "./handlers/setbalHandler.js";
import timerHandler from "./handlers/timerHandler.js";

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
			case addbalDefinition.name:
				body ??= await addbalHandler(data.data, data.member);
				break;
			case balanceDefinition.name:
				body ??= await balanceHandler(
					data.data,
					data.member?.user ?? data.user
				);
				break;
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
			case payDefinition.name:
				body ??= await payHandler(data.data, data.member?.user ?? data.user);
				break;
			case randcmDefinition.name:
				body ??= randcmHandler(data.data);
				break;
			case sealedpoolDefinition.name:
				body ??= await sealedpoolHandler(data.data);
				break;
			case seedgenDefinition.name:
				body ??= seedgenHandler(data.data);
				break;
			case setbalDefinition.name:
				body ??= await setbalHandler(data.data, data.member);
				break;
			case timerDefinition.name:
				body ??= timerHandler(data.data);
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
