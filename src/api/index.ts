import { Hono } from "hono";

import companies from "./companies";

const api = new Hono();
api.route("/companies", companies);

export default api;
