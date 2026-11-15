import type Course from "./Course.js";

/**
 * Get the URL of an image of a race course.
 * @param course - The race course.
 * @returns The URL.
 * @internal
 */
export default function courseImage(course: Course): string {
	return `https://media.gametora.com/umamusume/racetrack/full/en/${course.location.toString()}/${course.id.toString()}.png`;
}
