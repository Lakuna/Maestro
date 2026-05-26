import { array, int, literal, object, optional } from "zod";

import actionRowChildComponent from "./actionRowChildComponent.js";
import ComponentType from "./ComponentType.js";

/**
 * Discord action row.
 * @see {@link https://docs.discord.com/developers/components/reference#action-row}
 * @internal
 */
const actionRow = object({
	components: array(actionRowChildComponent),
	id: optional(int()),
	type: literal(ComponentType.ACTION_ROW)
});

export default actionRow;
