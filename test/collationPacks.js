import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";

import arnPack from "../dist/collation/packs/arnPack.js";
import atqPack from "../dist/collation/packs/atqPack.js";
import drkPack from "../dist/collation/packs/drkPack.js";
import leaPack from "../dist/collation/packs/leaPack.js";
import lebPack from "../dist/collation/packs/lebPack.js";
import legPack from "../dist/collation/packs/legPack.js";
import x2edPack from "../dist/collation/packs/x2edPack.js";
import x3edPack from "../dist/collation/packs/x3edPack.js";
import x4edPack from "../dist/collation/packs/x4edPack.js";

void describe("arnPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(arnPack(0), ["38", "40", "23", "51", "39", "52†", "28", "21"]);
		});

		await t.test("1", () => {
			deepEqual(arnPack(1), ["55", "53", "38", "23", "51", "39", "76", "35"]);
		});

		await t.test("2", () => {
			deepEqual(arnPack(2), ["31", "12", "3", "72", "13", "8", "4", "17"]);
		});

		await t.test("3", () => {
			deepEqual(arnPack(3), [
				"33†",
				"37†",
				"27†",
				"14",
				"31†",
				"12",
				"42",
				"45"
			]);
		});

		await t.test("4", () => {
			deepEqual(arnPack(4), ["22", "7", "3", "72", "72", "52", "78", "67"]);
		});

		await t.test("253", () => {
			deepEqual(arnPack(253), ["15", "14", "7", "2", "40", "25†", "76", "35"]);
		});

		await t.test("8388608", () => {
			deepEqual(arnPack(8388608), [
				"4",
				"10",
				"38",
				"25",
				"11",
				"55",
				"53",
				"25†"
			]);
		});

		await t.test("8388733", () => {
			deepEqual(arnPack(8388733), [
				"46",
				"57",
				"49",
				"43",
				"37",
				"27",
				"31",
				"12"
			]);
		});
	});
});

void describe("atqPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(atqPack(0), ["80a", "79", "22", "27", "41", "15", "77", "63"]);
		});

		await t.test("1", () => {
			deepEqual(atqPack(1), ["23", "7", "82a", "13", "65", "7", "59", "68"]);
		});

		await t.test("2", () => {
			deepEqual(atqPack(2), ["3", "12", "83d", "52", "75", "12", "55", "34"]);
		});

		await t.test("3", () => {
			deepEqual(atqPack(3), ["84d", "65", "7", "65", "7", "80a", "72", "11"]);
		});

		await t.test("4", () => {
			deepEqual(atqPack(4), ["32", "22", "49", "13", "85a", "67", "72", "25"]);
		});

		await t.test("8388608", () => {
			deepEqual(atqPack(8388608), [
				"40",
				"61",
				"27",
				"8",
				"2",
				"49",
				"60",
				"3"
			]);
		});
	});
});

void describe("drkPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(drkPack(0), ["50", "78", "23", "39", "24", "64", "90", "41"]);
		});

		await t.test("1", () => {
			deepEqual(drkPack(1), ["11", "108", "68", "38", "49", "95", "13", "28"]);
		});

		await t.test("2", () => {
			deepEqual(drkPack(2), ["80", "34", "5", "35", "42", "8", "29", "63"]);
		});

		await t.test("4", () => {
			deepEqual(drkPack(4), ["76", "105", "41", "10", "68", "63", "87", "47"]);
		});

		await t.test("6", () => {
			deepEqual(drkPack(6), ["114", "18", "35", "75", "8", "42", "3", "66"]);
		});

		await t.test("7", () => {
			deepEqual(drkPack(7), ["18", "54", "24", "90", "41", "63", "87", "48"]);
		});

		await t.test("29", () => {
			deepEqual(drkPack(29), ["12", "74", "29", "48", "5", "81", "75", "8"]);
		});

		await t.test("83", () => {
			deepEqual(drkPack(83), ["109", "50", "70", "84", "55", "66", "15", "49"]);
		});

		await t.test("98", () => {
			deepEqual(drkPack(98), ["51", "110", "77", "65", "64", "24", "41", "23"]);
		});

		await t.test("127", () => {
			deepEqual(drkPack(127), ["9", "100", "95", "13", "70", "84", "23", "39"]);
		});

		await t.test("128", () => {
			deepEqual(drkPack(128), ["18", "82", "3", "67", "48", "26", "79", "84"]);
		});

		await t.test("131", () => {
			deepEqual(drkPack(131), ["30", "40", "41", "15", "63", "87", "29", "48"]);
		});

		await t.test("132", () => {
			deepEqual(drkPack(132), ["88", "102", "5", "81", "28", "8", "94", "26"]);
		});

		await t.test("138", () => {
			deepEqual(drkPack(138), ["12", "74", "28", "64", "94", "93", "55", "95"]);
		});
	});
});

