import type { infer as infer_ } from "zod";

import type { messageComponentInteraction } from "../discord/interactions/receivingAndResponding/interaction.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../utility/DeepReadonly.js";

/**
 * Handle special cases for an application command.
 * @param data - The application command data.
 * @returns The interaction response to return, or `undefined` to continue to normal handling behavior.
 * @internal
 */
export default function preHandleComponent(
	data: DeepReadonly<infer_<typeof messageComponentInteraction>>
): infer_<typeof interactionResponse> | undefined {
	switch (data.data.custom_id) {
		default:
			return void 0;
	}
}
