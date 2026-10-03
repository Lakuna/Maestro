import type { infer as infer_ } from "zod";

import type editWebhookMessage from "../../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type simpleDeck from "../../../utility/simpleDeck.js";

import combineBoards from "../../../utility/combineBoards.js";
import makeMarkdownList from "../../../utility/makeMarkdownList.js";
import parseTypeLine from "../../../utility/parseTypeLine.js";
import poolFromPacks from "../../../utility/poolFromPacks.js";
import stringifyCard from "../../../utility/stringifyCard.js";

/**
 * Deck check for Sealed Deck.
 * @param deck - The deck to check.
 * @param setCode - The code of the set from which the packs come.
 * @param seeds - The seeds of the packs.
 * @returns The Discord interaction response.
 * @internal
 */
export default function sealedHandler(
	deck: DeepReadonly<infer_<typeof simpleDeck>>,
	setCode: string,
	seeds: readonly number[] | string
): infer_<typeof editWebhookMessage> {
	const pool = poolFromPacks(setCode, seeds);

	const { mainboard, sideboard } = deck.boards;

	const problems = [];

	const mainboardSize =
		mainboard?.reduce((total, { count }) => total + count, 0) ?? 0;
	if (mainboardSize < 40) {
		problems.push(
			`Mainboard too small (has ${mainboardSize.toString()}, needs at least 40).`
		);
	}

	for (const cards of combineBoards(mainboard ?? [], sideboard ?? [])) {
		const { card } = cards;

		// Ignore marketing cards.
		if (card.collectorNumber === "NaN") {
			continue;
		}

		// Allow unlimited of any basic land.
		const [supertypes] = parseTypeLine(card.typeLine ?? "");
		if (supertypes.includes("Basic")) {
			continue;
		}

		const cardStr = stringifyCard(card);

		if (card.set !== setCode) {
			problems.push(
				`Invalid set for ${cardStr} (is \`${card.set ?? "undefined"}\`), expected \`${setCode}\`).`
			);
			continue;
		}

		if (!card.collectorNumber) {
			problems.push(`Missing collector number for ${cardStr}.`);
			continue;
		}

		const mainboardCount =
			mainboard?.find(
				(value) =>
					value.card.set === card.set &&
					value.card.collectorNumber === card.collectorNumber &&
					value.card.foil === card.foil
			)?.count ?? 0;
		const sideboardCount =
			sideboard?.find(
				(value) =>
					value.card.set === card.set &&
					value.card.collectorNumber === card.collectorNumber &&
					value.card.foil === card.foil
			)?.count ?? 0;
		const poolCount =
			pool.find(
				// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
				(value) =>
					value.card.set === card.set &&
					value.card.collectorNumber === card.collectorNumber &&
					value.card.foil === card.foil
			)?.count ?? 0;
		if (mainboardCount + sideboardCount > poolCount) {
			// Maximum copies.
			problems.push(
				`Too many copies of ${cardStr} (${mainboardCount.toString()} mainboard, ${sideboardCount.toString()} sideboard; must be ${poolCount.toString()} total).`
			);
		} else if (mainboardCount + sideboardCount < poolCount) {
			problems.push(
				`Too few copies of ${cardStr} (${mainboardCount.toString()} mainboard, ${sideboardCount.toString()} sideboard; must be ${poolCount.toString()} total).`
			);
		}
	}

	const deckNameStr =
		deck.name ?
			deck.url ?
				`[${deck.name}](${deck.url})`
			:	deck.name
		:	"`undefined`";

	if (problems.length) {
		return {
			embeds: [
				{
					color: 0xff0000,
					description: `${deckNameStr} is not a legal Sealed Deck deck.\n${makeMarkdownList(problems)}`,
					title: "Illegal Deck"
				}
			]
		};
	}

	return {
		embeds: [
			{
				color: 0x00ff00,
				description: `${deckNameStr} is a legal Sealed Deck deck.`,
				title: "Legal Deck"
			}
		]
	};
}
