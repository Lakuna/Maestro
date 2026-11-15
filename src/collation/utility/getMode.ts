import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformFloat32 } from "pure-rand/distribution/uniformFloat32";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";

/**
 * Determine if a mode should be active.
 * @param odds - The odds that the mode should be active.
 * @param rng - The PRNG instance to use.
 * @returns Whether or not the mode is active and the next PRNG.
 * @internal
 */
export default function getMode(
	odds: number,
	rng: Readonly<RandomGenerator> = xoroshiro128plus(defaultSeed())
): boolean {
	return uniformFloat32(rng) < odds;
}
