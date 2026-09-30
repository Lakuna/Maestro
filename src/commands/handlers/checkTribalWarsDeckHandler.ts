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
	const content = getMessageContent(commandData);
	// eslint-disable-next-line no-console, no-warning-comments
	console.info(content); // TODO: Delete.

	const simpleDeck = parseDeckList(content);
	// eslint-disable-next-line no-console, no-warning-comments
	console.info(simpleDeck); // TODO: Delete.

	const deck = await informDeck(simpleDeck);
	// eslint-disable-next-line no-console, no-warning-comments
	console.info(deck); // TODO: Delete.

	return await tribalHandler(deck);
}
