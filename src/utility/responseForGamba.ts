import type { infer as infer_ } from "zod";

import { BigNumber } from "@lakuna/umath";

import type { betTable, gambaTable, optionTable } from "../db/schema.js";
import type editWebhookMessageBody from "../discord/resources/webhook/editWebhookMessageBody.js";

import {
	GAMBA_CALL_ID,
	GAMBA_CANCEL_ID,
	GAMBA_CLOSE_ID,
	GAMBA_OPEN_ID,
	GAMBA_PLACE_BET_ID
} from "../components/definitions/gamba.js";
import ButtonStyle from "../discord/components/ButtonStyle.js";
import ComponentType from "../discord/components/ComponentType.js";
import EmbedType from "../discord/resources/message/EmbedType.js";

const TAKEOUT_RATE = 0;
const MIN_ODDS = new BigNumber(1, 9);

/**
 * Create an embed that represents a gambling instance.
 * @param gamba - The gambling instance.
 * @param options - The options on the gambling instance.
 * @param bets - The bets on the options on the gambling instance.
 * @returns The embed.
 * @internal
 */
export default function responseForGamba(
	gamba: Readonly<typeof gambaTable.$inferSelect>,
	options: readonly Readonly<typeof optionTable.$inferSelect>[],
	bets: readonly Readonly<typeof betTable.$inferSelect>[]
): infer_<typeof editWebhookMessageBody> {
	const gambaPool = bets
		.filter((bet) => bet.gambaId === gamba.id)
		.reduce((out, bet) => out + bet.coins, 0);
	const netPool = gambaPool * (1 - TAKEOUT_RATE);

	return {
		/* eslint-disable @typescript-eslint/naming-convention */
		components: [
			{
				components: [
					{
						custom_id: GAMBA_PLACE_BET_ID,
						disabled: gamba.isClosed,
						label: "Place Bet",
						style: ButtonStyle.PRIMARY,
						type: ComponentType.BUTTON
					},
					{
						custom_id: GAMBA_CLOSE_ID,
						disabled: gamba.isClosed,
						label: "Close",
						style: ButtonStyle.SECONDARY,
						type: ComponentType.BUTTON
					},
					{
						custom_id: GAMBA_OPEN_ID,
						disabled: !gamba.isClosed || gamba.isCalled,
						label: "Open",
						style: ButtonStyle.SECONDARY,
						type: ComponentType.BUTTON
					},
					{
						custom_id: GAMBA_CALL_ID,
						disabled: !gamba.isClosed || gamba.isCalled,
						label: "Call",
						style: ButtonStyle.SECONDARY,
						type: ComponentType.BUTTON
					},
					{
						custom_id: GAMBA_CANCEL_ID,
						disabled: !gamba.isClosed || gamba.isCalled,
						label: "Cancel",
						style: ButtonStyle.DANGER,
						type: ComponentType.BUTTON
					}
				],
				type: ComponentType.ACTION_ROW
			}
		],
		embeds: [
			{
				description:
					gamba.isCalled ? `${gamba.winningOptionValue ?? "`null`"} won.`
					: gamba.isClosed ? "Waiting for result."
					: "Open for betting.",
				fields: options.map((option) => {
					const optionPool = bets
						.filter(
							(bet) =>
								bet.gambaId === option.gambaId &&
								bet.optionValue === option.value
						)
						.reduce((out, bet) => out + bet.coins, 0);
					const distributablePool = netPool - optionPool;
					const rawOdds = new BigNumber(
						distributablePool,
						Math.max(optionPool, 1)
					).limitDenominator(9);
					const odds =
						rawOdds.toNumber() < MIN_ODDS.toNumber() ? MIN_ODDS : rawOdds;

					return {
						inline: true,
						name: option.value,
						value: `${odds.numerator.toString()}-${odds.denominator.toString()}`
					};
				}),
				title: `Gambling Instance #${gamba.id.toString()}`,
				type: EmbedType.RICH
			}
		]
		/* eslint-enable @typescript-eslint/naming-convention */
	};
}
