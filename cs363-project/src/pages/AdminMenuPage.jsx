import { useState, useCallback } from "react";
import { MENU_ITEMS } from "../data/menuData";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import SearchBar from "../components/SearchBar";
import AdminMenuCard from "../components/AdminMenuCard";
import { PlusIcon } from "../components/icons";

export default function AdminMenuPage() {
  const [menus, setMenus]             = useState(MENU_ITEMS);
  const [activeTab, setActiveTab]     = useState("เมนูขายดี");
  const [search, setSearch]           = useState("");
  const [showSearch, setShowSearch]   = useState(false);
  const [draggingIndex, setDragging]  = useState(null);
  const [overIndex, setOver]          = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [newMenu, setNewMenu]         = useState({ name: "", price: "" });

  // ── Drag-and-drop ─────────────────────────────────────────────────────────
  const handleDragStart = useCallback((i) => setDragging(i), []);
  const handleDragOver  = useCallback((i) => setOver(i), []);
  const handleDragEnd   = useCallback(() => { setDragging(null); setOver(null); }, []);

  const handleDrop = useCallback(
    (dropIndex) => {
      if (draggingIndex === null || draggingIndex === dropIndex) return;
      setMenus((prev) => {
        const next = [...prev];
        const [moved] = next.splice(draggingIndex, 1);
        next.splice(dropIndex, 0, moved);
        return next;
      });
      setDragging(null);
      setOver(null);
    },
    [draggingIndex]
  );

  // ── CRUD ─────────────────────────────────────────────────────────────────
  const handleEdit   = useCallback((item) => alert(`แก้ไข: ${item.name}`), []);
  const handleDelete = useCallback(
    (id) => setMenus((prev) => prev.filter((m) => m.id !== id)),
    []
  );

  const handleAddMenu = () => {
    if (!newMenu.name || !newMenu.price) return;
    setMenus((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newMenu.name,
        price: parseInt(newMenu.price, 10),
        category: "เมนูทั้งหมด",
        img: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&sig=${Date.now()}`,
      },
    ]);
    setNewMenu({ name: "", price: "" });
    setShowModal(false);
  };

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = menus.filter((item) => {
    const matchTab    = activeTab === "เมนูทั้งหมด" || item.category === activeTab;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <>
      <style>{`
        @keyframes slideIn  { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideUp  { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#d4c4a8]">
        {/* ── Same Header as MenuPage ─────────────────────────── */}
        <Header restaurantName="จัดการเมนู" tableNumber="Admin" showIcons={false} />

        {/* ── TabBar (reuses TABS from menuData) ─────────────── */}
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSearchToggle={() => setShowSearch((v) => !v)}
        />

        {showSearch && <SearchBar value={search} onChange={setSearch} />}

        {/* ── Content ────────────────────────────────────────── */}
        <div className="px-6 pt-5 pb-28 max-w-7xl mx-auto">
          {/* Add-menu button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 mb-5 px-5 py-2.5
                       bg-white/60 hover:bg-white border-2 border-dashed border-black/20
                       hover:border-teal-400 text-gray-600 hover:text-teal-600
                       rounded-2xl text-[15px] font-semibold cursor-pointer
                       transition-all duration-200"
          >
            <PlusIcon />
            เพิ่มเมนู
          </button>

          {/* Drag hint */}
          <p className="text-xs text-gray-500 font-medium mb-5 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            {filtered.length} รายการ · ลากการ์ดเพื่อเรียงลำดับ
          </p>

          {/* Grid — same columns as MenuPage */}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-base">ไม่พบเมนูที่ค้นหา</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 pt-3">
              {filtered.map((item, index) => (
                <AdminMenuCard
                  key={item.id}
                  item={item}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDragging={draggingIndex === index}
                  isOver={overIndex === index && draggingIndex !== index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Add-menu Modal ─────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50
                     flex items-center justify-center p-5"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "slideUp 0.25s ease" }}
            className="bg-white rounded-3xl p-7 w-full max-w-sm
                       shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
          >
            <h2 className="text-lg font-extrabold text-gray-900 mb-5">เพิ่มเมนูใหม่</h2>

            <div className="flex flex-col gap-3.5">
              {[
                { label: "ชื่อเมนู", key: "name", placeholder: "เช่น สเต็กไก่",  type: "text"   },
                { label: "ราคา (฿)", key: "price", placeholder: "เช่น 199",      type: "number" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-[13px] font-semibold text-gray-500 mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={newMenu[key]}
                    onChange={(e) =>
                      setNewMenu((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black/10
                               focus:border-teal-400 outline-none text-[15px] text-gray-900
                               bg-white transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-black/10 bg-white
                           text-[15px] font-semibold text-gray-500
                           hover:border-gray-300 cursor-pointer transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddMenu}
                className="flex-1 py-3 rounded-xl border-none bg-teal-400 hover:bg-teal-500
                           text-[15px] font-extrabold text-white cursor-pointer transition-colors"
              >
                เพิ่มเมนู
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
