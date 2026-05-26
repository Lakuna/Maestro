import {
	array,
	boolean,
	enum as enum_,
	int,
	literal,
	object,
	optional,
	string
} from "zod";

import ChannelType from "../resources/channel/ChannelType.js";
import ComponentType from "./ComponentType.js";
import selectDefaultValue from "./selectDefaultValue.js";

/**
 * Discord channel select.
 * @see {@link https://docs.discord.com/developers/components/reference#channel-select}
 * @internal
 */
const channelSelect = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	channel_types: optional(array(enum_(ChannelType))),
	custom_id: string(),
	default_values: optional(array(selectDefaultValue)),
	disabled: optional(boolean()),
	id: optional(int()),
	max_values: optional(int()),
	min_values: optional(int()),
	placeholder: optional(string()),
	required: optional(boolean()),
	type: literal(ComponentType.MENTIONABLE_SELECT)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default channelSelect;
