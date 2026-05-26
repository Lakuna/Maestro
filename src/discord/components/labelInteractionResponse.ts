import { int, literal, object, optional } from "zod";

import ComponentType from "./ComponentType.js";
import labelInteractionResponseChildComponent from "./labelInteractionResponseChildComponent.js";

/**
 * Discord label interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#label-label-interaction-response-structure}
 * @internal
 */
const labelInteractionResponse = object({
	component: labelInteractionResponseChildComponent,
	id: int(),
	type: optional(literal(ComponentType.LABEL))
});

export default labelInteractionResponse;
