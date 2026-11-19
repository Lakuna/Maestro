import type { infer as infer_ } from "zod";

import type simpleDeck from "./simpleDeck.js";

import parseCardsLine from "./parseCardsLine.js";

/**
 * Parse a simplified representation of a deck from a deck list.
 * @internal
 */
export default function parseDeckList(
	message: string
): infer_<typeof simpleDeck> {
	const lines = message.split("\n");

	const aboutHeaderIndex = lines.findIndex((line) => /^about:?$/iu.test(line));
	const mainboardHeaderIndex = lines.findIndex((line) =>
		/^deck:?$/iu.test(line)
	);
	const sideboardHeaderIndex = lines.findIndex((line) =>
		/^sideboard:?$/iu.test(line)
	);

	const aboutLines = lines
		.slice(
			aboutHeaderIndex + 1,
			mainboardHeaderIndex < 0 ? void 0 : mainboardHeaderIndex
		)
		.filter((line) => line.length);

	const out: infer_<typeof simpleDeck> = {
		boards: { mainboard: [], sideboard: [] },
		name:
			/^name (?<name>.*)$/iu.exec(
				aboutLines.find((line) => /^name/iu.test(line)) ?? ""
			)?.groups?.["name"] ?? "Unnamed Deck"
	};

	const mainboardLines = lines
		.slice(
			mainboardHeaderIndex + 1,
			sideboardHeaderIndex < 0 ? void 0 : sideboardHeaderIndex
		)
		.filter((line) => line.length);
	for (const line of mainboardLines) {
		out.boards["mainboard"]?.push(parseCardsLine(line));
	}

	const sideboardLines =
		sideboardHeaderIndex < 0 ?
			[]
		:	lines.slice(sideboardHeaderIndex + 1).filter((line) => line.length);
	for (const line of sideboardLines) {
		out.boards["sideboard"]?.push(parseCardsLine(line));
	}

	return out;
}
