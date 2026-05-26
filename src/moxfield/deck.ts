import {
	array,
	boolean,
	int,
	iso,
	object,
	optional,
	record,
	string,
	unknown,
	url
} from "zod";

import board from "./board.js";
import card from "./card.js";
import colorPercentages from "./colorPercentages.js";
import colors from "./colors.js";
import user from "./user.js";

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
