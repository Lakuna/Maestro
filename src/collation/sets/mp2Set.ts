import type CollationSet from "../CollationSet.js";

/**
 * Amonkhet masterpieces.
 * @see {@link https://www.lethe.xyz/mtg/collation/akh.html}
 * @internal
 */
const mp2Set = {
	// eslint-disable-next-line capitalized-comments
	// prettier-ignore
	cards: [
		// Masterpiece run (arbitrarily ordered).
		"1",   "2",   "3",   "4",   "5",   "6",   "7",   "8",   "9",   "10",
		"11",  "12",  "13",  "14",  "15",  "16",  "17",  "18",  "19",  "20",
		"21",  "22",  "23",  "24",  "25",  "26",  "27",  "28",  "29",  "30",
		"31",  "32",  "33",  "34",  "35",  "36",  "37",  "38",  "39",  "40",
		"41",  "42",  "43",  "44",  "45",  "46",  "47",  "48",  "49",  "50",
		"51",  "52",  "53",  "54",  "NaN", "NaN", "NaN", "NaN", "NaN", "NaN",
		"NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN",
		"NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN",
		"NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN",
		"NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN",
		"NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN"
	],
	code: "mp2",
	height: 11,
	runs: [
		[0, 29], // Masterpiece run (Amonkhet packs).
		[30, 55] // Masterpiece run (Hour of Devastation packs).
	],
	width: 11
} satisfies CollationSet;

export default mp2Set;
