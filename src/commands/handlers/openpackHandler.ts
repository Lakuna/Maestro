import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import leaPack from "../../collation/packs/leaPack.js";
import defaultSeed from "../../collation/utility/defaultSeed.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";

/**
 * Handle the `openpack` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function openpackHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof interactionResponse> {
	const setOption = commandData.options?.find(
		({ name, type }) =>
			name === "set" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof setOption?.value !== "string") {
		throw new Error("No set code was given.");
	}

	const seedOption = commandData.options?.find(
		({ name, type }) =>
			name === "seed" && type === ApplicationCommandOptionType.NUMBER
	);
	const seed =
		typeof seedOption?.value === "number" ? seedOption.value : defaultSeed();

	switch (setOption.value) {
		case "lea":
			return {
				data: {
					embeds: [
						{
							color: 0x0000ff,
							description: `Seed: ${seed.toString()}\nCards: ${leaPack(seed).join()}`,
							title: "Pack"
						}
					]
				},
				type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
			};
		default:
			throw new Error(`Invalid set code. The valid set codes are: \`lea\`.`);
	}
}
