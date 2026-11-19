import { array, type infer as infer_ } from "zod";

import userAgent from "../../../utility/userAgent.js";
import guildMember from "./guildMember.js";

/**
 * List guild members.
 * @param id - The guild's ID.
 * @param limit - The maximum number of members to return.
 * @param after - The highest user ID in the previous page.
 * @returns A list of guild members.
 * @see {@link https://docs.discord.com/developers/resources/guild#list-guild-members}
 * @internal
 */
export default async function listGuildMembers(
	id: string,
	limit?: number,
	after?: string
): Promise<infer_<ReturnType<typeof array<typeof guildMember>>>> {
	const url = new URL(`guilds/${id}/members`, "https://discord.com/api/v10/");
	if (typeof limit === "number") {
		url.searchParams.set("limit", limit.toString());
	}
	if (typeof after === "string") {
		url.searchParams.set("after", after);
	}

	const response = await fetch(url, {
		headers: {
			/* eslint-disable @typescript-eslint/naming-convention */
			"Content-Type": "application/json",
			"User-Agent": userAgent
			/* eslint-enable @typescript-eslint/naming-convention */
		}
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}

	const out = array(guildMember).safeParse(await response.json());
	if (!out.success) {
		throw out.error;
	}

	return out.data;
}
