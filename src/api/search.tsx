import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { Env } from "../bindings";

const searchRouter = new Hono<{ Bindings: Env }>();

searchRouter.post("/", async (c) => {
  const { query } = await c.req.parseBody();

  if (!query || typeof query !== "string") {
    return c.html(<div>Please provide a valid query.</div>);
  }

  try {
    const userMessage = <div>You: {query}</div>;
    const answer = await c.env.AI.autorag("ai-search-job-details-dev").search({
      query: query,
      rewrite_query: true,
      max_num_results: 2,
      ranking_options: {
        score_threshold: 0.3,
      },
      reranking: {
        enabled: true,
        model: "@cf/baai/bge-reranker-base",
      },
    });
    const files = [];
    for (const result of answer.data) {
      const file = await c.env.JOB_DETAILS_BUCKET.get(result.filename);
      const jsonFile = await file?.json();
      files.push(jsonFile[0]);
    }
    const assistantMessage = (
      <div>
        <strong>Assistant:</strong>
        {files && files.length > 0 ? (
          <div>
            <p>Found the following results:{files}</p>
            {files.map((file) => {
              const lines = file.description.split("\n");
              const preview = lines.slice(0, 10).join("\n");
              return (
                <div class="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <a
                    class="text-l mb-2 block font-semibold text-blue-600 hover:text-blue-800"
                    href={file.url}
                  >
                    {file.jobName}
                  </a>
                  <div class="text-sm leading-relaxed whitespace-pre-wrap text-gray-600">
                    {preview}
                    {lines.length > 10 && <span>...</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
    return c.html(
      <>
        {userMessage}
        {assistantMessage}
      </>,
    );
  } catch (error) {
    console.error("Search error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
      error: error,
    });
    return c.html(
      <div>
        <strong>Error:</strong>Failed to perform search.
      </div>,
    );
  }
});

export default searchRouter;
