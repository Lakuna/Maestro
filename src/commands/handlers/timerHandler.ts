import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

/**
 * Handle the `timer` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function timerHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof interactionResponse> {
	const timeOption = commandData.options?.find(
		({ name, type }) =>
			name === "time" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof timeOption?.value !== "string") {
		throw new Error("Missing time option.");
	}

	const time =
		isNaN(Number(timeOption.value)) ?
			Number(
				/^(?:<t:)?(?<time>\d+)(?::[dDfFRStT]>)?$/u.exec(timeOption.value)
					?.groups?.["time"]
			) * 1000 // Discord timestamps use seconds.
		:	Number(timeOption.value); // Unix timestamps use milliseconds.
	if (isNaN(time)) {
		throw new Error(
			"Time was not a valid timestamp. Input a Unix timestamp or a Discord timestamp (can be generated with `@time`)."
		);
	}

	const url = new URL("https://www.lakuna.pw/timer");
	url.searchParams.set("time", time.toFixed());

	return {
		data: {
			embeds: [
				{
					fields: [
						{
							inline: true,
							name: "Discord Timestamp",
							value: `<t:${(time / 1000).toFixed()}:R>`
						},
						{
							inline: true,
							name: "Unix Timestamp",
							value: `\`${time.toFixed()}\``
						}
					],
					title: `Countdown Timer to <t:${(time / 1000).toFixed()}:f>`,
					type: EmbedType.RICH,
					url: url.href
				}
			]
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
}
