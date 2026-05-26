import { union } from "zod";

import button from "./button.js";
import channelSelect from "./channelSelect.js";
import mentionableSelect from "./mentionableSelect.js";
import roleSelect from "./roleSelect.js";
import stringSelect from "./stringSelect.js";
import userSelect from "./userSelect.js";

/**
 * Discord action row child component.
 * @see {@link https://docs.discord.com/developers/components/reference#action-row-action-row-child-components}
 * @internal
 */
const actionRowChildComponent = union([
	button,
	stringSelect,
	userSelect,
	roleSelect,
	mentionableSelect,
	channelSelect
]);

export default actionRowChildComponent;
