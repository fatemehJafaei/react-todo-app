import { Search } from "lucide-react";
import { SORT_OPTIONS, STATUS_FILTERS } from "../utils/constants";

export default function Toolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">
            جست‌وجو در عنوان و توضیحات
          </label>
          <Search
            size={18}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="جست‌وجو در عنوان و توضیحات..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pe-3 ps-10 text-sm placeholder:text-slate-400 focus:border-teal-600"
          />
        </div>
        <div className="sm:w-48">
          <label htmlFor="sort" className="sr-only">
            مرتب‌سازی
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-teal-600"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        role="group"
        aria-label="فیلتر کارها"
        className="flex flex-wrap gap-2"
      >
        {STATUS_FILTERS.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => onFilterChange(item.value)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-colors ${
                active
                  ? "bg-teal-700 text-white ring-teal-700"
                  : "bg-white text-slate-600 ring-slate-300 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
