import puppeteer from "@cloudflare/puppeteer";
import { Agent } from "agents";
import { Env } from "../bindings";
import { drizzle } from "drizzle-orm/d1";
import OpenAI from "openai";

class ScraperAgent extends Agent<Env> {
  async scrape(url: string) {
    const browser = await puppeteer.launch(this.env.MYBROWSER);
    try {
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector("body");
      const bodyContent = await page.$eval(
        "body",
        (element) => element.innerHTML,
      );
      await page.close();
      const client = new OpenAI({
        apiKey: this.env.OPENAI_API_KEY,
      });
      let response = await client.chat.completions.create({
        model: this.env.MODEL,
        messages: [
          {
            role: "user",
            content: `Return a JSON object with the job position names and job posting absolute URLs with the following format: { "jobName": "Job Name",  "url": "ABSOLUTE_URL" } from the website content below. <content>${bodyContent}</content>`,
          },
        ],
        response_format: {
          type: "json_object",
        },
      });
      const parsed = JSON.parse(response.choices[0].message.content);
      const jobsWithDescription = [];
      for (const job of parsed.jobs) {
        const description = await this.scrapeJobDescription(
          browser,
          client,
          job.url,
        );
        jobsWithDescription.push({ ...job, description });
        break;
      }
      return jobsWithDescription;
    } finally {
      await browser.close();
    }
  }
  async scrapeJobDescription(browser: any, client: OpenAI, url: string) {
    const page = await browser.newPage();
    try {
      await page.goto(url);
      await page.waitForSelector("body");
      const bodyContent = await page.$eval(
        "body",
        (element) => element.innerHTML,
      );
      let response = await client.chat.completions.create({
        model: this.env.MODEL,
        messages: [
          {
            role: "user",
            content: `Return a plaintext string with the job details, including a job description, required skills, tasks and perks from the website content below. <content>${bodyContent}</content>`,
          },
        ],
      });
      return response.choices[0].message.content;
    } finally {
      await page.close();
    }
  }
}

export default ScraperAgent;
