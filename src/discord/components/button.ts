import {
	boolean,
	enum as enum_,
	int,
	literal,
	object,
	optional,
	string
} from "zod";

import emoji from "../resources/emoji/emoji.js";
import snowflake from "../snowflake.js";
import ButtonStyle from "./ButtonStyle.js";
import ComponentType from "./ComponentType.js";

/**
 * Discord button.
 * @see {@link https://docs.discord.com/developers/components/reference#button}
 * @internal
 */
const button = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: optional(string()),
	disabled: optional(boolean()),
	emoji: optional(emoji.partial()),
	id: optional(int()),
	label: optional(string()),
	sku_id: optional(snowflake),
	style: enum_(ButtonStyle),
	type: literal(ComponentType.BUTTON),
	url: optional(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default button;
