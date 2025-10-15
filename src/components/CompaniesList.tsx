import { SelectCompany } from "../db/schema";
import Company from "./Company";

type CompaniesListProps = {
  companies: SelectCompany[];
};

export default function CompaniesList({ companies }: CompaniesListProps) {
  return (
    <div id="companies-list">
      <h1>All Companies</h1>
      {companies.map((company) => (
        <Company company={company} />
      ))}
    </div>
  );
}
