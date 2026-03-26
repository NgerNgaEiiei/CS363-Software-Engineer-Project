import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from '../components/AddCategoryModal';
import CategoryAccordionCard from '../components/CategoryAccordionCard';

export default function AdminSettingPage() {
  const navigate = useNavigate();

  // ─── States ──────────────────────────────────────────────────────────────
  const [shopName, setShopName] = useState(localStorage.getItem('shopName') || '');
  const [bgColor, setBgColor] = useState('#DCC3A1');
  const [btnColor, setBtnColor] = useState('#58B9B1');
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const [draggingIndex, setDraggingIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [{ id: 1, th: 'เมนูทั้งหมด', en: 'All Menu', selectedOption: 'showSpecific' }];
  });

  const bgInputRef = useRef(null);
  const btnInputRef = useRef(null);

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('shopName', shopName);
  }, [categories, shopName]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const toggleAccordion = (index) => {
    setActiveAccordionIndex((prev) => (prev === index ? null : index));
  };

  const updateCategory = (id, field, value) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const confirmAddCategory = (newCatData) => {
    const newCategory = {
      id: Date.now(),
      th: newCatData.th || 'หมวดหมู่ใหม่',
      en: newCatData.en || 'New Category',
      selectedOption: newCatData.selectedOption,
    };
    setCategories([...categories, newCategory]);
    setShowAddPopup(false);
  };

  // ─── Drag-and-drop Logic ────────────────────────────────────────────────
  const handleDragStart = useCallback((i) => setDraggingIndex(i), []);
  const handleDragOver = useCallback((e, i) => {
    e.preventDefault();
    setOverIndex(i);
  }, []);
  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
    setOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (dropIndex) => {
      if (draggingIndex === null || draggingIndex === dropIndex) return;
      setCategories((prev) => {
        const next = [...prev];
        const [moved] = next.splice(draggingIndex, 1);
        next.splice(dropIndex, 0, moved);
        return next;
      });
      setDraggingIndex(null);
      setOverIndex(null);
    },
    [draggingIndex]
  );

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#FAF5F5] font-['Sarabun'] text-[#2D505D] pb-32">
        <div className="w-full px-6 pt-5">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-extrabold leading-tight m-0">Ezy <br /> Order</h1>
            <button className="border-2 border-[#58B9B1] bg-white px-4 py-2 rounded-xl font-bold cursor-pointer text-[#2D505D] hover:bg-[#ced4da] transition-colors">
              ดูตัวอย่าง
            </button>
          </header>

          {/* Tab Navigation */}
          <div className="flex justify-center border-b border-gray-200 py-3 mb-6">
            <div className="flex w-full max-w-[400px] items-center">
              <button
                onClick={() => navigate('/admin/setting')}
                className="flex-1 py-2 rounded-xl border-2 border-[#2D505D] bg-transparent text-[#2D505D] font-black text-base cursor-pointer"
              >
                ตั้งค่าระบบ
              </button>
              <div className="w-[1px] h-5 bg-gray-300 mx-4" />
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 py-2 border-none bg-transparent text-[#2D505D] font-bold text-base cursor-pointer hover:text-teal-600 transition-colors"
              >
                จัดการเมนู
              </button>
            </div>
          </div>

          {/* Basic Settings */}
          <section className="mb-8 w-full">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">⚙️ ตั้งค่าขั้นพื้นฐาน</h2>

            <div className="flex justify-between items-center mb-3 gap-2.5">
              <label className="text-[14px] font-semibold flex-shrink-0">ชื่อร้าน</label>
              <input
                className="border-none rounded-xl p-[10px_15px] bg-white flex-1 max-w-[200px] outline-none shadow-inner focus:ring-2 focus:ring-[#58B9B1]"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="ชื่อร้านของคุณ"
              />
            </div>

            <div className="flex justify-between items-center mb-3 gap-2.5">
              <label className="text-[14px] font-semibold flex-shrink-0">สีพื้นหลัง</label>
              <div
                className="w-[35px] h-[35px] rounded-full border-[3px] border-white cursor-pointer shadow-sm active:scale-95 transition-transform"
                style={{ backgroundColor: bgColor }}
                onClick={() => bgInputRef.current.click()}
              />
              <input type="color" ref={bgInputRef} value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="hidden" />
            </div>

            <div className="flex justify-between items-center mb-3 gap-2.5">
              <label className="text-[14px] font-semibold flex-shrink-0">สีปุ่ม</label>
              <div
                className="w-[35px] h-[35px] rounded-full border-[3px] border-white cursor-pointer shadow-sm active:scale-95 transition-transform"
                style={{ backgroundColor: btnColor }}
                onClick={() => btnInputRef.current.click()}
              />
              <input type="color" ref={btnInputRef} value={btnColor} onChange={(e) => setBtnColor(e.target.value)} className="hidden" />
            </div>

            <div className="flex justify-between items-center mb-3 gap-2.5">
              <label className="text-[14px] font-semibold flex-shrink-0">หน้าเริ่มต้น</label>
              <div className="relative flex-1 max-w-[200px]">
                <select className="w-full appearance-none border-none rounded-xl p-[10px_15px] bg-white outline-none focus:ring-2 focus:ring-[#58B9B1] pr-10">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.th}>
                      {cat.th}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#2D505D]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold m-0 flex items-center gap-2">⚙️ หมวดหมู่</h2>
              <button
                onClick={() => setShowAddPopup(true)}
                className="w-[35px] h-[35px] rounded-full border-none bg-white font-extrabold text-xl cursor-pointer shadow-sm text-[#2D505D] hover:bg-[#ced4da] flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {categories.map((cat, index) => (
                <CategoryAccordionCard
                  key={cat.id}
                  cat={cat}
                  index={index}
                  isActive={activeAccordionIndex === index}
                  isDragging={draggingIndex === index}
                  isOver={overIndex === index && draggingIndex !== index}
                  onToggle={toggleAccordion}
                  onUpdate={updateCategory}
                  onDelete={deleteCategory}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Add Popup Modal */}
        <AddCategoryModal
          show={showAddPopup}
          onClose={() => setShowAddPopup(false)}
          onAdd={confirmAddCategory}
        />
      </div>
    </>
  );
}