/**
 * Make an initial seed based on the current time.
 * @returns An initial seed.
 * @internal
 */
export default function defaultSeed(): number {
	return Date.now() ^ (Math.random() * 0x100000000);
}
