import { enum as enum_, object, string } from "zod";

import snowflake from "../../snowflake.js";

/**
 * Discord nameplate.
 * @see {@link https://docs.discord.com/developers/resources/user#nameplate-nameplate-structure}
 * @internal
 */
const nameplate = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	asset: string(),
	label: string(),
	palette: enum_([
		"crimson",
		"berry",
		"sky",
		"teal",
		"forest",
		"bubble_gum",
		"violet",
		"cobalt",
		"clover",
		"lemon",
		"white"
	]),
	sku_id: snowflake
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default nameplate;
