import type { RandomGenerator } from "pure-rand/types/RandomGenerator";

import { uniformFloat32 } from "pure-rand/distribution/uniformFloat32";
import { purify } from "pure-rand/utils/purify";

const uniformFloat32Pure = purify(uniformFloat32);

/**
 * Determine if a mode should be active.
 * @param odds - The odds that the mode should be active.
 * @param rng - The PRNG instance to use.
 * @returns Whether or not the mode is active and the next PRNG.
 * @internal
 */
export default function getMode(
	odds: number,
	rng: Readonly<RandomGenerator>
): [boolean, RandomGenerator] {
	const [out, outRng] = uniformFloat32Pure(rng);
	return [out < odds, outRng];
}
