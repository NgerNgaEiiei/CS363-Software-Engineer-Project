import { ClocheIcon, BellIcon, GlobeIcon } from "./icons";
import IconButton from "./IconButton";

export default function Header({ restaurantName = "ชื่อร้าน", tableNumber = 1, showIcons = true, onCheckoutClick }) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">{restaurantName}</h1>
        <p className="text-sm text-gray-500 mt-0.5">โต๊ะ {tableNumber}</p>
      </div>
      {showIcons && (
        <div className="flex items-center gap-2 md:gap-2.5">
          <button onClick={onCheckoutClick} className="h-10 md:h-11 px-4 md:px-5 flex items-center justify-center rounded-xl border border-[#005c6a] text-[#005c6a] bg-white font-bold hover:bg-[#ced4da] transition-colors cursor-pointer text-base shadow-sm">
            ชำระเงิน
          </button>
          <IconButton><BellIcon size={20} /></IconButton>
          <IconButton><GlobeIcon size={20} /></IconButton>
        </div>
      )}
    </div>
  );
}
