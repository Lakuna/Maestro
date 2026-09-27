import type { infer as infer_ } from "zod";

import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import MessageFlag from "../discord/resources/message/MessageFlag.js";
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
	data: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof interactionResponse>> {
	// eslint-disable-next-line no-console, no-warning-comments
	console.info(6); // TODO: Delete.

	try {
		switch (data.name) {
			case openpackDefinition.name:
				// eslint-disable-next-line no-console, no-warning-comments
				console.info(7); // TODO: Delete.

				return await openpackHandler(data);
			case randcmDefinition.name:
				return randcmHandler(data);
			default:
				throw new Error("Invalid command name.");
		}
	} catch (e) {
		// eslint-disable-next-line no-console, no-warning-comments
		console.error(e); // TODO: Delete.

		return {
			data: {
				embeds: [
					{
						color: 0xff0000,
						description:
							typeof e === "string" ? e
							: e instanceof Error ? e.message
							: `\`\`\`json\n${JSON.stringify(e)}\n\`\`\``,
						title: "Error"
					}
				],
				flags: MessageFlag.EPHEMERAL
			},
			type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
		};
	}
}
