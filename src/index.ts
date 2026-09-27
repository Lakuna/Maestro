/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { infer as infer_ } from "zod";

import { zValidator } from "@hono/zod-validator";
import { waitUntil } from "@vercel/functions";
import { Hono } from "hono";
import nacl from "tweetnacl";

import type interactionResponse from "./discord/interactions/receivingAndResponding/interactionResponse.js";

import handleApplicationCommand from "./commands/handleApplicationCommand.js";
import interaction from "./discord/interactions/receivingAndResponding/interaction.js";
import InteractionCallbackType from "./discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "./discord/interactions/receivingAndResponding/InteractionType.js";

const app: Hono = new Hono();

app.post("/api/interactions", zValidator("json", interaction), async (c) => {
	// eslint-disable-next-line no-console, no-warning-comments
	console.info(1); // TODO: Delete.

	const publicKey = process.env["DISCORD_PUBLIC_KEY"];
	if (!publicKey) {
		return c.json(void 0, 500);
	}

	const signature = c.req.header("X-Signature-Ed25519");
	const timestamp = c.req.header("X-Signature-Timestamp");
	if (!signature || !timestamp) {
		return c.json(void 0, 401);
	}

	// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
	const body = await c.req.text();
	const verified = nacl.sign.detached.verify(
		Buffer.from(timestamp + body),
		Buffer.from(signature, "hex"),
		Buffer.from(publicKey, "hex")
	);
	if (!verified) {
		return c.json(void 0, 401);
	}

	const data = c.req.valid("json");
	switch (data.type) {
		case InteractionType.APPLICATION_COMMAND:
			try {
				// eslint-disable-next-line no-console, no-warning-comments
				console.info(2); // TODO: Delete.
				waitUntil(handleApplicationCommand(data));
				// eslint-disable-next-line no-console, no-warning-comments
				console.info(3); // TODO: Delete.
			} catch {
				try {
					// eslint-disable-next-line no-console, no-warning-comments
					console.info(2.1); // TODO: Delete.
					c.executionCtx.waitUntil(handleApplicationCommand(data));
					// eslint-disable-next-line no-console, no-warning-comments
					console.info(3.1); // TODO: Delete.
				} catch {
					// eslint-disable-next-line no-console, no-warning-comments
					console.info(2.2); // TODO: Delete.
					void handleApplicationCommand(data);
					// eslint-disable-next-line no-console, no-warning-comments
					console.info(3.2); // TODO: Delete.
				}
			}

			// eslint-disable-next-line no-console, no-warning-comments
			console.info(4); // TODO: Delete.
			return c.json(
				{ type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE },
				200
			);
		case InteractionType.PING:
			// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
			return c.json({ type: InteractionCallbackType.PONG } satisfies infer_<
				typeof interactionResponse
			>);
		default:
			return c.json(void 0, 400);
	}
});

export default app;
