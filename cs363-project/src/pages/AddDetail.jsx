import { useState } from "react";
import { Undo2, Plus } from "lucide-react";
import { EditIcon } from "../components/icons";

export default function AddDetail() {
  const [imagePreview, setImagePreview] = useState(null);
  const [showIngredientModal, setShowIngredientModal] = useState(false);

  // For visual representation only as requested
  return (
    <div className="min-h-screen bg-[#f2f4f6] font-sans pb-16">
      <div className="max-w-xl mx-auto px-6 pt-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-[#005c6a] text-[#005c6a] font-bold text-[15px] cursor-pointer hover:bg-[#ced4da] transition-colors">
            <Undo2 size={20} strokeWidth={2.5} />
            ย้อนกลับ
          </button>
          <h1 className="text-[22px] font-extrabold text-[#005c6a]">
            เพิ่มเมนู
          </h1>
        </div>

        {/* Section 1: ภาพประกอบ (Image) */}
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-gray-900 mb-3">ภาพประกอบ</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-400">
            <div className="flex gap-5 items-center">
              <div className="w-28 h-28 bg-[#f5f5f5] rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300"></span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <button className="px-6 py-2 bg-white border border-[#005c6a] text-[#005c6a] font-bold text-[14px] rounded-lg cursor-pointer hover:bg-[#ced4da] transition-colors shadow-sm">
                  เพิ่มภาพ
                </button>
                <button className="px-6 py-2 bg-[#f8b4b4] border border-[#e59b9b] text-[#8a2a2a] font-bold text-[14px] rounded-lg cursor-pointer hover:bg-[#f1a1a1] transition-colors shadow-sm">
                  ลบภาพ
                </button>
              </div>
            </div>
          </div>
          <p className="text-[14px] text-[#005c6a] font-bold mt-2 mx-auto text-center">
            *สามารถเพิ่มภาพประกอบได้มากสุด 1 ภาพ
          </p>
        </div>

        {/* Section 2: รายละเอียดเมนู (Menu Details) */}
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-gray-900 mb-3">รายละเอียดเมนู</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-[85px] shrink-0 leading-[1.1]">
                <div className="text-[14px] font-bold text-gray-800">ชื่อเมนู</div>
                <div className="text-[16px] font-bold text-gray-800">(TH)</div>
              </div>
              <input
                type="text"
                placeholder="ชื่อเมนู 1"
                className="flex-1 w-full px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-400 focus:border-white focus:ring-2 focus:ring-teal-400 outline-none text-[15px] font-medium text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[85px] shrink-0 leading-[1.1]">
                <div className="text-[14px] font-bold text-gray-800">ชื่อเมนู</div>
                <div className="text-[16px] font-bold text-gray-800">(EN)</div>
              </div>
              <input
                type="text"
                placeholder="ชื่อเมนู 1"
                className="flex-1 w-full px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-400 focus:border-white focus:ring-2 focus:ring-teal-400 outline-none text-[15px] font-medium text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Section 3: วัตถุดิบ (Ingredients) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-[20px] font-bold text-gray-900">วัตถุดิบ</h2>
            <span className="text-[14px] text-[#005c6a] font-bold leading-tight mt-1">
              *จำเป็นต้องมีชื่อวัตถุดิบอย่างน้อย 1 อย่างเพื่อเพิ่มเมนู
            </span>
          </div>
          <button
            onClick={() => setShowIngredientModal(true)}
            className="w-8 h-8 rounded-full border-[1.5px] border-gray-600 flex items-center justify-center bg-transparent cursor-pointer hover:bg-[#ced4da] transition-colors"
          >
            <Plus size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Section 4: ตัวเลือกเพิ่มเติม (Additional Options) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-bold text-gray-900">ตัวเลือกเพิ่มเติม</h2>
            <button className="px-4 py-1.5 bg-white border border-[#005c6a] text-[#005c6a] font-bold text-[13px] rounded-lg cursor-pointer hover:bg-[#ced4da] transition-colors shadow-sm">
              เพิ่มตัวเลือก
            </button>
          </div>

          <div className="bg-[#f0ece1]/50 bg-gray-100 rounded-[24px] p-4 shadow-sm border border-gray-500">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="โปรดระบุชื่อหัวข้อของตัวเลือก(TH)"
                  className="w-full px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-400 focus:border-white focus:ring-2 focus:ring-teal-400 outline-none text-[14px] font-medium text-gray-800 placeholder-gray-500 pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <EditIcon className="text-gray-600" />
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="โปรดระบุชื่อหัวข้อของตัวเลือก(EN)"
                  className="w-full px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-400 focus:border-white focus:ring-2 focus:ring-teal-400 outline-none text-[14px] font-medium text-gray-800 placeholder-gray-500 pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <EditIcon className="text-gray-600" />
                </div>
              </div>

              {/* Radio option row */}
              <div className="flex items-center gap-2 mt-1 px-1">
                <div className="w-[18px] h-[18px] shrink-0 rounded-full border-2 border-gray-300 bg-white"></div>
                <input
                  type="text"
                  placeholder="โปรดระบุตัวเลือก(TH)"
                  className="flex-1 w-full px-4 py-2 rounded-full bg-white shadow-sm border border-gray-400 focus:border-white focus:ring-2 focus:ring-teal-400 outline-none text-[13px] font-medium text-gray-800 placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="โปรดระบุตัวเลือก(EN)"
                  className="flex-1 w-full px-4 py-2 rounded-full bg-white shadow-sm border border-gray-400 focus:border-white focus:ring-2 focus:ring-teal-400 outline-none text-[13px] font-medium text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ingredient Modal */}
        {showIngredientModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#e8ebed] rounded-[32px] p-7 pt-8 w-full max-w-[380px] shadow-2xl">
              <h2 className="text-[24px] font-extrabold text-[#005c6a] mb-8">วัตถุดิบ</h2>

              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-[17px] font-bold text-gray-900 shrink-0">ชื่อวัตถุดิบ(TH):</label>
                  <input
                    type="text"
                    className="w-[170px] h-[44px] px-4 rounded-full bg-white shadow-md border-none outline-none focus:ring-2 focus:ring-teal-400 text-[15px] text-gray-800"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <label className="text-[17px] font-bold text-gray-900 shrink-0">ชื่อวัตถุดิบ(EN):</label>
                  <input
                    type="text"
                    className="w-[170px] h-[44px] px-4 rounded-full bg-white shadow-md border-none outline-none focus:ring-2 focus:ring-teal-400 text-[15px] text-gray-800"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 h-[52px] bg-[#53b2a4] text-white font-extrabold text-[17px] rounded-[20px] shadow-md hover:bg-teal-500 hover:shadow-lg transition-all duration-200 active:scale-95">
                  เพิ่มหมวดหมู่
                </button>
                <button
                  onClick={() => setShowIngredientModal(false)}
                  className="px-6 h-[52px] bg-[#f8f9fa] border-2 border-[#005c6a] text-[#005c6a] font-extrabold text-[17px] rounded-[20px] shadow-md hover:bg-[#ced4da] transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex gap-4 mt-10">
          <button className="flex-1 py-[14px] rounded-[14px] bg-[#50bba9] text-white font-extrabold text-[16px] overflow-hidden cursor-pointer hover:bg-teal-500 transition-colors shadow-sm">
            เพิ่มเมนู
          </button>
          <button className="flex-1 py-[14px] rounded-[14px] bg-[#f8f9fa] border-2 border-[#005c6a] text-[#005c6a] font-extrabold text-[16px] cursor-pointer hover:bg-[#ced4da] transition-colors shadow-sm">
            ยกเลิก
          </button>
        </div>

      </div>


    </div>
  );
}
