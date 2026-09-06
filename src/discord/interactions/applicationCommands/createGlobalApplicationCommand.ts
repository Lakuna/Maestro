import type { infer as infer_ } from "zod";

import type CreateGlobalApplicationCommandParams from "./CreateGlobalApplicationCommandParams.js";

import applicationCommand from "./applicationCommand.js";

/**
 * Upsert a global application command.
 * @param params - The application command parameters.
 * @returns The application command.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#create-global-application-command}
 * @internal
 */
export default async function createGlobalApplicationCommand(
	params: CreateGlobalApplicationCommandParams
): Promise<infer_<typeof applicationCommand>> {
	const applicationId = process.env["DISCORD_APPLICATION_ID"];
	const botToken = process.env["DISCORD_BOT_TOKEN"];
	if (!applicationId || !botToken) {
		throw new Error("No application ID or bot token.");
	}

	const url = new URL(
		`https://discord.com/api/v10/applications/${applicationId}/commands`
	);

	const response = await fetch(url, {
		body: JSON.stringify(params),
		headers: {
			/* eslint-disable @typescript-eslint/naming-convention */
			Authorization: `Bot ${botToken}`,
			"Content-Type": "application/json"
			/* eslint-enable @typescript-eslint/naming-convention */
		},
		method: "POST"
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = applicationCommand.safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
