import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type guildMember from "../../discord/resources/guild/guildMember.js";
import type editWebhookMessageBody from "../../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import Permissions from "../../discord/topics/permissions/Permissions.js";

/**
 * Handle the `setbal` command.
 * @param commandData - The Discord application command data.
 * @param commandMember - The guild member that is using the command.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function setbalHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>,
	commandMember?: DeepReadonly<infer_<typeof guildMember>>
): Promise<infer_<typeof editWebhookMessageBody>> {
	if (
		!(
			BigInt(commandMember?.permissions ?? 0) &
			BigInt(Permissions.ADMINISTRATOR)
		)
	) {
		throw new Error("Only administrators can use this command.");
	}

	const userOption = commandData.options?.find(
		({ name, type }) =>
			name === "user" && type === ApplicationCommandOptionType.USER
	);
	if (typeof userOption?.value !== "string") {
		throw new Error("Missing user option.");
	}

	const coinsOption = commandData.options?.find(
		({ name, type }) =>
			name === "coins" && type === ApplicationCommandOptionType.INTEGER
	);
	if (typeof coinsOption?.value !== "number") {
		throw new Error("Missing coins option.");
	}

	await db
		.insert(usersTable)
		.values({ coins: coinsOption.value, id: userOption.value })
		.onConflictDoUpdate({
			set: { coins: coinsOption.value },
			target: usersTable.id
		});

	return {
		embeds: [
			{
				description: `<@${userOption.value}> now has ${coinsOption.value.toString()} coins.`,
				title: "Set Balance",
				type: EmbedType.RICH
			}
		]
	};
}
