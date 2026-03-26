import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // เพิ่ม import useParams
import { MENU_ITEMS } from "../data/menuData";

export default function AdminEditMenuPage() {
  const { categoryId } = useParams(); // รับ ID จาก URL
  const [categoryName, setCategoryName] = useState(""); // เก็บชื่อหมวดหมู่ที่ดึงมาได้

  // 1. เมนูที่อยู่ในหมวดหมู่ปัจจุบัน
  const [categoryMenus, setCategoryMenus] = useState(() => {
    // กรองเมนูตาม categoryId ที่ได้รับมา (ต้องใช้ Number() แปลงค่าเพราะ params เป็น string)
    return MENU_ITEMS.filter(item => item.categoryId === Number(categoryId));
  });

  const [allAvailableMenus] = useState(MENU_ITEMS);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [draggingIndex, setDragging] = useState(null);
  const [overIndex, setOver] = useState(null);

  // ─── [ดึงชื่อหมวดหมู่] ──────────────────
  useEffect(() => {
    // ดึงข้อมูล categories จาก localStorage มาหาชื่อที่ตรงกับ ID
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const currentCat = savedCategories.find(c => c.id === Number(categoryId));
    
    if (currentCat) {
      setCategoryName(currentCat.th); // ใช้ชื่อภาษาไทย เช่น "เมนูขายดี"
    } else {
      setCategoryName("แก้ไขหมวดหมู่"); // กรณีหาไม่เจอให้โชว์คำกลางๆ
    }
  }, [categoryId]);

  // ─── [Sync ข้อมูลเมื่อเปิดโหมดเลือก] ──────────────────
  useEffect(() => {
    if (isSelectionMode) {
      const currentIds = categoryMenus.map(item => item.id);
      setSelectedIds(currentIds);
    }
  }, [isSelectionMode, categoryMenus]);

  // ── Drag-and-drop Logic (สำหรับ รูป 1) ──────────────────────────────────
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

  // ── Selection Logic (สำหรับ รูป 2) ──────────────────────────────────────
  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const confirmAddSelected = () => {
    // กรองเมนูจาก All เมนู ตาม ID ที่ถูกติ๊กเลือกไว้ล่าสุดทั้งหมด
    const updatedItems = allAvailableMenus.filter(m => selectedIds.includes(m.id));
    
    // อัปเดตกลับไปที่หน้าจัดลำดับ (รูป 1)
    setCategoryMenus(updatedItems);
    setIsSelectionMode(false);
  };

return (
    <div className="min-h-screen bg-[#F2F2F2] font-['Sarabun'] pb-32">
      {/* ── Header ── */}
      <div className="p-6">
        <button 
          onClick={() => isSelectionMode ? setIsSelectionMode(false) : window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#58B9B1] text-[#2D505D] rounded-xl font-bold shadow-sm active:scale-95 transition-all"
        >
          <span className="text-xl">↩</span> ย้อนกลับ
        </button>
      </div>

      <div className="text-center mb-8">
        {/* ─── [จุดที่แก้ไข] แสดงชื่อตามตัวแปร categoryName ─── */}
        <h1 className="text-2xl font-black text-[#2D505D]">
          {isSelectionMode ? "เลือกเมนู" : categoryName}
        </h1>
        
        {!isSelectionMode && (
          <div className="flex justify-center gap-3 mt-4">
            <button 
              onClick={() => setIsSelectionMode(true)}
              className="px-6 py-2 bg-white border border-[#2D505D] rounded-xl font-bold text-[#2D505D] text-sm shadow-sm active:scale-95 transition-all"
            >
              เพิ่มเมนู
            </button>
            <button className="px-6 py-2 bg-white border border-[#2D505D] rounded-xl font-bold text-[#2D505D] text-sm shadow-sm active:scale-95 transition-all">
              รีเซ็ตข้อมูล
            </button>
          </div>
        )}
      </div>

      {/* ── Grid Content ── */}
      <div className="px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {(isSelectionMode ? allAvailableMenus : categoryMenus).map((item, index) => {
            const isChecked = selectedIds.includes(item.id);

            return (
              <div key={item.id} className="relative">
                {/* รูปที่ 1: Drag Handle (แสดงเฉพาะโหมดจัดลำดับ) */}
                {!isSelectionMode && (
                  <div 
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={handleDragEnd}
                    className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-20 bg-white shadow-md rounded-full p-1.5 cursor-grab active:cursor-grabbing border border-gray-100 hover:scale-110 transition-transform"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D505D" strokeWidth="2.5">
                      <polyline points="5 9 2 12 5 15"></polyline>
                      <polyline points="9 5 12 2 15 5"></polyline>
                      <polyline points="15 19 12 22 9 19"></polyline>
                      <polyline points="19 9 22 12 19 15"></polyline>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <line x1="12" y1="2" x2="12" y2="22"></line>
                    </svg>
                  </div>
                )}

                {/* Card Container */}
                <div className={`bg-white rounded-[2rem] overflow-hidden shadow-lg transition-all border-4 
                  ${!isSelectionMode && draggingIndex === index ? 'opacity-40 scale-95' : 'opacity-100'}
                  ${!isSelectionMode && overIndex === index ? 'border-[#58B9B1]' : 'border-transparent'}`}
                >
                  <img src={item.img} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-[#111] text-[15px]">{item.name}</h3>
                    <p className="text-[#333] font-medium mt-1">฿ {item.price}</p>
                    
                    {/* รูปที่ 2: Checkbox (แสดงเฉพาะโหมดเลือกเมนู) */}
                    {isSelectionMode && (
                      <div className="flex justify-end mt-1">
                        <div 
                          onClick={() => toggleSelect(item.id)}
                          className={`w-7 h-7 rounded-xl border-2 cursor-pointer flex items-center justify-center transition-all
                            ${isChecked ? 'bg-[#58B9B1] border-[#58B9B1]' : 'bg-white border-gray-200 hover:border-[#58B9B1]'}`}
                        >
                          {isChecked && <span className="text-white font-bold text-sm">✓</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer Button (แสดงเฉพาะรูปที่ 2) ── */}
      {isSelectionMode && (
        <div className="fixed bottom-8 left-0 right-0 px-10 z-50">
          <button
            onClick={confirmAddSelected}
            className="w-full py-4 rounded-[1.8rem] bg-gradient-to-r from-[#58B9B1] to-[#4AA098] 
                       text-white text-lg font-black shadow-xl active:scale-95 transition-all"
          >
            บันทึกรายการที่เลือก
          </button>
        </div>
      )}
    </div>
  );
}