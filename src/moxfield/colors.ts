import { array, enum as enum_ } from "zod";

/**
 * A Moxfield color set. Type information is inferred based on examples.
 * @internal
 */
const colors = array(enum_(["W", "U", "B", "R", "G"]));

export default colors;
