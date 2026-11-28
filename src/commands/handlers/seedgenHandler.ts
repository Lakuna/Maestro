import type { infer as infer_ } from "zod";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import defaultSeed from "../../utility/defaultSeed.js";

/**
 * Handle the `seedgen` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function seedgenHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof interactionResponse> {
	const countOption = commandData.options?.find(
		({ name, type }) =>
			name === "count" && type === ApplicationCommandOptionType.INTEGER
	);
	if (typeof countOption?.value !== "number") {
		return {
			data: {
				embeds: [
					{
						description: `\`${defaultSeed().toString()}\``,
						title: "Seed",
						type: EmbedType.RICH
					}
				]
			},
			type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
		};
	}

	const rng = xoroshiro128plus(defaultSeed());
	const seeds = [];
	for (let i = 0; i < countOption.value; i++) {
		seeds.push(uniformInt(rng, -0x8000000, 0x7ffffff));
	}

	return {
		data: {
			embeds: [
				{
					description: seeds.map((seed) => `\`${seed.toString()}\``).join(", "),
					title: "Seeds",
					type: EmbedType.RICH
				}
			]
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
}
