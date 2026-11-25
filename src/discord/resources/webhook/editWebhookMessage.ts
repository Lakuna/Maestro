import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type editWebhookMessageBody from "./editWebhookMessageBody.js";

import userAgent from "../../../utility/userAgent.js";

/**
 * Edit webhook message.
 * @param applicationId - The ID of the app making the interaction.
 * @param interactionToken - The token associated with the specific interaction.
 * @param messageId - The webhook message ID.
 * @param body - The edit webhook message body.
 * @returns When complete.
 * @see {@link https://docs.discord.com/developers/resources/webhook#edit-webhook-message}
 * @internal
 */
export default async function editWebhookMessage(
	applicationId: string,
	interactionToken: string,
	messageId: string,
	body: DeepReadonly<infer_<typeof editWebhookMessageBody>>
): Promise<void> {
	const response = await fetch(
		`https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}/messages/${messageId}`,
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