void describe("leaPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(leaPack(0), [
				"287",
				"120",
				"217",
				"289",
				"145",
				"30",
				"290",
				"294",
				"59",
				"134",
				"216",
				"255",
				"97",
				"294",
				"179"
			]);
		});

		await t.test("1", () => {
			deepEqual(leaPack(1), [
				"294",
				"37",
				"105",
				"213",
				"161",
				"295",
				"288",
				"292",
				"292",
				"190",
				"49",
				"94",
				"206",
				"287",
				"84"
			]);
		});

		await t.test("2", () => {
			deepEqual(leaPack(2), [
				"23",
				"119",
				"220",
				"292",
				"286",
				"98",
				"197",
				"149",
				"10",
				"121",
				"295",
				"187",
				"153",
				"34",
				"25"
			]);
		});

		await t.test("3", () => {
			deepEqual(leaPack(3), [
				"288",
				"145",
				"11",
				"134",
				"286",
				"290",
				"37",
				"105",
				"295",
				"288",
				"190",
				"44",
				"289",
				"151",
				"265"
			]);
		});

		await t.test("4", () => {
			deepEqual(leaPack(4), [
				"287",
				"291",
				"295",
				"289",
				"169",
				"4",
				"130",
				"203",
				"73",
				"292",
				"295",
				"15",
				"144",
				"9",
				"243"
			]);
		});
	});
});

void describe("lebPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(lebPack(0), [
				"289",
				"121",
				"218",
				"292",
				"146",
				"31",
				"296",
				"300",
				"60",
				"135",
				"217",
				"256",
				"98",
				"300",
				"180"
			]);
		});

		await t.test("1", () => {
			deepEqual(lebPack(1), [
				"302",
				"38",
				"106",
				"214",
				"162",
				"301",
				"291",
				"299",
				"299",
				"191",
				"50",
				"95",
				"207",
				"289",
				"85"
			]);
		});

		await t.test("2", () => {
			deepEqual(lebPack(2), [
				"24",
				"120",
				"221",
				"297",
				"290",
				"99",
				"198",
				"150",
				"11",
				"122",
				"301",
				"188",
				"154",
				"35",
				"26"
			]);
		});

		await t.test("3", () => {
			deepEqual(lebPack(3), [
				"293",
				"146",
				"12",
				"135",
				"288",
				"296",
				"38",
				"106",
				"301",
				"291",
				"191",
				"45",
				"292",
				"152",
				"266"
			]);
		});

		await t.test("4", () => {
			deepEqual(lebPack(4), [
				"289",
				"295",
				"301",
				"292",
				"170",
				"4",
				"131",
				"204",
				"74",
				"299",
				"10",
				"16",
				"145",
				"9",
				"244"
			]);
		});
	});
});

void describe("legPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(legPack(0), [
				"47",
				"36",
				"248",
				"227",
				"84",
				"9",
				"114",
				"182",
				"3",
				"141",
				"186",
				"48",
				"161",
				"100",
				"58"
			]);
		});

		await t.test("1", () => {
			deepEqual(legPack(1), [
				"241",
				"96",
				"47",
				"140",
				"12",
				"170",
				"94",
				"83",
				"189",
				"42",
				"13",
				"188",
				"7",
				"98",
				"48"
			]);
		});

		await t.test("2", () => {
			deepEqual(legPack(2), [
				"95",
				"304",
				"154",
				"216",
				"137",
				"111",
				"84",
				"9",
				"114",
				"182",
				"3",
				"141",
				"186",
				"48",
				"161"
			]);
		});

		await t.test("3", () => {
			deepEqual(legPack(3), [
				"221",
				"41",
				"51",
				"101",
				"184",
				"54",
				"169",
				"21",
				"111",
				"195",
				"9",
				"139",
				"182",
				"56",
				"141"
			]);
		});

		await t.test("4", () => {
			deepEqual(legPack(4), [
				"263",
				"286",
				"95",
				"262",
				"100",
				"58",
				"103",
				"214",
				"40",
				"93",
				"33",
				"134",
				"184",
				"2",
				"204"
			]);
		});

		await t.test("127", () => {
			deepEqual(legPack(127), [
				"71",
				"131",
				"299",
				"62",
				"20",
				"100",
				"58",
				"149",
				"40",
				"93",
				"175",
				"184",
				"2",
				"137",
				"169"
			]);
		});

		await t.test("15099494", () => {
			deepEqual(legPack(15099494), [
				"194",
				"291",
				"208",
				"266",
				"111",
				"84",
				"9",
				"114",
				"182",
				"3",
				"141",
				"186",
				"86",
				"167",
				"45"
			]);
		});

		await t.test("15099584", () => {
			deepEqual(legPack(15099584), [
				"278",
				"251",
				"69",
				"207",
				"177",
				"72",
				"130",
				"118",
				"50",
				"6",
				"99",
				"176",
				"146",
				"125",
				"86"
			]);
		});
	});
});

