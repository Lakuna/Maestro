import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import leaPack from "../../collation/packs/leaPack.js";
import defaultSeed from "../../collation/utility/defaultSeed.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import getCardCollection from "../../scryfall/getCardCollection.js";

/**
 * Handle the `openpack` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function openpackHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof interactionResponse>> {
	const setOption = commandData.options?.find(
		({ name, type }) =>
			name === "set" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof setOption?.value !== "string") {
		throw new Error("No set code was given.");
	}

	const seedOption = commandData.options?.find(
		({ name, type }) =>
			name === "seed" && type === ApplicationCommandOptionType.INTEGER
	);
	const seed =
		typeof seedOption?.value === "number" ? seedOption.value : defaultSeed();

	switch (setOption.value) {
		case "lea": {
			const cards = leaPack(seed);

			const collection = await getCardCollection({
				identifiers: cards.map((card) => ({
					// eslint-disable-next-line @typescript-eslint/naming-convention
					collector_number: card.toString(),
					set: "lea"
				}))
			});

			return {
				data: {
					embeds: [
						{
							color: 0x0000ff,
							// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
							description: `Seed: \`${seed.toString()}\`\n${cards.map((card) => `[${collection.data.find(({ collector_number }) => collector_number === card.toString())?.name ?? "undefined"}](https://api.scryfall.com/cards/lea/${card.toString()}?format=image)`).join("\n")}`,
							title: "Limited Edition Alpha Booster Pack",
							type: EmbedType.RICH
						}
					]
				},
				type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
			};
		}
		default:
			throw new Error(`Invalid set code. The valid set codes are: \`lea\`.`);
	}
}
