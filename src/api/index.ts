import { Hono } from "hono";

import companies from "./companies";
import scraper from "./scraper";
import search from "./search";

const api = new Hono();
api.route("/companies", companies);
api.route("/scraper", scraper);
api.route("/search", search);

export default api;
