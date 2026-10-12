import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env["DATABASE_URL"];
if (!databaseUrl) {
	throw new Error("Missing database URL.");
}

export default defineConfig({
	dbCredentials: { url: databaseUrl },
	dialect: "postgresql",
	out: "./drizzle",
	schema: "./dist/db/schema.js"
});
