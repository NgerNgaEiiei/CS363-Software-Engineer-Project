import { XIcon } from "./icons";

export default function CartPanel({ cart, totalQty, totalPrice, onClose, onRemove, onOrder }) {
  return (
    <div
      className="fixed inset-0 bg-black/35 z-50 flex justify-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl
                      animate-[slideIn_0.25s_ease]">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">
            ตะกร้าสินค้า {totalQty > 0 && `(${totalQty})`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1"
          >
            <XIcon />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-[15px]">
              ยังไม่มีรายการในตะกร้า
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
                <img src={item.img} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    ฿{item.price} × {item.qty} = ฿{item.price * item.qty}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-300 hover:text-red-500 bg-transparent border-none
                             cursor-pointer p-1 transition-colors"
                >
                  <XIcon />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer: Total + Order button */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex justify-between text-lg font-extrabold text-gray-900 mb-4">
              <span>รวมทั้งหมด</span>
              <span>฿ {totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={onOrder}
              className="w-full py-3.5 bg-teal-400 hover:bg-teal-500 text-white text-[17px]
                         font-extrabold rounded-2xl border-none cursor-pointer transition-colors"
            >
              สั่งอาหาร
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
