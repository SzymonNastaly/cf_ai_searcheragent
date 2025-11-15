export default function Navbar({}) {
  return (
    <nav class="mb-8 border-b border-gray-300 dark:border-gray-600">
      <ul class="flex gap-6 py-4">
        <li
          class="text-black hover:text-gray-600 dark:text-gray-200
            dark:hover:text-gray-400 transition-colors"
        >
          <a href="/">Job Chat</a>
        </li>
        <li
          class="text-black hover:text-gray-600 dark:text-gray-200
            dark:hover:text-gray-400 transition-colors"
        >
          <a href="/admin">Admin</a>
        </li>
      </ul>
    </nav>
  );
}
