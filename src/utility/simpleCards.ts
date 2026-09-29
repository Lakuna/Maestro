import { int, object } from "zod";

import simpleCard from "./simpleCard.js";

/**
 * A simplified representation of a set of Magic cards.
 * @internal
 */
const simpleCards = object({ card: simpleCard, count: int() });

export default simpleCards;
