import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

/**
 * Handle the `balance` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function balanceHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof editWebhookMessage> {
	// eslint-disable-next-line no-console
	console.info(commandData);

	return { embeds: [{ description: "WIP" }] };
}
