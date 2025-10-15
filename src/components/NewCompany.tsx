import Input from "./Input";
import SubmitButton from "./SubmitButton";

export default function NewCompany() {
  return (
    <form
      hx-post="/api/companies"
      hx-target="#companies-list"
      hx-swap="beforeend"
      hx-ext="json-enc"
      class="min-w-72 mx-6"
    >
      <Input
        type="text"
        label="Name"
        name="name"
        placeholder="Company name..."
        required
      />

      <Input
        type="text"
        label="URL"
        name="url"
        placeholder="https://...."
        required
      />

      <SubmitButton />
    </form>
  );
}
