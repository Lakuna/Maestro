import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";
import userAgent from "../utility/userAgent.js";
import openpackDefinition from "./definitions/openpackDefinition.js";
import randcmDefinition from "./definitions/randcmDefinition.js";
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
		body ??= {
			embeds: [
				{
					color: 0xff0000,
					description:
						typeof e === "string" ? e
						: e instanceof Error ? e.message
						: `\`\`\`json\n${JSON.stringify(e)}\n\`\`\``,
					title: "Error"
				}
			]
		};
	}

	// https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response
	await fetch(
		`https://discord.com/api/v10/webhooks/${data.application_id}/${data.token}/messages/@original`,
		{
			body: JSON.stringify(body),
			headers: {
				/* eslint-disable @typescript-eslint/naming-convention */
				"Content-Type": "application/json",
				"User-Agent": userAgent
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			method: "PATCH"
		}
	);
}
