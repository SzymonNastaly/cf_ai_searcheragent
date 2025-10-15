import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";

import { Env } from "./bindings";
import api from "./api";

import Home from "./pages/Home";
import { getCompanies } from "./functions/companies";

const app = new Hono<{ Bindings: Env }>();
app.route("/api", api);

app.get("/", async (c) => {
  const db = drizzle(c.env.searcheragent_db);
  const results = await getCompanies(db);
  return c.html(<Home companies={results} />);
});

export default app;
