import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";

import { Env } from "../bindings";
import { companies, SelectCompany } from "../db/schema";
import { getCompanies, insertCompany } from "../functions/companies";

import CompaniesList from "../components/CompaniesList";
import Company from "../components/Company";

const companiesRouter = new Hono<{ Bindings: Env }>();

companiesRouter.get("/", async (c) => {
  const db = drizzle(c.env.searcheragent_db);
  const results: SelectCompany[] = await getCompanies(db);
  return c.html(<CompaniesList companies={results} />);
});

companiesRouter.post(
  "/",
  zValidator(
    "json",
    z.object({ name: z.string().min(3).max(255), url: z.string() }),
  ),
  async (c) => {
    const db = drizzle(c.env.searcheragent_db);
    const { name, url } = c.req.valid("json");
    const results = await insertCompany(db, { name, url });
    if (results.length === 0) {
      return c.html(<></>);
    }
    return c.html(<Company company={results[0]} />);
  },
);

export default companiesRouter;
