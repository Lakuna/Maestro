import { enum as enum_, object, optional } from "zod";

import authorizingIntegrationOwners from "../../interactions/receivingAndResponding/authorizingIntegrationOwners.js";
import InteractionType from "../../interactions/receivingAndResponding/InteractionType.js";
import snowflake from "../../snowflake.js";
import user from "../user/user.js";

/**
 * Discord message interaction metadata.
 * @see {@link https://docs.discord.com/developers/resources/message#message-interaction-metadata-object}
 * @internal
 */
const messageInteractionMetadata = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	authorizing_integration_owners: authorizingIntegrationOwners,
	id: snowflake,
	original_response_message_id: optional(snowflake),
	target_message_id: optional(snowflake),
	target_user: optional(user),
	type: enum_(InteractionType),
	user
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default messageInteractionMetadata;
