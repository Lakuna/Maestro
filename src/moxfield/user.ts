import { array, object, string, unknown } from "zod";

/**
 * A Moxfield user. Type information is inferred based on examples.
 * @internal
 */
const user = object({
	badges: array(unknown()),
	displayName: string(),
	userName: string()
});

export default user;
