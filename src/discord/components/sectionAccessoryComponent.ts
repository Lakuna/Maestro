import { union } from "zod";

import button from "./button.js";
import thumbnail from "./thumbnail.js";

/**
 * Discord section accessory component.
 * @see {@link https://docs.discord.com/developers/components/reference#section-section-accessory-components}
 * @internal
 */
const sectionAccessoryComponent = union([button, thumbnail]);

export default sectionAccessoryComponent;
