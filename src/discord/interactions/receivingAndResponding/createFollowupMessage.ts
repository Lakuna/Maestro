import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type executeWebhookBody from "../../resources/webhook/executeWebhookBody.js";

import userAgent from "../../../utility/userAgent.js";

/**
 * Create followup message.
 * @param applicationId - The ID of the app making the interaction.
 * @param interactionToken - The token associated with the specific interaction.
 * @param body - The create followup message body.
 * @returns When complete.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#create-followup-message}
 * @internal
 */
export default async function createFollowupMessage(
	applicationId: string,
	interactionToken: string,
	body: DeepReadonly<infer_<typeof executeWebhookBody>>
): Promise<void> {
	const response = await fetch(
		`https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}`,
		{
			body: JSON.stringify(body),
			headers: {
				/* eslint-disable @typescript-eslint/naming-convention */
				"Content-Type": "application/json",
				"User-Agent": userAgent
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			method: "POST"
		}
	);
	if (!response.ok) {
		throw new Error(await response.text());
	}
}
