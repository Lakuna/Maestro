import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type guildMember from "../../discord/resources/guild/guildMember.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import Permissions from "../../discord/topics/permissions/Permissions.js";

/**
 * Handle the `addbal` command.
 * @param commandData - The Discord application command data.
 * @param commandMember - The guild member that is using the command.
 * @returns The Discord interaction response.
 * @internal
 */
export default function addbalHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>,
	commandMember?: DeepReadonly<infer_<typeof guildMember>>
): infer_<typeof editWebhookMessage> {
	if (
		!(
			BigInt(commandMember?.permissions ?? 0) &
			BigInt(Permissions.ADMINISTRATOR)
		)
	) {
		throw new Error("Only administrators can use this command.");
	}

	// eslint-disable-next-line no-console, no-warning-comments
	console.info(JSON.stringify(commandData)); // TODO: Delete.

	const usersOption = commandData.options?.find(
		({ name, type }) =>
			name === "users" && type === ApplicationCommandOptionType.MENTIONABLE
	);
	if (typeof usersOption?.value !== "string") {
		throw new Error("Missing users option.");
	}

	const coinsOption = commandData.options?.find(
		({ name, type }) =>
			name === "coins" && type === ApplicationCommandOptionType.INTEGER
	);
	if (typeof coinsOption?.value !== "number") {
		throw new Error("Missing coins option.");
	}

	return {
		embeds: [{ description: "WIP", title: "Add Balance", type: EmbedType.RICH }]
	};
}
