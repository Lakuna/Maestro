import { array, int, literal, object, optional } from "zod";

import ComponentType from "./ComponentType.js";
import sectionAccessoryComponent from "./sectionAccessoryComponent.js";
import sectionChildComponent from "./sectionChildComponent.js";

/**
 * Discord section.
 * @see {@link https://docs.discord.com/developers/components/reference#section}
 * @internal
 */
const section = object({
	accessory: sectionAccessoryComponent,
	components: array(sectionChildComponent),
	id: optional(int()),
	type: literal(ComponentType.SECTION)
});

export default section;
