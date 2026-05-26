import { boolean, int, object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord role subscription.
 * @see {@link https://docs.discord.com/developers/resources/message#role-subscription-data-object}
 * @internal
 */
const roleSubscription = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	is_renewal: boolean(),
	role_subscription_listing_id: snowflake,
	tier_name: string(),
	total_months_subscribed: int()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default roleSubscription;
