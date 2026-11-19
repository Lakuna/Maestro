import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type guildMember from "../../discord/resources/guild/guildMember.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import listGuildMembers from "../../discord/resources/guild/listGuildMembers.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import Permissions from "../../discord/topics/permissions/Permissions.js";

/**
 * Handle the `addbal` command.
 * @param commandData - The Discord application command data.
 * @param commandMember - The guild member that is using the command.
 * @param guildId - The ID of the guild in which the command is being used.
 * @returns The Discord interaction response.
 * @internal
 */
export default async function addbalHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>,
	commandMember?: DeepReadonly<infer_<typeof guildMember>>,
	guildId?: string
): Promise<infer_<typeof editWebhookMessage>> {
	if (
		!(
			BigInt(commandMember?.permissions ?? 0) &
			BigInt(Permissions.ADMINISTRATOR)
		)
	) {
		throw new Error("Only administrators can use this command.");
	}

	const usersOption = commandData.options?.find(
		({ name, type }) =>
			name === "users" && type === ApplicationCommandOptionType.MENTIONABLE
	);
	if (typeof usersOption?.value !== "string") {
		throw new Error("Missing users option.");
	}

	const coinsOption = commandData.options?.find(
		({ name, type }) =>
			name === "coins" && type === ApplicationCommandOptionType.INTEGER
	);
	if (typeof coinsOption?.value !== "number") {
		throw new Error("Missing coins option.");
	}

	const member = commandData.resolved?.members?.[usersOption.value];
	if (member) {
		return {
			embeds: [
				{
					description: `Member: ${member.nick ?? "(no nickname)"} (\`${usersOption.value}\`)`,
					title: "Add Balance (User)",
					type: EmbedType.RICH
				}
			]
		};
	}

	const role = commandData.resolved?.roles?.[usersOption.value];
	if (!role) {
		throw new Error(`Member/role \`${usersOption.value}\` not found.`);
	}

	if (!guildId) {
		throw new Error("Missing guild ID.");
	}

	// eslint-disable-next-line no-console, no-warning-comments
	console.info(guildId); // TODO: Delete.

	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	const members = (await listGuildMembers(guildId, 1000)).filter(({ roles }) =>
		roles.includes(role.id)
	);

	return {
		embeds: [
			{
				// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
				description: `Role: ${role.name} (\`${role.id}\`)\n${members.map(({ nick }) => `- ${nick ?? "(no nickname)"}`).join("\n")}`,
				title: "Add Balance (Role)",
				type: EmbedType.RICH
			}
		]
	};
}
