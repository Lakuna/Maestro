/**
 * Split a string of seeds into seeds.
 * @param str - The string of seeds.
 * @returns The seeds.
 * @internal
 */
export default function stringToSeeds(str: string): readonly number[] {
	return str.split(/[,\s]+/u).map((seed) => parseInt(seed, 10));
}
