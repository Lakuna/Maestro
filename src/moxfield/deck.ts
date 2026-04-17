import {
	array,
	boolean,
	enum as enum_,
	int,
	iso,
	number,
	object,
	optional,
	record,
	string,
	unknown,
	url
} from "zod";

import scryfallCard from "../scryfall/card.js";

/**
 * A Moxfield user. Type information is inferred based on examples.
 * @internal
 */
const user = object({
	badges: array(unknown()),
	displayName: string(),
	userName: string()
});

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

/**
 * A Moxfield board. Type information is inferred based on examples.
 * @internal
 */
const board = object({
	cards: record(
		string(),
		object({
			boardType: string(),
			card,
			excludedFromColor: boolean(),
			finish: string(),
			isAlter: boolean(),
			isFoil: boolean(),
			isProxy: boolean(),
			quantity: int(),
			useCmcOverride: boolean(),
			useColorIdentityOverride: boolean(),
			useManaCostOverride: boolean()
		})
	),
	count: int()
});

/**
 * A Moxfield color set. Type information is inferred based on examples.
 * @internal
 */
const colors = array(enum_(["W", "U", "B", "R", "G"]));

/**
 * A Moxfield color percentages set. Type information is inferred based on examples.
 * @internal
 */
const colorPercentages = object({
	black: number(),
	blue: number(),
	green: number(),
	red: number(),
	white: number()
});

/**
 * A Moxfield deck. Type information is inferred based on examples.
 * @internal
 */
const deck = object({
	affiliates: record(string(), string()),
	allowPrimerClone: boolean(),
	areCommentsEnabled: boolean(),
	authors: array(user),
	authorsCanEdit: boolean(),
	authorTags: object(),
	autoBracket: int(),
	boards: object({
		attractions: board,
		commanders: board,
		companions: board,
		contraptions: board,
		mainboard: board,
		maybeboard: board,
		planes: board,
		schemes: board,
		sideboard: board,
		signatureSpells: board,
		stickers: board,
		tokens: board
	}),
	bookmarkCount: int(),
	bracket: int(),
	cardsToTokens: record(string(), array(string())),
	colorIdentity: colors,
	colorIdentityPercentages: colorPercentages,
	colorPercentages,
	colors,
	commentCount: int(),
	createdAtUtc: iso.datetime(),
	createdByUser: user,
	description: string(),
	enableMultiplePrintings: boolean(),
	exportId: string(),
	format: string(),
	hubs: array(object({ description: string(), name: string() })),
	id: string(),
	ignoreBrackets: boolean(),
	includeBasicLandsInPrice: boolean(),
	includeCommandersInPrice: boolean(),
	includeSignatureSpellsInPrice: boolean(),
	isShared: boolean(),
	isTooBeaucoup: boolean(),
	lastUpdatedAtUtc: iso.datetime(),
	likeCount: int(),
	main: optional(card),
	mainCardIdIsBackface: optional(boolean()),
	media: array(unknown()),
	name: string(),
	ownerUserId: string(),
	publicId: string(),
	publicUrl: url(),
	requestedAuthors: array(user),
	sfwCommentCount: int(),
	tokenMappings: record(string(), card),
	tokens: array(card),
	tokensToCards: record(string(), array(string())),
	version: int(),
	viewCount: int(),
	visibility: string()
});

export default deck;
