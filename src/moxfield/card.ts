import { boolean, int, iso, number, object, optional, string, url } from "zod";

import scryfallCard from "../scryfall/card.js";

/**
 * A Moxfield card. Type information is inferred based on examples.
 * @internal
 */
const card = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	acorn: boolean(),
	allRaritiesMask: int(),
	artist: scryfallCard.shape.artist,
	border_color: scryfallCard.shape.border_color,
	card_faces: scryfallCard.shape.card_faces,
	cardHoarderUrl: optional(url()),
	cardkingdom_id: optional(int()),
	cardKingdomUrl: optional(string()), // Partial URL.
	cardmarket_id: scryfallCard.shape.cardmarket_id,
	cardMarketUrl: optional(url()),
	cardTraderUrl: optional(url()),
	cmc: scryfallCard.shape.cmc,
	cn: string(),
	color_identity: scryfallCard.shape.color_identity,
	color_indicator: scryfallCard.shape.color_indicator,
	colors: scryfallCard.shape.colors,
	colorshifted: boolean(),
	content_warning: scryfallCard.shape.content_warning,
	coolStuffIncUrl: optional(url()),
	defaultFinish: string(),
	digital: scryfallCard.shape.digital,
	edhrec_rank: scryfallCard.shape.edhrec_rank,
	etched: boolean(),
	foil: boolean(),
	frame: scryfallCard.shape.frame,
	glossy: boolean(),
	has_arena_legal: boolean(),
	has_multiple_editions: boolean(),
	id: string(),
	image_seq: int(),
	isArenaLegal: boolean(),
	isCovered: boolean(),
	isPauperCommander: boolean(),
	isToken: boolean(),
	lang: scryfallCard.shape.lang,
	latest: boolean(),
	layout: scryfallCard.shape.layout,
	legalities: scryfallCard.shape.legalities,
	mana_cost: scryfallCard.shape.mana_cost,
	manapool_url: optional(url()),
	multiverse_ids: scryfallCard.shape.multiverse_ids,
	name: scryfallCard.shape.name,
	nonfoil: boolean(),
	oracle_text: scryfallCard.shape.oracle_text,
	prices: object({
		ck: optional(number()),
		ck_buy: optional(number()),
		ck_buy_qty: optional(int()),
		csi: optional(number()),
		csi_buy: optional(number()),
		csi_buy_qty: optional(int()),
		ct: optional(number()),
		eur: optional(number()),
		lastUpdatedAtUtc: iso.datetime(),
		mp: optional(number()),
		mp_qty: optional(int()),
		scg: optional(number()),
		scg_buy: optional(number()),
		scg_qty: optional(int()),
		usd: optional(number())
	}),
	promo_types: scryfallCard.shape.promo_types,
	rarity: string(),
	released_at: scryfallCard.shape.released_at,
	reprint: scryfallCard.shape.reprint,
	reserved: scryfallCard.shape.reserved,
	scryfall_id: scryfallCard.shape.id,
	set: scryfallCard.shape.set,
	set_name: scryfallCard.shape.set_name,
	set_type: scryfallCard.shape.set_type,
	starcitygames_sku: optional(string()),
	starcitygames_url: optional(url()),
	tcgplayer_id: scryfallCard.shape.tcgplayer_id,
	tcgPlayerUrl: optional(url()),
	type: optional(string()),
	type_line: scryfallCard.shape.type_line,
	uniqueCardId: string()
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default card;
