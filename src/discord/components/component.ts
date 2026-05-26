import { union } from "zod";

import actionRow from "./actionRow.js";
import button from "./button.js";
import channelSelect from "./channelSelect.js";
import checkbox from "./checkbox.js";
import checkboxGroup from "./checkboxGroup.js";
import container from "./container.js";
import file from "./file.js";
import fileUpload from "./fileUpload.js";
import label from "./label.js";
import mediaGallery from "./mediaGallery.js";
import mentionableSelect from "./mentionableSelect.js";
import radioGroup from "./radioGroup.js";
import roleSelect from "./roleSelect.js";
import section from "./section.js";
import separator from "./separator.js";
import stringSelect from "./stringSelect.js";
import textDisplay from "./textDisplay.js";
import textInput from "./textInput.js";
import thumbnail from "./thumbnail.js";
import userSelect from "./userSelect.js";

/**
 * Discord message component.
 * @see {@link https://docs.discord.com/developers/components/reference#component-object}
 * @internal
 */
const component = union([
	actionRow,
	button,
	stringSelect,
	textInput,
	userSelect,
	roleSelect,
	mentionableSelect,
	channelSelect,
	section,
	textDisplay,
	thumbnail,
	mediaGallery,
	file,
	separator,
	container,
	label,
	fileUpload,
	radioGroup,
	checkboxGroup,
	checkbox
]);

export default component;
