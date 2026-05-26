import { int, object } from "zod";

/**
 * Discord reaction count details.
 * @see {@link https://docs.discord.com/developers/resources/message#reaction-count-details-object}
 * @internal
 */
const reactionCountDetails = object({ burst: int(), normal: int() });

export default reactionCountDetails;
