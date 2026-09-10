import type { CollationPackFunction } from "./CollationPackFunction.js";
import type CollationSet from "./CollationSet.js";

import arnPack from "./packs/arnPack.js";
import atqPack from "./packs/atqPack.js";
import leaPack from "./packs/leaPack.js";
import lebPack from "./packs/lebPack.js";
import legPack from "./packs/legPack.js";
import x2edPack from "./packs/x2edPack.js";
import x3edPack from "./packs/x3edPack.js";
import x4edPack from "./packs/x4edPack.js";
import arnSet from "./sets/arnSet.js";
import atqSet from "./sets/atqSet.js";
import leaSet from "./sets/leaSet.js";
import lebSet from "./sets/lebSet.js";
import legSet from "./sets/legSet.js";
import x2edSet from "./sets/x2edSet.js";
import x3edSet from "./sets/x3edSet.js";
import x4edSet from "./sets/x4edSet.js";

/**
 * A map of set definitions to functions that generate packs for those sets.
 * @internal
 */
const setMap: Map<CollationSet, CollationPackFunction> = new Map<
	CollationSet,
	CollationPackFunction
>([
	[arnSet, arnPack],
	[atqSet, atqPack],
	[leaSet, leaPack],
	[lebSet, lebPack],
	[legSet, legPack],
	[x2edSet, x2edPack],
	[x3edSet, x3edPack],
	[x4edSet, x4edPack]
]);

export default setMap;
