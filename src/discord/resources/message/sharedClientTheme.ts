import { array, enum as enum_, int, nullish, object, string } from "zod";

import BaseThemeType from "./BaseThemeType.js";

/**
 * Discord shared client theme.
 * @see {@link https://docs.discord.com/developers/resources/message#shared-client-theme-object}
 * @internal
 */
const sharedClientTheme = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	base_mix: int(),
	base_theme: nullish(enum_(BaseThemeType)),
	colors: array(string()),
	gradient_angle: int()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default sharedClientTheme;
