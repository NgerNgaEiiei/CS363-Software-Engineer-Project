import { useState, useCallback } from "react";
import { MENU_ITEMS } from "../data/menuData";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import SearchBar from "../components/SearchBar";
import AdminMenuCard from "../components/AdminMenuCard";
import AddMenuModal from "../components/AddMenuModal";
import { PlusIcon } from "../components/icons";

export default function AdminMenuPage() {
  const [menus, setMenus]             = useState(MENU_ITEMS);
  const [activeTab, setActiveTab]     = useState("เมนูขายดี");
  const [search, setSearch]           = useState("");
  const [showSearch, setShowSearch]   = useState(false);
  const [draggingIndex, setDragging]  = useState(null);
  const [overIndex, setOver]          = useState(null);
  const [showModal, setShowModal]     = useState(false);

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

  const handleAddMenu = (newMenuData) => {
    setMenus((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newMenuData.name,
        price: parseInt(newMenuData.price, 10),
        category: "เมนูทั้งหมด",
        img: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&sig=${Date.now()}`,
      },
    ]);
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
      <AddMenuModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onAdd={handleAddMenu} 
      />
    </>
  );
}
