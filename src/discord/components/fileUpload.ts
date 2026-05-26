import { boolean, int, literal, object, optional, string } from "zod";

import ComponentType from "./ComponentType.js";

/**
 * Discord file upload.
 * @see {@link https://docs.discord.com/developers/components/reference#file-upload}
 * @internal
 */
const fileUpload = object({
	/* eslint-disable @typescript-eslint/naming-convention */
	custom_id: string(),
	id: optional(int()),
	max_values: optional(int()),
	min_values: optional(int()),
	required: optional(boolean()),
	type: literal(ComponentType.FILE_UPLOAD)
	/* eslint-enable @typescript-eslint/naming-convention */
});

export default fileUpload;
