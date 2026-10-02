import type { ExecutionContext } from "hono";

import { waitUntil as waitUntilVercel } from "@vercel/functions";

/**
 * Extends the lifetime of the request handler for the lifetime of the given promise. A platform-agnostic `waitUntil` function.
 * @param c - The execution context.
 * @param promise - The promise.
 * @internal
 */
export default function waitUntil(
	c: Readonly<ExecutionContext>,
	promise: Readonly<Promise<unknown>>
): void {
	try {
		waitUntilVercel(promise); // Vercel
	} catch {
		try {
			c.waitUntil(promise); // Cloudflare Worker
		} catch {
			void promise; // Other
		}
	}
}
