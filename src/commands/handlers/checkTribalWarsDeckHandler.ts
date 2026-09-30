import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

/**
 * Handle the `Check Tribal Wars Deck` message command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function checkTribalWarsDeckHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof editWebhookMessage> {
	if (!commandData.target_id) {
		throw new Error("Missing target ID.");
	}

	if (!commandData.resolved?.messages) {
		throw new Error("Missing resolved messages.");
	}

	// eslint-disable-next-line capitalized-comments
	// prettier-ignore
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore TypeScript struggles with circular type references. This directive is required in some environments and not others (hence ts-ignore over ts-expect-error).
	const message: undefined | { content?: string | undefined } = commandData.resolved.messages[commandData.target_id];
	if (!message) {
		throw new Error(`Failed to resolve message \`${commandData.target_id}\`.`);
	}

	const lines = message.content?.split("\n") ?? [];
	const mainboardHeaderIndex = lines.findIndex((line) =>
		/^deck:?$/iu.test(line)
	);
	const sideboardHeaderIndex = lines.findIndex((line) =>
		/^sideboard:?$/iu.test(line)
	);
	const mainboardLines = lines
		.slice(
			mainboardHeaderIndex + 1,
			sideboardHeaderIndex < 0 ? void 0 : sideboardHeaderIndex
		)
		.filter((line) => line.length);
	const sideboardLines =
		sideboardHeaderIndex < 0 ?
			[]
		:	lines.slice(sideboardHeaderIndex + 1).filter((line) => line.length);

	return {
		embeds: [
			{
				description: "Hello, message command!",
				fields: [
					{
						inline: true,
						name: "Lines",
						value: `\`${lines.length.toString()}\``
					},
					{
						inline: true,
						name: "Mainboard Lines",
						value: `\`${mainboardLines.length.toString()}\``
					},
					{
						inline: true,
						name: "Sideboard Lines",
						value: `\`${sideboardLines.length.toString()}\``
					}
				]
			}
		]
	};
}
