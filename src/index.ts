/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { infer as infer_ } from "zod";

import { zValidator } from "@hono/zod-validator";
import { waitUntil } from "@vercel/functions";
import { Hono } from "hono";
import nacl from "tweetnacl";

import type interactionResponse from "./discord/interactions/receivingAndResponding/interactionResponse.js";

import handleApplicationCommand from "./commands/handleApplicationCommand.js";
import preHandleApplicationCommand from "./commands/preHandleApplicationCommand.js";
import interaction from "./discord/interactions/receivingAndResponding/interaction.js";
import InteractionCallbackType from "./discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "./discord/interactions/receivingAndResponding/InteractionType.js";
import embedForError from "./utility/embedForError.js";

const app: Hono = new Hono();

app.post("/api/interactions", zValidator("json", interaction), async (c) => {
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
		case InteractionType.APPLICATION_COMMAND: {
			// Handle special cases.
			try {
				const pre = preHandleApplicationCommand(data);
				if (pre) {
					return c.json(pre, 200);
				}
			} catch (e) {
				return c.json(
					{
						data: { embeds: [embedForError(e)] },
						type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
					} satisfies infer_<typeof interactionResponse>,
					200
				);
			}

			// Set up the asynchronous work to be done.
			try {
				// Vercel
				waitUntil(handleApplicationCommand(data));
			} catch {
				try {
					// Cloudflare Worker
					c.executionCtx.waitUntil(handleApplicationCommand(data));
				} catch {
					// Other
					void handleApplicationCommand(data);
				}
			}

			// Immediately return a deferred ("loading") message.
			return c.json(
				{
					type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
				} satisfies infer_<typeof interactionResponse>,
				200
			);
		}
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
