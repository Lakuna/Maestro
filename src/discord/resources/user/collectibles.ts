import { object, optional } from "zod";

import nameplate from "./nameplate.js";

/**
 * Discord collectibles.
 * @see {@link https://docs.discord.com/developers/resources/user#collectibles}
 * @internal
 */
const collectibles = object({ nameplate: optional(nameplate) });

export default collectibles;
