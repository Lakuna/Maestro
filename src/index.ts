/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { infer as zinfer } from "zod";

import { Hono } from "hono";
import nacl from "tweetnacl";

import type interactionResponse from "./discord/interactions/receivingAndResponding/interactionResponse.js";

import interaction from "./discord/interactions/receivingAndResponding/interaction.js";
import InteractionCallbackType from "./discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "./discord/interactions/receivingAndResponding/InteractionType.js";

const app: Hono = new Hono();

app.post("/api/interactions", async (c) => {
	const publicKey = process.env["DISCORD_PUBLIC_KEY"];
	if (!publicKey) {
		// eslint-disable-next-line no-console
		console.error("No public key.");
		return c.json(void 0, 500);
	}

	const signature = c.req.header("X-Signature-Ed25519");
	const timestamp = c.req.header("X-Signature-Timestamp");
	if (!signature || !timestamp) {
		// eslint-disable-next-line no-console
		console.error("No signature or timestamp.");
		return c.json(void 0, 401);
	}

	// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
	const body = await c.req.text();
	// eslint-disable-next-line no-console
	console.log(body);
	const verified = nacl.sign.detached.verify(
		Buffer.from(timestamp + body),
		Buffer.from(signature, "hex"),
		Buffer.from(publicKey, "hex")
	);
	if (!verified) {
		// eslint-disable-next-line no-console
		console.error("Not verified.");
		return c.json(void 0, 401);
	}

	const json = c.req.json();
	// eslint-disable-next-line no-console
	console.log(json);
	const parse = interaction.safeParse(json);
	if (!parse.success) {
		return c.json(parse.error, 400);
	}
	const { data } = parse;
	// eslint-disable-next-line no-console
	console.log(data);

	// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
	if (data.type === InteractionType.PING) {
		return c.json({ type: InteractionCallbackType.PONG } satisfies zinfer<
			typeof interactionResponse
		>);
	}

	return c.json(void 0, 501);
});

export default app;
