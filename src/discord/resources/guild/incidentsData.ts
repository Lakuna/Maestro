import { iso, nullable, nullish, object } from "zod";

/**
 * Discord incidents data.
 * @see {@link https://docs.discord.com/developers/resources/guild#incidents-data-object}
 * @internal
 */
const incidentsData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	dm_spam_detected_at: nullish(iso.datetime()),
	dms_disabled_until: nullable(iso.datetime()),
	invites_disabled_until: nullable(iso.datetime()),
	raid_detected_at: nullish(iso.datetime())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default incidentsData;
