import type { infer as infer_ } from "zod";

import type { applicationCommandInteraction } from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessageBody from "../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import editOriginalInteractionResponse from "../discord/interactions/receivingAndResponding/editOriginalInteractionResponse.js";
import embedForError from "../utility/embedForError.js";
import addbalDefinition from "./definitions/addbalDefinition.js";
import balanceDefinition from "./definitions/balanceDefinition.js";
import checkClassicMagicDeckDefinition from "./definitions/checkClassicMagicDeckDefinition.js";
import checkTribalWarsDeckDefinition from "./definitions/checkTribalWarsDeckDefinition.js";
import deckcheckDefinition from "./definitions/deckcheckDefinition.js";
import gambaDefinition from "./definitions/gambaDefinition.js";
import leaderboardDefinition from "./definitions/leaderboardDefinition.js";
import openpackDefinition from "./definitions/openpackDefinition.js";
import payDefinition from "./definitions/payDefinition.js";
import sealedpoolDefinition from "./definitions/sealedpool.js";
import setbalDefinition from "./definitions/setbalDefinition.js";
import addbalHandler from "./handlers/addbalHandler.js";
import balanceHandler from "./handlers/balanceHandler.js";
import checkClassicMagicDeckHandler from "./handlers/checkClassicMagicDeckHandler.js";
import checkTribalWarsDeckHandler from "./handlers/checkTribalWarsDeckHandler.js";
import deckcheckHandler from "./handlers/deckcheckHandler.js";
import gambaHandler from "./handlers/gambaHandler.js";
import leaderboardHandler from "./handlers/leaderboardHandler.js";
import openpackHandler from "./handlers/openpackHandler.js";
import payHandler from "./handlers/payHandler.js";
import sealedpoolHandler from "./handlers/sealedpoolHandler.js";
import setbalHandler from "./handlers/setbalHandler.js";

/**
 * Respond to an application command.
 * @param data - The application command data.
 * @returns The interaction response.
 * @internal
 */
export default async function handleApplicationCommand(
	data: DeepReadonly<infer_<typeof applicationCommandInteraction>>
): Promise<void> {
	let body: infer_<typeof editWebhookMessageBody> | undefined = void 0;
	try {
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
			case gambaDefinition.name:
				body ??= await gambaHandler(data.data, data.member);
				break;
			case leaderboardDefinition.name:
				body ??= await leaderboardHandler();
				break;
			case openpackDefinition.name:
				body ??= await openpackHandler(data.data);
				break;
			case payDefinition.name:
				body ??= await payHandler(data.data, data.member?.user ?? data.user);
				break;
			case sealedpoolDefinition.name:
				body ??= await sealedpoolHandler(data.data);
				break;
			case setbalDefinition.name:
				body ??= await setbalHandler(data.data, data.member);
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
