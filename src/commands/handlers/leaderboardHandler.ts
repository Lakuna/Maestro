import type { infer as infer_ } from "zod";

import { desc } from "drizzle-orm";

import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";

import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

/**
 * Handle the `leaderboard` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function leaderboardHandler(): Promise<
	infer_<typeof editWebhookMessage>
> {
	const users = await db
		.select()
		.from(usersTable)
		.orderBy(desc(usersTable.coins))
		.limit(10);

	return {
		embeds: [
			{
				description: users
					// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
					.map((user) => `- <@${user.id}> ${user.coins.toString()}`)
					.join("\n"),
				title: "Coins Leaderboard",
				type: EmbedType.RICH
			}
		]
	};
}
