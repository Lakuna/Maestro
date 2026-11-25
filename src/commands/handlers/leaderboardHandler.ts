import type { infer as infer_ } from "zod";

import { desc } from "drizzle-orm";

import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";

import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import ButtonStyle from "../../discord/components/ButtonStyle.js";
import ComponentType from "../../discord/components/ComponentType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

const PAGE_SIZE = 10;

/**
 * Handle the `leaderboard` command.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function leaderboardHandler(): Promise<
	infer_<typeof editWebhookMessage>
> {
	// eslint-disable-next-line no-warning-comments, @typescript-eslint/no-inferrable-types
	const page: number = 0; // TODO: Get from command data.
	const offset = page * PAGE_SIZE;

	const users = await db
		.select()
		.from(usersTable)
		.orderBy(desc(usersTable.coins))
		.offset(offset)
		.limit(PAGE_SIZE);

	return {
		/* eslint-disable @typescript-eslint/naming-convention */
		components: [
			{
				custom_id: "previous",
				disabled: page < 1,
				label: "Previous",
				style: ButtonStyle.PRIMARY,
				type: ComponentType.BUTTON
			},
			{
				custom_id: "next",
				disabled: users.length < PAGE_SIZE,
				label: "Next",
				style: ButtonStyle.PRIMARY,
				type: ComponentType.BUTTON
			}
		],
		embeds: [
			{
				description: users
					.map(
						// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
						(user, i) =>
							`${(1 + offset + i).toString()}. <@${user.id}> ${user.coins.toString()}`
					)
					.join("\n"),
				title: `Coins Leaderboard (Page ${(1 + page).toString()})`,
				type: EmbedType.RICH
			}
		]
		/* eslint-enable @typescript-eslint/naming-convention */
	};
}
