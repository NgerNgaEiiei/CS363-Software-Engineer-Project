import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MENU_ITEMS } from "../data/menuData";
import AdminEditMenuCard from "../components/AdminEditMenuCard";

export default function AdminEditMenuPage() {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");

  const [categoryMenus, setCategoryMenus] = useState(() => {
    return MENU_ITEMS.filter(item => item.categoryId === Number(categoryId));
  });

  const [allAvailableMenus] = useState(MENU_ITEMS);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [draggingIndex, setDragging] = useState(null);
  const [overIndex, setOver] = useState(null);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const currentCat = savedCategories.find(c => c.id === Number(categoryId));
    if (currentCat) {
      setCategoryName(currentCat.th);
    } else {
      setCategoryName("แก้ไขหมวดหมู่");
    }
  }, [categoryId]);

  useEffect(() => {
    if (isSelectionMode) {
      const currentIds = categoryMenus.map(item => item.id);
      setSelectedIds(currentIds);
    }
  }, [isSelectionMode, categoryMenus]);

  const handleDragStart = (i) => setDragging(i);
  const handleDragOver = (e, i) => { e.preventDefault(); setOver(i); };
  const handleDragEnd = () => { setDragging(null); setOver(null); };

  const handleDrop = (dropIndex) => {
    if (draggingIndex === null || draggingIndex === dropIndex) return;
    const next = [...categoryMenus];
    const [moved] = next.splice(draggingIndex, 1);
    next.splice(dropIndex, 0, moved);
    setCategoryMenus(next);
    setDragging(null);
    setOver(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const confirmAddSelected = () => {
    const updatedItems = allAvailableMenus.filter(m => selectedIds.includes(m.id));
    setCategoryMenus(updatedItems);
    setIsSelectionMode(false);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-['Sarabun'] pb-32">
      {/* ── Header ── */}
      <div className="p-6">
        <button 
          onClick={() => isSelectionMode ? setIsSelectionMode(false) : window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#58B9B1] text-[#2D505D] rounded-xl font-bold shadow-sm active:scale-95 transition-all cursor-pointer hover:bg-[#ced4da]"
        >
          <span className="text-xl leading-none">↩</span> ย้อนกลับ
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-[#2D505D]">
          {isSelectionMode ? "เลือกเมนู" : categoryName}
        </h1>
        
        {!isSelectionMode && (
          <div className="flex justify-center gap-3 mt-4">
            <button 
              onClick={() => setIsSelectionMode(true)}
              className="px-6 py-2 bg-white border border-[#2D505D] rounded-xl font-bold text-[#2D505D] text-sm shadow-sm hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer"
            >
              เพิ่มเมนู
            </button>
            <button 
              className="px-6 py-2 bg-white border border-[#2D505D] rounded-xl font-bold text-[#2D505D] text-sm shadow-sm hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer"
              onClick={() => setCategoryMenus(MENU_ITEMS.filter(item => item.categoryId === Number(categoryId)))}
            >
              รีเซ็ตข้อมูล
            </button>
          </div>
        )}
      </div>

      {/* ── Grid Content ── */}
      <div className="px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {(isSelectionMode ? allAvailableMenus : categoryMenus).map((item, index) => (
            <AdminEditMenuCard
              key={item.id}
              item={item}
              index={index}
              isSelectionMode={isSelectionMode}
              isChecked={selectedIds.includes(item.id)}
              onToggleSelect={toggleSelect}
              draggingIndex={draggingIndex}
              overIndex={overIndex}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </div>

      {/* ── Footer Button (แสดงเฉพาะโหมดเลือกเมนู) ── */}
      {isSelectionMode && (
        <div className="fixed bottom-8 left-0 right-0 px-10 z-50 pointer-events-none flex justify-center">
          <button
            onClick={confirmAddSelected}
            className="w-full max-w-sm py-4 rounded-[1.8rem] bg-gradient-to-r from-[#58B9B1] to-[#4AA098] 
                       text-white text-lg font-black shadow-xl active:scale-95 transition-all pointer-events-auto cursor-pointer hover:shadow-2xl"
          >
            บันทึกรายการที่เลือก
          </button>
        </div>
      )}
    </div>
  );
}