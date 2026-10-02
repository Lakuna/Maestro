import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ComponentType from "../../discord/components/ComponentType.js";
import TextInputStyle from "../../discord/components/TextInputStyle.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import {
	CSDMODAL_DECKLIST_ID,
	CSDMODAL_ID,
	CSDMODAL_SEEDS_ID,
	CSDMODAL_SET_ID
} from "../../modals/definitions/csdmodalDefinition.js";
import getMessageContent from "../../utility/getMessageContent.js";

/**
 * Handle the `Check Sealed Deck` message command.
 * @param data - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function checkSealedDeckHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof interactionResponse> {
	return {
		/* eslint-disable @typescript-eslint/naming-convention */
		data: {
			components: [
				{
					component: {
						custom_id: CSDMODAL_SET_ID,
						max_length: 3,
						min_length: 3,
						style: TextInputStyle.SHORT,
						type: ComponentType.TEXT_INPUT
					},
					description: "The code of the set.",
					label: "Set",
					type: ComponentType.LABEL
				},
				{
					component: {
						custom_id: CSDMODAL_SEEDS_ID,
						style: TextInputStyle.SHORT,
						type: ComponentType.TEXT_INPUT
					},
					description:
						"The comma- and/or whitespace-separated seeds to use in the PRNG.",
					label: "Seeds",
					type: ComponentType.LABEL
				},
				{
					component: {
						custom_id: CSDMODAL_DECKLIST_ID,
						style: TextInputStyle.PARAGRAPH,
						type: ComponentType.TEXT_INPUT,
						value: getMessageContent(commandData)
					},
					description:
						"The deck list in Moxfield, Arena, MTGO, or plain text format.",
					label: "Deck List",
					type: ComponentType.LABEL
				}
			],
			custom_id: CSDMODAL_ID,
			title: "Check Sealed Deck"
		},
		type: InteractionCallbackType.MODAL
		/* eslint-enable @typescript-eslint/naming-convention */
	};
}
