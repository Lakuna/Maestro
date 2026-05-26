/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { infer as zinfer } from "zod";

// `import { zValidator } from "@hono/zod-validator";`
import { Hono } from "hono";
import nacl from "tweetnacl";

import type interactionResponse from "./discord/interactions/receivingAndResponding/interactionResponse.js";

import deckcheck from "./commands/deckcheck.js";
import applicationCommandData from "./discord/interactions/receivingAndResponding/applicationCommandData.js";
import interaction from "./discord/interactions/receivingAndResponding/interaction.js";
import InteractionCallbackType from "./discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "./discord/interactions/receivingAndResponding/InteractionType.js";

const app: Hono = new Hono();

app.post("/api/interactions", async (c) => {
	// eslint-disable-next-line no-console
	console.info("Interaction start.");
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

	// `const data = c.req.valid("json");`
	const json: unknown = await c.req.json();
	// eslint-disable-next-line no-console
	console.info(json);
	const parse = interaction.safeParse(json);
	if (!parse.success) {
		// eslint-disable-next-line no-console
		console.error(parse.error);
		return c.json(void 0, 400);
	}
	const { data } = parse;
	// eslint-disable-next-line no-console
	console.info(data);
	switch (data.type) {
		case InteractionType.APPLICATION_COMMAND: {
			const parse2 = applicationCommandData.safeParse(data.data);
			if (!parse2.success) {
				// eslint-disable-next-line no-console
				console.error(parse2.error);
				return c.json(parse2.error, 400);
			}

			const commandData = parse2.data;
			// eslint-disable-next-line no-console
			console.info(commandData);
			switch (commandData.name) {
				case deckcheck.name:
					return c.json(void 0, 501);
				default:
					return c.json(void 0, 400);
			}
		}
		case InteractionType.PING:
			// eslint-disable-next-line no-console
			console.info("Pong.");
			// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
			return c.json({ type: InteractionCallbackType.PONG } satisfies zinfer<
				typeof interactionResponse
			>);
		default:
			// eslint-disable-next-line no-console
			console.error("Unhandled interaction.");
			return c.json(void 0, 400);
	}
});

export default app;
