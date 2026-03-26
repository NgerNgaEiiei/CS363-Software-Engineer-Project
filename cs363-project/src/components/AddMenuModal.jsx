import React, { useState } from 'react';

export default function AddMenuModal({ show, onClose, onAdd }) {
  const [newMenu, setNewMenu] = useState({ name: "", price: "" });

  if (!show) return null;

  const handleConfirm = () => {
    if (!newMenu.name || !newMenu.price) return;
    onAdd(newMenu);
    setNewMenu({ name: "", price: "" });
  };

  const handleCancel = () => {
    setNewMenu({ name: "", price: "" });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-5"
      onClick={handleCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-7 w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-[slideUp_0.25s_ease]"
      >
        <h2 className="text-lg font-extrabold text-gray-900 mb-5">เพิ่มเมนูใหม่</h2>

        <div className="flex flex-col gap-3.5">
          <div>
            <label className="block text-[13px] font-semibold text-gray-500 mb-1.5">ชื่อเมนู</label>
            <input
              type="text"
              value={newMenu.name}
              onChange={(e) => setNewMenu((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="เช่น สเต็กไก่"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black/10 focus:border-teal-400 outline-none text-[15px] text-gray-900 bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-500 mb-1.5">ราคา (฿)</label>
            <input
              type="number"
              value={newMenu.price}
              onChange={(e) => setNewMenu((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="เช่น 199"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black/10 focus:border-teal-400 outline-none text-[15px] text-gray-900 bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex gap-2.5 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 rounded-xl border-2 border-black/10 bg-white text-[15px] font-semibold text-gray-500 hover:border-gray-300 cursor-pointer transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl border-none bg-teal-400 hover:bg-teal-500 text-[15px] font-extrabold text-white cursor-pointer transition-colors"
          >
            เพิ่มเมนู
          </button>
        </div>
      </div>
    </div>
  );
}
