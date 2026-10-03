import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import setMap from "../../collation/setMap.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import getCardCollection from "../../scryfall/getCardCollection.js";
import defaultSeed from "../../utility/defaultSeed.js";

/**
 * Handle the `openpack` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function openpackHandler(
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
		identifiers: cards
			// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
			.filter(([, cn]) => cn !== "NaN")
			// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
			.map(([sc, cn]) => ({ collector_number: cn, set: sc }))
	});

	return {
		embeds: [
			{
				/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
				description: cards
					.map(([sc, cn, f]) =>
						cn === "NaN" ? "Marketing card" : (
							`[${collection.data.find((c) => c.collector_number === cn)?.name ?? "undefined"}](https://api.scryfall.com/cards/${sc}/${cn}?format=image)${f ? " (foil)" : ""}`
						)
					)
					.join("\n"),
				/* eslint-enable @typescript-eslint/prefer-readonly-parameter-types */
				fields: [{ name: "Seed", value: `\`${seed.toString()}\`` }],
				title: `${collection.data[0]?.set_name ?? `\`${set.code}\``} Pack`,
				type: EmbedType.RICH
			}
		]
	};
}
