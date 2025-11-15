import Navbar from "../components/Navbar";
import { SelectCompany } from "../db/schema";

export default function Home({ companies }: { companies: SelectCompany[] }) {
  return (
    <html>
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        />
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js" />
        <link rel="stylesheet" href="./output.css" />
        <title>CF AI SearcherAgent</title>
      </head>
      <body class="container mx-auto dark:bg-gray-800">
        <Navbar />
        <div>
          <h1 class="text-black dark:text-gray-200">Search chat</h1>
          <div id="messages"></div>
          <form
            id="query-form"
            hx-post="/api/search"
            hx-target="#messages"
            hx-swap="beforeend"
            hx-on="htmx:afterRequest: document.getElementById('query-input').value = ''"
          >
            <input
              type="text"
              id="query-input"
              name="query"
              placeholder="Ask a question..."
              class="text-black dark:text-gray-200"
              required
              autofocus
            />
            <button
              type="submit"
              id="submit-btn"
              class="border border-gray-300 px-1 py-1 text-black
                transition-colors hover:bg-gray-100 dark:border-gray-600
                dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Send
            </button>
          </form>
        </div>
      </body>
    </html>
  );
}
