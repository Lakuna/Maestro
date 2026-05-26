import { object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord avatar decoration data.
 * @see {@link https://docs.discord.com/developers/resources/user#avatar-decoration-data-object}
 * @internal
 */
const avatarDecorationData = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	asset: string(),
	sku_id: snowflake
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default avatarDecorationData;
