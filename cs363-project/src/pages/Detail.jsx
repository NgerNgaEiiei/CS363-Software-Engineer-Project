import { useState } from "react";
import { UndoIcon } from "../components/icons";

export default function Detail({ item, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [happiness, setHappiness] = useState("");
  const [note, setNote] = useState("");

  if (!item) return null;

  const handleIncrement = () => setQty((prev) => prev + 1);
  const handleDecrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart({ ...item, qty });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-w-[400px] w-full bg-[#fdfdfd] rounded-[35px] p-4 shadow-2xl relative font-['Kanit'] max-h-[90vh] overflow-y-auto">

        {/* ปุ่มย้อนกลับ */}
        <div className="flex items-center mb-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#005c6a] rounded-xl text-[#005c6a] font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <UndoIcon />
            <span>ย้อนกลับ</span>
          </button>
        </div>

        {/* รูปภาพ */}
        <div className="w-full flex justify-center">
          <img
            src={item.img}
            className="w-[90%] h-44 rounded-[20px] object-cover shadow-md"
            alt={item.name}
          />
        </div>

        <div className="px-1 py-4 text-left">
          {/* ชื่อเมนู + ราคา */}
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-[26px] font-bold">{item.name}</h2>
            <span className="text-[22px] font-extrabold text-[#5fb9b0] mt-1">฿{item.price}</span>
          </div>

          {/* วัตถุดิบ */}
          <p className="font-bold text-base mb-2">วัตถุดิบ</p>
          <div className="flex gap-2.5 mb-5 flex-wrap">
            <span className="bg-[#e9e9e9] px-5 py-1.5 rounded-[15px] text-sm text-[#666]">หมู</span>
            <span className="bg-[#e9e9e9] px-5 py-1.5 rounded-[15px] text-sm text-[#666]">กระเทียม</span>
          </div>

          {/* ระดับความสุข */}
          <p className="font-bold text-base mb-2">ระดับความสุข</p>
          <div className="flex flex-col gap-3 mb-5">
            {[
              { value: "body", label: "สุขกาย" },
              { value: "heart", label: "สุขใจ" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center cursor-pointer"
                onClick={() => setHappiness(value)}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full mr-3 transition-all ${
                    happiness === value
                      ? "bg-[#5fb9b0] border-[#5fb9b0]"
                      : "bg-white border-[#ccc]"
                  }`}
                />
                <span className="text-base">{label}</span>
              </label>
            ))}
          </div>

          {/* ข้อความเพิ่มเติม */}
          <p className="font-bold text-base mb-2">ข้อความเพิ่มเติม (ถ้ามี)</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-20 border border-[#eee] rounded-[15px] p-3 bg-white shadow-inner resize-none focus:outline-none"
            placeholder="ระบุรายละเอียดเพิ่มเติม..."
          />

          {/* Footer */}
          <div className="flex flex-col items-center gap-[15px] mt-6">
            <div className="flex items-center bg-white px-6 py-1 rounded-[30px] shadow-sm gap-[25px]">
              <button
                className="text-xl text-[#888] w-8 h-8 rounded-full border border-[#ddd] cursor-pointer"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="font-bold text-xl">{qty}</span>
              <button
                className="text-xl text-[#888] w-8 h-8 rounded-full border border-[#ddd] cursor-pointer"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#5fb9b0] text-white py-[15px] rounded-[15px] text-[18px] font-bold shadow-[0_5px_15px_rgba(95,185,176,0.4)] hover:bg-[#4aa39a] transition-colors cursor-pointer"
            >
              เพิ่มไปยังตะกร้า ฿ {item.price * qty}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
