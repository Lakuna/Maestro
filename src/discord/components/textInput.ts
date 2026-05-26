import {
	boolean,
	enum as enum_,
	int,
	literal,
	object,
	optional,
	string
} from "zod";

import ComponentType from "./ComponentType.js";
import TextInputStyle from "./TextInputStyle.js";

/**
 * Discord text input.
 * @see {@link https://docs.discord.com/developers/components/reference#text-input}
 * @internal
 */
const textInput = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: optional(int()),
	max_length: optional(int()),
	min_length: optional(int()),
	placeholder: optional(string()),
	required: optional(boolean()),
	style: enum_(TextInputStyle),
	type: optional(literal(ComponentType.TEXT_INPUT)),
	value: optional(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default textInput;
