import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";

import akhPack from "../dist/collation/packs/akhPack.js";
import arnPack from "../dist/collation/packs/arnPack.js";
import atqPack from "../dist/collation/packs/atqPack.js";
import drkPack from "../dist/collation/packs/drkPack.js";
import femPack from "../dist/collation/packs/femPack.js";
import leaPack from "../dist/collation/packs/leaPack.js";
import lebPack from "../dist/collation/packs/lebPack.js";
import legPack from "../dist/collation/packs/legPack.js";
import x2edPack from "../dist/collation/packs/x2edPack.js";
import x3edPack from "../dist/collation/packs/x3edPack.js";
import x4edPack from "../dist/collation/packs/x4edPack.js";

void describe("akhPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("27 (`!c1Pack && hasFoil && hasFoilU`)", () => {
			deepEqual(akhPack(27), [
				["akh", "122", false],
				["akh", "7", false],
				["akh", "45", false],
				["akh", "145", false],
				["akh", "115", false],
				["akh", "168", false],
				["akh", "114", false],
				["akh", "232", false],
				["akh", "95", false],
				["akh", "225", false],
				["akh", "226", false],
				["akh", "195", false],
				["akh", "160", false],
				["akh", "227", true],
				["akh", "266", false],
				["takh", "14", false]
			]);
		});

		await t.test("31 (`!c1Pack`)", () => {
			deepEqual(akhPack(31), [
				["akh", "44", false],
				["akh", "120", false],
				["akh", "12", false],
				["akh", "72", false],
				["akh", "115", false],
				["akh", "188", false],
				["akh", "80", false],
				["akh", "171", false],
				["akh", "147", false],
				["akh", "176", false],
				["akh", "190", false],
				["akh", "75", false],
				["akh", "117", false],
				["akh", "98", false],
				["akh", "257", false],
				["takh", "5", false]
			]);
		});

		await t.test("51 (`!c1Pack && hasFoil`)", () => {
			deepEqual(akhPack(51), [
				["akh", "145", false],
				["akh", "12", false],
				["akh", "44", false],
				["akh", "150", false],
				["akh", "103", false],
				["akh", "188", false],
				["akh", "80", false],
				["akh", "171", false],
				["akh", "139", false],
				["akh", "81", false],
				["akh", "197", false],
				["akh", "162", false],
				["akh", "65", false],
				["akh", "239", true],
				["akh", "257", false],
				["takh", "17", false]
			]);
		});

		await t.test("52 (`highUa`)", () => {
			deepEqual(akhPack(52), [
				["akh", "122", false],
				["akh", "7", false],
				["akh", "45", false],
				["akh", "145", false],
				["akh", "87", false],
				["akh", "156", false],
				["akh", "100", false],
				["akh", "166", false],
				["akh", "36", false],
				["akh", "249", false],
				["akh", "215", false],
				["akh", "123", false],
				["akh", "152", false],
				["akh", "65", false],
				["akh", "260", false],
				["takh", "10", false]
			]);
		});

		await t.test("166 (`highCc`)", () => {
			deepEqual(akhPack(166), [
				["akh", "3", false],
				["akh", "57", false],
				["akh", "124", false],
				["akh", "7", false],
				["akh", "174", false],
				["akh", "103", false],
				["akh", "242", false],
				["akh", "173", false],
				["akh", "66", false],
				["akh", "9", false],
				["akh", "60", false],
				["akh", "121", false],
				["akh", "219", false],
				["akh", "74", false],
				["akh", "257", false],
				["takh", "21", false]
			]);
		});

		await t.test("782 (`fullLand`)", () => {
			deepEqual(akhPack(782), [
				["akh", "69", false],
				["akh", "146", false],
				["akh", "26", false],
				["akh", "57", false],
				["akh", "171", false],
				["akh", "91", false],
				["akh", "181", false],
				["akh", "115", false],
				["akh", "242", false],
				["akh", "173", false],
				["akh", "190", false],
				["akh", "206", false],
				["akh", "28", false],
				["akh", "199", false],
				["akh", "252", false],
				["takh", "17", false]
			]);
		});

		await t.test(
			"8388736 (`c1Pack && hasFoil && !hasFoilC && hasMasterpiece`)",
			() => {
				deepEqual(akhPack(8388736), [
					["akh", "150", false],
					["akh", "26", false],
					["akh", "69", false],
					["akh", "179", false],
					["akh", "108", false],
					["akh", "111", false],
					["akh", "141", false],
					["akh", "50", false],
					["akh", "68", false],
					["akh", "225", false],
					["akh", "152", false],
					["akh", "197", false],
					["akh", "51", false],
					["mp2", "8", true],
					["akh", "261", false],
					["takh", "NaN", false]
				]);
			}
		);

		await t.test("8388752 (`c1Pack`)", () => {
			deepEqual(akhPack(8388752), [
				["akh", "145", false],
				["akh", "12", false],
				["akh", "44", false],
				["akh", "166", false],
				["akh", "89", false],
				["akh", "70", false],
				["akh", "241", false],
				["akh", "177", false],
				["akh", "129", false],
				["akh", "102", false],
				["akh", "215", false],
				["akh", "93", false],
				["akh", "209", false],
				["akh", "63", false],
				["akh", "262", false],
				["takh", "19", false]
			]);
		});

		await t.test("8388756 (`c1Pack && hasFoil && hasFoilC`)", () => {
			deepEqual(akhPack(8388756), [
				["akh", "20", false],
				["akh", "40", false],
				["akh", "168", false],
				["akh", "114", false],
				["akh", "167", false],
				["akh", "31", false],
				["akh", "154", false],
				["akh", "246", false],
				["akh", "43", false],
				["akh", "81", false],
				["akh", "127", false],
				["akh", "216", false],
				["akh", "78", false],
				["akh", "258", true],
				["akh", "256", false],
				["takh", "21", false]
			]);
		});

		await t.test("8388761 (`c1Pack && hasFoil`)", () => {
			deepEqual(akhPack(8388761), [
				["akh", "72", false],
				["akh", "143", false],
				["akh", "11", false],
				["akh", "156", false],
				["akh", "19", false],
				["akh", "43", false],
				["akh", "246", false],
				["akh", "157", false],
				["akh", "154", false],
				["akh", "153", false],
				["akh", "197", false],
				["akh", "165", false],
				["akh", "247", false],
				["akh", "152", true],
				["akh", "263", false],
				["takh", "10", false]
			]);
		});
	});
});

