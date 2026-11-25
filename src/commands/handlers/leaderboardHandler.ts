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
	const offset = 0;

	const users = await db
		.select()
		.from(usersTable)
		.orderBy(desc(usersTable.coins))
		.offset(offset)
		.limit(10);

	return {
		embeds: [
			{
				description: users
					.map(
						// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
						(user, i) =>
							`${(1 + offset + i).toString()}. <@${user.id}> ${user.coins.toString()}`
					)
					.join("\n"),
				title: "Coins Leaderboard",
				type: EmbedType.RICH
			}
		]
	};
}
