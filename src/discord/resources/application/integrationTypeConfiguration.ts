import { object, optional } from "zod";

import installParams from "./installParams.js";

/**
 * Discord integration type configuration.
 * @see {@link https://docs.discord.com/developers/resources/application#application-object-application-integration-type-configuration-object}
 * @internal
 */
const integrationTypeConfiguration = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	oauth2_install_params: optional(installParams)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default integrationTypeConfiguration;
