import type { infer as infer_ } from "zod";

import type modalSubmitData from "../../discord/interactions/receivingAndResponding/modalSubmitData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import sealedHandler from "../../commands/handlers/deckcheck/sealedHandler.js";
import ComponentType from "../../discord/components/ComponentType.js";
import informDeck from "../../utility/informDeck.js";
import parseDeckList from "../../utility/parseDeckList.js";
import {
	CSDMODAL_DECKLIST_ID,
	CSDMODAL_SEEDS_ID,
	CSDMODAL_SET_ID
} from "../definitions/csdmodalDefinition.js";

export default async function csdmodalHandler(
	commandData: DeepReadonly<infer_<typeof modalSubmitData>>
): Promise<infer_<typeof editWebhookMessage>> {
	const setComponent = commandData.components.find(
		(component) =>
			component.type === ComponentType.TEXT_INPUT &&
			component.custom_id === CSDMODAL_SET_ID
	);
	if (setComponent?.type !== ComponentType.TEXT_INPUT) {
		throw new Error(
			`Unexpected type \`${setComponent?.type?.toString() ?? "undefined"}\` for \`${CSDMODAL_SET_ID}\` component.`
		);
	}

	const seedsComponent = commandData.components.find(
		(component) =>
			component.type === ComponentType.TEXT_INPUT &&
			component.custom_id === CSDMODAL_SEEDS_ID
	);
	if (seedsComponent?.type !== ComponentType.TEXT_INPUT) {
		throw new Error(
			`Unexpected type \`${seedsComponent?.type?.toString() ?? "undefined"}\` for \`${CSDMODAL_SEEDS_ID}\` component.`
		);
	}

	const decklistComponent = commandData.components.find(
		(component) =>
			component.type === ComponentType.TEXT_INPUT &&
			component.custom_id === CSDMODAL_DECKLIST_ID
	);
	if (decklistComponent?.type !== ComponentType.TEXT_INPUT) {
		throw new Error(
			`Unexpected type \`${decklistComponent?.type?.toString() ?? "undefined"}\` for \`${CSDMODAL_DECKLIST_ID}\` component.`
		);
	}

	return sealedHandler(
		await informDeck(parseDeckList(decklistComponent.value)),
		setComponent.value,
		seedsComponent.value
	);
}
