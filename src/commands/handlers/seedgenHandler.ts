import type { infer as infer_ } from "zod";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
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
): infer_<typeof editWebhookMessage> {
	const countOption = commandData.options?.find(
		({ name, type }) =>
			name === "count" && type === ApplicationCommandOptionType.INTEGER
	);
	if (typeof countOption?.value !== "number") {
		return {
			embeds: [
				{
					description: `\`${defaultSeed().toString()}\``,
					title: "Seed",
					type: EmbedType.RICH
				}
			]
		};
	}

	const rng = xoroshiro128plus(defaultSeed());
	const seeds = [];
	for (let i = 0; i < countOption.value; i++) {
		seeds.push(uniformInt(rng, -0x8000000, 0x7ffffff));
	}

	return {
		embeds: [
			{
				description: seeds.map((seed) => `\`${seed.toString()}\``).join(", "),
				title: "Seeds",
				type: EmbedType.RICH
			}
		]
	};
}
