import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";

import { Env } from "./bindings";
import api from "./api";
import ScraperAgent from "./agents/scraper";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { getCompanies } from "./functions/companies";

export { ScraperAgent };

const app = new Hono<{ Bindings: Env }>();
app.route("/api", api);

app.get("/", async (c) => {
  const db = drizzle(c.env.searcheragent_db);
  const results = await getCompanies(db);
  return c.html(<Home companies={results} />);
});

app.get("/admin", async (c) => {
  const db = drizzle(c.env.searcheragent_db);
  const results = await getCompanies(db);
  return c.html(<Admin companies={results} />);
});

export default app;
