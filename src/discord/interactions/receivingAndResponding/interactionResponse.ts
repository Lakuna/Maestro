import { literal, object, union } from "zod";

import autocompleteInteractionCallbackData from "./autocompleteInteractionCallbackData.js";
import InteractionCallbackType from "./InteractionCallbackType.js";
import messageInteractionCallbackData from "./messageInteractionCallbackData.js";
import modalInteractionCallbackData from "./modalInteractionCallbackData.js";

/**
 * Discord pong response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const pongResponse = object({
	type: literal(InteractionCallbackType.PONG)
});

/**
 * Discord channel message with source response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const channelMessageWithSourceResponse = object({
	data: messageInteractionCallbackData,
	type: literal(InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE)
});

/**
 * Discord deferred channel message with source response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const deferredChannelMessageWithSourceResponse = object({
	type: literal(InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE)
});

/**
 * Discord deferred update message response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const deferredUpdateMessageResponse = object({
	type: literal(InteractionCallbackType.DEFERRED_UPDATE_MESSAGE)
});

/**
 * Discord update message response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const updateMessageResponse = object({
	data: messageInteractionCallbackData,
	type: literal(InteractionCallbackType.UPDATE_MESSAGE)
});

/**
 * Discord application command autocomplete response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const applicationCommandAutocompleteResultResponse = object({
	data: autocompleteInteractionCallbackData,
	type: literal(InteractionCallbackType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT)
});

/**
 * Discord modal response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const modalResponse = object({
	data: modalInteractionCallbackData,
	type: literal(InteractionCallbackType.MODAL)
});

/**
 * Discord premium required response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const premiumRequiredResponse = object({
	type: literal(InteractionCallbackType.PREMIUM_REQUIRED)
});

/**
 * Discord launch activity response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
export const launchActivityResponse = object({
	type: literal(InteractionCallbackType.LAUNCH_ACTIVITY)
});

/**
 * Discord interaction response object.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object}
 * @internal
 */
const interactionResponse = union([
	pongResponse,
	channelMessageWithSourceResponse,
	deferredChannelMessageWithSourceResponse,
	deferredUpdateMessageResponse,
	updateMessageResponse,
	applicationCommandAutocompleteResultResponse,
	modalResponse,
	premiumRequiredResponse,
	launchActivityResponse
]);

export default interactionResponse;