void describe("x2edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(x2edPack(0), [
				"259",
				"258",
				"240",
				"173",
				"297",
				"18",
				"291",
				"146",
				"290",
				"12",
				"135",
				"199",
				"288",
				"296",
				"301"
			]);
		});

		await t.test("1", () => {
			deepEqual(x2edPack(1), [
				"203",
				"161",
				"5",
				"71",
				"221",
				"299",
				"290",
				"99",
				"198",
				"77",
				"150",
				"11",
				"122",
				"300",
				"291"
			]);
		});

		await t.test("2", () => {
			deepEqual(x2edPack(2), [
				"49",
				"125",
				"238",
				"116",
				"191",
				"50",
				"301",
				"69",
				"194",
				"292",
				"25",
				"123",
				"301",
				"19",
				"294"
			]);
		});

		await t.test("3", () => {
			deepEqual(x2edPack(3), [
				"154",
				"297",
				"44",
				"180",
				"131",
				"204",
				"292",
				"299",
				"24",
				"120",
				"221",
				"299",
				"290",
				"99",
				"150"
			]);
		});

		await t.test("4", () => {
			deepEqual(x2edPack(4), [
				"232",
				"45",
				"299",
				"180",
				"61",
				"160",
				"294",
				"300",
				"292",
				"170",
				"131",
				"204",
				"74",
				"297",
				"120"
			]);
		});

		await t.test("15099494", () => {
			deepEqual(x2edPack(15099494), [
				"156",
				"300",
				"55",
				"15",
				"298",
				"289",
				"67",
				"298",
				"13",
				"295",
				"302",
				"292",
				"144",
				"23",
				"107"
			]);
		});
	});
});

void describe("x3edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(x3edPack(0), [
				"239",
				"91",
				"183",
				"290",
				"213",
				"295",
				"301",
				"49",
				"142",
				"70",
				"159",
				"296",
				"303",
				"24",
				"306"
			]);
		});

		await t.test("1", () => {
			deepEqual(x3edPack(1), [
				"179",
				"259",
				"98",
				"118",
				"297",
				"180",
				"124",
				"24",
				"157",
				"59",
				"17",
				"299",
				"76",
				"301",
				"293"
			]);
		});

		await t.test("2", () => {
			deepEqual(x3edPack(2), [
				"305",
				"47",
				"168",
				"193",
				"123",
				"167",
				"21",
				"300",
				"302",
				"293",
				"111",
				"298",
				"304",
				"74",
				"107"
			]);
		});

		await t.test("3", () => {
			deepEqual(x3edPack(3), [
				"20",
				"115",
				"294",
				"64",
				"158",
				"294",
				"11",
				"300",
				"216",
				"175",
				"200",
				"292",
				"136",
				"304",
				"302"
			]);
		});

		await t.test("4", () => {
			deepEqual(x3edPack(4), [
				"8",
				"90",
				"235",
				"135",
				"294",
				"99",
				"199",
				"78",
				"297",
				"10",
				"123",
				"306",
				"297",
				"157",
				"21"
			]);
		});
	});
});

void describe("x4edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(x4edPack(0), [
				"10",
				"165",
				"242",
				"211",
				"128",
				"70",
				"92",
				"272",
				"42",
				"35",
				"297",
				"151",
				"138",
				"93",
				"270"
			]);
		});

		await t.test("1", () => {
			deepEqual(x4edPack(1), [
				"285",
				"348",
				"159",
				"313",
				"213",
				"103",
				"249",
				"36",
				"219",
				"167",
				"16",
				"190",
				"133",
				"63",
				"263"
			]);
		});

		await t.test("2", () => {
			deepEqual(x4edPack(2), [
				"290",
				"71",
				"122",
				"247",
				"89",
				"238",
				"22",
				"218",
				"356",
				"145",
				"241",
				"41",
				"177",
				"206",
				"152"
			]);
		});

		await t.test("3", () => {
			deepEqual(x4edPack(3), [
				"352",
				"302",
				"139",
				"295",
				"255",
				"47",
				"145",
				"69",
				"277",
				"7",
				"213",
				"103",
				"249",
				"36",
				"16"
			]);
		});

		await t.test("4", () => {
			deepEqual(x4edPack(4), [
				"333",
				"311",
				"341",
				"295",
				"166",
				"86",
				"164",
				"109",
				"286",
				"14",
				"255",
				"47",
				"196",
				"148",
				"7"
			]);
		});

		await t.test("15099494", () => {
			deepEqual(x4edPack(15099494), [
				"314",
				"333",
				"311",
				"149",
				"238",
				"63",
				"14",
				"123",
				"141",
				"265",
				"89",
				"305",
				"135",
				"128",
				"244"
			]);
		});
	});
});
