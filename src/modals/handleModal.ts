import type { infer as infer_ } from "zod";

import type { modalSubmitInteraction } from "../discord/interactions/receivingAndResponding/interaction.js";
import type editWebhookMessageBody from "../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import editOriginalInteractionResponse from "../discord/interactions/receivingAndResponding/editOriginalInteractionResponse.js";
import embedForError from "../utility/embedForError.js";
import { CCMDMODAL_ID } from "./definitions/ccmdmodalDefinition.js";
import { CSDMODAL_ID } from "./definitions/csdmodalDefinition.js";
import { CTWDMODAL_ID } from "./definitions/ctwdmodalDefinition.js";
import ccmdmodalHandler from "./handlers/ccmdmodalHandler.js";
import csdmodalHandler from "./handlers/csdmodalHandler.js";
import ctwdmodalHandler from "./handlers/ctwdmodalHandler.js";

/**
 * Handle a Discord modal submit interaction.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default async function handleModal(
	data: DeepReadonly<infer_<typeof modalSubmitInteraction>>
): Promise<void> {
	let body: infer_<typeof editWebhookMessageBody> | undefined = void 0;
	try {
		switch (data.data.custom_id) {
			case CCMDMODAL_ID:
				body ??= await ccmdmodalHandler(data.data);
				break;
			case CSDMODAL_ID:
				body ??= await csdmodalHandler(data.data);
				break;
			case CTWDMODAL_ID:
				body ??= await ctwdmodalHandler(data.data);
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
