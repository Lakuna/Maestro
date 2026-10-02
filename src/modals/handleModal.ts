import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessage from "../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import editOriginalInteractionResponse from "../discord/interactions/receivingAndResponding/editOriginalInteractionResponse.js";
import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";
import embedForError from "../utility/embedForError.js";
import { CSDMODAL_ID } from "./definitions/csdmodalDefinition.js";
import csdmodalHandler from "./handlers/csdmodalHandler.js";

/**
 * Handle a Discord modal submit interaction.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default async function handleModal(
	data: DeepReadonly<infer_<typeof interaction>>
): Promise<void> {
	let body: infer_<typeof editWebhookMessage> | undefined = void 0;
	try {
		if (data.type !== InteractionType.MODAL_SUBMIT) {
			throw new Error(
				"Attempted to handle a non-application command as an application command."
			);
		}

		switch (data.data.custom_id) {
			case CSDMODAL_ID:
				body ??= csdmodalHandler(data.data);
				break;
			default:
				throw new Error("Invalid modal ID.");
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
