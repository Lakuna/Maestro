import type CollationSet from "../CollationSet.js";

/**
 * Amonkhet tokens.
 * @see {@link https://www.lethe.xyz/mtg/collation/akh.html}
 * @internal
 */
const takhSet = {
	// eslint-disable-next-line capitalized-comments
	// prettier-ignore
	cards: [
		// Token run (`"NaN"` represents ad cards for Magic Duels).
		"21",  "17",  "1",   "16",  "4",   "17",  "8",   "20",  "NaN", "3",   "17",
		"11",  "24",  "20",  "19",  "17",  "20",  "NaN", "21",  "10",  "13",  "17",
		"23",  "16",  "20",  "NaN", "17",  "9",   "14",  "19",  "17",  "18",  "6",
		"16",  "2",   "20",  "10",  "17",  "11",  "NaN", "14",  "17",  "20",  "7",
		"16",  "20",  "17",  "NaN", "14",  "20",  "8",   "17",  "3",   "10",  "20",
		"17",  "19",  "NaN", "2",   "17",  "20",  "15",  "21",  "11",  "NaN", "10",
		"13",  "16",  "NaN", "14",  "3",   "NaN", "17",  "2",   "9",   "11",  "17",
		"24",  "4",   "22",  "17",  "10",  "16",  "20",  "NaN", "2",   "19",  "3",
		"17",  "21",  "20",  "14",  "17",  "23",  "10",  "20",  "11",  "17",  "19",
		"18",  "16",  "17",  "2",   "NaN", "20",  "3",   "17",  "25",  "11",  "12",
		"17",  "16",  "5",   "14",  "17",  "2",   "19",  "3",   "17",  "20",  "NaN"
	],
	code: "takh",
	height: 11,
	runs: [
		[0, 120] // Token run.
	],
	width: 11
} satisfies CollationSet;

export default takhSet;
