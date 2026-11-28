import {
	boolean,
	foreignKey,
	integer,
	pgTable,
	type PgTableExtraConfigValue,
	primaryKey,
	varchar
} from "drizzle-orm/pg-core";

/**
 * The table of users.
 * @internal
 */
export const usersTable = pgTable("users", {
	coins: integer().default(0).notNull(), // Coin balance.
	id: varchar({ length: 19 }).primaryKey() // Discord snowflake.
});

/**
 * The table of gambling instances.
 * @internal
 */
export const gambaTable = pgTable(
	"gambas",
	{
		id: integer().generatedAlwaysAsIdentity().primaryKey(),
		isCalled: boolean().default(false).notNull(),
		isClosed: boolean().default(false).notNull(),
		winningOptionValue: varchar({ length: 100 })
	},
	// Type assertion necessary here due to the use of `optionTable` before its definition.
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	(self): PgTableExtraConfigValue[] => [
		foreignKey({
			columns: [self.id, self.winningOptionValue],
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			foreignColumns: [optionTable.gambaId, optionTable.value]
		})
	]
);

/**
 * The table of gambling instance options.
 * @internal
 */
export const optionTable = pgTable(
	"options",
	{
		gambaId: integer()
			.references(() => gambaTable.id)
			.notNull(),
		value: varchar({ length: 100 }).notNull()
	},
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	(self) => [primaryKey({ columns: [self.gambaId, self.value] })]
);

/**
 * The table of bets on gambling instance options.
 * @internal
 */
export const betTable = pgTable(
	"bets",
	{
		coins: integer().notNull(),
		gambaId: integer()
			.references(() => gambaTable.id)
			.notNull(),
		optionValue: varchar({ length: 100 }).notNull(),
		userId: varchar({ length: 19 })
			.references(() => usersTable.id)
			.notNull()
	},
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	(self) => [
		primaryKey({ columns: [self.gambaId, self.userId] }),
		foreignKey({
			columns: [self.gambaId, self.optionValue],
			foreignColumns: [optionTable.gambaId, optionTable.value]
		})
	]
);
