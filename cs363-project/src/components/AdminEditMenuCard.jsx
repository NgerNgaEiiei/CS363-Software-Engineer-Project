import React from 'react';

export default function AdminEditMenuCard({
  item,
  index,
  isSelectionMode,
  isChecked,
  onToggleSelect,
  draggingIndex,
  overIndex,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) {
  const isDragging = draggingIndex === index;
  const isOver = overIndex === index;

  return (
    <div className="relative">
      {/* รูปที่ 1: Drag Handle (แสดงเฉพาะโหมดจัดลำดับ) */}
      {!isSelectionMode && (
        <div
          draggable
          onDragStart={() => onDragStart(index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDrop={() => onDrop(index)}
          onDragEnd={onDragEnd}
          className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-20 bg-white shadow-md rounded-full p-1.5 cursor-grab active:cursor-grabbing border border-gray-100 hover:scale-110 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D505D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      <div
        className={`bg-white rounded-[2rem] overflow-hidden shadow-lg transition-all border-4 
          ${!isSelectionMode && isDragging ? 'opacity-40 scale-95' : 'opacity-100'}
          ${!isSelectionMode && isOver ? 'border-[#58B9B1]' : 'border-transparent'}`}
      >
        <img src={item.img} alt={item.name} className="w-full h-32 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-[#111] text-[15px]">{item.name}</h3>
          <p className="text-[#333] font-medium mt-1">฿ {item.price}</p>

          {/* รูปที่ 2: Checkbox (แสดงเฉพาะโหมดเลือกเมนู) */}
          {isSelectionMode && (
            <div className="flex justify-end mt-1">
              <div
                onClick={() => onToggleSelect(item.id)}
                className={`w-7 h-7 rounded-xl border-2 cursor-pointer flex items-center justify-center transition-all
                  ${isChecked ? 'bg-[#58B9B1] border-[#58B9B1]' : 'bg-white border-gray-200 hover:border-[#58B9B1]'}`}
              >
                {isChecked && <span className="text-white font-bold text-sm leading-none flex items-center justify-center h-full">✓</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
