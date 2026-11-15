import type Course from "./Course.js";

import InnerOuterTrack from "./InnerOuterTrack.js";
import Location from "./Location.js";
import Track from "./Track.js";

/** @internal */
const courses = [
	{ id: 10101, length: 1200, location: Location.SAPPORO, track: Track.TURF },
	{ id: 10102, length: 1500, location: Location.SAPPORO, track: Track.TURF },
	{ id: 10103, length: 1800, location: Location.SAPPORO, track: Track.TURF },
	{ id: 10104, length: 2000, location: Location.SAPPORO, track: Track.TURF },
	{ id: 10105, length: 2600, location: Location.SAPPORO, track: Track.TURF },
	// { id: 10106, length: 1000, location: Location.SAPPORO, track: Track.DIRT },
	{ id: 10107, length: 1700, location: Location.SAPPORO, track: Track.DIRT },
	// { id: 10108, length: 2400, location: Location.SAPPORO, track: Track.DIRT },
	{ id: 10201, length: 1000, location: Location.HAKODATE, track: Track.TURF },
	{ id: 10202, length: 1200, location: Location.HAKODATE, track: Track.TURF },
	{ id: 10203, length: 1800, location: Location.HAKODATE, track: Track.TURF },
	{ id: 10204, length: 2000, location: Location.HAKODATE, track: Track.TURF },
	{ id: 10205, length: 2600, location: Location.HAKODATE, track: Track.TURF },
	// { id: 10206, length: 1000, location: Location.HAKODATE, track: Track.DIRT },
	{ id: 10207, length: 1700, location: Location.HAKODATE, track: Track.DIRT },
	// { id: 10208, length: 2400, location: Location.HAKODATE, track: Track.DIRT },
	// { id: 10301, length: 1000, location: Location.NIIGATA, track: Track.TURF },
	{
		id: 10302,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10303,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10304,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10305,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10306,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10307,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2000,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10308,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2200,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		id: 10309,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2400,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{ id: 10310, length: 1200, location: Location.NIIGATA, track: Track.DIRT },
	{ id: 10311, length: 1800, location: Location.NIIGATA, track: Track.DIRT },
	// { id: 10312, length: 2500, location: Location.NIIGATA, track: Track.DIRT },
	{ id: 10401, length: 1200, location: Location.FUKUSHIMA, track: Track.TURF },
	{ id: 10402, length: 1800, location: Location.FUKUSHIMA, track: Track.TURF },
	{ id: 10403, length: 2000, location: Location.FUKUSHIMA, track: Track.TURF },
	{ id: 10404, length: 2600, location: Location.FUKUSHIMA, track: Track.TURF },
	{ id: 10405, length: 1150, location: Location.FUKUSHIMA, track: Track.DIRT },
	{ id: 10406, length: 1700, location: Location.FUKUSHIMA, track: Track.DIRT },
	// { id: 10407, length: 2400, location: Location.FUKUSHIMA, track: Track.DIRT },
	{
		id: 10501,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1200,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		id: 10502,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		id: 10503,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1800,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		id: 10504,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		id: 10505,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2200,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		id: 10506,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2500,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		id: 10507,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 3600,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{ id: 10508, length: 1200, location: Location.NAKAYAMA, track: Track.DIRT },
	{ id: 10509, length: 1800, location: Location.NAKAYAMA, track: Track.DIRT },
	{ id: 10510, length: 2400, location: Location.NAKAYAMA, track: Track.DIRT },
	// { id: 10511, length: 2500, location: Location.NAKAYAMA, track: Track.DIRT },
	{ id: 10601, length: 1400, location: Location.TOKYO, track: Track.TURF },
	{ id: 10602, length: 1600, location: Location.TOKYO, track: Track.TURF },
	{ id: 10603, length: 1800, location: Location.TOKYO, track: Track.TURF },
	{ id: 10604, length: 2000, location: Location.TOKYO, track: Track.TURF },
	{ id: 10605, length: 2300, location: Location.TOKYO, track: Track.TURF },
	{ id: 10606, length: 2400, location: Location.TOKYO, track: Track.TURF },
	{ id: 10607, length: 2500, location: Location.TOKYO, track: Track.TURF },
	{ id: 10608, length: 3400, location: Location.TOKYO, track: Track.TURF },
	{ id: 10609, length: 1300, location: Location.TOKYO, track: Track.DIRT },
	{ id: 10610, length: 1400, location: Location.TOKYO, track: Track.DIRT },
	{ id: 10611, length: 1600, location: Location.TOKYO, track: Track.DIRT },
	{ id: 10612, length: 2100, location: Location.TOKYO, track: Track.DIRT },
	// { id: 10613, length: 2400, location: Location.TOKYO, track: Track.DIRT },
	{ id: 10701, length: 1200, location: Location.CHUKYO, track: Track.TURF },
	{ id: 10702, length: 1400, location: Location.CHUKYO, track: Track.TURF },
	{ id: 10703, length: 1600, location: Location.CHUKYO, track: Track.TURF },
	{ id: 10704, length: 2000, location: Location.CHUKYO, track: Track.TURF },
	{ id: 10705, length: 2200, location: Location.CHUKYO, track: Track.TURF },
	// { id: 10706, length: 1200, location: Location.CHUKYO, track: Track.DIRT },
	{ id: 10707, length: 1400, location: Location.CHUKYO, track: Track.DIRT },
	{ id: 10708, length: 1800, location: Location.CHUKYO, track: Track.DIRT },
	// { id: 10709, length: 1800, location: Location.CHUKYO, track: Track.DIRT },
	{
		id: 10801,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10802,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10803,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10804,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1600,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10805,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10806,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10807,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10808,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10809,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10810,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 3000,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		id: 10811,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 3200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{ id: 10812, length: 1200, location: Location.KYOTO, track: Track.DIRT },
	{ id: 10813, length: 1400, location: Location.KYOTO, track: Track.DIRT },
	{ id: 10814, length: 1800, location: Location.KYOTO, track: Track.DIRT },
	{ id: 10815, length: 1900, location: Location.KYOTO, track: Track.DIRT },
	{
		id: 10901,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10902,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10903,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10904,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10905,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10906,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10907,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2400,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10908,
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2600,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		id: 10909,
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 3000,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	// { id: 10910, length: 1200, location: Location.HANSHIN, track: Track.DIRT },
	{ id: 10911, length: 1400, location: Location.HANSHIN, track: Track.DIRT },
	{ id: 10912, length: 1800, location: Location.HANSHIN, track: Track.DIRT },
	{ id: 10913, length: 2000, location: Location.HANSHIN, track: Track.DIRT },
	{
		id: 10914,
		innerOuterTrack: InnerOuterTrack.OUTER_TO_INNER,
		length: 3200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{ id: 11001, length: 1200, location: Location.KOKURA, track: Track.TURF },
	{ id: 11002, length: 1800, location: Location.KOKURA, track: Track.TURF },
	{ id: 11003, length: 2000, location: Location.KOKURA, track: Track.TURF },
	{ id: 11004, length: 2600, location: Location.KOKURA, track: Track.TURF },
	// { id: 11005, length: 1000, location: Location.KOKURA, track: Track.DIRT },
	{ id: 11006, length: 1700, location: Location.KOKURA, track: Track.DIRT },
	// { id: 11007, length: 2400, location: Location.KOKURA, track: Track.DIRT },
	{ id: 11101, length: 1200, location: Location.OI, track: Track.DIRT },
	{ id: 11101, length: 1800, location: Location.OI, track: Track.DIRT },
	{ id: 11101, length: 2000, location: Location.OI, track: Track.DIRT },
	{ id: 11301, length: 1400, location: Location.KAWASAKI, track: Track.DIRT },
	{ id: 11302, length: 1600, location: Location.KAWASAKI, track: Track.DIRT },
	{ id: 11303, length: 2100, location: Location.KAWASAKI, track: Track.DIRT },
	{ id: 11401, length: 1000, location: Location.FUNABASHI, track: Track.DIRT },
	{ id: 11402, length: 1600, location: Location.FUNABASHI, track: Track.DIRT },
	{ id: 11403, length: 1800, location: Location.FUNABASHI, track: Track.DIRT },
	{ id: 11404, length: 2400, location: Location.FUNABASHI, track: Track.DIRT },
	{ id: 11501, length: 1200, location: Location.MORIOKA, track: Track.DIRT },
	{ id: 11502, length: 1600, location: Location.MORIOKA, track: Track.DIRT },
	{ id: 11503, length: 1800, location: Location.MORIOKA, track: Track.DIRT },
	{ id: 11504, length: 2000, location: Location.MORIOKA, track: Track.DIRT }
	// { id: 11203, length: 2400, location: Location.LONGCHAMP, track: Track.TURF },
	// { id: 11612, length: 2000, location: Location.SANTA_ANITA_PARK, track: Track.TURF },
	// { id: 11613, length: 1000, location: Location.SANTA_ANITA_PARK, track: Track.TURF },
	// { id: 11614, length: 1600, location: Location.SANTA_ANITA_PARK, track: Track.TURF },
	// { id: 11615, length: 2000, location: Location.SANTA_ANITA_PARK, track: Track.TURF },
	// { id: 11616, length: 2400, location: Location.SANTA_ANITA_PARK, track: Track.TURF },
	// { id: 11617, length: 1200, location: Location.SANTA_ANITA_PARK, track: Track.DIRT },
	// { id: 11618, length: 1400, location: Location.SANTA_ANITA_PARK, track: Track.DIRT },
	// { id: 11619, length: 1600, location: Location.SANTA_ANITA_PARK, track: Track.DIRT },
	// { id: 11620, length: 1800, location: Location.SANTA_ANITA_PARK, track: Track.DIRT },
	// { id: 11621, length: 2000, location: Location.SANTA_ANITA_PARK, track: Track.DIRT },
	// { id: 11701, length: 1000, location: Location.DEL_MAR, track: Track.TURF },
	// { id: 11702, length: 1600, location: Location.DEL_MAR, track: Track.TURF },
	// { id: 11703, length: 2200, location: Location.DEL_MAR, track: Track.TURF },
	// { id: 11704, length: 2400, location: Location.DEL_MAR, track: Track.TURF },
	// { id: 11705, length: 1200, location: Location.DEL_MAR, track: Track.DIRT },
	// { id: 11706, length: 1400, location: Location.DEL_MAR, track: Track.DIRT },
	// { id: 11707, length: 1600, location: Location.DEL_MAR, track: Track.DIRT },
	// { id: 11708, length: 1800, location: Location.DEL_MAR, track: Track.DIRT },
	// { id: 11709, length: 2000, location: Location.DEL_MAR, track: Track.DIRT }
] satisfies Course[];

export default courses;
