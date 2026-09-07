import type { infer as infer_ } from "zod";

import applicationCommand from "./applicationCommand.js";

/**
 * Get a list of global application commands.
 * @returns The list of global application commands.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-global-application-commands}
 * @internal
 */
export default async function getGlobalApplicationCommands(): Promise<
	infer_<typeof applicationCommand>[]
> {
	const applicationId = process.env["DISCORD_APPLICATION_ID"];
	const botToken = process.env["DISCORD_BOT_TOKEN"];
	if (!applicationId || !botToken) {
		throw new Error("No application ID or bot token.");
	}

	const url = new URL(
		`https://discord.com/api/v10/applications/${applicationId}/commands`
	);

	const response = await fetch(url, {
		headers: {
			/* eslint-disable @typescript-eslint/naming-convention */
			Authorization: `Bot ${botToken}`
			/* eslint-enable @typescript-eslint/naming-convention */
		},
		method: "GET"
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = applicationCommand.array().safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
