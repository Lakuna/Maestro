import type { infer as infer_ } from "zod";

import type editWebhookMessage from "../../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type simpleDeck from "../../../utility/simpleDeck.js";

import setMap from "../../../collation/setMap.js";
import combineBoards from "../../../utility/combineBoards.js";
import makeMarkdownList from "../../../utility/makeMarkdownList.js";
import parseTypeLine from "../../../utility/parseTypeLine.js";

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
	const actualSeeds =
		typeof seeds === "string" ?
			seeds.split(/[,\s]+/u).map((seed) => parseInt(seed, 10))
		:	seeds;

	// Get the collation details for the specified set.
	const setResult = Array.from(setMap.entries()).find(
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		([{ code }]) => code === setCode
	);
	if (!setResult) {
		throw new Error(
			`Invalid set code. The valid set codes are: ${Array.from(setMap.keys())
				.map(({ code }) => `\`${code}\``)
				.join(", ")}.`
		);
	}

	// Get the full list of cards in the player's card pool.
	const [set, packFn] = setResult;
	const collectorNumbersPool = actualSeeds.reduce<Map<string, number>>(
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		(pool, seed) => {
			for (const collectorNumber of packFn(seed)) {
				pool.set(collectorNumber, (pool.get(collectorNumber) ?? 0) + 1);
			}

			return pool;
		},
		new Map()
	);

	const mainboard = deck.boards["mainboard"] ?? [];
	const sideboard = deck.boards["sideboard"] ?? [];

	const problems = [];

	const mainboardSize = mainboard.reduce(
		(total, { count }) => total + count,
		0
	);
	if (mainboardSize < 40) {
		problems.push(
			`Mainboard too small (has ${mainboardSize.toString()}, needs at least 40).`
		);
	}

	for (const cards of combineBoards(mainboard, sideboard)) {
		const { card } = cards;
		const name = card.name ?? "`undefined`";

		// Allow unlimited of any basic land.
		const [supertypes] = parseTypeLine(card.typeLine ?? "");
		if (supertypes.includes("Basic")) {
			continue;
		}

		if (card.set !== set.code) {
			problems.push(
				`Invalid set for ${name} (is \`${card.set ?? "undefined"}\`), expected \`${set.code}\`).`
			);
			continue;
		}

		if (!card.collectorNumber) {
			problems.push(`Missing collector number for ${name}.`);
			continue;
		}

		const mainboardCount =
			mainboard.find((value) => value.card.name === card.name)?.count ?? 0;
		const sideboardCount =
			sideboard.find((value) => value.card.name === card.name)?.count ?? 0;
		const poolCount = collectorNumbersPool.get(card.collectorNumber) ?? 0;
		if (mainboardCount + sideboardCount > poolCount) {
			// Maximum copies.
			problems.push(
				`Too many copies of ${name} (${mainboardCount.toString()} mainboard, ${sideboardCount.toString()} sideboard; must be ${poolCount.toString()} total).`
			);
		} else if (mainboardCount + sideboardCount < poolCount) {
			problems.push(
				`Too few copies of ${name} (${mainboardCount.toString()} mainboard, ${sideboardCount.toString()} sideboard; must be ${poolCount.toString()} total).`
			);
		}
	}

	const nameString =
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
					description: `${nameString} is not a legal Sealed Deck deck.\n${makeMarkdownList(problems)}`,
					title: "Illegal Deck"
				}
			]
		};
	}

	return {
		embeds: [
			{
				color: 0x00ff00,
				description: `${nameString} is a legal Sealed Deck deck.`,
				title: "Legal Deck"
			}
		]
	};
}