void describe("arnPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`!uncommonsFirst`)", () => {
			deepEqual(arnPack(0), [
				["arn", "38", false],
				["arn", "40", false],
				["arn", "23", false],
				["arn", "51", false],
				["arn", "39", false],
				["arn", "52†", false],
				["arn", "28", false],
				["arn", "21", false]
			]);
		});

		await t.test("253 (`wideCommons`)", () => {
			deepEqual(arnPack(253), [
				["arn", "15", false],
				["arn", "14", false],
				["arn", "7", false],
				["arn", "2", false],
				["arn", "40", false],
				["arn", "25†", false],
				["arn", "76", false],
				["arn", "35", false]
			]);
		});

		await t.test("8388608 (`uncommonsFirst`)", () => {
			deepEqual(arnPack(8388608), [
				["arn", "4", false],
				["arn", "10", false],
				["arn", "38", false],
				["arn", "25", false],
				["arn", "11", false],
				["arn", "55", false],
				["arn", "53", false],
				["arn", "25†", false]
			]);
		});
	});
});

void describe("atqPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`!uncommonsFirst`)", () => {
			deepEqual(atqPack(0), [
				["atq", "80a", false],
				["atq", "79", false],
				["atq", "22", false],
				["atq", "27", false],
				["atq", "41", false],
				["atq", "15", false],
				["atq", "77", false],
				["atq", "63", false]
			]);
		});

		await t.test("8388608 (`uncommonsFirst`)", () => {
			deepEqual(atqPack(8388608), [
				["atq", "40", false],
				["atq", "61", false],
				["atq", "27", false],
				["atq", "8", false],
				["atq", "2", false],
				["atq", "49", false],
				["atq", "60", false],
				["atq", "3", false]
			]);
		});
	});
});

