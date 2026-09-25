import Distance from "./Distance.js";

/**
 * The distance categorization of a specific racetrack length.
 * @internal
 */
export default function distanceOfLength(length: number): Distance {
	return (
		length <= 1400 ? Distance.SPRINT
		: length <= 1800 ? Distance.MILE
		: length <= 2400 ? Distance.MEDIUM
		: Distance.LONG
	);
}
