import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type guildMember from "../../discord/resources/guild/guildMember.js";
import type editWebhookMessageBody from "../../discord/resources/webhook/editWebhookMessageBody.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import db from "../../db/db.js";
import { gambaTable, optionTable } from "../../db/schema.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import Permissions from "../../discord/topics/permissions/Permissions.js";
import responseForGamba from "../../utility/responseForGamba.js";

/**
 * Handle the `gamba` command.
 * @param commandData - The Discord application command data.
 * @param commandMember - The guild member that is using the command.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function gambaHandler(
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

	const optionsOption = commandData.options?.find(
		({ name, type }) =>
			name === "options" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof optionsOption?.value !== "string") {
		throw new Error("Missing options option.");
	}

	const values = optionsOption.value.split(",").map((option) => option.trim());
	if (values.length < 2) {
		throw new Error(
			"Cannot create a gambling instance with less than two options."
		);
	}

	const [gamba] = await db.insert(gambaTable).values({}).returning();
	if (!gamba) {
		throw new Error("Failed to create gambling instance.");
	}

	const options = values.map((value) => ({ gambaId: gamba.id, value }));
	await db.insert(optionTable).values(options);

	return responseForGamba(gamba, options, []);
}
