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

// Temporary index.
app.get("/", (c) => {
	return c.html(
		`\
<!doctype html>

<html>
	<head>
		<title>Maestro</title>
	</head>
	<body>
		<h1>Maestro</h1>
		<hr />
		<p>${new Date().toISOString()}</p>
	</body>
</html>
`,
		200
	);
});

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
			const parse = applicationCommandData.safeParse(data.data);
			if (!parse.success) {
				return c.json(parse.error, 400);
			}

			const commandData = parse.data;
			try {
				switch (commandData.name) {
					case deckcheck.name:
						return c.json(await handleDeckcheck(commandData), 200);
					default:
						return c.json(void 0, 400);
				}
			} catch (e) {
				return c.json(
					{
						data: {
							embeds: [
								{
									color: 0xff0000,
									description: `An error occurred while processing your request:${e instanceof Error ? ` ${e.message}` : `\n\`\`\`\n${JSON.stringify(e)}\n\`\`\``}`,
									title: "Error"
								}
							],
							flags: MessageFlag.EPHEMERAL
						},
						type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE
					} satisfies zinfer<typeof interactionResponse>,
					200
				);
			}
		}
		case InteractionType.PING:
			// https://docs.discord.com/developers/interactions/overview#acknowledging-ping-requests
			return c.json({ type: InteractionCallbackType.PONG } satisfies zinfer<
				typeof interactionResponse
			>);
		default:
			return c.json(void 0, 400);
	}
});

export default app;
