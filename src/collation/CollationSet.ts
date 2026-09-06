/**
 * Details about a Magic set for collation simulations.
 * @internal
 */
export default interface CollationSet {
	/** The collector's numbers of the cards in the set in the order they appear on the sheets from first sheet to last, then top to bottom, then left to right. */
	readonly cards: readonly number[];

	/** The set code. */
	readonly code: string;

	/** The number of cards in each column on each sheet. */
	readonly height: number;

	/** The number of cards in each row on each sheet. */
	readonly width: number;
}
