import type { infer as infer_ } from "zod";

import type simpleCards from "./simpleCards.js";

/**
 * Parse a simplified representation of a set of cards from a line of a deck list.
 * @internal
 */
export default function parseCardsLine(
	line: string
): infer_<typeof simpleCards> {
	const matches =
		/^(?<count>\d+) (?<name>.+?)(?: \((?<set>[^)\s]+)\) (?<collectorNumber>[^\s]+))?$/iu.exec(
			line
		);

	const count = parseInt(matches?.groups?.["count"] ?? "", 10);
	if (isNaN(count)) {
		throw new Error(
			`Invalid count on line \`${line}\`. Ensure that the line begins with a number.`
		);
	}

	const name = matches?.groups?.["name"];
	if (!name) {
		throw new Error(
			`No name on line \`${line}\`. Ensure that the line begins with a count, then a space, then a name.`
		);
	}

	return {
		card: {
			collectorNumber: matches.groups?.["collectorNumber"],
			name,
			set: matches.groups?.["set"]?.toLowerCase()
		},
		count
	};
}
