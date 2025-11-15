import NewCompany from "../components/NewCompany";
import CompaniesList from "../components/CompaniesList";
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
        <div class="mt-8 w-full dark:text-white">
          <NewCompany />
          <CompaniesList companies={companies} />
        </div>
      </body>
    </html>
  );
}
