export default function SortButton(props) {
  return (
    <button
      onClick={props.myPropFunction}
      className="bg-gray-900 text-white text-sm font-medium focus:outline-none rounded-lg px-2 py-2.5 m-2"
    >
      <div className="flex flex-row gap-x-2 mx-auto">
        <div className="my-auto text-md">Sort</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-list-filter"
          >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
        </div>
        <div className="flex items-center">
          {props.sortingDirection ? (
            <svg
              class="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1v12m0 0 4-4m-4 4L1 9"
              />
            </svg>
          ) : (
            <svg
              class="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
