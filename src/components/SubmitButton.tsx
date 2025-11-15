export default function SubmitButton() {
  return (
    <button
      type="submit"
      class="m-2 flex items-center bg-blue-700 px-4 py-2 text-center text-sm
        font-medium text-white hover:bg-blue-800 focus:ring-4
        focus:ring-blue-300 focus:outline-none dark:bg-blue-600
        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Create
      <svg
        class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );
}
