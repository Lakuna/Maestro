import { union } from "zod";

import channelSelectInteractionResponse from "./channelSelectInteractionResponse.js";
import checkboxGroupInteractionResponse from "./checkboxGroupInteractionResponse.js";
import checkboxInteractionResponse from "./checkboxInteractionResponse.js";
import fileUploadInteractionResponse from "./fileUploadInteractionResponse.js";
import mentionableSelectInteractionResponse from "./mentionableSelectInteractionResponse.js";
import radioGroupInteractionResponse from "./radioGroupInteractionResponse.js";
import roleSelectInteractionResponse from "./roleSelectInteractionResponse.js";
import stringSelectInteractionResponse from "./stringSelectInteractionResponse.js";
import textInputInteractionResponse from "./textInputInteractionResponse.js";
import userSelectInteractionResponse from "./userSelectInteractionResponse.js";

/**
 * Discord label interaction response child component.
 * @see {@link https://docs.discord.com/developers/components/reference#label-label-interaction-response-child-components}
 * @internal
 */
const labelInteractionResponseChildComponent = union([
	textInputInteractionResponse,
	stringSelectInteractionResponse,
	userSelectInteractionResponse,
	roleSelectInteractionResponse,
	mentionableSelectInteractionResponse,
	channelSelectInteractionResponse,
	fileUploadInteractionResponse,
	radioGroupInteractionResponse,
	checkboxGroupInteractionResponse,
	checkboxInteractionResponse
]);

export default labelInteractionResponseChildComponent;
