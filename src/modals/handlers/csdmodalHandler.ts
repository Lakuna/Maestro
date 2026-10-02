import type { infer as infer_ } from "zod";

import type modalSubmitData from "../../discord/interactions/receivingAndResponding/modalSubmitData.js";
import type editWebhookMessage from "../../discord/resources/webhook/editWebhookMessage.js";
import type { DeepReadonly } from "../../utility/DeepReadonly.js";

export default function csdmodalHandler(
	commandData: DeepReadonly<infer_<typeof modalSubmitData>>
): infer_<typeof editWebhookMessage> {
	// eslint-disable-next-line no-console
	console.info(JSON.stringify(commandData));
	return { content: "Hello, world!" };
}
