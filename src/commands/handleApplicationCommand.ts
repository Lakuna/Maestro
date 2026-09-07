import type { infer as infer_ } from "zod";

import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import MessageFlag from "../discord/resources/message/MessageFlag.js";
import openpackDefinition from "./definitions/openpackDefinition.js";
import openpackHandler from "./handlers/openpackHandler.js";

/**
 * Respond to an application command.
 * @param data - The application command data.
 * @returns The interaction response.
 * @internal
 */
export default async function handleApplicationCommand(
	data: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof interactionResponse>> {
	try {
		switch (data.name) {
			case openpackDefinition.name:
				return await openpackHandler(data);
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
