import { union } from "zod";

import channelSelectInteractionResponse from "../../components/channelSelectInteractionResponse.js";
import checkboxGroupInteractionResponse from "../../components/checkboxGroupInteractionResponse.js";
import checkboxInteractionResponse from "../../components/checkboxInteractionResponse.js";
import fileUploadInteractionResponse from "../../components/fileUploadInteractionResponse.js";
import labelInteractionResponse from "../../components/labelInteractionResponse.js";
import mentionableSelectInteractionResponse from "../../components/mentionableSelectInteractionResponse.js";
import radioGroupInteractionResponse from "../../components/radioGroupInteractionResponse.js";
import roleSelectInteractionResponse from "../../components/roleSelectInteractionResponse.js";
import stringSelectInteractionResponse from "../../components/stringSelectInteractionResponse.js";
import textDisplayInteractionResponse from "../../components/textDisplayInteractionResponse.js";
import textInputInteractionResponse from "../../components/textInputInteractionResponse.js";
import userSelectInteractionResponse from "../../components/userSelectInteractionResponse.js";

/**
 * Discord component interaction response.
 * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-component-interaction-response-structures}
 * @internal
 */
const componentInteractionResponse = union([
	stringSelectInteractionResponse,
	textInputInteractionResponse,
	userSelectInteractionResponse,
	roleSelectInteractionResponse,
	mentionableSelectInteractionResponse,
	channelSelectInteractionResponse,
	textDisplayInteractionResponse,
	labelInteractionResponse,
	fileUploadInteractionResponse,
	radioGroupInteractionResponse,
	checkboxGroupInteractionResponse,
	checkboxInteractionResponse
]);

export default componentInteractionResponse;
