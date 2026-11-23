import type { infer as infer_ } from "zod";

import { sql } from "drizzle-orm";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type guildMember from "../../discord/resources/guild/guildMember.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
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
export default async function addbalHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>,
	commandMember?: DeepReadonly<infer_<typeof guildMember>>
): Promise<infer_<typeof editWebhookMessage>> {
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
			set: { coins: sql`${usersTable.coins} + ${coinsOption.value}` },
			target: usersTable.id
		});

	return {
		embeds: [
			{
				description: `<@${userOption.value}> now has ${Math.abs(coinsOption.value).toString()} ${coinsOption.value >= 0 ? "more" : "fewer"} ${Math.abs(coinsOption.value) === 1 ? "coin" : "coins"}.`,
				title: `${coinsOption.value >= 0 ? "Add" : "Subtract"} Balance`,
				type: EmbedType.RICH
			}
		]
	};
}
