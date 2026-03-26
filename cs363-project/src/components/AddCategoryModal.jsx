import React, { useState } from 'react';

export default function AddCategoryModal({ show, onClose, onAdd }) {
  const [newCatTH, setNewCatTH] = useState('');
  const [newCatEN, setNewCatEN] = useState('');
  const [newCatOption, setNewCatOption] = useState('showSpecific');

  if (!show) return null;

  const handleConfirm = () => {
    onAdd({ th: newCatTH, en: newCatEN, selectedOption: newCatOption });
    setNewCatTH('');
    setNewCatEN('');
    setNewCatOption('showSpecific');
  };

  const handleCancel = () => {
    setNewCatTH('');
    setNewCatEN('');
    setNewCatOption('showSpecific');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#E2E8EA] w-full max-w-[380px] rounded-[30px] p-6 flex flex-col gap-4 animate-[slideUp_0.2s_ease-out]">
        <h3 className="text-center m-0 font-extrabold text-[#2D505D] text-lg">เพิ่มหมวดหมู่</h3>

        <div className="flex justify-between items-center gap-2">
          <label className="text-[13px] font-semibold text-[#2D505D] min-w-[70px]">ชื่อ (TH):</label>
          <input
            className="flex-1 w-full max-w-[180px] border-none rounded-xl p-[10px_15px] bg-white outline-none shadow-inner focus:ring-2 focus:ring-[#58B9B1] text-[#2D505D]"
            placeholder="ชื่อภาษาไทย"
            value={newCatTH}
            onChange={(e) => setNewCatTH(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <label className="text-[13px] font-semibold text-[#2D505D] min-w-[70px]">ชื่อ (EN):</label>
          <input
            className="flex-1 w-full max-w-[180px] border-none rounded-xl p-[10px_15px] bg-white outline-none shadow-inner focus:ring-2 focus:ring-[#58B9B1] text-[#2D505D]"
            placeholder="ชื่อภาษาอังกฤษ"
            value={newCatEN}
            onChange={(e) => setNewCatEN(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label
            className="flex gap-2.5 items-center text-[12px] font-semibold text-[#2D505D] cursor-pointer"
            onClick={() => setNewCatOption('showSpecific')}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 border-[#2D505D] bg-white flex-shrink-0 relative flex items-center justify-center`}
            >
              {newCatOption === 'showSpecific' && <div className="w-2 h-2 bg-[#2D505D] rounded-full"></div>}
            </div>
            <span>แสดงเฉพาะเมนูที่ต้องการ</span>
          </label>
          <label
            className="flex gap-2.5 items-center text-[12px] font-semibold text-[#2D505D] cursor-pointer"
            onClick={() => setNewCatOption('showAll')}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 border-[#2D505D] bg-white flex-shrink-0 relative flex items-center justify-center`}
            >
              {newCatOption === 'showAll' && <div className="w-2 h-2 bg-[#2D505D] rounded-full"></div>}
            </div>
            <span>แสดงทุกเมนู (หลังเลือกจะแก้ไขเมนูในหมวดไม่ได้)</span>
          </label>
        </div>

        {newCatOption === 'showSpecific' && (
          <button className="py-3 mt-2 rounded-[15px] border-[1.5px] border-[#2D505D] bg-white font-bold text-[#2D505D] text-[13px] opacity-50 cursor-not-allowed">
            (สามารถแก้ไขเมนูได้หลังจากเพิ่มหมวด)
          </button>
        )}

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#58B9B1] hover:bg-teal-500 text-white border-none py-3 rounded-[15px] font-bold cursor-pointer transition-colors"
          >
            เพิ่ม
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-white hover:bg-gray-50 border-[1.5px] border-[#2D505D] py-3 rounded-[15px] font-bold text-[#2D505D] cursor-pointer transition-colors"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
