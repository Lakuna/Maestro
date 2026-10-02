import type { infer as infer_ } from "zod";

import type componentInteractionResponse from "../discord/interactions/receivingAndResponding/componentInteractionResponse.js";
import type { DeepReadonly } from "./DeepReadonly.js";

import ComponentType from "../discord/components/ComponentType.js";

/**
 * Get the component with the given custom ID from the given list of components, even if it is nested within another component.
 * @param components - The list of components.
 * @param customId - The custom ID of the component to search for.
 * @returns The found component.
 * @internal
 */
export default function findComponent(
	components: readonly DeepReadonly<
		infer_<typeof componentInteractionResponse>
	>[],
	customId: string
): DeepReadonly<infer_<typeof componentInteractionResponse>> | undefined {
	for (const c of components) {
		switch (c.type) {
			case ComponentType.CHANNEL_SELECT:
			case ComponentType.CHECKBOX:
			case ComponentType.CHECKBOX_GROUP:
			case ComponentType.FILE_UPLOAD:
			case ComponentType.MENTIONABLE_SELECT:
			case ComponentType.RADIO_GROUP:
			case ComponentType.ROLE_SELECT:
			case ComponentType.STRING_SELECT:
			case ComponentType.TEXT_INPUT:
			case ComponentType.USER_SELECT:
				if (c.custom_id === customId) {
					return c;
				}

				break;
			case ComponentType.LABEL: {
				if (c.component.custom_id === customId) {
					return c.component;
				}

				break;
			}
			default:
		}
	}

	return void 0;
}
