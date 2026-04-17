import {
	array,
	boolean,
	enum as enum_,
	int,
	iso,
	nullish,
	number,
	object,
	record,
	string,
	url,
	uuid
} from "zod";

/**
 * A set of colors as returned by the Scryfall API.
 * @see {@link https://scryfall.com/docs/api/colors | Colors and Costs}
 * @internal
 */
const colors = array(enum_(["W", "U", "B", "R", "G", "C"]));

/**
 * A set of producable mana as returned by the Scryfall API. This is different from {@link colors} because Sole Performer can produce `"T"`.
 * @see {@link https://scryfall.com/docs/api/colors | Colors and Costs}
 * @internal
 */
const producedMana = array(enum_(["W", "U", "B", "R", "G", "C", "T"]));

/**
 * A Magic: the Gathering card as returned by the Scryfall API.
 * @see {@link https://scryfall.com/docs/api/cards | Card Objects}
 * @internal
 */
const card = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	all_parts: nullish(
		array(
			object({
				component: enum_(["token", "meld_part", "meld_result", "combo_piece"]),
				id: uuid(),
				name: string(),
				type_line: string(),
				uri: url()
			})
		)
	),
	arena_id: nullish(int()),
	artist: nullish(string()),
	artist_ids: nullish(array(uuid())),
	attraction_lights: nullish(array(int())),
	booster: boolean(),
	border_color: enum_([
		"black",
		"white",
		"borderless",
		"yellow",
		"silver",
		"gold"
	]),
	card_back_id: nullish(uuid()), // Not documented as being nullish but appears to be in practice.
	card_faces: nullish(
		array(
			object({
				artist: nullish(string()),
				artist_id: nullish(uuid()),
				cmc: nullish(number()),
				color_indicator: nullish(colors),
				colors: nullish(colors),
				defense: nullish(string()),
				flavor_text: nullish(string()),
				illustration_id: nullish(uuid()),
				image_uris: nullish(
					record(
						enum_([
							"png",
							"border_crop",
							"art_crop",
							"large",
							"normal",
							"small"
						]),
						url()
					)
				),
				layout: nullish(string()),
				mana_cost: string(),
				name: string(),
				oracle_id: nullish(uuid()),
				oracle_text: nullish(string()),
				power: nullish(string()),
				printed_name: nullish(string()),
				printed_text: nullish(string()),
				printed_type_line: nullish(string()),
				toughness: nullish(string()),
				type_line: nullish(string()),
				watermark: nullish(string())
			})
		)
	),
	cardmarket_id: nullish(int()),
	cmc: nullish(number()), // Not documented as being nullish but appears to be in practice.
	collector_number: string(),
	color_identity: colors,
	color_indicator: nullish(colors),
	colors: nullish(colors),
	content_warning: nullish(boolean()),
	defense: nullish(string()),
	digital: boolean(),
	edhrec_rank: nullish(int()),
	finishes: array(enum_(["foil", "nonfoil", "etched"])),
	flavor_name: nullish(string()),
	flavor_text: nullish(string()),
	frame: enum_(["1993", "1997", "2003", "2015", "future"]),
	frame_effects: nullish(
		array(
			enum_([
				"legendary",
				"miracle",
				"enchantment",
				"draft",
				"devoid",
				"tombstone",
				"colorshifted",
				"inverted",
				"sunmoondfc",
				"compasslanddfc",
				"originpwdfc",
				"mooneldrazidfc",
				"waxingandwaningmoondfc",
				"showcase",
				"extendedart",
				"companion",
				"etched",
				"snow",
				"lesson",
				"shatteredglass",
				"convertdfc",
				"fandfc",
				"upsidedowndfc",
				"spree",
				"fullart", // Not documented but appears to exist in practice.
				"translucent" // Not documented but appears to exist in practice.
			])
		)
	),
	full_art: boolean(),
	game_changer: nullish(boolean()),
	games: array(enum_(["paper", "arena", "mtgo", "astral", "sega"])),
	hand_modifier: nullish(string()),
	highres_image: boolean(),
	id: uuid(),
	illustration_id: nullish(uuid()),
	image_status: enum_(["missing", "placeholder", "lowres", "highres_scan"]),
	image_uris: nullish(
		record(
			enum_(["png", "border_crop", "art_crop", "large", "normal", "small"]),
			url()
		)
	),
	keywords: array(string()),
	lang: string(),
	layout: string(),
	legalities: record(
		string(),
		enum_(["legal", "not_legal", "restricted", "banned"])
	),
	life_modifier: nullish(string()),
	loyalty: nullish(string()),
	mana_cost: nullish(string()),
	mtgo_foil_id: nullish(int()),
	mtgo_id: nullish(int()),
	multiverse_ids: nullish(array(int())),
	name: string(),
	oracle_id: nullish(uuid()),
	oracle_text: nullish(string()),
	oversized: boolean(),
	penny_rank: nullish(int()),
	power: nullish(string()),
	preview: nullish(
		object({
			previewed_at: iso.date(),
			source: string(),
			source_uri: string() // Documented as a URI but appears to also include other strings in practice.
		})
	),
	prices: record(
		enum_([
			"usd",
			"usd_foil",
			"usd_etched",
			"eur",
			"eur_foil",
			"eur_etched",
			"tix"
		]),
		nullish(string())
	),
	printed_name: nullish(string()),
	printed_text: nullish(string()),
	printed_type_line: nullish(string()),
	prints_search_uri: url(),
	produced_mana: nullish(producedMana),
	promo: boolean(),
	promo_types: nullish(array(string())),
	purchase_uris: nullish(record(string(), url())),
	released_at: iso.date(),
	reprint: boolean(),
	reserved: boolean(),
	resource_id: nullish(string()),
	rulings_uri: url(),
	scryfall_set_uri: url(),
	scryfall_uri: url(),
	security_stamp: nullish(
		enum_(["oval", "triangle", "acorn", "circle", "arena", "heart"])
	),
	set: string(),
	set_id: uuid(),
	set_name: string(),
	set_search_uri: url(),
	set_type: string(),
	set_uri: url(),
	story_spotlight: boolean(),
	tcgplayer_etched_id: nullish(int()),
	tcgplayer_id: nullish(int()),
	textless: boolean(),
	toughness: nullish(string()),
	type_line: nullish(string()), // Not documented as being nullish but appears to be in practice.
	uri: url(),
	variation: boolean(),
	variation_of: nullish(uuid()),
	watermark: nullish(string())
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default card;
