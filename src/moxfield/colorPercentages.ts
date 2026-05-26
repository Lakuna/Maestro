import { number, object } from "zod";

/**
 * A Moxfield color percentages set. Type information is inferred based on examples.
 * @internal
 */
const colorPercentages = object({
	black: number(),
	blue: number(),
	green: number(),
	red: number(),
	white: number()
});

export default colorPercentages;
