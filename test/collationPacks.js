import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";

import leaPack from "../dist/collation/packs/leaPack.js";

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
