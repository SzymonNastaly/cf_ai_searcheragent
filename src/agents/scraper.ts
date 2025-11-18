import puppeteer from "@cloudflare/puppeteer";
import { Agent } from "agents";
import { Env } from "../bindings";
import { drizzle } from "drizzle-orm/d1";
import OpenAI from "openai";

class ScraperAgent extends Agent<Env> {
  async scrape(url: string) {
    const browser = await puppeteer.launch(this.env.MYBROWSER);
    const client = new OpenAI({
      apiKey: this.env.OPENAI_API_KEY,
    });

    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
      const cleantContent = await page.evaluate(() => {
        const cloned = document.body.cloneNode(true);
        const unnecessarryElements = cloned.querySelectorAll(
          "script, style, svg, noscript, iframe",
        );
        toRemove.forEach((el) => el.remove());
        return cloned.innerHtml;
      });
      await page.close();
      let response = await client.chat.completions.create({
        model: this.env.MODEL,
        messages: [
          {
            role: "user",
            content: `Extract job listings. Return JSON format:{"jobs":[{ "jobName": "...",  "url": "..." }]}. Base URL is ${url}. Content: ${bodyContent}`,
          },
        ],
        response_format: {
          type: "json_object",
        },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      const jobsWithDescription = await Promise.all(
        parsed.jobs.map(async (job) => {
          const description = await this.scrapeJobDescription(
            browser,
            client,
            job.url,
          );
          return { ...job, description };
        }),
      );

      return jobsWithDescription;
    } catch (error) {
      console.error("Scraping of job description failed: ", error);
      throw error;
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
