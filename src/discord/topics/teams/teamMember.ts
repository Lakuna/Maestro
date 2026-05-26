import { enum as enum_, object } from "zod";

import user from "../../resources/user/user.js";
import snowflake from "../../snowflake.js";
import MembershipState from "./MembershipState.js";
import TeamMemberRoleType from "./TeamMemberRoleType.js";

/**
 * Discord team member.
 * @see {@link https://docs.discord.com/developers/topics/teams#data-models-team-member-object}
 * @internal
 */
const teamMember = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	membership_state: enum_(MembershipState),
	role: enum_(TeamMemberRoleType),
	team_id: snowflake,
	user: user.partial()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default teamMember;
