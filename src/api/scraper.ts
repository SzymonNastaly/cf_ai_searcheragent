import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { Env } from "../bindings";

import {
  Agent,
  AgentNamespace,
  getAgentByName,
  routeAgentRequest,
} from "agents";
import ScraperAgent from "../agents/scraper";

const scraperRouter = new Hono<{ Bindings: Env }>();

scraperRouter.post(
  "/",
  zValidator("json", z.object({ url: z.string() })),
  async (c) => {
    const { url } = c.req.valid("json");
    const agentId = c.env.ScraperAgent.newUniqueId();
    const agent = c.env.ScraperAgent.get(agentId);
    const response = await agent.scrape(url);
    const fileKey = `${crypto.randomUUID()}.json`;
    const jsonString = JSON.stringify(response, null, 2);
    try {
      const storedFile = await c.env.JOB_DETAILS_BUCKET.put(
        fileKey,
        jsonString,
        {
          httpMetadata: { contentType: "application/json" },
        },
      );
      console.log(`Stored new JSON: ${storedFile.key}`);
      return c.json(
        { status: "success", key: storedFile.key, size: storedFile.size },
        201,
      );
    } catch (error: unknown) {
      console.error(`Failed to stored JSON: ${fileKey}`);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return c.json(
        { status: `Failed to store data in R2: ${errorMessage}` },
        500,
      );
    }
  },
);

export default scraperRouter;
