import { union } from "zod";

import channelSelect from "./channelSelect.js";
import checkbox from "./checkbox.js";
import checkboxGroup from "./checkboxGroup.js";
import fileUpload from "./fileUpload.js";
import mentionableSelect from "./mentionableSelect.js";
import radioGroup from "./radioGroup.js";
import roleSelect from "./roleSelect.js";
import stringSelect from "./stringSelect.js";
import textInput from "./textInput.js";
import userSelect from "./userSelect.js";

/**
 * Discord label child component.
 * @see {@link https://docs.discord.com/developers/components/reference#label-label-child-components}
 * @internal
 */
const labelChildComponent = union([
	textInput,
	stringSelect,
	userSelect,
	roleSelect,
	mentionableSelect,
	channelSelect,
	fileUpload,
	radioGroup,
	checkboxGroup,
	checkbox
]);

export default labelChildComponent;
