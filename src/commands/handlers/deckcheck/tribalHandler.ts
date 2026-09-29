import type { infer as infer_ } from "zod";

import type editWebhookMessage from "../../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type simpleDeck from "../../../utility/simpleDeck.js";

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
	deck: DeepReadonly<infer_<typeof simpleDeck>>
): Promise<infer_<typeof editWebhookMessage>> {
	const subtypeMap = new Map<string, number>();
	for (const creatureType of (await getCatalogCreatureTypes()).data) {
		subtypeMap.set(creatureType, 0);
	}

	const mainboard = deck.boards["mainboard"] ?? [];
	for (const cards of mainboard) {
		const { card, count } = cards;
		if (!card.typeLine) {
			continue;
		}

		for (const subtype of parseTypeLine(card.typeLine)[2]) {
			if (!subtypeMap.has(subtype)) {
				continue;
			}

			subtypeMap.set(subtype, (subtypeMap.get(subtype) ?? 0) + count);
		}
	}

	const nameString =
		deck.name ?
			deck.url ?
				`[${deck.name}](${deck.url})`
			:	deck.name
		:	"`undefined`";

	const mainboardSize = mainboard.reduce(
		(total, { count }) => total + count,
		0
	);
	const legalSubtypes = [...subtypeMap.entries()]
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.filter(([, quantity]) => quantity >= mainboardSize / 3)
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.map(([subtype]) => subtype);
	if (legalSubtypes.length < 1) {
		return {
			embeds: [
				{
					color: 0xff0000,
					description: `${nameString} is not a legal Tribal Wars deck.`,
					title: "Illegal Deck"
				}
			]
		};
	}

	return {
		embeds: [
			{
				color: 0x00ff00,
				description: `${nameString} is a legal Tribal Wars deck for the following tribes:\n${makeMarkdownList(legalSubtypes)}`,
				title: "Legal Deck"
			}
		]
	};
}
