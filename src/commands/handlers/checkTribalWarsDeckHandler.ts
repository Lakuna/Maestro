import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import getMessageContent from "../../utility/getMessageContent.js";
import informDeck from "../../utility/informDeck.js";
import parseDeckList from "../../utility/parseDeckList.js";
import tribalHandler from "./deckcheck/tribalHandler.js";

/**
 * Handle the `Check Tribal Wars Deck` message command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function checkTribalWarsDeckHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof editWebhookMessage>> {
	return await tribalHandler(
		await informDeck(parseDeckList(getMessageContent(commandData)))
	);
}
