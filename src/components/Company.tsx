import { SelectCompany } from "../db/schema";

export default function Company({ company }: { company: SelectCompany }) {
  return (
    <div
      id={`company-${company.id}`}
      class="flex items-start justify-between mb-2 block min-w-96 p-2 shadow
        dark:border-gray-700 dark:bg-gray-800"
    >
      <div>
        <h5
          class="mb-2 text-xl font-bold tracking-tight text-gray-900
            dark:text-white"
        >
          {company.name}
        </h5>
        <a
          class="font-normal text-gray-700 dark:text-gray-400"
          href={company.url!}
        >
          {company.url}
        </a>
      </div>
      <button
        hx-delete={`/api/companies/${company.id}`}
        hx-target={`#company-${company.id}`}
        hx-swap="outerHTML"
        hx-confirm="Are you sure you want to delete this company?"
        class="text-red-300 hover:text-red-500 font-bold text-2xl ml-4
          cursor-pointer"
      >
        X
      </button>
    </div>
  );
}
