import type { infer as infer_ } from "zod";

import type interaction from "../../discord/interactions/receivingAndResponding/interaction.js";
import type executeWebhookBody from "../../discord/resources/webhook/executeWebhookBody.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import leaderboardHandler from "../../commands/handlers/leaderboardHandler.js";

/**
 * Handle the Leaderboard `previous` and `next` button message components.
 * @param commandData - The Discord application command data.
 * @param offset - The offset to apply to the leaderboard's current page number.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function leaderboardPreviousNextHandler(
	commandData: DeepReadonly<infer_<typeof interaction>>,
	offset: number
): Promise<infer_<typeof executeWebhookBody>> {
	if (!commandData.message) {
		throw new Error("No message.");
	}

	const [embed] = commandData.message.embeds;
	if (!embed) {
		throw new Error("No embed.");
	}

	if (!embed.title) {
		throw new Error("No embed title.");
	}

	const matches = /(?<page>-?\d+)/u.exec(embed.title);
	const page = parseInt(matches?.groups?.["page"] ?? "", 10) - 1;
	if (isNaN(page)) {
		throw new Error("Invalid page in embed title.");
	}

	return await leaderboardHandler(page + offset);
}
