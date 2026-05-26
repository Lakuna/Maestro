import { array, boolean, int, literal, nullish, object, optional } from "zod";

import ComponentType from "./ComponentType.js";
import containerChildComponent from "./containerChildComponent.js";

/**
 * Discord container.
 * @see {@link https://docs.discord.com/developers/components/reference#container}
 * @internal
 */
const container = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	accent_color: nullish(int()),
	components: array(containerChildComponent),
	id: optional(int()),
	spoiler: optional(boolean()),
	type: literal(ComponentType.CONTAINER)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default container;
