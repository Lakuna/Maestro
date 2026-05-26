import { array, enum as enum_ } from "zod";

/**
 * A set of colors as returned by the Scryfall API.
 * @see {@link https://scryfall.com/docs/api/colors | Colors and Costs}
 * @internal
 */
const colors = array(enum_(["W", "U", "B", "R", "G", "C"]));

export default colors;
