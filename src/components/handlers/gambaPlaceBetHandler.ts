import type { infer as infer_ } from "zod";

import type { messageComponentInteraction } from "../../discord/interactions/receivingAndResponding/interaction.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ComponentType from "../../discord/components/ComponentType.js";
import TextInputStyle from "../../discord/components/TextInputStyle.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import {
	PLACEBETMODAL_COINS_ID,
	PLACEBETMODAL_ID,
	PLACEBETMODAL_VALUE_ID
} from "../../modals/definitions/gambamodalDefinition.js";

/**
 * Handle the gambling instance `placebet` button message component.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function gambaPlaceBetHandler(
	commandData: DeepReadonly<infer_<typeof messageComponentInteraction>>
): infer_<typeof interactionResponse> {
	if (!commandData.message) {
		throw new Error("No message.");
	}

	const [embed] = commandData.message.embeds;
	if (!embed) {
		throw new Error("No embed.");
	}

	if (!embed.title) {
		throw new Error("No embed title.");
	}

	const matches = /(?<gambaId>-?\d+)/u.exec(embed.title);
	const gambaId = parseInt(matches?.groups?.["gambaId"] ?? "", 10) - 1;
	if (isNaN(gambaId)) {
		throw new Error("Invalid gambling instance ID in embed title.");
	}

	if (!embed.fields) {
		throw new Error("No embed fields.");
	}

	const values = embed.fields.map((field) => field.name);

	return {
		/* eslint-disable @typescript-eslint/naming-convention */
		data: {
			components: [
				{
					component: {
						custom_id: PLACEBETMODAL_VALUE_ID,
						options: values.map((value) => ({ label: value, value })),
						type: ComponentType.RADIO_GROUP
					},
					description: "The option that you predict will win the bet.",
					label: "Prediction",
					type: ComponentType.LABEL
				},
				{
					component: {
						custom_id: PLACEBETMODAL_COINS_ID,
						style: TextInputStyle.SHORT,
						type: ComponentType.TEXT_INPUT
					},
					description:
						"The amount of coins you are betting. Must be at least 100.",
					label: "Wager",
					type: ComponentType.LABEL
				}
			],
			custom_id: PLACEBETMODAL_ID,
			title: "Place Bet"
		},
		type: InteractionCallbackType.MODAL
		/* eslint-enable @typescript-eslint/naming-convention */
	};
}
