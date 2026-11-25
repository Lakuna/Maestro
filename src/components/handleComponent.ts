import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import editOriginalInteractionResponse from "../discord/interactions/receivingAndResponding/editOriginalInteractionResponse.js";
import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";
import embedForError from "../utility/embedForError.js";

/**
 * Handle a Discord message component interaction.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default async function handleComponent(
	data: DeepReadonly<infer_<typeof interaction>>
): Promise<void> {
	let body: infer_<typeof editWebhookMessage> | undefined = void 0;
	try {
		if (data.type !== InteractionType.MESSAGE_COMPONENT) {
			throw new Error(
				"Attempted to handle a non-message component as a message component."
			);
		}

		// eslint-disable-next-line no-console, no-warning-comments
		console.info(JSON.stringify(data)); // TODO: Delete.

		switch (data.data.custom_id) {
			default:
				throw new Error("Invalid component ID.");
		}
	} catch (e) {
		body ??= { embeds: [embedForError(e)] };
	}

	try {
		await editOriginalInteractionResponse(
			data.application_id,
			data.token,
			body
		);
	} catch (e) {
		await editOriginalInteractionResponse(data.application_id, data.token, {
			embeds: [embedForError(e)]
		});
	}
}
