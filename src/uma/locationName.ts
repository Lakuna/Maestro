import Location from "./Location.js";

/**
 * Get the name of a location.
 * @param location - The location.
 * @returns The name of the location.
 * @internal
 */
export default function locationName(location: Location): string {
	switch (location) {
		case Location.CHUKYO:
			return "Chukyo";
		case Location.DEL_MAR:
			return "Del Mar";
		case Location.FUKUSHIMA:
			return "Fukushima";
		case Location.FUNABASHI:
			return "Funabashi";
		case Location.HAKODATE:
			return "Hakodate";
		case Location.HANSHIN:
			return "Hanshin";
		case Location.KAWASAKI:
			return "Kawasaki";
		case Location.KOKURA:
			return "Kokura";
		case Location.KYOTO:
			return "Kyoto";
		case Location.LONGCHAMP:
			return "Longchamp";
		case Location.MORIOKA:
			return "Morioka";
		case Location.NAKAYAMA:
			return "Nakayama";
		case Location.NIIGATA:
			return "Niigata";
		case Location.OI:
			return "Oi"; // Alternatively spelled "Ooi."
		case Location.SANTA_ANITA_PARK:
			return "Santa Anita Park";
		case Location.SAPPORO:
			return "Sapporo";
		case Location.TOKYO:
			return "Tokyo";
		default:
			return location;
	}
}
