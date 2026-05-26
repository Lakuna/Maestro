import { array, nullable, object, string } from "zod";

import snowflake from "../../snowflake.js";
import teamMember from "./teamMember.js";

/**
 * Discord team.
 * @see {@link https://docs.discord.com/developers/topics/teams#data-models-team-object}
 * @internal
 */
const team = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	icon: nullable(string()),
	id: snowflake,
	members: array(teamMember),
	name: string(),
	owner_user_id: snowflake
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default team;
