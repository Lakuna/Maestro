import type { RandomGenerator } from "pure-rand/types/RandomGenerator";
import type { infer as infer_ } from "zod";

import { uniformInt } from "pure-rand/distribution/uniformInt";
import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";
import { purify } from "pure-rand/utils/purify";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import defaultSeed from "../../collation/utility/defaultSeed.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";

const uniformIntPure = purify(uniformInt);

enum Distance {
	LONG = "Long",
	MEDIUM = "Medium",
	MILE = "Mile",
	SPRINT = "Sprint"
}

enum InnerOuterTrack {
	INNER = "Inner",
	OUTER = "Outer",
	OUTER_TO_INNER = "Outer to Inner"
}

enum Location {
	CHUKYO = "Chukyo",
	FUKUSHIMA = "Fukushima",
	FUNABASHI = "Funabashi",
	HAKODATE = "Hakodate",
	HANSHIN = "Hanshin",
	KAWASAKI = "Kawasaki",
	KOKURA = "Kokura",
	KYOTO = "Kyoto",
	MORIOKA = "Morioka",
	NAKAYAMA = "Nakayama",
	NIIGATA = "Niigata",
	OI = "Oi",
	SAPPORO = "Sapporo",
	TOKYO = "Tokyo"
}

enum Season {
	AUTUMN = "Autumn",
	SPRING = "Spring",
	SUMMER = "Summer",
	WINTER = "Winter"
}

enum Time {
	AFTERNOON = "Afternoon",
	EVENING = "Evening",
	NIGHT = "Night"
}

enum Track {
	DIRT = "Dirt",
	TURF = "Turf"
}

enum TrackCondition {
	FIRM = "Firm",
	GOOD = "Good",
	HEAVY = "Heavy",
	SOFT = "Soft"
}

enum Weather {
	CLOUDY = "Cloudy",
	RAINY = "Rainy",
	SNOWY = "Snowy",
	SUNNY = "Sunny"
}

interface Course {
	readonly innerOuterTrack?: InnerOuterTrack;
	readonly length: number;
	readonly location: Location;
	readonly track: Track;
}

