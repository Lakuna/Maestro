import type { infer as infer_ } from "zod";

import { desc } from "drizzle-orm";

import type editWebhookMessageBody from "../../discord/resources/webhook/editWebhookMessageBody.js";

import {
	LEADERBOARD_NEXT_ID,
	LEADERBOARD_PREVIOUS_ID
} from "../../components/definitions/leaderboardPreviousNextDefinition.js";
import db from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import ButtonStyle from "../../discord/components/ButtonStyle.js";
import ComponentType from "../../discord/components/ComponentType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

// eslint-disable-next-line no-warning-comments
const PAGE_SIZE = 5; // TODO: Extend.

/**
 * Handle the `leaderboard` command.
 * @param page - The page to display.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function leaderboardHandler(
	page = 0
): Promise<infer_<typeof editWebhookMessageBody>> {
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
				components: [
					{
						custom_id: LEADERBOARD_PREVIOUS_ID,
						disabled: page < 1,
						label: "◀",
						style: ButtonStyle.SECONDARY,
						type: ComponentType.BUTTON
					},
					{
						custom_id: LEADERBOARD_NEXT_ID,
						disabled: users.length < PAGE_SIZE,
						label: "▶",
						style: ButtonStyle.SECONDARY,
						type: ComponentType.BUTTON
					}
				],
				type: ComponentType.ACTION_ROW
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
