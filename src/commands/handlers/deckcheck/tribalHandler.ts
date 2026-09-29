import type { infer as infer_ } from "zod";

import type editWebhookMessage from "../../../discord/resources/webhook/editWebhookMessage.js";
import type deckSchema from "../../../moxfield/deck.js";
import type { DeepReadonly } from "../../../utility/DeepReadonly.js";

import getCatalogCreatureTypes from "../../../scryfall/getCatalogCreatureTypes.js";
import makeMarkdownList from "../../../utility/makeMarkdownList.js";
import parseTypeLine from "../../../utility/parseTypeLine.js";

/**
 * Deck check for Tribal Wars.
 * @param deck - The deck to check.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function tribalHandler(
	deck: DeepReadonly<infer_<typeof deckSchema>>
): Promise<infer_<typeof editWebhookMessage>> {
	const subtypeMap = new Map<string, number>();
	for (const creatureType of (await getCatalogCreatureTypes()).data) {
		subtypeMap.set(creatureType, 0);
	}

	for (const cards of Object.values(deck.boards.mainboard.cards)) {
		const { card } = cards;
		if (!card.type_line) {
			continue;
		}

		for (const subtype of parseTypeLine(card.type_line)[2]) {
			if (!subtypeMap.has(subtype)) {
				continue;
			}

			subtypeMap.set(subtype, (subtypeMap.get(subtype) ?? 0) + cards.quantity);
		}
	}

	const legalSubtypes = [...subtypeMap.entries()]
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.filter(([, quantity]) => quantity >= deck.boards.mainboard.count / 3)
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.map(([subtype]) => subtype);
	if (legalSubtypes.length < 1) {
		return {
			embeds: [
				{
					color: 0xff0000,
					description: `[${deck.name}](${deck.publicUrl}) is not a legal Tribal Wars deck.`,
					title: "Illegal Deck"
				}
			]
		};
	}

	return {
		embeds: [
			{
				color: 0x00ff00,
				description: `[${deck.name}](${deck.publicUrl}) is a legal Tribal Wars deck for the following tribes:\n${makeMarkdownList(legalSubtypes)}`,
				title: "Legal Deck"
			}
		]
	};
}
