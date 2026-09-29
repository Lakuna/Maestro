import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import getDeck from "../../moxfield/getDeck.js";
import simplifyDeck from "../../utility/simplifyDeck.js";
import classicHandler from "./deckcheck/classicHandler.js";
import tribalHandler from "./deckcheck/tribalHandler.js";

/**
 * Handle the `deckcheck` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function deckcheckHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): Promise<infer_<typeof editWebhookMessage>> {
	const subcommandOption = commandData.options?.find(
		({ type }) => type === ApplicationCommandOptionType.SUB_COMMAND
	);
	if (typeof subcommandOption?.name !== "string") {
		throw new Error("Invalid subcommand name.");
	}

	const urlOption = subcommandOption.options?.find(
		({ name, type }) =>
			name === "url" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof urlOption?.value !== "string") {
		throw new Error("Invalid URL value.");
	}

	const id = /https:\/\/moxfield\.com\/decks\/(?<id>.*)/u.exec(urlOption.value)
		?.groups?.["id"];
	if (!id) {
		throw new Error("Invalid URL.");
	}

	const deck = simplifyDeck(await getDeck(id));
	switch (subcommandOption.name) {
		case "classic":
			return classicHandler(deck);
		case "tribal":
			return await tribalHandler(deck);
		default:
			throw new Error(
				`Unhandled subcommand ${subcommandOption.name ?? "undefined"}`
			);
	}
}
