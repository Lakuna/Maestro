import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import defaultSeed from "../../utility/defaultSeed.js";
import sequential from "../algorithms/sequential.js";
import akhSet from "../sets/akhSet.js";
import mp2Set from "../sets/mp2Set.js";
import takhSet from "../sets/takhSet.js";
import getMode from "../utility/getMode.js";

/**
 * Generate the collector numbers of the cards in an Amonkhet pack.
 * @param seed - The seed to use to generate the pack.
 * @returns The set codes, collector numbers, and foil statuses of the cards in the pack in order.
 * @see {@link https://www.lethe.xyz/mtg/collation/akh.html}
 * @public
 */
export default function akhPack(
	seed?: number
): readonly [string, string, boolean][] {
	/*
	Odds:
	- 1 in 68 cards are foil (advertised odds).
	- 1 in 1936 cards are masterpieces (advertised odds).
	- 1 in 2 packs contain C1 commons (C1 packs), the remaining 1 in 2 packs contain C2 commons (C2 packs) (actual odds).
	- 1 in 8 packs contain a common foil (actual odds).
	- 1 in 4 packs contain a full art land (actual odds).
	- 1 in 2 packs contain the higher possible number of A uncommons, the other 1 in 2 packs contain the higher possible number of B uncommons (actual odds).
	- 1 in 2 packs contain the higher possible number of A (for C1 packs) or B (for C2 packs) commons, the other 1 in 2 packs contain the higher possible number of C commons (arbitrarily determined by me).
	- 7 in 10 foils are in C1 packs, the remaining 3 in 10 foils are in C2 packs (arbitrarily determined by me).
	- 3 in 4 uncommon or rare/mythic foils are uncommon, the remaining 1 in 4 uncommon or rare/mythic foils are rare/mythic (arbitrarily determined by me).

	Packs contain 15 cards, therefore 15 in 68 packs contain a foil.
	Only C1 packs can contain common foils, therefore 1 in 4 C1 packs contain a common foil.
	1 in 4 is greater than 15 in 68, therefore foil odds must be dependent on pack type.

	15/68 pack with foil
		21/136 C1 pack with foil (7/10 given pack with foil)
			1/8 C1 pack with common foil (17/21 given C1 pack with foil)
			1/34 C1 pack with foil without common foil (4/21 given C1 pack with foil)
				15/1936 C1 pack with masterpiece (255/968 given C1 pack with foil without common foil)
				713/32912 C1 pack with uncommon foil (713/968 given C1 pack with foil without common foil)
		9/136 C2 pack with foil (3/10 given pack with foil)
			5821/131648 C2 pack with uncommon foil (5821/8712 given C2 pack with foil)
			2891/131648 C2 pack with rare/mythic foil (2891/8712 given C2 pack with foil)
	53/68 pack without foil

	1/2 C1 pack
		21/136 C1 pack with foil (21/68 given C1 pack)
			1/8 C1 pack with common foil (17/21 given C1 pack with foil)
			1/34 C1 pack with foil without common foil (4/21 given C1 pack with foil)
				15/1936 C1 pack with masterpiece (255/968 given C1 pack with foil without common foil)
				713/32912 C1 pack with uncommon foil (713/968 given C1 pack with foil without common foil)
		47/136 C1 pack without foil (47/68 given C1 pack)
	1/2 C2 pack
		9/136 C2 pack with foil (9/68 given C2 pack)
			5821/131648 C2 pack with uncommon foil (5821/8712 given C2 pack with foil)
			2891/131648 C2 pack with rare/mythic foil (2891/8712 given C2 pack with foil)
		59/136 C2 pack without foil (59/68 given C2 pack)
	*/

	const rng = xoroshiro128plus(seed ?? defaultSeed());
	const out: [string, string, boolean][] = [];

	const c1Pack = getMode(1 / 2, rng);
	const highCc = getMode(1 / 2, rng);
	const highUa = getMode(1 / 2, rng);
	const fullLand = getMode(1 / 4, rng);
	const hasFoil = c1Pack ? getMode(21 / 68, rng) : getMode(9 / 68, rng);
	const hasFoilC = c1Pack && hasFoil ? getMode(17 / 21, rng) : false;
	const hasMasterpiece =
		c1Pack && hasFoil && !hasFoilC ? getMode(255 / 968, rng) : false;
	const hasFoilU =
		c1Pack ? hasFoil && !hasFoilC && !hasMasterpiece
		: hasFoil ? getMode(5821 / 8712, rng)
		: false;
	const hasFoilR = !c1Pack && hasFoil && !hasFoilU;

	const caCount = c1Pack ? (highCc ? 2 : 3) - (hasFoilC ? 1 : 0) : 4; // Common foils displace A commons.
	const cbCount =
		c1Pack ? 2 - (hasFoilU ? 1 : 0) : (highCc ? 2 : 4) - (hasFoilU ? 1 : 0); // Uncommon foils displace B commons.
	const ccCount =
		c1Pack ?
			(highCc ? 6 : 5) - (hasMasterpiece ? 1 : 0) // Masterpieces displace C1 commons.
		:	(highCc ? 4 : 2) - (hasFoilR ? 1 : 0); // Rare foils displace C2 commons.
	const uaCount = highUa ? 2 : 1;
	const ubCount = highUa ? 1 : 2;

	const caGen = sequential(akhSet, 0, rng);
	for (let i = 0; i < caCount; i++) {
		out.push([akhSet.code, caGen.next().value, false]);
	}

	const cbGen = sequential(akhSet, 2, rng);
	for (let i = 0; i < cbCount; i++) {
		out.push([akhSet.code, cbGen.next().value, false]);
	}

	const ccGen = sequential(akhSet, c1Pack ? 1 : 3, rng);
	for (let i = 0; i < ccCount; i++) {
		out.push([akhSet.code, ccGen.next().value, false]);
	}

	const uaGen = sequential(akhSet, 4, rng);
	for (let i = 0; i < uaCount; i++) {
		out.push([akhSet.code, uaGen.next().value, false]);
	}

	const ubGen = sequential(akhSet, 5, rng);
	for (let i = 0; i < ubCount; i++) {
		out.push([akhSet.code, ubGen.next().value, false]);
	}

	out.push([akhSet.code, sequential(akhSet, 6, rng).next().value, false]);

	if (hasFoilC) {
		out.push([akhSet.code, sequential(akhSet, 9, rng).next().value, true]);
	} else if (hasMasterpiece) {
		out.push([mp2Set.code, sequential(mp2Set, 0, rng).next().value, true]);
	} else if (hasFoilU) {
		out.push([akhSet.code, sequential(akhSet, 10, rng).next().value, true]);
	} else if (hasFoilR) {
		out.push([akhSet.code, sequential(akhSet, 11, rng).next().value, true]);
	}

	out.push([
		akhSet.code,
		sequential(akhSet, fullLand ? 8 : 7, rng).next().value,
		false
	]);

	out.push([takhSet.code, sequential(takhSet, 0, rng).next().value, false]);
	return out;
}
