import { xoroshiro128plus } from "pure-rand/generator/xoroshiro128plus";

import type Course from "./Course.js";

import weightedRandom from "../utility/weightedRandom.js";
import courses from "./courses.js";
import Location from "./Location.js";
import Season from "./Season.js";
import Time from "./Time.js";
import TrackCondition from "./TrackCondition.js";
import Weather from "./Weather.js";
import weightOfCourse from "./weightOfCourse.js";

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

/**
 * Generate the conditions for a random champions meeting.
 * @param seed - The PRNG seed.
 * @returns The course, season, weather, track condition, and time of the champions meeting.
 * @internal
 */
export default function randomChampionsMeeting(
	seed: number
): [Course, Season, Weather, TrackCondition, Time] {
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

	return [course, season, weather, condition, time];
}
