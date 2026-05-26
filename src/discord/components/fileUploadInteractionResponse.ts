import { array, int, literal, object, optional, string } from "zod";

import snowflake from "../snowflake.js";
import ComponentType from "./ComponentType.js";

/**
 * Discord file upload interaction response.
 * @see {@link https://docs.discord.com/developers/components/reference#file-upload-file-upload-interaction-response-structure}
 * @internal
 */
const fileUploadInteractionResponse = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: int(),
	type: optional(literal(ComponentType.FILE_UPLOAD)),
	values: array(snowflake)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default fileUploadInteractionResponse;
