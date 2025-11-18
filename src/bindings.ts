import { AgentNamespace } from "agents";
import ScraperAgent from "./agents/scraper";

export type Env = {
  searcheragent_db: D1Database;
  MYBROWSER: Fetcher;
  ScraperAgent: AgentNamespace<ScraperAgent>;
  JOB_DETAILS_BUCKET: R2Bucket;
  AI: Ai;
  OPENAI_API_KEY: string;
  MODEL: string;
};
