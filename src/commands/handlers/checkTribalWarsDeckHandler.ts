import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

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
	if (!commandData.target_id) {
		throw new Error("Missing target ID.");
	}

	if (!commandData.resolved?.messages) {
		throw new Error("Missing resolved messages.");
	}

	// eslint-disable-next-line capitalized-comments
	// prettier-ignore
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore TypeScript struggles with circular type references. This directive is required in some environments and not others (hence ts-ignore over ts-expect-error).
	const message: undefined | { content?: string | undefined } = commandData.resolved.messages[commandData.target_id];
	if (!message) {
		throw new Error(`Failed to resolve message \`${commandData.target_id}\`.`);
	}

	return await tribalHandler(
		await informDeck(parseDeckList(message.content ?? ""))
	);
}
