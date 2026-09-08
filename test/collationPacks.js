import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";

import leaPack from "../dist/collation/packs/leaPack.js";
import lebPack from "../dist/collation/packs/lebPack.js";
import x2edPack from "../dist/collation/packs/x2edPack.js";
import x3edPack from "../dist/collation/packs/x3edPack.js";

void describe("leaPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(
				leaPack(0),
				[287, 120, 217, 289, 145, 30, 290, 294, 59, 134, 216, 255, 97, 294, 179]
			);
		});

		await t.test("1", () => {
			deepEqual(
				leaPack(1),
				[294, 37, 105, 213, 161, 295, 288, 292, 292, 190, 49, 94, 206, 287, 84]
			);
		});

		await t.test("2", () => {
			deepEqual(
				leaPack(2),
				[23, 119, 220, 292, 286, 98, 197, 149, 10, 121, 295, 187, 153, 34, 25]
			);
		});

		await t.test("3", () => {
			deepEqual(
				leaPack(3),
				[288, 145, 11, 134, 286, 290, 37, 105, 295, 288, 190, 44, 289, 151, 265]
			);
		});

		await t.test("4", () => {
			deepEqual(
				leaPack(4),
				[287, 291, 295, 289, 169, 4, 130, 203, 73, 292, 295, 15, 144, 9, 243]
			);
		});
	});
});

void describe("lebPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(
				lebPack(0),
				[289, 121, 218, 292, 146, 31, 296, 300, 60, 135, 217, 256, 98, 300, 180]
			);
		});

		await t.test("1", () => {
			deepEqual(
				lebPack(1),
				[302, 38, 106, 214, 162, 301, 291, 299, 299, 191, 50, 95, 207, 289, 85]
			);
		});

		await t.test("2", () => {
			deepEqual(
				lebPack(2),
				[24, 120, 221, 297, 290, 99, 198, 150, 11, 122, 301, 188, 154, 35, 26]
			);
		});

		await t.test("3", () => {
			deepEqual(
				lebPack(3),
				[293, 146, 12, 135, 288, 296, 38, 106, 301, 291, 191, 45, 292, 152, 266]
			);
		});

		await t.test("4", () => {
			deepEqual(
				lebPack(4),
				[289, 295, 301, 292, 170, 4, 131, 204, 74, 299, 10, 16, 145, 9, 244]
			);
		});
	});
});

void describe("x2edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(
				x2edPack(0),
				[
					259, 258, 240, 173, 297, 18, 291, 146, 290, 12, 135, 199, 288, 296,
					301
				]
			);
		});

		await t.test("1", () => {
			deepEqual(
				x2edPack(1),
				[203, 161, 5, 71, 221, 299, 290, 99, 198, 77, 150, 11, 122, 300, 291]
			);
		});

		await t.test("2", () => {
			deepEqual(
				x2edPack(2),
				[49, 125, 238, 116, 191, 50, 301, 69, 194, 292, 25, 123, 301, 19, 294]
			);
		});

		await t.test("3", () => {
			deepEqual(
				x2edPack(3),
				[154, 297, 44, 180, 131, 204, 292, 299, 24, 120, 221, 299, 290, 99, 150]
			);
		});

		await t.test("4", () => {
			deepEqual(
				x2edPack(4),
				[232, 45, 299, 180, 61, 160, 294, 300, 292, 170, 131, 204, 74, 297, 120]
			);
		});

		// Lowest mode 1 seed.
		await t.test("15099494", () => {
			deepEqual(
				x2edPack(15099494),
				[156, 300, 55, 15, 298, 289, 67, 298, 13, 295, 302, 292, 144, 23, 107]
			);
		});
	});
});

void describe("x3edPack", () => {
	void it("should return the correct output", async (t) => {
		await t.test("0", () => {
			deepEqual(
				x3edPack(0),
				[239, 91, 183, 290, 213, 295, 301, 49, 142, 70, 159, 296, 303, 24, 306]
			);
		});

		await t.test("1", () => {
			deepEqual(
				x3edPack(1),
				[179, 259, 98, 118, 297, 180, 124, 24, 157, 59, 17, 299, 76, 301, 293]
			);
		});

		await t.test("2", () => {
			deepEqual(
				x3edPack(2),
				[305, 47, 168, 193, 123, 167, 21, 300, 302, 293, 111, 298, 304, 74, 107]
			);
		});

		await t.test("3", () => {
			deepEqual(
				x3edPack(3),
				[20, 115, 294, 64, 158, 294, 11, 300, 216, 175, 200, 292, 136, 304, 302]
			);
		});

		await t.test("4", () => {
			deepEqual(
				x3edPack(4),
				[8, 90, 235, 135, 294, 99, 199, 78, 297, 10, 123, 306, 297, 157, 21]
			);
		});
	});
});