// https://gametora.com/umamusume/racetracks
const courses = [
	{ length: 2600, location: Location.SAPPORO, track: Track.TURF },
	{ length: 2000, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1800, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1500, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1200, location: Location.SAPPORO, track: Track.TURF },
	{ length: 1700, location: Location.SAPPORO, track: Track.DIRT },
	{ length: 2600, location: Location.HAKODATE, track: Track.TURF },
	{ length: 2000, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1800, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1200, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1000, location: Location.HAKODATE, track: Track.TURF },
	{ length: 1700, location: Location.HAKODATE, track: Track.DIRT },
	{ length: 2600, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 2000, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 1800, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 1200, location: Location.FUKUSHIMA, track: Track.TURF },
	{ length: 1700, location: Location.FUKUSHIMA, track: Track.DIRT },
	{ length: 1150, location: Location.FUKUSHIMA, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2400,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2200,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2000,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.NIIGATA,
		track: Track.TURF
	},
	{ length: 1800, location: Location.NIIGATA, track: Track.DIRT },
	{ length: 1200, location: Location.NIIGATA, track: Track.DIRT },
	{ length: 3400, location: Location.TOKYO, track: Track.TURF },
	{ length: 2500, location: Location.TOKYO, track: Track.TURF },
	{ length: 2400, location: Location.TOKYO, track: Track.TURF },
	{ length: 2300, location: Location.TOKYO, track: Track.TURF },
	{ length: 2000, location: Location.TOKYO, track: Track.TURF },
	{ length: 1800, location: Location.TOKYO, track: Track.TURF },
	{ length: 1600, location: Location.TOKYO, track: Track.TURF },
	{ length: 1400, location: Location.TOKYO, track: Track.TURF },
	{ length: 2100, location: Location.TOKYO, track: Track.DIRT },
	{ length: 1600, location: Location.TOKYO, track: Track.DIRT },
	{ length: 1400, location: Location.TOKYO, track: Track.DIRT },
	{ length: 1300, location: Location.TOKYO, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 3600,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2500,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2200,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1800,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1200,
		location: Location.NAKAYAMA,
		track: Track.TURF
	},
	{ length: 1800, location: Location.NAKAYAMA, track: Track.DIRT },
	{ length: 1200, location: Location.NAKAYAMA, track: Track.DIRT },
	{ length: 2200, location: Location.CHUKYO, track: Track.TURF },
	{ length: 2000, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1600, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1400, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1200, location: Location.CHUKYO, track: Track.TURF },
	{ length: 1800, location: Location.CHUKYO, track: Track.DIRT },
	{ length: 1400, location: Location.CHUKYO, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 3200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 3000,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1600,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.KYOTO,
		track: Track.TURF
	},
	{ length: 1900, location: Location.KYOTO, track: Track.DIRT },
	{ length: 1800, location: Location.KYOTO, track: Track.DIRT },
	{ length: 1400, location: Location.KYOTO, track: Track.DIRT },
	{ length: 1200, location: Location.KYOTO, track: Track.DIRT },
	{
		innerOuterTrack: InnerOuterTrack.OUTER_TO_INNER,
		length: 3200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 3000,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2600,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 2400,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 2000,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1800,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.OUTER,
		length: 1600,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1400,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{
		innerOuterTrack: InnerOuterTrack.INNER,
		length: 1200,
		location: Location.HANSHIN,
		track: Track.TURF
	},
	{ length: 2000, location: Location.HANSHIN, track: Track.DIRT },
	{ length: 1800, location: Location.HANSHIN, track: Track.DIRT },
	{ length: 1400, location: Location.HANSHIN, track: Track.DIRT },
	{ length: 2600, location: Location.KOKURA, track: Track.TURF },
	{ length: 2000, location: Location.KOKURA, track: Track.TURF },
	{ length: 1800, location: Location.KOKURA, track: Track.TURF },
	{ length: 1200, location: Location.KOKURA, track: Track.TURF },
	{ length: 1700, location: Location.KOKURA, track: Track.DIRT },
	{ length: 2000, location: Location.OI, track: Track.DIRT },
	{ length: 1800, location: Location.OI, track: Track.DIRT },
	{ length: 1200, location: Location.OI, track: Track.DIRT },
	{ length: 2100, location: Location.KAWASAKI, track: Track.DIRT },
	{ length: 1600, location: Location.KAWASAKI, track: Track.DIRT },
	{ length: 1400, location: Location.KAWASAKI, track: Track.DIRT },
	{ length: 2400, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 1800, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 1600, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 1000, location: Location.FUNABASHI, track: Track.DIRT },
	{ length: 2000, location: Location.MORIOKA, track: Track.DIRT },
	{ length: 1800, location: Location.MORIOKA, track: Track.DIRT },
	{ length: 1600, location: Location.MORIOKA, track: Track.DIRT },
	{ length: 1200, location: Location.MORIOKA, track: Track.DIRT }
] satisfies Course[];

const distanceOfLength = (length: number): Distance =>
	length <= 1400 ? Distance.SPRINT
	: length <= 1800 ? Distance.MILE
	: length <= 2400 ? Distance.MEDIUM
	: Distance.LONG;

const weightOfCourse = (course: Course): number => {
	let weight = 1;

	const lengthType = distanceOfLength(course.length);
	switch (lengthType) {
		case Distance.LONG:
			weight *= 2;
			break;
		case Distance.MEDIUM:
			weight *= 4;
			break;
		case Distance.MILE:
			weight *= 3;
			break;
		default:
	}

	switch (course.track) {
		case Track.TURF:
			weight *= 10;
			break;
		default:
	}

	return weight;
};

const courseWeights = courses.reduce(
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	(map, course) => map.set(course, weightOfCourse(course)),
	new Map<Course, number>()
);

const seasonWeights = new Map<Season, number>([
	[Season.AUTUMN, 4],
	[Season.SPRING, 6],
	[Season.SUMMER, 3],
	[Season.WINTER, 4]
]);

const springWeatherWeights = new Map<Weather, number>([
	[Weather.CLOUDY, 1],
	[Weather.RAINY, 1],
	[Weather.SUNNY, 7]
]);

const summerWeatherWeights = new Map<Weather, number>([
	[Weather.CLOUDY, 2],
	[Weather.RAINY, 1],
	[Weather.SUNNY, 8]
]);

const autumnWeatherWeights = new Map<Weather, number>([
	[Weather.CLOUDY, 1],
	[Weather.RAINY, 1],
	[Weather.SUNNY, 4]
]);

const winterWeatherWeights = new Map<Weather, number>([
	[Weather.CLOUDY, 3],
	[Weather.RAINY, 1],
	[Weather.SNOWY, 3],
	[Weather.SUNNY, 5]
]);

const seasonWeatherWeights = new Map<Season, Map<Weather, number>>([
	[Season.AUTUMN, autumnWeatherWeights],
	[Season.SPRING, springWeatherWeights],
	[Season.SUMMER, summerWeatherWeights],
	[Season.WINTER, winterWeatherWeights]
]);

const sunnyConditionWeights = new Map<TrackCondition, number>([
	[TrackCondition.FIRM, 10],
	[TrackCondition.GOOD, 1]
]);

const cloudyConditionWeights = new Map<TrackCondition, number>([
	[TrackCondition.FIRM, 1],
	[TrackCondition.GOOD, 4]
]);

const rainyConditionWeights = new Map<TrackCondition, number>([
	[TrackCondition.HEAVY, 1],
	[TrackCondition.SOFT, 1]
]);

const snowyConditionWeights = new Map<TrackCondition, number>([
	[TrackCondition.GOOD, 1],
	[TrackCondition.SOFT, 5]
]);

const weatherConditionWeights = new Map<Weather, Map<TrackCondition, number>>([
	[Weather.CLOUDY, cloudyConditionWeights],
	[Weather.RAINY, rainyConditionWeights],
	[Weather.SNOWY, snowyConditionWeights],
	[Weather.SUNNY, sunnyConditionWeights]
]);

const oiTimeWeights = new Map<Time, number>([
	[Time.AFTERNOON, 1],
	[Time.EVENING, 1],
	[Time.NIGHT, 1]
]);

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const totalWeightOf = (map: Map<unknown, number>): number =>
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	Array.from(map).reduce((sum, [, weight]) => sum + weight, 0);

const weightedRandom = <T>(
	rng: Readonly<RandomGenerator>,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	weights: Map<T, number>
): [T, RandomGenerator] => {
	const [init, nextRng] = uniformIntPure(rng, 0, totalWeightOf(weights) - 1);
	let i = init;
	for (const [out, weight] of weights) {
		if (i < weight) {
			return [out, nextRng];
		}

		i -= weight;
	}

	throw new Error("Something went wrong with the weighted randomization.");
};

/**
 * Handle the `randcm` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function randcmHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof interactionResponse> {
	const seedOption = commandData.options?.find(
		({ name, type }) =>
			name === "seed" && type === ApplicationCommandOptionType.INTEGER
	);
	const seed =
		typeof seedOption?.value === "number" ? seedOption.value : defaultSeed();

	const courseRng = xoroshiro128plus(seed);

	// The course (location, distance, and track) are determined together.
	const [course, seasonRng] = weightedRandom(courseRng, courseWeights);

	// The season is determined independently.
	const [season, weatherRng] = weightedRandom(seasonRng, seasonWeights);

	// The weather is determined based on the season.
	const weatherWeights = seasonWeatherWeights.get(season);
	if (!weatherWeights) {
		throw new Error(`No weather weights found for season ${season}`);
	}
	const [weather, conditionRng] = weightedRandom(weatherRng, weatherWeights);

	// The ground condition is determined based on the weather.
	const conditionWeights = weatherConditionWeights.get(weather);
	if (!conditionWeights) {
		throw new Error(`No ground condition weights found for weather ${weather}`);
	}
	const [condition, timeRng] = weightedRandom(conditionRng, conditionWeights);

	// The time of day can only change for courses located at Oi.
	const time =
		course.location === Location.OI ?
			weightedRandom(timeRng, oiTimeWeights)[0]
		:	Time.AFTERNOON;

	return {
		data: {
			embeds: [
				{
					description: `${course.location} ${course.length.toString()}m${course.track === Track.TURF ? "" : ` ${course.track}`}${course.innerOuterTrack ? ` (${course.innerOuterTrack})` : ""}`,
					fields: [
						{ inline: true, name: "Season", value: season },
						{ inline: true, name: "Weather", value: weather },
						{ inline: true, name: "Ground Condition", value: condition },
						{ inline: true, name: "Time", value: time },
						{ inline: true, name: "Seed", value: `\`${seed.toString()}\`` }
					],
					title: "Champions Meeting",
					type: EmbedType.RICH
				}
			]
		},
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
}
