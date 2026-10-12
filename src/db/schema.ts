import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

/**
 * The table of users.
 * @internal
 */
export const usersTable = pgTable("users", {
	coins: integer().default(0).notNull(), // Coin balance.
	id: varchar({ length: 19 }).primaryKey() // Discord snowflake.
});
