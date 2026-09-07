import type { CollationPackFunction } from "./CollationPackFunction.js";
import type CollationSet from "./CollationSet.js";

import leaPack from "./packs/leaPack.js";
import lebPack from "./packs/lebPack.js";
import leaSet from "./sets/leaSet.js";
import lebSet from "./sets/lebSet.js";

/**
 * A map of set definitions to functions that generate packs for those sets.
 * @internal
 */
const setMap: Map<CollationSet, CollationPackFunction> = new Map<
	CollationSet,
	CollationPackFunction
>([
	[leaSet, leaPack],
	[lebSet, lebPack]
]);

export default setMap;
