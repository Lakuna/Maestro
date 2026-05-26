import { boolean, enum as enum_, iso, nullable, object, optional } from "zod";

import snowflake from "../../snowflake.js";
import EntitlementType from "./EntitlementType.js";

/**
 * Discord entitlement.
 * @see {@link https://docs.discord.com/developers/resources/entitlement#entitlement-object}
 * @internal
 */
const entitlement = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	application_id: snowflake,
	consumed: optional(boolean()),
	deleted: boolean(),
	ends_at: nullable(iso.datetime({ offset: true })),
	guild_id: optional(snowflake),
	id: snowflake,
	sku_id: snowflake,
	starts_at: nullable(iso.datetime({ offset: true })),
	type: enum_(EntitlementType),
	user_id: optional(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default entitlement;
