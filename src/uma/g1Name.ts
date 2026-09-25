import type Course from "./Course.js";

import Location from "./Location.js";
import Season from "./Season.js";
import Track from "./Track.js";

/**
 * Get the name of the G1(s) that match the given conditions, if any.
 * @param course - The race course.
 * @param season - The season in which the race is taking place.
 * @returns The name(s) of the matching G1s, or `undefined` if there are none.
 * @internal
 */
export default function g1Name(
	course: Course,
	season: Season
): string | undefined {
	switch (season) {
		case Season.AUTUMN:
			switch (course.location) {
				case Location.KYOTO:
					switch (course.length) {
						case 1600:
							return course.track === Track.TURF ? "Mile Championship" : void 0;
						case 2000:
							return course.track === Track.TURF ? "Shuka Sho" : void 0;
						case 2200:
							return course.track === Track.TURF ?
									"Queen Elizabeth II Cup"
								:	void 0;
						case 3000:
							return course.track === Track.TURF ? "Kikuka Sho" : void 0;
						default:
							return void 0;
					}
				case Location.MORIOKA:
					return course.length === 1600 && course.track === Track.DIRT ?
							"M.C. Nambu Hai"
						:	void 0;
				case Location.NAKAYAMA:
					return course.length === 1200 && course.track === Track.TURF ?
							"Sprinters Stakes"
						:	void 0;
				case Location.OI:
					switch (course.length) {
						case 1200:
							return course.track === Track.DIRT ? "JBC Sprint" : void 0;
						case 1800:
							return course.track === Track.DIRT ?
									"JBC Ladies’ Classic"
								:	void 0;
						case 2000:
							return course.track === Track.DIRT ? "JBC Classic" : void 0;
						default:
							return void 0;
					}
				case Location.TOKYO:
					switch (course.length) {
						case 2000:
							return course.track === Track.TURF ?
									"Tenno Sho (Autumn)"
								:	void 0;
						case 2400:
							return course.track === Track.TURF ? "Japan Cup" : void 0;
						default:
							return void 0;
					}
				default:
					return void 0;
			}
		case Season.SPRING:
			switch (course.location) {
				case Location.CHUKYO:
					return course.length === 1200 && course.track === Track.TURF ?
							"Takamatsunomiya Kinen"
						:	void 0;
				case Location.FUNABASHI:
					return course.length === 1600 && course.track === Track.DIRT ?
							"Kashiwa Kinen"
						:	void 0;
				case Location.HANSHIN:
					switch (course.length) {
						case 1600:
							return course.track === Track.TURF ? "Oka Sho" : void 0;
						case 2000:
							return course.track === Track.TURF ? "Osaka Hai" : void 0;
						case 2200:
							return course.track === Track.TURF ? "Takarazuka Kinen" : void 0;
						default:
							return void 0;
					}
				case Location.KYOTO:
					return course.length === 3200 && course.track === Track.TURF ?
							"Tenno Sho (Spring)"
						:	void 0;
				case Location.NAKAYAMA:
					return course.length === 2000 && course.track === Track.TURF ?
							"Satsuki Sho"
						:	void 0;
				case Location.OI:
					return course.length === 2000 && course.track === Track.DIRT ?
							"Teio Sho"
						:	void 0;
				case Location.TOKYO:
					switch (course.length) {
						case 1600:
							return course.track === Track.TURF ?
									"NHK Mile Cup/Yasuda Kinen/Victoria Mile"
								:	void 0;
						case 2400:
							return course.track === Track.TURF ?
									"Japanese Oaks/Tokyo Yushun (Japanese Derby)"
								:	void 0;
						default:
							return void 0;
					}
				default:
					return void 0;
			}
		case Season.SUMMER:
			return (
					course.location === Location.OI &&
						course.length === 2000 &&
						course.track === Track.DIRT
				) ?
					"Japan Dirt Derby"
				:	void 0;
		case Season.WINTER:
			switch (course.location) {
				case Location.CHUKYO:
					return course.length === 1800 && course.track === Track.DIRT ?
							"Champions Cup"
						:	void 0;
				case Location.HANSHIN:
					return course.length === 1600 && course.track === Track.TURF ?
							"Asahi Hai Futurity Stakes/Hanshin Juvenile Fillies"
						:	void 0;
				case Location.KAWASAKI:
					switch (course.length) {
						case 1600:
							return course.track === Track.DIRT ?
									"Zen-Nippon Junior Yushun"
								:	void 0;
						case 2100:
							return course.track === Track.DIRT ? "Kawasaki Kinen" : void 0;
						default:
							return void 0;
					}
				case Location.NAKAYAMA:
					switch (course.length) {
						case 2000:
							return course.track === Track.TURF ? "Hopeful Stakes" : void 0;
						case 2500:
							return course.track === Track.TURF ? "Arima Kinen" : void 0;
						default:
							return void 0;
					}
				case Location.OI:
					return course.length === 2000 && course.track === Track.DIRT ?
							"Tokyo Daishoten"
						:	void 0;
				case Location.TOKYO:
					return course.length === 1600 && course.track === Track.DIRT ?
							"February Stakes"
						:	void 0;
				default:
					return void 0;
			}
		default:
			return void 0;
	}
}
