import type { infer as infer_ } from "zod";

import type embed from "../discord/resources/message/embed.js";

export default function embedForError(e: unknown): infer_<typeof embed> {
	const rawDescription =
		typeof e === "string" ? e
		: e instanceof Error ? e.message
		: JSON.stringify(e);

	let description = rawDescription;
	try {
		JSON.parse(description);
		description = `\`\`\`json\n${description}\n\`\`\``;
	} catch {
		// `description` is not JSON, display it as-is.
	}

	if (description.length > 0x1000) {
		// There isn't an easy way to display longer messages than this within Discord, so fall back to the console.
		// eslint-disable-next-line no-console
		console.error(rawDescription);

		description = "Error description too long to display (check console).";
	}

	return { color: 0xff0000, description, title: "Error" };
}
