import { int, object } from "zod";

/**
 * Discord role colors.
 * @see {@link https://docs.discord.com/developers/topics/permissions#role-object-role-colors-object}
 * @internal
 */
const roleColors = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	primary_color: int(),
	secondary_color: int(),
	tertiary_color: int()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default roleColors;
