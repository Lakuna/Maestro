import type { infer as infer_ } from "zod";

import type editWebhookMessage from "../../../discord/resources/webhook/editWebhookMessage.js";
import type deckSchema from "../../../moxfield/deck.js";
import type { DeepReadonly } from "../../../utility/DeepReadonly.js";

import makeMarkdownList from "../../../utility/makeMarkdownList.js";
import parseTypeLine from "../../../utility/parseTypeLine.js";

/**
 * Deck check for Classic Magic.
 * @param deck - The deck to check.
 * @returns The Discord interaction response.
 * @see {@link https://www.eternalcentral.com/classicmagicrules/}
 * @internal
 */
export default function classicHandler(
	deck: DeepReadonly<infer_<typeof deckSchema>>
): infer_<typeof editWebhookMessage> {
	const problems = [];
	const infos = [];
	if (deck.boards.mainboard.count < 60) {
		problems.push(
			`Mainboard too small (has ${deck.boards.mainboard.count.toString()}, needs at least 60).`
		);
	}
	if (deck.boards.sideboard.count > 15) {
		problems.push(
			`Sideboard too large (has ${deck.boards.sideboard.count.toString()}, needs at most 15).`
		);
	}

	for (const cards of Object.values(deck.boards.mainboard.cards).concat(
		Object.values(deck.boards.sideboard.cards)
	)) {
		const { card } = cards;

		// Legal sets.
		if (
			![
				"2ed",
				"3ed",
				"4ed",
				"5ed",
				"6ed",
				"7ed",
				"all",
				"apc",
				"arn",
				"atq",
				"ced",
				"cei",
				"chr",
				"drk",
				"exo",
				"fem",
				"hml",
				"ice",
				"inv",
				"jud",
				"lea",
				"leb",
				"leg",
				"lgn",
				"mir",
				"mmq",
				"nem",
				"ody",
				"ons",
				"pcy",
				"pls",
				"po2",
				"por",
				"ptk",
				"ren",
				"s00",
				"s99",
				"scg",
				"sth",
				"tmp",
				"tor",
				"uds",
				"ulg",
				"usg",
				"vis",
				"wth"
			].includes(card.set)
		) {
			problems.push(
				`${card.name} is from an illegal set (${card.set.toUpperCase()}).`
			);
		}

		// Banned cards.
		if (
			[
				"Amulet of Quoz",
				"Bronze Tablet",
				"Chaos Orb",
				"Contract from Below",
				"Darkpact",
				"Demonic Attorney",
				"Falling Star",
				"Jeweled Bird",
				"Rebirth",
				"Tempest Efreet",
				"Timmerian Fiends"
			].includes(card.name)
		) {
			problems.push(`${card.name} is banned.`);
		}

		const mainboardCount =
			deck.boards.mainboard.cards[card.uniqueCardId]?.quantity ?? 0;
		const sideboardCount =
			deck.boards.sideboard.cards[card.uniqueCardId]?.quantity ?? 0;
		if (
			(mainboardCount > 0 && cards.boardType === "sideboard") ||
			parseTypeLine(card.type_line ?? "")[0].includes("Basic")
		) {
			// Prevent printing these warnings twice or for basic lands.
		} else if (
			[
				"Ancestral Recall",
				"Balance",
				"Black Lotus",
				"Black Vise",
				"Braingeyser",
				"Burning Wish",
				"Channel",
				"Demonic Consultation",
				"Demonic Tutor",
				"Fact or Fiction",
				"Fastbond",
				"Flash",
				"Gush",
				"Imperial Seal",
				"Library of Alexandria",
				"Lion's Eye Diamond",
				"Lotus Petal",
				"Mana Crypt",
				"Mana Vault",
				"Maze of Ith",
				"Memory Jar",
				"Merchant Scroll",
				"Mind's Desire",
				"Mind Twist",
				"Mox Emerald",
				"Mox Jet",
				"Mox Pearl",
				"Mox Ruby",
				"Mox Sapphire",
				"Mystical Tutor",
				"Necropotence",
				"Regrowth",
				"Shahrazad",
				"Sol Ring",
				"Strip Mine",
				"Stroke of Genius",
				"Timetwister",
				"Time Walk",
				"Tolarian Academy",
				"Vampiric Tutor",
				"Wheel of Fortune",
				"Windfall",
				"Yawgmoth's Bargain",
				"Yawgmoth's Will"
			].includes(card.name) &&
			mainboardCount + sideboardCount > 1
		) {
			// Restricted cards.
			problems.push(
				`Too many copies of ${cards.card.name} (${mainboardCount.toString()} mainboard, ${sideboardCount.toString()} sideboard; must be at most 1 total).`
			);
		} else if (mainboardCount + sideboardCount > 4) {
			// Maximum copies.
			problems.push(
				`Too many copies of ${cards.card.name} (${mainboardCount.toString()} mainboard, ${sideboardCount.toString()} sideboard; must be at most 4 total).`
			);
		}

		// Cards with modified rules text.
		if (card.name === "Time Vault") {
			infos.push(
				"Time Vault has the following updated Oracle text:\n```\nThis artifact enters tapped.\n\nThis artifact doesn't untap during your untap step.\n\nIf you would begin your turn while this artifact is tapped, you may skip that turn instead. If you do, untap this artifact and put a time counter on it.\n\n{T}, remove a time counter from this artifact: Take an extra turn after this one.\n```"
			);
		}
		if (card.name === "Illusionary Mask") {
			infos.push(
				"Illusionary Mask has the following updated Oracle text:\n```\n{X}: You may put a creature card with mana value X or less from your hand onto the battlefield face down as a 0/1 creature. Put X mask counters on that creature. The creature's controller may turn the creature face up by removing all mask counters from it. This effect ends if the creature is turned face up. Activate only as a sorcery.\n```"
			);
		}
	}

	if (problems.length) {
		return {
			embeds: [
				{
					color: 0xff0000,
					description: `[${deck.name}](${deck.publicUrl}) is not a legal Classic Magic deck.\n${makeMarkdownList(problems)}`,
					title: "Illegal Deck"
				}
			]
		};
	}

	return {
		embeds: [
			{
				color: 0x00ff00,
				description: `[${deck.name}](${deck.publicUrl}) is a legal Classic Magic deck.${infos.length ? ` Note the following:\n${makeMarkdownList(infos)}` : ""}`,
				title: "Legal Deck"
			}
		]
	};
}
