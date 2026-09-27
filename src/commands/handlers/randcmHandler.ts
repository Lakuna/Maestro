import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import EmbedType from "../../discord/resources/message/EmbedType.js";
import g1Name from "../../uma/g1Name.js";
import randomChampionsMeeting from "../../uma/randomChampionsMeeting.js";
import Track from "../../uma/Track.js";
import defaultSeed from "../../utility/defaultSeed.js";

/**
 * Handle the `randcm` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function randcmHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof editWebhookMessage> {
	const seedOption = commandData.options?.find(
		({ name, type }) =>
			name === "seed" && type === ApplicationCommandOptionType.INTEGER
	);
	const seed =
		typeof seedOption?.value === "number" ? seedOption.value : defaultSeed();

	const [course, season, weather, condition, time] =
		randomChampionsMeeting(seed);

	const g1 = g1Name(course, season);

	return {
		embeds: [
			{
				description: `${course.location} ${course.length.toString()}m${course.track === Track.TURF ? "" : ` ${course.track}`}${course.innerOuterTrack ? ` (${course.innerOuterTrack})` : ""}${g1 ? ` - ${g1}` : ""}`,
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
	};
}
