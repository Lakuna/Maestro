import type { infer as infer_ } from "zod";

import type interactionResponse from "../discord/interactions/receivingAndResponding/interactionResponse.js";

import InteractionCallbackType from "../discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import MessageFlag from "../discord/resources/message/MessageFlag.js";
import embedForError from "./embedForError.js";

/**
 * Create a response that represents an error.
 * @param e - The error.
 * @returns The response.
 * @internal
 */
export default function responseForError(
	e: unknown
): infer_<typeof interactionResponse> {
	return {
		data: { embeds: [embedForError(e)], flags: MessageFlag.EPHEMERAL },
		type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
	};
}
