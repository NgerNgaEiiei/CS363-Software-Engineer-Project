import { UndoIcon } from "./icons"; // อย่าลืมเพิ่ม UndoIcon ใน icons.jsx นะครับ

export default function CheckoutPanel({ orderedItems, onClose, onCheckout }) {
  // คำนวณราคารวมจาก "รายการที่สั่งไปแล้ว"
  const totalPrice = orderedItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      className="fixed inset-0 bg-black/35 z-50 flex justify-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#f4f5f7] w-full max-w-md h-full flex flex-col shadow-2xl animate-[slideIn_0.25s_ease]">
        
        {/* Header ของแถบชำระเงิน */}
        <div className="flex items-center justify-between px-6 pt-8 pb-4 bg-[#f4f5f7]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#005c6a] rounded-xl text-[#005c6a] font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <UndoIcon />
            <span>ย้อนกลับ</span>
          </button>
          <h1 className="text-2xl font-extrabold text-[#005c6a]">
            ชำระเงิน
          </h1>
        </div>

        {/* รายการอาหารที่สั่งแล้ว */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {orderedItems.length === 0 ? (
            <p className="text-center text-gray-500 py-10">ยังไม่มีรายการอาหารที่สั่ง</p>
          ) : (
            orderedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3.5 mb-4 shadow-sm flex gap-4 items-center">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-28 h-20 object-cover rounded-xl" 
                />
                <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                  <div>
                    <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">ไม่ใส่ผัก</p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-gray-800 text-lg">x{item.qty}</span>
                    <span className="font-extrabold text-gray-900 text-lg">
                      ฿{item.price * item.qty}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ปุ่มชำระเงินด้านล่าง */}
        <div className="px-6 py-8 bg-[#f4f5f7]">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex justify-between">
            <span>ราคารวม</span>
            <span>฿ {totalPrice.toLocaleString()}</span> 
          </h2>
          <button
            onClick={() => {
              if (onCheckout) {
                onCheckout();
              } else {
                alert('ดำเนินการชำระเงินสำเร็จ!');
                onClose();
              }
            }}
            className="w-full py-4 bg-[#50bab5] hover:bg-[#43a19d] text-white text-xl font-extrabold rounded-2xl shadow-md transition-colors cursor-pointer disabled:opacity-50"
            disabled={orderedItems.length === 0}
          >
            ชำระเงิน
          </button>
        </div>

      </div>
    </div>
  );
}