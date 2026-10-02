import type { infer as infer_ } from "zod";

import type interaction from "../discord/interactions/receivingAndResponding/interaction.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "../discord/interactions/receivingAndResponding/InteractionType.js";

/**
 * Handle a Discord modal submit interaction.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default function handleModal(
	data: DeepReadonly<infer_<typeof interaction>>
): infer_<typeof interactionResponse> | undefined {
	if (data.type !== InteractionType.MODAL_SUBMIT) {
		throw new Error(
			"Attempted to handle a non-application command as an application command."
		);
	}

	// eslint-disable-next-line no-console, no-warning-comments
	console.info(JSON.stringify(data)); // TODO: Delete.

	return {
		data: {},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
}
