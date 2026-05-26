import { array, nullable, object, string } from "zod";

import welcomeScreenChannel from "./welcomeScreenChannel.js";

/**
 * Discord welcome screen.
 * @see {@link https://docs.discord.com/developers/resources/guild#welcome-screen-object}
 * @internal
 */
const welcomeScreen = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	description: nullable(string()),
	welcome_channels: array(welcomeScreenChannel)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default welcomeScreen;
