import { literal, object, union } from "zod";

import autocompleteInteractionCallbackData from "./autocompleteInteractionCallbackData.js";
import InteractionCallbackType from "./InteractionCallbackType.js";
import messageInteractionCallbackData from "./messageInteractionCallbackData.js";
import modalInteractionCallbackData from "./modalInteractionCallbackData.js";

/**
 * Discord interaction response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
const interactionResponse = union([
	object({ type: literal(InteractionCallbackType.PONG) }),
	object({
		data: messageInteractionCallbackData,
		type: literal(InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE)
	}),
	object({
		type: literal(InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE)
	}),
	object({ type: literal(InteractionCallbackType.DEFERRED_UPDATE_MESSAGE) }),
	object({
		data: messageInteractionCallbackData,
		type: literal(InteractionCallbackType.UPDATE_MESSAGE)
	}),
	object({
		data: autocompleteInteractionCallbackData,
		type: literal(
			InteractionCallbackType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT
		)
	}),
	object({
		data: modalInteractionCallbackData,
		type: literal(InteractionCallbackType.MODAL)
	}),
	object({ type: literal(InteractionCallbackType.PREMIUM_REQUIRED) }),
	object({ type: literal(InteractionCallbackType.LAUNCH_ACTIVITY) })
]);

export default interactionResponse;
