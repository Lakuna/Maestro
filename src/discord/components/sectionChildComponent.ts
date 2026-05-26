import { union } from "zod";

import textDisplay from "./textDisplay.js";

/**
 * Discord section child component.
 * @see {@link https://docs.discord.com/developers/components/reference#section-section-child-components}
 * @internal
 */
const sectionChildComponent = union([textDisplay]);

export default sectionChildComponent;
