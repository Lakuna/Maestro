const allSupertypes = ["Basic", "Legendary", "Ongoing", "Snow", "World"]; // Comprehensive Rules 205.4.

/**
 * Split a card's type line into lists of supertypes + type and subtypes.
 * @param typeLine - The type line.
 * @returns A list of the card's supertypes, types, and subtypes, respectively. The last element of the supertypes array is the card's type.
 * @internal
 */
export default function parseTypeLine(
	typeLine: string
): [string[], string[], string[]] {
	const [supertypesAndTypesLine, subtypesLine] = typeLine.split(" — ");
	const supertypesAndTypes =
		supertypesAndTypesLine?.split(" ").filter((type) => type.length) ?? [];
	const subtypes = subtypesLine?.split(" ").filter((type) => type.length) ?? [];

	return [
		supertypesAndTypes.filter((type) => allSupertypes.includes(type)),
		supertypesAndTypes.filter((type) => !allSupertypes.includes(type)),
		subtypes
	];
}
