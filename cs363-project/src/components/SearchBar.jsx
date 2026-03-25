import { SearchIcon } from "./icons";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <div className="relative max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <SearchIcon />
        </span>
        <input
          autoFocus
          type="text"
          placeholder="ค้นหาเมนู..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black/10
                     bg-white/60 focus:bg-white focus:border-teal-400 outline-none
                     text-[15px] text-gray-900 transition-all"
        />
      </div>
    </div>
  );
}
