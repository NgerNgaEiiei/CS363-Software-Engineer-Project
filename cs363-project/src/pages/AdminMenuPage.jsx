import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../data/menuData";
import AdminMenuCard from "../components/AdminMenuCard";
import AddMenuModal from "../components/AddMenuModal";

export default function AdminMenuPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState(MENU_ITEMS);
  const [search, setSearch] = useState("");
  const [draggingIndex, setDragging] = useState(null);
  const [overIndex, setOver] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ── Drag-and-drop ─────────────────────────────────────────────────────────
  const handleDragStart = useCallback((i) => setDragging(i), []);
  const handleDragOver = useCallback((i) => setOver(i), []);
  const handleDragEnd = useCallback(() => { setDragging(null); setOver(null); }, []);

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
  const handleEdit = useCallback((item) => alert(`แก้ไข: ${item.name}`), []);
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

  // ── Filter (Only search matters now) ───────────────────────────────────────
  const filtered = menus.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <style>{`
        @keyframes slideIn  { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideUp  { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#FAF5F5] font-['Sarabun'] text-[#2D505D] pb-32">
        <div className="w-full px-6 pt-5">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-extrabold leading-tight m-0 text-[#2D505D]">Ezy <br /> Order</h1>
            <button className="border-2 border-[#58B9B1] bg-white px-4 py-2 rounded-xl font-bold cursor-pointer text-[#2D505D] hover:bg-[#ced4da] transition-colors">
              ดูตัวอย่าง
            </button>
          </header>

          {/* Tab Navigation */}
          <div className="flex justify-center border-b border-gray-200 py-3 mb-6">
            <div className="flex w-full max-w-[400px] items-center">
              <button
                onClick={() => navigate('/admin/setting')}
                className="flex-1 py-2 border-none bg-transparent text-[#2D505D] font-bold text-base cursor-pointer hover:text-teal-600 transition-colors"
              >
                ตั้งค่าระบบ
              </button>
              <div className="w-[1px] h-5 bg-gray-300 mx-4" />
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 py-2 rounded-xl border-2 border-[#2D505D] bg-transparent text-[#2D505D] font-black text-base cursor-pointer"
              >
                จัดการเมนู
              </button>
            </div>
          </div>

          {/* ── Content ────────────────────────────────────────── */}
          <div className="w-full max-w-7xl mx-auto">
            {/* Add-menu button matching the minimal style in the image */}
            <button
              onClick={() => setShowModal(true)}
              className="mb-6 px-6 py-2 bg-transparent border border-[#2D505D] text-[#2D505D] font-bold rounded-lg cursor-pointer hover:bg-white transition-colors"
            >
              เพิ่มเมนู
            </button>

            {/* Grid — same columns as MenuPage */}
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-16 text-base">ไม่พบเมนูที่ค้นหา</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
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
