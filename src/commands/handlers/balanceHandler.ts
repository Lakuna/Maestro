import type { infer as infer_ } from "zod";

import { eq } from "drizzle-orm";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type user from "../../discord/resources/user/user.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

/**
 * Handle the `balance` command.
 * @param commandData - The Discord application command data.
 * @param commandUser - The user that is using the command.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function balanceHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>,
	commandUser?: DeepReadonly<infer_<typeof user>>
): Promise<infer_<typeof editWebhookMessage>> {
	const userOption = commandData.options?.find(
		({ name, type }) =>
			name === "user" && type === ApplicationCommandOptionType.USER
	);
	const userId =
		typeof userOption?.value === "string" ? userOption.value : commandUser?.id;
	if (!userId) {
		throw new Error("Missing user ID.");
	}

	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))
		.limit(1);

	return {
		embeds: [
			{
				description: `<@${user?.id ?? userId}> has ${(user?.coins ?? 0).toString()} coins.`,
				title: "Coin Balance",
				type: EmbedType.RICH
			}
		]
	};
}
