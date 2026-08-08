/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { infer as zinfer } from "zod";

import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import nacl from "tweetnacl";

import type interactionResponse from "./discord/interactions/receivingAndResponding/interactionResponse.js";

import deckcheck, { handle as handleDeckcheck } from "./commands/deckcheck.js";
import applicationCommandData from "./discord/interactions/receivingAndResponding/applicationCommandData.js";
import interaction from "./discord/interactions/receivingAndResponding/interaction.js";
import InteractionCallbackType from "./discord/interactions/receivingAndResponding/InteractionCallbackType.js";
import InteractionType from "./discord/interactions/receivingAndResponding/InteractionType.js";
import MessageFlag from "./discord/resources/message/MessageFlag.js";

const app: Hono = new Hono();

app.post("/api/interactions", zValidator("json", interaction), async (c) => {
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
		console.error(
			`No signature or timestamp: ${signature ?? "<undefined>"}, ${timestamp ?? "<undefined>"}`
		);
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

	const data = c.req.valid("json");
	// eslint-disable-next-line no-console
	console.info(data);
	switch (data.type) {
		case InteractionType.APPLICATION_COMMAND: {
			const parse = applicationCommandData.safeParse(data.data);
			if (!parse.success) {
				// eslint-disable-next-line no-console
				console.error(parse.error);
				return c.json(parse.error, 400);
			}

			const commandData = parse.data;
			try {
				switch (commandData.name) {
					case deckcheck.name: {
						const foo = await handleDeckcheck(commandData);
						// eslint-disable-next-line no-console
						console.info(foo);
						return c.json(foo, 200);
					}
					default:
						// eslint-disable-next-line no-console
						console.error("Unknown command.");
						return c.json(void 0, 400);
				}
			} catch (e) {
				const foo: zinfer<typeof interactionResponse> = {
					data: {
						embeds: [
							{
								color: 0xff0000,
								description:
									typeof e === "string" ? e
									: e instanceof Error ? e.message
									: `\`\`\`json\n${JSON.stringify(e)}\n\`\`\``,
								title: "Error"
							}
						],
						flags: MessageFlag.EPHEMERAL
					},
					type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
				};
				// eslint-disable-next-line no-console
				console.error(foo);
				return c.json(foo, 200);
			}
		}
		case InteractionType.PING: {
			const foo: zinfer<typeof interactionResponse> = {
				type: InteractionCallbackType.PONG
			};
			// eslint-disable-next-line no-console
			console.info(foo);
			// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
			return c.json(foo);
		}
		default:
			// eslint-disable-next-line no-console
			console.error("Unhandled interaction type.");
			return c.json(void 0, 400);
	}
});

export default app;
