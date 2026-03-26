import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DragIcon } from './icons';

export default function CategoryAccordionCard({
  cat,
  index,
  isActive,
  isDragging,
  isOver,
  onToggle,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}) {
  const navigate = useNavigate();

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onDrop={() => onDrop(index)}
      className={`relative bg-[#EDEDED] rounded-[20px] mb-5 shadow-sm transition-transform 
        ${isDragging ? 'opacity-50 scale-95' : ''} 
        ${isOver ? 'border-2 border-[#58B9B1]' : 'border-2 border-transparent'}`}
    >
      {/* ── Drag handle ─────────────────────────────────────────── */}
      <div
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-10
                    w-9 h-9 rounded-[10px] border-2 border-white
                    flex items-center justify-center
                    cursor-grab select-none
                    shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                    transition-colors duration-200
                    ${isOver ? 'bg-[#58B9B1] text-white' : 'bg-white text-[#2D505D] hover:bg-gray-100'}`}
      >
        <DragIcon />
      </div>

      <div
        onClick={() => onToggle(index)}
        className="px-5 py-4 flex justify-between cursor-pointer font-bold text-[#2D505D]"
      >
        <span>{cat.th}</span>
        <span className="text-xs">{isActive ? '▲' : '▼'}</span>
      </div>

      {isActive && (
        <div className="px-5 pb-5 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            <label className="text-[13px] font-semibold text-[#2D505D] min-w-[70px]">ชื่อ (TH):</label>
            <input
              className="flex-1 w-full max-w-[180px] border-none rounded-xl p-[10px_15px] bg-white outline-none shadow-inner focus:ring-2 focus:ring-[#58B9B1] text-[#2D505D]"
              value={cat.th}
              onChange={(e) => onUpdate(cat.id, 'th', e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center gap-2">
            <label className="text-[13px] font-semibold text-[#2D505D] min-w-[70px]">ชื่อ (EN):</label>
            <input
              className="flex-1 w-full max-w-[180px] border-none rounded-xl p-[10px_15px] bg-white outline-none shadow-inner focus:ring-2 focus:ring-[#58B9B1] text-[#2D505D]"
              value={cat.en || ''}
              onChange={(e) => onUpdate(cat.id, 'en', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label
              className="flex gap-2.5 items-center text-[12px] font-semibold text-[#2D505D] cursor-pointer"
              onClick={() => onUpdate(cat.id, 'selectedOption', 'showSpecific')}
            >
              <div className="w-[18px] h-[18px] rounded-full border-2 border-[#2D505D] bg-white flex-shrink-0 relative flex items-center justify-center">
                {cat.selectedOption === 'showSpecific' && <div className="w-2 h-2 bg-[#2D505D] rounded-full"></div>}
              </div>
              <span>แสดงเฉพาะเมนูที่ต้องการในหมวด</span>
            </label>
            <label
              className="flex gap-2.5 items-center text-[12px] font-semibold text-[#2D505D] cursor-pointer"
              onClick={() => onUpdate(cat.id, 'selectedOption', 'showAll')}
            >
              <div className="w-[18px] h-[18px] rounded-full border-2 border-[#2D505D] bg-white flex-shrink-0 relative flex items-center justify-center">
                {cat.selectedOption === 'showAll' && <div className="w-2 h-2 bg-[#2D505D] rounded-full"></div>}
              </div>
              <span>แสดงทุกเมนู (หลังเลือกจะแก้ไขเมนูในหมวดไม่ได้)</span>
            </label>
          </div>

          {cat.selectedOption === 'showSpecific' && (
            <button
              onClick={() => navigate(`/admin-edit-menu/${cat.id}`)}
              className="py-3 mt-1 rounded-[15px] border-[1.5px] border-[#2D505D] bg-white font-bold text-[#2D505D] cursor-pointer hover:bg-[#ced4da] transition-colors text-[13px]"
            >
              แก้ไขเมนูในหมวดหมู่
            </button>
          )}

          <div
            onClick={() => onDelete(cat.id)}
            className="text-[#E57373] hover:text-red-500 text-center text-sm underline cursor-pointer mt-1 font-semibold transition-colors"
          >
            ลบหมวดหมู่
          </div>
        </div>
      )}
    </div>
  );
}
