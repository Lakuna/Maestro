import type Course from "./Course.js";

import Location from "./Location.js";
import Track from "./Track.js";

/**
 * Get the name of the G1(s) that match the given conditions, if any.
 * @param course - The race course.
 * @returns The name(s) of the matching G1s, or `undefined` if there are none.
 * @internal
 */
export default function g1Name(course: Course): string[] | undefined {
	switch (course.location) {
		case Location.CHUKYO:
			switch (course.length) {
				case 1200:
					return course.track === Track.TURF ?
							["Takamatsunomiya Kinen"]
						:	void 0;
				case 1800:
					return course.track === Track.TURF ? void 0 : ["Champions Cup"];
				default:
					return void 0;
			}
		case Location.FUKUSHIMA:
			return void 0;
		case Location.FUNABASHI:
			switch (course.length) {
				case 1600:
					return course.track === Track.TURF ? void 0 : ["Kashiwa Kinen"];
				default:
					return void 0;
			}
		case Location.HAKODATE:
			return void 0;
		case Location.HANSHIN:
			switch (course.length) {
				case 1600:
					return course.track === Track.TURF ?
							[
								"Oka Sho",
								"Asahi Hai Futurity Stakes",
								"Hanshin Juvenile Fillies"
							]
						:	void 0;
				case 2000:
					return course.track === Track.TURF ? ["Osaka Hai"] : void 0;
				case 2200:
					return course.track === Track.TURF ? ["Takarazuka Kinen"] : void 0;
				default:
					return void 0;
			}
		case Location.KAWASAKI:
			switch (course.length) {
				case 1600:
					return course.track === Track.TURF ?
							void 0
						:	["Zen-Nippon Junior Yushun"];

				case 2100:
					return course.track === Track.TURF ? void 0 : ["Kawasaki Kinen"];
				default:
					return void 0;
			}
		case Location.KOKURA:
			return void 0;
		case Location.KYOTO:
			switch (course.length) {
				case 1600:
					return course.track === Track.TURF ? ["Mile Championship"] : void 0;
				case 2000:
					return course.track === Track.TURF ? ["Shuka Sho"] : void 0;
				case 2200:
					return course.track === Track.TURF ?
							["Queen Elizabeth II Cup"]
						:	void 0;
				case 3000:
					return course.track === Track.TURF ? ["Kikuka Sho"] : void 0;
				case 3200:
					return course.track === Track.TURF ? ["Tenno Sho (Spring)"] : void 0;
				default:
					return void 0;
			}
		case Location.MORIOKA:
			switch (course.length) {
				case 1600:
					return course.track === Track.TURF ? void 0 : ["M.C. Nambu Hai"];
				default:
					return void 0;
			}
		case Location.NAKAYAMA:
			switch (course.length) {
				case 1200:
					return course.track === Track.TURF ? ["Sprinters Stakes"] : void 0;
				case 2000:
					return course.track === Track.TURF ?
							["Satsuki Sho", "Hopeful Stakes"]
						:	void 0;
				case 2500:
					return course.track === Track.TURF ? ["Arima Kinen"] : void 0;
				default:
					return void 0;
			}
		case Location.NIIGATA:
			return void 0;
		case Location.OI:
			switch (course.length) {
				case 1200:
					return course.track === Track.TURF ? void 0 : ["JBC Sprint"];
				case 1800:
					return course.track === Track.TURF ? void 0 : ["JBC Ladies’ Classic"];
				case 2000:
					return course.track === Track.TURF ?
							void 0
						:	["JBC Classic", "Tokyo Daishoten", "Teio Sho", "Japan Dirt Derby"];
				default:
					return void 0;
			}
		case Location.SAPPORO:
			return void 0;
		case Location.TOKYO:
			switch (course.length) {
				case 1600:
					return course.track === Track.TURF ?
							["Yasuda Kinen", "NHK Mile Cup", "Victoria Mile"]
						:	["February Stakes"];
				case 2000:
					return course.track === Track.TURF ? ["Tenno Sho (Autumn)"] : void 0;
				case 2400:
					return course.track === Track.TURF ?
							["Japan Cup", "Tokyo Yushun (Japanese Derby)", "Japanese Oaks"]
						:	void 0;
				default:
					return void 0;
			}
		default:
			return void 0;
	}
}
