import type CollationSet from "../CollationSet.js";

/**
 * Get the collector's number of the card at the given position in the given set.
 * @param set - The set.
 * @param sheet - The zero-indexed number of the sheet.
 * @param x - The zero-indexed horizontal position of the card on the sheet, starting from the left.
 * @param y - The zero-indexed vertical position of the card on the sheet, starting from the top.
 * @returns The collector's number of the card at the given position in the given set.
 * @internal
 */
export default function getCard(
	set: CollationSet,
	sheet: number,
	x: number,
	y: number
): number {
	const out = set.cards[sheet * (set.width * set.height) + y * set.width + x];
	if (typeof out === "undefined") {
		throw new Error("Out of bounds.");
	}

	return out;
}
