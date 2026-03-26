import { useState } from "react";
import { MENU_ITEMS } from "../data/menuData";
import { Undo2 } from "lucide-react";
import { BellIcon, GlobeIcon } from "../components/icons";
import IconButton from "../components/IconButton";
import TabBar from "../components/TabBar";
import SearchBar from "../components/SearchBar";
import MenuCard from "../components/MenuCard";

export default function MenuPreview() {
  const [activeTab, setActiveTab] = useState("เมนูขายดี");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ── Filter ────────────────────────────────────────────────────────────────
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchTab = activeTab === "เมนูทั้งหมด" || item.category === activeTab;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <>
      {/* Keyframe for cart slide-in animation */}
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#d4c4a8]">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 max-w-7xl mx-auto">
          <button className="flex items-center gap-2 px-4 md:px-5 h-10 md:h-11 bg-white rounded-xl shadow-sm border border-[#005c6a] text-[#005c6a] font-bold text-base cursor-pointer hover:bg-teal-50 transition-colors">
            <Undo2 size={20} strokeWidth={2.5} />
            ย้อนกลับ
          </button>
          <div className="flex items-center gap-2 md:gap-2.5">
            <IconButton><BellIcon size={20} /></IconButton>
            <IconButton><GlobeIcon size={20} /></IconButton>
          </div>
        </div>

        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSearchToggle={() => setShowSearch((v) => !v)}
        />

        {showSearch && (
          <SearchBar value={search} onChange={setSearch} />
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5
                        gap-5 px-6 pt-5 pb-28 max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 py-16 text-base">
              ไม่พบเมนูที่ค้นหา
            </p>
          ) : (
            filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
