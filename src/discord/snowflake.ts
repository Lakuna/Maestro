import { string } from "zod";

/**
 * Discord snowflake.
 * @see {@link https://docs.discord.com/developers/reference#snowflakes}
 * @internal
 */
const snowflake = string().max(0x40);

export default snowflake;
