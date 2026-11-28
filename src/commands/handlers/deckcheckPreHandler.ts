import type { infer as infer_ } from "zod";

import type applicationCommandData from "../../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type interactionResponse from "../../discord/interactions/receivingAndResponding/interactionResponse.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

import ComponentType from "../../discord/components/ComponentType.js";
import TextInputStyle from "../../discord/components/TextInputStyle.js";
import ApplicationCommandOptionType from "../../discord/interactions/applicationCommands/ApplicationCommandOptionType.js";
import InteractionCallbackType from "../../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import {
	CCMDMODAL_DECKLIST_ID,
	CCMDMODAL_ID
} from "../../modals/definitions/ccmdmodalDefinition.js";
import {
	CTWDMODAL_DECKLIST_ID,
	CTWDMODAL_ID
} from "../../modals/definitions/ctwdmodalDefinition.js";
import checkSealedDeckHandler from "./checkSealedDeckHandler.js";

/**
 * Handle the `deckcheck` command.
 * @param commandData - The Discord application command data.
 * @returns The Discord interaction response.
 * @internal
 */
export default function deckcheckPreHandler(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): infer_<typeof interactionResponse> | undefined {
	const subcommandOption = commandData.options?.find(
		({ type }) => type === ApplicationCommandOptionType.SUB_COMMAND
	);
	if (typeof subcommandOption?.name !== "string") {
		throw new Error("Invalid subcommand name.");
	}

	const urlOption = subcommandOption.options?.find(
		({ name, type }) =>
			name === "url" && type === ApplicationCommandOptionType.STRING
	);
	if (typeof urlOption?.value === "string") {
		return void 0; // If the URL option is filled out, proceed to the normal handler.
	}

	switch (subcommandOption.name) {
		case "classic":
			return {
				/* eslint-disable @typescript-eslint/naming-convention */
				data: {
					components: [
						{
							component: {
								custom_id: CCMDMODAL_DECKLIST_ID,
								style: TextInputStyle.PARAGRAPH,
								type: ComponentType.TEXT_INPUT
							},
							description:
								"The deck list in Moxfield, Arena, MTGO, or plain text format.",
							label: "Deck List",
							type: ComponentType.LABEL
						}
					],
					custom_id: CCMDMODAL_ID,
					title: "Check Classic Magic Deck"
				},
				type: InteractionCallbackType.MODAL
				/* eslint-enable @typescript-eslint/naming-convention */
			};
		case "sealed": {
			const setOption = subcommandOption.options?.find(
				({ name, type }) =>
					name === "set" && type === ApplicationCommandOptionType.STRING
			);
			const set =
				typeof setOption?.value === "string" ? setOption.value : void 0;

			const seedsOption = subcommandOption.options?.find(
				({ name, type }) =>
					name === "seeds" && type === ApplicationCommandOptionType.STRING
			);
			const seeds =
				typeof seedsOption?.value === "string" ? seedsOption.value : void 0;

			return checkSealedDeckHandler(commandData, set, seeds, "");
		}
		case "tribal":
			return {
				/* eslint-disable @typescript-eslint/naming-convention */
				data: {
					components: [
						{
							component: {
								custom_id: CTWDMODAL_DECKLIST_ID,
								style: TextInputStyle.PARAGRAPH,
								type: ComponentType.TEXT_INPUT
							},
							description:
								"The deck list in Moxfield, Arena, MTGO, or plain text format.",
							label: "Deck List",
							type: ComponentType.LABEL
						}
					],
					custom_id: CTWDMODAL_ID,
					title: "Check Classic Magic Deck"
				},
				type: InteractionCallbackType.MODAL
				/* eslint-enable @typescript-eslint/naming-convention */
			};
		default:
			throw new Error(
				`Unhandled subcommand ${subcommandOption.name ?? "undefined"}`
			);
	}
}
