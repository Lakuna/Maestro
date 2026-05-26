import { array, enum as enum_, object, string } from "zod";

import Scope from "../../topics/oauth2/Scope.js";

/**
 * Discord install params.
 * @see {@link https://docs.discord.com/developers/resources/application#install-params-object}
 * @internal
 */
const installParams = object({
	permissions: string(),
	scopes: array(enum_(Scope))
});

export default installParams;
