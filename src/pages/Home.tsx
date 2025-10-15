import Layout from "../layouts";
import NewCompany from "../components/NewCompany";
import CompaniesList from "../components/CompaniesList";
import { SelectCompany } from "../db/schema";

export default function Home({ companies }: { companies: SelectCompany[] }) {
  return (
    <Layout>
      <div class="flex flex-row mt-8 w-full dark:text-white">
        <NewCompany />
        <CompaniesList companies={companies} />
      </div>
    </Layout>
  );
}
