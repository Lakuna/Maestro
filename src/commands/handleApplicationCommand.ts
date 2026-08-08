import type { infer as zinfer } from "zod";

import type { DeepReadonly } from "../DeepReadonly.js";
import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";

import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import MessageFlag from "../discord/resources/message/MessageFlag.js";
import deckcheckDefinition, { deckcheckHandler } from "./deckcheck.js";

/**
 * Respond to an application command.
 * @param data - The application command data.
 * @returns The interaction response.
 * @internal
 */
export default async function handleApplicationCommand(
	data: DeepReadonly<zinfer<typeof applicationCommandData>>
): Promise<zinfer<typeof interactionResponse>> {
	try {
		switch (data.name) {
			case deckcheckDefinition.name:
				return await deckcheckHandler(data);
			default:
				throw new Error("Invalid command name.");
		}
	} catch (e) {
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
