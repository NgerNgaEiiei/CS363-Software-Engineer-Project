import { SearchIcon } from "./icons";
import { TABS } from "../data/menuData";

export default function TabBar({ activeTab, onTabChange, onSearchToggle }) {
  return (
    <div className="sticky top-0 z-10 border-b border-black/10 backdrop-blur-sm bg-[#d4c4a8]/80">
      <div className="flex items-center gap-0.5 px-5 max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
        {/* Search toggle button */}
        <button
          onClick={onSearchToggle}
          className="flex items-center justify-center w-12 h-12 mr-1 text-gray-700
                     hover:text-gray-900 bg-transparent border-none cursor-pointer flex-shrink-0"
        >
          <SearchIcon />
        </button>

        {/* Tab buttons */}
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-shrink-0 px-4 py-3.5 text-[15px] font-semibold whitespace-nowrap
                        border-none bg-transparent cursor-pointer transition-colors border-b-[3px]
                        ${activeTab === tab
                          ? "text-gray-900 font-extrabold border-b-gray-900"
                          : "text-gray-500 border-b-transparent hover:text-gray-900"
                        }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
