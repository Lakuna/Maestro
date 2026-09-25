import type Course from "./Course.js";

import InnerOuterTrack from "./InnerOuterTrack.js";
import Location from "./Location.js";
import Track from "./Track.js";

/** @internal */
const courses = [
	{ length: 2600, location: Location.SAPPORO, track: Track.TURF },
	{ length: 2000, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1800, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1500, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1200, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1700, location: Location.SAPPORO, track: Track.DIRT },
	{ length: 2600, location: Location.HAKODATE, track: Track.TURF },
	{ length: 2000, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1800, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1200, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1000, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1700, location: Location.HAKODATE, track: Track.DIRT },
	{ length: 2600, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 2000, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 1800, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 1200, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 1700, location: Location.FUKUSHIMA, track: Track.DIRT },
	{ length: 1150, location: Location.FUKUSHIMA, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2400,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2200,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2000,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{ length: 1800, location: Location.NIIGATA, track: Track.DIRT },
	{ length: 1200, location: Location.NIIGATA, track: Track.DIRT },
	{ length: 3400, location: Location.TOKYO, track: Track.TURF },
	{ length: 2500, location: Location.TOKYO, track: Track.TURF },
	{ length: 2400, location: Location.TOKYO, track: Track.TURF },
	{ length: 2300, location: Location.TOKYO, track: Track.TURF },
	{ length: 2000, location: Location.TOKYO, track: Track.TURF },
	{ length: 1800, location: Location.TOKYO, track: Track.TURF },
	{ length: 1600, location: Location.TOKYO, track: Track.TURF },
	{ length: 1400, location: Location.TOKYO, track: Track.TURF },
	{ length: 2100, location: Location.TOKYO, track: Track.DIRT },
	{ length: 1600, location: Location.TOKYO, track: Track.DIRT },
	{ length: 1400, location: Location.TOKYO, track: Track.DIRT },
	{ length: 1300, location: Location.TOKYO, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 3600,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2500,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2200,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1800,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1200,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{ length: 1800, location: Location.NAKAYAMA, track: Track.DIRT },
	{ length: 1200, location: Location.NAKAYAMA, track: Track.DIRT },
	{ length: 2200, location: Location.CHUKYO, track: Track.TURF },
	{ length: 2000, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1600, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1400, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1200, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1800, location: Location.CHUKYO, track: Track.DIRT },
	{ length: 1400, location: Location.CHUKYO, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 3200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 3000,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1600,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{ length: 1900, location: Location.KYOTO, track: Track.DIRT },
	{ length: 1800, location: Location.KYOTO, track: Track.DIRT },
	{ length: 1400, location: Location.KYOTO, track: Track.DIRT },
	{ length: 1200, location: Location.KYOTO, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.OUTER_TO_INNER,
		length: 3200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 3000,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2600,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2400,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{ length: 2000, location: Location.HANSHIN, track: Track.DIRT },
	{ length: 1800, location: Location.HANSHIN, track: Track.DIRT },
	{ length: 1400, location: Location.HANSHIN, track: Track.DIRT },
	{ length: 2600, location: Location.KOKURA, track: Track.TURF },
	{ length: 2000, location: Location.KOKURA, track: Track.TURF },
	{ length: 1800, location: Location.KOKURA, track: Track.TURF },
	{ length: 1200, location: Location.KOKURA, track: Track.TURF },
	{ length: 1700, location: Location.KOKURA, track: Track.DIRT },
	{ length: 2000, location: Location.OI, track: Track.DIRT },
	{ length: 1800, location: Location.OI, track: Track.DIRT },
	{ length: 1200, location: Location.OI, track: Track.DIRT },
	{ length: 2100, location: Location.KAWASAKI, track: Track.DIRT },
	{ length: 1600, location: Location.KAWASAKI, track: Track.DIRT },
	{ length: 1400, location: Location.KAWASAKI, track: Track.DIRT },
	{ length: 2400, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 1800, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 1600, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 1000, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 2000, location: Location.MORIOKA, track: Track.DIRT },
	{ length: 1800, location: Location.MORIOKA, track: Track.DIRT },
	{ length: 1600, location: Location.MORIOKA, track: Track.DIRT },
	{ length: 1200, location: Location.MORIOKA, track: Track.DIRT }
] satisfies Course[];

export default courses;
