import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

/**
 * Handle the `timer` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function timerHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof editWebhookMessage> {
	const timeOption = commandData.options?.find(
		({ name, type }) =>
			name === "time" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof timeOption?.value !== "string") {
		throw new Error("Missing time option.");
	}

	const time = Number(
		/^(?:<t:)?(?<time>\d+)(?::[tTdDfFR]>)?$/u.exec(timeOption.value)?.groups?.[
			"time"
		]
	);
	if (isNaN(time)) {
		throw new Error(
			"Time was not a valid timestamp. Input a Unix timestamp or a Discord timestamp (can be generated with `@time`)."
		);
	}

	const url = new URL("https://www.lakuna.pw/timer");
	url.searchParams.set("timer", time.toString());

	return {
		embeds: [
			{
				title: `Countdown Timer to ${new Date(time).toLocaleString()}`,
				type: EmbedType.RICH,
				url: url.href
			}
		]
	};
}
