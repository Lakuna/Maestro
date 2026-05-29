import type { infer as zinfer } from "zod";

import type { DeepReadonly } from "../DeepReadonly.js";
import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type deckSchema from "../moxfield/deck.js";

import ApplicationCommandOptionType from "../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import MessageFlag from "../discord/resources/message/MessageFlag.js";
import getDeck from "../moxfield/getDeck.js";
import getCatalogCreatureTypes from "../scryfall/getCatalogCreatureTypes.js";

/**
 * Turn a list of strings into a markdown list.
 * @param strings - The strings to turn into a list.
 * @returns A markdown list of the strings.
 * @internal
 */
const listify = (strings: readonly string[]): string =>
	strings
		.map(
			(s) =>
				`- ${s
					.split("\n")
					.map((t) => (/^\s*$/u.test(t) ? "​" : t)) // Add a zero-width space to empty lines so that they don't end code blocks.
					.join("\n  ")}`
		)
		.join("\n");

/**
 * Deck check for Classic Magic.
 * @param deck - The deck to check.
 * @returns The Discord interaction response.
 * @see {@link https://www.eternalcentral.com/classicmagicrules/}
 * @internal
 */
const handleClassicMagic = (
	deck: DeepReadonly<zinfer<typeof deckSchema>>
): zinfer<typeof interactionResponse> => {
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
				"Contact from Below",
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
		if (mainboardCount > 0 && cards.boardType === "sideboard") {
			// Prevent printing these warnings twice.
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
			data: {
				embeds: [
					{
						color: 0xff0000,
						description: `[${deck.name}](${deck.publicUrl}) is not a legal Classic Magic deck.\n${listify(problems)}`,
						title: "Illegal Deck"
					}
				],
				flags: MessageFlag.EPHEMERAL
			},
			type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
		};
	}

	return {
		data: {
			embeds: [
				{
					color: 0x00ff00,
					description: `[${deck.name}](${deck.publicUrl}) is a legal Classic Magic deck.${infos.length ? ` Note the following:\n${listify(infos)}` : ""}`,
					title: "Legal Deck"
				}
			],
			flags: MessageFlag.EPHEMERAL
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
};

/**
 * Deck check for Tribal Wars.
 * @param deck - The deck to check.
 * @returns The Discord interaction response.
 * @internal
 */
const subtypeDelimiter = " — ";
const handleTribalWars = async (
	deck: DeepReadonly<zinfer<typeof deckSchema>>
): Promise<zinfer<typeof interactionResponse>> => {
	const subtypeMap = new Map<string, number>();
	for (const creatureType of (await getCatalogCreatureTypes()).data) {
		subtypeMap.set(creatureType, 0);
	}

	for (const cards of Object.values(deck.boards.mainboard.cards)) {
		if (!cards.card.type_line) {
			continue;
		}

		for (const subtype of cards.card.type_line
			.slice(
				cards.card.type_line.indexOf(subtypeDelimiter) + subtypeDelimiter.length
			)
			.split(" ")) {
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
			data: {
				embeds: [
					{
						color: 0xff0000,
						description: `[${deck.name}](${deck.publicUrl}) is not a legal Tribal Wars deck.`,
						title: "Illegal Deck"
					}
				],
				flags: MessageFlag.EPHEMERAL
			},
			type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
		};
	}

	return {
		data: {
			embeds: [
				{
					color: 0x00ff00,
					description: `[${deck.name}](${deck.publicUrl}) is a legal Tribal Wars deck for the following tribes:\n${listify(legalSubtypes)}`,
					title: "Legal Deck"
				}
			],
			flags: MessageFlag.EPHEMERAL
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
};

/**
 * Handle the `deckcheck` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export const handle = async (
	commandData: DeepReadonly<zinfer<typeof applicationCommandData>>
): Promise<zinfer<typeof interactionResponse>> => {
	const subcommandOption = commandData.options?.find(
		({ type }) => type === ApplicationCommandOptionType.SUB_COMMAND
	);
	if (typeof subcommandOption?.name !== "string") {
		throw new Error("Invalid subcommand name.");
	}

	const urlOption = subcommandOption.options?.find(
		({ name, type }) =>
			name === "url" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof urlOption?.value !== "string") {
		throw new Error("Invalid URL value.");
	}

	const id = /https:\/\/moxfield\.com\/decks\/(?<id>.*)/u.exec(urlOption.value)
		?.groups?.["id"];
	if (!id) {
		throw new Error("Invalid URL.");
	}

	const deck = await getDeck(id);
	switch (subcommandOption.name) {
		case "classicmagic":
			return handleClassicMagic(deck);
		case "tribalwars":
			return handleTribalWars(deck);
		default:
			throw new Error(
				`Unhandled subcommand ${subcommandOption.name ?? "undefined"}`
			);
	}
};

/**
 * The `deckcheck` command definition.
 * @internal
 */
const definition = {
	description: "Check a deck for a specific format.",
	name: "deckcheck",
	options: [
		{
			description: "Check a deck for Tribal Wars.",
			name: "tribalwars",
			options: [
				{
					description: "The link to the deck on Moxfield.",
					name: "url",
					required: true,
					type: ApplicationCommandOptionType.STRING
				}
			],
			type: ApplicationCommandOptionType.SUB_COMMAND
		},
		{
			description: "Check a deck for Classic Magic.",
			name: "classicmagic",
			options: [
				{
					description: "The link to the deck on Moxfield.",
					name: "url",
					required: true,
					type: ApplicationCommandOptionType.STRING
				}
			],
			type: ApplicationCommandOptionType.SUB_COMMAND
		}
	]
};

export default definition;
