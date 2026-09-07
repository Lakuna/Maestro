/**
 * Delete a global application command.
 * @param id - The ID of the command to delete.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#delete-global-application-command}
 * @internal
 */
export default async function deleteGlobalApplicationCommand(
	id: string
): Promise<void> {
	const applicationId = process.env["DISCORD_APPLICATION_ID"];
	const botToken = process.env["DISCORD_BOT_TOKEN"];
	if (!applicationId || !botToken) {
		throw new Error("No application ID or bot token.");
	}

	const url = new URL(
		`https://discord.com/api/v10/applications/${applicationId}/commands/${id}`
	);

	const response = await fetch(url, {
		headers: {
			/* eslint-disable @typescript-eslint/naming-convention */
			Authorization: `Bot ${botToken}`
			/* eslint-enable @typescript-eslint/naming-convention */
		},
		method: "DELETE"
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}
}
