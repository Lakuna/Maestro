import type { infer as zinfer } from "zod";

import type { DeepReadonly } from "../DeepReadonly.js";
import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type deckSchema from "../moxfield/deck.js";

import ApplicationCommandOptionType from "../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import MessageFlag from "../discord/resources/message/MessageFlag.js";
import getDeck from "../moxfield/getDeck.js";

const handleClassicMagic = (
	deck: DeepReadonly<zinfer<typeof deckSchema>>
): zinfer<typeof interactionResponse> => {
	void deck;
	throw new Error("Not implemented.");
};

const subtypeDelimiter = " — ";
const handleTribalWars = (
	deck: DeepReadonly<zinfer<typeof deckSchema>>
): zinfer<typeof interactionResponse> => {
	const subtypeMap = new Map<string, number>();
	for (const cards of Object.values(deck.boards.mainboard.cards)) {
		if (!cards.card.type_line) {
			continue;
		}

		for (const subtype of cards.card.type_line
			.slice(
				cards.card.type_line.indexOf(subtypeDelimiter) + subtypeDelimiter.length
			)
			.split(" ")) {
			subtypeMap.set(subtype, (subtypeMap.get(subtype) ?? 0) + cards.quantity);
		}
	}

	const legalSubtypes = subtypeMap
		.entries()
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.filter(([, quantity]) => quantity >= deck.boards.mainboard.count / 3)
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.map(([subtype]) => subtype)
		.toArray();
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
					description: `[${deck.name}](${deck.publicUrl}) is a legal Tribal Wars deck for the following tribes:\n${legalSubtypes.map((subtype) => `- ${subtype}`).join("\n")}`,
					title: "Legal Deck"
				}
			]
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
};

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
