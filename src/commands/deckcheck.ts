import ApplicationCommandOptionType from "../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";

/*
```
import type { infer as zinfer } from "zod";

import type { DeepReadonly } from "../DeepReadonly.js";
import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";

import getDeck from "../moxfield/getDeck.js";

const handleClassicMagic = (
	deck: zinfer<typeof deck>
): zinfer<typeof interactionResponse> => {
	// TODO
};

const handleTribalWars = (
	deck: zinfer<typeof deck>
): zinfer<typeof interactionResponse> => {
	// TODO
};

export const handle = async (
	commandData: DeepReadonly<zinfer<typeof applicationCommandData>>
): Promise<zinfer<typeof interactionResponse>> => {
	const urlOption = commandData.options?.find(
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
	void deck; // TODO
};
```
*/

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
