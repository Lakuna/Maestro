import type { infer as infer_ } from "zod";

import type applicationCommandData from "../discord/interactions/receivingAndResponding/applicationCommandData.js";
import type { DeepReadonly } from "./DeepReadonly.js";

/**
 * Get the content of the related message for a Discord message command.
 * @param commandData - The Discord application command data.
 * @returns The content of the related message.
 * @internal
 */
export default function getMessageContent(
	commandData: DeepReadonly<infer_<typeof applicationCommandData>>
): string {
	if (!commandData.target_id) {
		throw new Error("Missing target ID.");
	}

	if (!commandData.resolved?.messages) {
		throw new Error("Missing resolved messages.");
	}

	// All of this nastiness is required because Vercel fails to build without it for some reason.
	// eslint-disable-next-line capitalized-comments
	// prettier-ignore
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore TypeScript struggles with circular type references. This directive is required in some environments and not others (hence ts-ignore over ts-expect-error).
	const message: undefined | { content?: string | undefined } = commandData.resolved.messages[commandData.target_id];
	if (!message) {
		throw new Error(`Failed to resolve message \`${commandData.target_id}\`.`);
	}

	return message.content ?? "";
}