void describe("drkPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("2 (`topUncommons`)", () => {
			deepEqual(drkPack(2), [
				["drk", "80", false],
				["drk", "34", false],
				["drk", "5", false],
				["drk", "35", false],
				["drk", "42", false],
				["drk", "8", false],
				["drk", "29", false],
				["drk", "63", false]
			]);
		});

		await t.test("4 (`topCommons`)", () => {
			deepEqual(drkPack(4), [
				["drk", "76", false],
				["drk", "105", false],
				["drk", "41", false],
				["drk", "10", false],
				["drk", "68", false],
				["drk", "63", false],
				["drk", "87", false],
				["drk", "47", false]
			]);
		});

		await t.test("6 (`splitCommons0`)", () => {
			deepEqual(drkPack(6), [
				["drk", "114", false],
				["drk", "18", false],
				["drk", "35", false],
				["drk", "75", false],
				["drk", "8", false],
				["drk", "42", false],
				["drk", "3", false],
				["drk", "66", false]
			]);
		});

		await t.test("7 (`!splitCommonsBox`)", () => {
			deepEqual(drkPack(7), [
				["drk", "18", false],
				["drk", "54", false],
				["drk", "24", false],
				["drk", "90", false],
				["drk", "41", false],
				["drk", "63", false],
				["drk", "87", false],
				["drk", "48", false]
			]);
		});

		await t.test("127 (`splitUncommonsBox`)", () => {
			deepEqual(drkPack(127), [
				["drk", "9", false],
				["drk", "100", false],
				["drk", "95", false],
				["drk", "13", false],
				["drk", "70", false],
				["drk", "84", false],
				["drk", "23", false],
				["drk", "39", false]
			]);
		});

		await t.test("307 (`wideCommons`)", () => {
			deepEqual(drkPack(307), [
				["drk", "76", false],
				["drk", "56", false],
				["drk", "49", false],
				["drk", "17", false],
				["drk", "67", false],
				["drk", "35", false],
				["drk", "70", false],
				["drk", "84", false]
			]);
		});

		await t.test("6990 (`wideUncommons`)", () => {
			deepEqual(drkPack(6990), [
				["drk", "51", false],
				["drk", "110", false],
				["drk", "8", false],
				["drk", "94", false],
				["drk", "26", false],
				["drk", "55", false],
				["drk", "87", false],
				["drk", "5", false]
			]);
		});

		await t.test("8388740 (`splitCommonsBox`)", () => {
			deepEqual(drkPack(8388740), [
				["drk", "82", false],
				["drk", "73", false],
				["drk", "68", false],
				["drk", "94", false],
				["drk", "10", false],
				["drk", "47", false],
				["drk", "14", false],
				["drk", "93", false]
			]);
		});
	});
});

void describe("femPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`topUncommons`)", () => {
			deepEqual(femPack(0), [
				["fem", "68a", false],
				["fem", "30b", false],
				["fem", "1c", false],
				["fem", "7d", false],
				["fem", "67a", false],
				["fem", "34d", false],
				["fem", "21", false],
				["fem", "99", false]
			]);
		});

		await t.test("2 (`!uncommonsFirst`)", () => {
			deepEqual(femPack(2), [
				["fem", "41a", false],
				["fem", "38c", false],
				["fem", "22a", false],
				["fem", "13d", false],
				["fem", "58b", false],
				["fem", "19b", false],
				["fem", "78", false],
				["fem", "57", false]
			]);
		});

		await t.test("127 (`splitUncommons`)", () => {
			deepEqual(femPack(127), [
				["fem", "1a", false],
				["fem", "49b", false],
				["fem", "8a", false],
				["fem", "42c", false],
				["fem", "58d", false],
				["fem", "65d", false],
				["fem", "70", false],
				["fem", "47", false]
			]);
		});

		await t.test("8388736 (`uncommonsFirst`)", () => {
			deepEqual(femPack(8388736), [
				["fem", "76", false],
				["fem", "45", false],
				["fem", "72c", false],
				["fem", "40b", false],
				["fem", "61a", false],
				["fem", "30b", false],
				["fem", "56b", false],
				["fem", "27a", false]
			]);
		});
	});
});

void describe("leaPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(leaPack(0), [
				["lea", "287", false],
				["lea", "120", false],
				["lea", "217", false],
				["lea", "289", false],
				["lea", "145", false],
				["lea", "30", false],
				["lea", "290", false],
				["lea", "294", false],
				["lea", "59", false],
				["lea", "134", false],
				["lea", "216", false],
				["lea", "255", false],
				["lea", "97", false],
				["lea", "294", false],
				["lea", "179", false]
			]);
		});
	});
});

void describe("lebPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`!leaRares`)", () => {
			deepEqual(lebPack(0), [
				["leb", "226", false],
				["leb", "87", false],
				["leb", "76", false],
				["leb", "289", false],
				["leb", "109", false],
				["leb", "228", false],
				["leb", "18", false],
				["leb", "293", false],
				["leb", "300", false],
				["leb", "73", false],
				["leb", "158", false],
				["leb", "181", false],
				["leb", "297", false],
				["leb", "246", false],
				["leb", "42", false]
			]);
		});

		await t.test("15099494 (`leaRares`)", () => {
			deepEqual(lebPack(15099494), [
				["leb", "160", false],
				["leb", "301", false],
				["leb", "292", false],
				["leb", "170", false],
				["leb", "204", false],
				["leb", "74", false],
				["leb", "299", false],
				["leb", "221", false],
				["leb", "72", false],
				["leb", "148", false],
				["leb", "99", false],
				["leb", "8", false],
				["leb", "295", false],
				["leb", "300", false],
				["lea", "261", false]
			]);
		});
	});
});

