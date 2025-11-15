type InputProps = {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  type: "text" | "textarea";
  hasBottomMargin?: boolean;
};

export default function Input({
  label,
  name,
  placeholder,
  required,
  type,
  hasBottomMargin = false,
}: InputProps) {
  return (
    <div class="mb-2">
      <label
        for={name}
        class="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      {type == "text" && (
        <input
          type="text"
          name={name}
          class="mr-2 w-full border border-gray-300 bg-gray-50 p-2.5 text-sm
            text-gray-900 focus:border-blue-500 focus:ring-blue-500
            dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:placeholder-gray-400 dark:focus:border-blue-500
            dark:focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
        />
      )}
      {type === "textarea" && (
        <textarea
          rows={4}
          name={name}
          class="mb-5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
            text-gray-900 focus:border-blue-500 focus:ring-blue-500
            dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:placeholder-gray-400 dark:focus:border-blue-500
            dark:focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
