import type { CollationPackFunction } from "./CollationPackFunction.js";
import type CollationSet from "./CollationSet.js";

import leaPack from "./packs/leaPack.js";
import leaSet from "./sets/leaSet.js";

/**
 * A map of set definitions to functions that generate packs for those sets.
 * @internal
 */
const setMap: Map<CollationSet, CollationPackFunction> = new Map<
	CollationSet,
	CollationPackFunction
>([[leaSet, leaPack]]);

export default setMap;
