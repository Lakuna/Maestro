import { array, enum as enum_ } from "zod";

/**
 * A set of producable mana as returned by the Scryfall API. This is different from {@link colors} because Sole Performer can produce `"T"`.
 * @see {@link https://scryfall.com/docs/api/colors | Colors and Costs}
 * @internal
 */
const producedMana = array(enum_(["W", "U", "B", "R", "G", "C", "T"]));

export default producedMana;
