import { enum as enum_, record } from "zod";

import ApplicationIntegrationType from "../../resources/application/ApplicationIntegrationType.js";
import snowflake from "../../snowflake.js";

/**
 * Discord authorizing integration owners.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object}
 * @internal
 */
const authorizingIntegrationOwners = record(
	enum_(ApplicationIntegrationType),
	snowflake
);

export default authorizingIntegrationOwners;
