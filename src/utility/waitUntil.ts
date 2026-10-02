import type { Context } from "hono";

import { waitUntil as waitUntilVercel } from "@vercel/functions";

/**
 * Extends the lifetime of the request handler for the lifetime of the given promise. A platform-agnostic `waitUntil` function.
 * @param c - The execution context.
 * @param promise - The promise.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function waitUntil(c: Context, promise: Promise<unknown>): void {
	try {
		waitUntilVercel(promise); // Vercel
	} catch {
		try {
			c.executionCtx.waitUntil(promise); // Cloudflare Worker
		} catch {
			void promise; // Other
		}
	}
}
