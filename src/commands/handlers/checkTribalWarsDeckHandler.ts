import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessageBody from "../../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import informDeck from "../../mtg/informDeck.js";
import parseDeckList from "../../mtg/parseDeckList.js";
import getMessageContent from "../../utility/getMessageContent.js";
import tribalHandler from "./deckcheck/tribalHandler.js";

/**
 * Handle the `Check Tribal Wars Deck` message command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function checkTribalWarsDeckHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof editWebhookMessageBody>> {
	return await tribalHandler(
		await informDeck(parseDeckList(getMessageContent(commandData)))
	);
}
