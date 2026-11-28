import type { infer as infer_ } from "zod";

import type modalSubmitData from "../../discord/interactions/receivingAndResponding/modalSubmitData.js";
import type editWebhookMessageBody from "../../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import tribalHandler from "../../commands/handlers/deckcheck/tribalHandler.js";
import ComponentType from "../../discord/components/ComponentType.js";
import informDeck from "../../mtg/informDeck.js";
import parseDeckList from "../../mtg/parseDeckList.js";
import findComponent from "../../utility/findComponent.js";
import { CTWDMODAL_DECKLIST_ID } from "../definitions/ctwdmodalDefinition.js";

export default async function ctwdmodalHandler(
	commandData: DeepReadonly<infer_<typeof modalSubmitData>>
): Promise<infer_<typeof editWebhookMessageBody>> {
	const decklistComponent = findComponent(
		commandData.components,
		CTWDMODAL_DECKLIST_ID
	);
	if (decklistComponent?.type !== ComponentType.TEXT_INPUT) {
		throw new Error(
			`Unexpected type \`${decklistComponent?.type?.toString() ?? "undefined"}\` for \`${CTWDMODAL_DECKLIST_ID}\` component.`
		);
	}

	return tribalHandler(
		await informDeck(parseDeckList(decklistComponent.value))
	);
}
