import type Course from "./Course.js";

import Distance from "./Distance.js";
import distanceOfLength from "./distanceOfLength.js";
import Track from "./Track.js";

/**
 * Get the randomization weight of a specific race course.
 * @param course - THe specific race course.
 * @returns The weight.
 * @internal
 */
export default function weightOfCourse(course: Course): number {
	let weight = 1;

	const lengthType = distanceOfLength(course.length);
	switch (lengthType) {
		case Distance.LONG:
			weight *= 2;
			break;
		case Distance.MEDIUM:
			weight *= 4;
			break;
		case Distance.MILE:
			weight *= 3;
			break;
		default:
	}

	switch (course.track) {
		case Track.TURF:
			weight *= 10;
			break;
		default:
	}

	return weight;
}
