import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const companies = sqliteTable("companies", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
  url: text("url"),
  notes: text(),
  lastChecked: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertCompany = typeof companies.$inferInsert;
export type SelectCompany = typeof companies.$inferSelect;
