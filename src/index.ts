/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { infer as zinfer } from "zod";

import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import nacl from "tweetnacl";

import type interactionResponse from "./discord/interactions/receivingAndResponding/interactionResponse.js";

import interaction from "./discord/interactions/receivingAndResponding/interaction.js";
import InteractionCallbackType from "./discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "./discord/interactions/receivingAndResponding/InteractionType.js";

const app: Hono = new Hono();

app.post("/api/interactions", zValidator("json", interaction), async (c) => {
	const publicKey = process.env["DISCORD_PUBLIC_KEY"];
	if (!publicKey) {
		console.error("No public key.");
		return c.json(void 0, 500);
	}

	const signature = c.req.header("X-Signature-Ed25519");
	const timestamp = c.req.header("X-Signature-Timestamp");
	if (!signature || !timestamp) {
		console.error("No signature or timestamp.");
		return c.json(void 0, 401);
	}

	// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
	const body = await c.req.text();
	console.log(body);
	const verified = nacl.sign.detached.verify(
		Buffer.from(timestamp + body),
		Buffer.from(signature, "hex"),
		Buffer.from(publicKey, "hex")
	);
	if (!verified) {
		console.error("Not verified.");
		return c.json(void 0, 401);
	}

	const data = c.req.valid("json");
	console.log(data);

	// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
	if (data.type === InteractionType.PING) {
		console.log("Pong.");
		return c.json({ type: InteractionCallbackType.PONG } satisfies zinfer<
			typeof interactionResponse
		>);
	}

	console.log("Other.");
	return c.json(void 0, 501);
});

export default app;
