import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type editWebhookMessage from "../../resources/webhook/editWebhookMessage.js";

import userAgent from "../../../utility/userAgent.js";

/**
 * Edit original interaction response.
 * @param applicationId - The ID of the app making the interaction.
 * @param interactionToken - The token associated with the specific interaction.
 * @param body - The edit webhook message body.
 * @returns When complete.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response}
 * @internal
 */
export default async function editOriginalInteractionResponse(
	applicationId: string,
	interactionToken: string,
	body: DeepReadonly<infer_<typeof editWebhookMessage>>
): Promise<void> {
	const response = await fetch(
		`https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}/messages/@original`,
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
	if (!response.ok) {
		throw new Error(await response.text());
	}
}
