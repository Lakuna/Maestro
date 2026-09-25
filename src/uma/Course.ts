import type InnerOuterTrack from "./InnerOuterTrack.js";
import type Location from "./Location.js";
import type Track from "./Track.js";

/**
 * A specific race course, including location, track, and length.
 * @internal
 */
export default interface Course {
	readonly innerOuterTrack?: InnerOuterTrack;
	readonly length: number;
	readonly location: Location;
	readonly track: Track;
}
