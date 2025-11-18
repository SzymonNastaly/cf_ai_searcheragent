import { DrizzleD1Database } from "drizzle-orm/d1";
import { InsertCompany, SelectCompany, companies } from "../db/schema";

export async function getCompanies(
  db: DrizzleD1Database,
): Promise<SelectCompany[]> {
  return await db.select().from(companies);
}

export async function insertCompany(
  db: DrizzleD1Database,
  data: InsertCompany,
): Promise<SelectCompany[]> {
  return await db.insert(companies).values(data).returning();
}

export async function deleteCompany(
  db: DrizzleD1Database,
  data: any,
): Promise<any> {
  return await db.delete(companies).where(eq(companies.id, id));
}
