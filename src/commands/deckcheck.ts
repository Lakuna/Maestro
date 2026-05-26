import type { infer as zinfer } from "zod";

import type { DeepReadonly } from "../DeepReadonly.js";
import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";
import type deck from "../moxfield/deck.js";

import ApplicationCommandOptionType from "../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import getDeck from "../moxfield/getDeck.js";

const handleClassicMagic = (
	d: DeepReadonly<zinfer<typeof deck>>
): zinfer<typeof interactionResponse> => {
	void d;
	throw new Error("Not implemented.");
};

const handleTribalWars = (
	d: DeepReadonly<zinfer<typeof deck>>
): zinfer<typeof interactionResponse> => {
	void d;
	throw new Error("Not implemented.");
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
