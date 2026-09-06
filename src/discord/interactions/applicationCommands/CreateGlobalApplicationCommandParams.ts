import type { infer as infer_ } from "zod";

import type { DeepReadonly } from "../../../utility/DeepReadonly.js";
import type Locale from "../../Locale.js";
import type ApplicationIntegrationType from "../../resources/application/ApplicationIntegrationType.js";
import type InteractionContextType from "../receivingAndResponding/InteractionContextType.js";
import type applicationCommandOption from "./applicationCommandOption.js";
import type ApplicationCommandType from "./ApplicationCommandType.js";

/**
 * Parameters for creating a global application command.
 * @see {@link https://docs.discord.com/developers/interactions/application-commands#create-global-application-command-json-params}
 * @internal
 */
export default interface CreateGlobalApplicationCommandParams {
	/* eslint-disable @typescript-eslint/naming-convention */
	/** Interaction contexts where the command can be used. */
	readonly contexts?: readonly InteractionContextType[];

	/** Set of permissions represented as a bit set. */
	readonly default_member_permissions?: null | string;

	/** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true`. */
	readonly default_permission?: boolean;

	/** 1-100 character description for `CHAT_INPUT` commands. */
	readonly description?: string;

	/** Localization dictionary for the `description` field. Values follow the same restrictions as `description`. */
	readonly description_localizations?: null | Readonly<Record<Locale, string>>;

	/** Deprecated (use `contexts` instead). Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
	readonly dm_permission?: boolean | null;

	/** Installation contexts where the command is available. */
	readonly integration_types?: readonly ApplicationIntegrationType[];

	/** Name of command. 1-32 characters. */
	readonly name: string;

	/** Localization dictionary for the `name` field. Values follow the same restrictions as `name`. */
	readonly name_localizations?: null | Readonly<Record<Locale, string>>;

	/** Indicates whether the command is age-restricted. */
	readonly nsfw?: boolean;

	/** The parameters for the command. Max of 25. */
	readonly options?: readonly DeepReadonly<
		infer_<typeof applicationCommandOption>
	>[];

	/** Type of command. Defaults to `1` if not set. */
	readonly type?: ApplicationCommandType;
	/* eslint-enable @typescript-eslint/naming-convention */
}
