import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import informDeck from "../../utility/informDeck.js";
import poolFromPacks from "../../utility/poolFromPacks.js";
import stringifyDeck from "../../utility/stringifyDeck.js";
import stringToSeeds from "../../utility/stringToSeeds.js";

/**
 * Handle the `sealedpool` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function sealedpoolHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof editWebhookMessage>> {
	const setOption = commandData.options?.find(
		({ name, type }) =>
			name === "set" && type === ApplicationCommandOptionType.STRING
	);
	const setCode =
		typeof setOption?.value === "string" ?
			setOption.value.toLowerCase()
		:	void 0;
	if (!setCode) {
		throw new Error("No set code was given.");
	}

	const seedsOption = commandData.options?.find(
		({ name, type }) =>
			name === "seeds" && type === ApplicationCommandOptionType.STRING
	);
	const seedsStr =
		typeof seedsOption?.value === "string" ? seedsOption.value : void 0;
	if (!seedsStr) {
		throw new Error("No seeds were given.");
	}

	const seeds = stringToSeeds(seedsStr);
	if (!seeds.length) {
		throw new Error("No seeds were given.");
	}

	const pool = poolFromPacks(setCode, seeds);
	const deck = await informDeck({
		boards: { mainboard: pool },
		name: "Sealed Deck Pool"
	});

	return {
		embeds: [
			{
				description: stringifyDeck(deck),
				fields: [
					{
						inline: true,
						name: "Seeds",
						value: seeds.map((seed) => `\`${seed.toString()}\``).join(", ")
					}
				],
				title: deck.name,
				type: EmbedType.RICH
			}
		]
	};
}
