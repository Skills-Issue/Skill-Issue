export default function Filter({openModal}) {
  return (
    <button onClick={openModal} className="bg-gray-900 text-white text-sm font-medium focus:outline-none rounded-lg px-4 py-2.5 m-2">
      <div className="flex flex-row gap-x-2 mx-auto">
      <div className="my-auto text-md">Filter</div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-list-filter"
        >
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
      </div></div>
    </button>
  );
}
