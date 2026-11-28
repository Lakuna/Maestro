import type { infer as infer_ } from "zod";

import type { messageComponentInteraction } from "../discord/interactions/receivingAndResponding/interaction.js";
import type executeWebhookBody from "../discord/resources/webhook/executeWebhookBody.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import createFollowupMessage from "../discord/interactions/receivingAndResponding/createFollowupMessage.js";
import editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import embedForError from "../utility/embedForError.js";
import {
	LEADERBOARD_NEXT_ID,
	LEADERBOARD_PREVIOUS_ID
} from "./definitions/leaderboardPreviousNextDefinition.js";
import leaderboardPreviousNextHandler from "./handlers/leaderboardPreviousNextHandler.js";

/**
 * Handle a Discord message component interaction.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default async function handleComponent(
	data: DeepReadonly<infer_<typeof messageComponentInteraction>>
): Promise<void> {
	let body: infer_<typeof executeWebhookBody> | undefined = void 0;
	try {
		switch (data.data.custom_id) {
			case LEADERBOARD_NEXT_ID:
				body ??= await leaderboardPreviousNextHandler(data, 1);
				break;
			case LEADERBOARD_PREVIOUS_ID:
				body ??= await leaderboardPreviousNextHandler(data, -1);
				break;
			default:
				throw new Error("Invalid component ID.");
		}
	} catch (e) {
		body ??= { embeds: [embedForError(e)] };
	}

	if (!data.message?.id) {
		try {
			await createFollowupMessage(data.application_id, data.token, body);
		} catch (e) {
			await createFollowupMessage(data.application_id, data.token, {
				embeds: [embedForError(e)]
			});
		}
		return;
	}

	try {
		await editWebhookMessage(
			data.application_id,
			data.token,
			data.message.id,
			body
		);
	} catch (e) {
		await editWebhookMessage(data.application_id, data.token, data.message.id, {
			embeds: [embedForError(e)]
		});
	}
}
