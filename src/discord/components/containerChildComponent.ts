import { union } from "zod";

import actionRow from "./actionRow.js";
import file from "./file.js";
import mediaGallery from "./mediaGallery.js";
import section from "./section.js";
import separator from "./separator.js";
import textDisplay from "./textDisplay.js";

/**
 * Discord container child component.
 * @see {@link https://docs.discord.com/developers/components/reference#container-container-child-components}
 * @internal
 */
const containerChildComponent = union([
	actionRow,
	textDisplay,
	section,
	mediaGallery,
	separator,
	file
]);

export default containerChildComponent;
