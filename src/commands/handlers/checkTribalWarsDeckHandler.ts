import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

/**
 * Handle the `Check Tribal Wars Deck` message command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function checkTribalWarsDeckHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof editWebhookMessage> {
	return {
		embeds: [
			{
				description: "Hello, message command!",
				fields: [
					{
						inline: true,
						name: "Message ID",
						value: commandData.target_id ?? "`undefined`"
					},
					{
						inline: true,
						name: "Resolved Messages",
						value: Object.keys(commandData.resolved?.messages ?? {})
							.map((key) => `\`${key}\``)
							.join(", ")
					}
				]
			}
		]
	};
}
