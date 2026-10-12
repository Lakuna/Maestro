import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env["DATABASE_URL"];
if (!databaseUrl) {
	throw new Error("Missing database URL.");
}

/**
 * The database connection.
 * @internal
 */
export default drizzle(databaseUrl);
