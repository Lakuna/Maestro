/**
 * Turn a list of strings into a markdown list.
 * @param strings - The strings to turn into a list.
 * @returns A markdown list of the strings.
 * @public
 */
export default function makeMarkdownList(strings: readonly string[]): string {
	return strings
		.map(
			(s) =>
				`- ${s
					.split("\n")
					.map((t) => (/^\s*$/u.test(t) ? "​" : t)) // Add a zero-width space to empty lines so that they don't end code blocks.
					.join("\n  ")}`
		)
		.join("\n");
}
