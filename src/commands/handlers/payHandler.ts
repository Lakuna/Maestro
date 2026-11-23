import type { infer as infer_ } from "zod";

import { eq, sql } from "drizzle-orm";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type user from "../../discord/resources/user/user.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

/**
 * Handle the `pay` command.
 * @param commandData - The Discord application command data.
 * @param commandUser - The user that is using the command.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function payHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>,
	commandUser?: DeepReadonly<infer_<typeof user>>
): Promise<infer_<typeof editWebhookMessage>> {
	if (!commandUser?.id) {
		throw new Error("Missing user ID.");
	}

	const userOption = commandData.options?.find(
		({ name, type }) =>
			name === "user" && type === ApplicationCommandOptionType.USER
	);
	if (typeof userOption?.value !== "string") {
		throw new Error("Missing user option.");
	}

	if (userOption.value === commandUser.id) {
		throw new Error("Cannot pay yourself.");
	}

	const coinsOption = commandData.options?.find(
		({ name, type }) =>
			name === "coins" && type === ApplicationCommandOptionType.INTEGER
	);
	if (typeof coinsOption?.value !== "number") {
		throw new Error("Missing coins option.");
	}

	if (coinsOption.value < 0) {
		throw new Error("Cannot pay negative coins.");
	}

	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userOption.value))
		.limit(1);
	if ((user?.coins ?? 0) < coinsOption.value) {
		throw new Error(
			`Not enough coins (attempted to pay ${coinsOption.value.toString()}, had ${(user?.coins ?? 0).toString()}).`
		);
	}

	await db
		.update(usersTable)
		.set({ coins: sql`${usersTable.coins} - ${coinsOption.value}` })
		.where(eq(usersTable.id, commandUser.id));

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
				description: `<@${commandUser.id}> gave ${Math.abs(coinsOption.value).toString()} ${Math.abs(coinsOption.value) === 1 ? "coin" : "coins"} to <@${userOption.value}>.`,
				title: "Pay User",
				type: EmbedType.RICH
			}
		]
	};
}
