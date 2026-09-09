import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";

import arnPack from "../dist/collation/packs/arnPack.js";
import atqPack from "../dist/collation/packs/atqPack.js";
import leaPack from "../dist/collation/packs/leaPack.js";
import lebPack from "../dist/collation/packs/lebPack.js";
import x2edPack from "../dist/collation/packs/x2edPack.js";
import x3edPack from "../dist/collation/packs/x3edPack.js";
import x4edPack from "../dist/collation/packs/x4edPack.js";

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

		// Lowest mode 1 seed.
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

		// Lowest mode 1 seed.
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

void describe("arnPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(arnPack(0), ["37", "27", "25†", "52", "14", "31", "6", "73"]);
		});

		await t.test("1", () => {
			deepEqual(arnPack(1), ["25", "11", "55", "53", "53", "38", "32", "62"]);
		});

		await t.test("2", () => {
			deepEqual(arnPack(2), ["3", "7†", "72", "49", "72", "51", "76", "46"]);
		});

		await t.test("3", () => {
			deepEqual(arnPack(3), ["25†", "53", "38", "40", "22", "37", "63", "65"]);
		});

		await t.test("4", () => {
			deepEqual(arnPack(4), ["14", "11", "38", "25", "15", "2", "63", "17"]);
		});

		// Lowest mode 1 seed.
		await t.test("8388608", () => {
			deepEqual(arnPack(8388608), [
				"42",
				"45",
				"51",
				"38",
				"39",
				"33",
				"27",
				"15"
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

		// Lowest mode 1 seed.
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