void describe("legPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`!rucOrdering`)", () => {
			deepEqual(legPack(0), [
				["leg", "47", false],
				["leg", "36", false],
				["leg", "248", false],
				["leg", "227", false],
				["leg", "84", false],
				["leg", "9", false],
				["leg", "114", false],
				["leg", "182", false],
				["leg", "3", false],
				["leg", "141", false],
				["leg", "186", false],
				["leg", "48", false],
				["leg", "161", false],
				["leg", "100", false],
				["leg", "58", false]
			]);
		});

		await t.test("127 (`aBox`)", () => {
			deepEqual(legPack(127), [
				["leg", "71", false],
				["leg", "131", false],
				["leg", "299", false],
				["leg", "62", false],
				["leg", "20", false],
				["leg", "100", false],
				["leg", "58", false],
				["leg", "149", false],
				["leg", "40", false],
				["leg", "93", false],
				["leg", "175", false],
				["leg", "184", false],
				["leg", "2", false],
				["leg", "137", false],
				["leg", "169", false]
			]);
		});

		await t.test("15099494 (`rucOrdering`)", () => {
			deepEqual(legPack(15099494), [
				["leg", "194", false],
				["leg", "291", false],
				["leg", "208", false],
				["leg", "266", false],
				["leg", "111", false],
				["leg", "84", false],
				["leg", "9", false],
				["leg", "114", false],
				["leg", "182", false],
				["leg", "3", false],
				["leg", "141", false],
				["leg", "186", false],
				["leg", "86", false],
				["leg", "167", false],
				["leg", "45", false]
			]);
		});
	});
});

void describe("x2edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`!rucOrdering`)", () => {
			deepEqual(x2edPack(0), [
				["2ed", "259", false],
				["2ed", "258", false],
				["2ed", "240", false],
				["2ed", "173", false],
				["2ed", "297", false],
				["2ed", "18", false],
				["2ed", "291", false],
				["2ed", "146", false],
				["2ed", "290", false],
				["2ed", "12", false],
				["2ed", "135", false],
				["2ed", "199", false],
				["2ed", "288", false],
				["2ed", "296", false],
				["2ed", "301", false]
			]);
		});

		await t.test("15099494 (`rucOrdering`)", () => {
			deepEqual(x2edPack(15099494), [
				["2ed", "156", false],
				["2ed", "300", false],
				["2ed", "55", false],
				["2ed", "15", false],
				["2ed", "298", false],
				["2ed", "289", false],
				["2ed", "67", false],
				["2ed", "298", false],
				["2ed", "13", false],
				["2ed", "295", false],
				["2ed", "302", false],
				["2ed", "292", false],
				["2ed", "144", false],
				["2ed", "23", false],
				["2ed", "107", false]
			]);
		});
	});
});

void describe("x3edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(x3edPack(0), [
				["3ed", "239", false],
				["3ed", "91", false],
				["3ed", "183", false],
				["3ed", "290", false],
				["3ed", "213", false],
				["3ed", "295", false],
				["3ed", "301", false],
				["3ed", "49", false],
				["3ed", "142", false],
				["3ed", "70", false],
				["3ed", "159", false],
				["3ed", "296", false],
				["3ed", "303", false],
				["3ed", "24", false],
				["3ed", "306", false]
			]);
		});
	});
});

void describe("x4edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0 (`!commonSheetMode`)", () => {
			deepEqual(x4edPack(0), [
				["4ed", "10", false],
				["4ed", "165", false],
				["4ed", "242", false],
				["4ed", "211", false],
				["4ed", "128", false],
				["4ed", "70", false],
				["4ed", "92", false],
				["4ed", "272", false],
				["4ed", "42", false],
				["4ed", "35", false],
				["4ed", "297", false],
				["4ed", "151", false],
				["4ed", "138", false],
				["4ed", "93", false],
				["4ed", "270", false]
			]);
		});

		await t.test("15099494 (`commonSheetMode`)", () => {
			deepEqual(x4edPack(15099494), [
				["4ed", "314", false],
				["4ed", "333", false],
				["4ed", "311", false],
				["4ed", "149", false],
				["4ed", "238", false],
				["4ed", "63", false],
				["4ed", "14", false],
				["4ed", "123", false],
				["4ed", "141", false],
				["4ed", "265", false],
				["4ed", "89", false],
				["4ed", "305", false],
				["4ed", "135", false],
				["4ed", "128", false],
				["4ed", "244", false]
			]);
		});
	});
});
