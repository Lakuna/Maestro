import type { infer as infer_ } from "zod";

import type modalSubmitData from "../../discord/interactions/receivingAndResponding/modalSubmitData.js";
import type editWebhookMessageBody from "../../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import classicHandler from "../../commands/handlers/deckcheck/classicHandler.js";
import ComponentType from "../../discord/components/ComponentType.js";
import informDeck from "../../mtg/informDeck.js";
import parseDeckList from "../../mtg/parseDeckList.js";
import findComponent from "../../utility/findComponent.js";
import { CCMDMODAL_DECKLIST_ID } from "../definitions/ccmdmodalDefinition.js";

export default async function ccmdmodalHandler(
	commandData: DeepReadonly<infer_<typeof modalSubmitData>>
): Promise<infer_<typeof editWebhookMessageBody>> {
	const decklistComponent = findComponent(
		commandData.components,
		CCMDMODAL_DECKLIST_ID
	);
	if (decklistComponent?.type !== ComponentType.TEXT_INPUT) {
		throw new Error(
			`Unexpected type \`${decklistComponent?.type?.toString() ?? "undefined"}\` for \`${CCMDMODAL_DECKLIST_ID}\` component.`
		);
	}

	return classicHandler(
		await informDeck(parseDeckList(decklistComponent.value))
	);
}
