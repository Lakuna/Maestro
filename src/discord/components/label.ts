import { int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";
import labelChildComponent from "./labelChildComponent.js";

/**
 * Discord label.
 * @see {@link https://docs.discord.com/developers/components/reference#label}
 * @internal
 */
const label = object({
	component: labelChildComponent,
	description: optional(string()),
	id: optional(int()),
	label: string(),
	type: literal(ComponentType.LABEL)
});

export default label;
