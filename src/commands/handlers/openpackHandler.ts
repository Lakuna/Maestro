import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import setMap from "../../collation/setMap.js";
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
	const setCode =
		typeof setOption?.value === "string" ?
			setOption.value.toLowerCase()
		:	void 0;
	if (!setCode) {
		throw new Error("No set code was given.");
	}

	const setResult = Array.from(setMap.entries())
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		.find(([{ code }]) => code === setCode);
	if (!setResult) {
		throw new Error(
			`Invalid set code. The valid set codes are: ${Array.from(setMap.keys())
				.map(({ code }) => `\`${code}\``)
				.join(", ")}.`
		);
	}

	const [set, packFn] = setResult;

	const seedOption = commandData.options?.find(
		({ name, type }) =>
			name === "seed" && type === ApplicationCommandOptionType.INTEGER
	);
	const seed =
		typeof seedOption?.value === "number" ? seedOption.value : defaultSeed();

	const cards = packFn(seed);
	const collection = await getCardCollection({
		identifiers: cards.map((cn) => ({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			collector_number: cn,
			set: set.code
		}))
	});
	return {
		data: {
			embeds: [
				{
					// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
					description: `Seed: \`${seed.toString()}\`\n${cards.map((cn) => `[${collection.data.find(({ collector_number }) => collector_number === cn)?.name ?? "undefined"}](https://api.scryfall.com/cards/${set.code}/${cn}?format=image)`).join("\n")}`,
					title: `${collection.data[0]?.set_name ?? `\`${set.code}\``} Pack`,
					type: EmbedType.RICH
				}
			]
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
}
