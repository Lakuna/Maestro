import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type embed from "../discord/resources/message/embed.js";
import type editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";
import userAgent from "../utility/userAgent.js";
import checkTribalWarsDeckDefinition from "./definitions/checkTribalWarsDeckDefinition.js";
import deckcheckDefinition from "./definitions/deckcheckDefinition.js";
import openpackDefinition from "./definitions/openpackDefinition.js";
import randcmDefinition from "./definitions/randcmDefinition.js";
import checkTribalWarsDeckHandler from "./handlers/checkTribalWarsDeckHandler.js";
import deckcheckHandler from "./handlers/deckcheckHandler.js";
import openpackHandler from "./handlers/openpackHandler.js";
import randcmHandler from "./handlers/randcmHandler.js";

const embedForError = (e: unknown): infer_<typeof embed> => {
	let description =
		typeof e === "string" ? e
		: e instanceof Error ? e.message
		: JSON.stringify(e);

	try {
		JSON.parse(description);
		description = `\`\`\`json\n${description}\n\`\`\``;
	} catch {
		// `description` is not JSON, display it as-is.
	}

	if (description.length > 4096) {
		// There isn't an easy way to display longer messages than this within Discord, so fall back to the console.
		// eslint-disable-next-line no-console
		console.error(description);

		description = "Error description too long to display (check console).";
	}

	return { color: 0xff0000, description, title: "Error" };
};

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
			case checkTribalWarsDeckDefinition.name:
				body ??= await checkTribalWarsDeckHandler(data.data);
				break;
			case deckcheckDefinition.name:
				body ??= await deckcheckHandler(data.data);
				break;
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
		body ??= { embeds: [embedForError(e)] };
	}

	// https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response
	const url = `https://discord.com/api/v10/webhooks/${data.application_id}/${data.token}/messages/@original`;
	try {
		const response = await fetch(url, {
			body: JSON.stringify(body),
			headers: {
				/* eslint-disable @typescript-eslint/naming-convention */
				"Content-Type": "application/json",
				"User-Agent": userAgent
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			method: "PATCH"
		});
		if (!response.ok) {
			throw new Error(await response.text());
		}
	} catch (e) {
		await fetch(url, {
			body: JSON.stringify({ embeds: [embedForError(e)] } satisfies infer_<
				typeof editWebhookMessage
			>),
			headers: {
				/* eslint-disable @typescript-eslint/naming-convention */
				"Content-Type": "application/json",
				"User-Agent": userAgent
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			method: "PATCH"
		});
	}
}
