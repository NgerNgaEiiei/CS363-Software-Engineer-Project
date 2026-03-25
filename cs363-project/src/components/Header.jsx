import { ClocheIcon, BellIcon, GlobeIcon } from "./icons";
import IconButton from "./IconButton";

export default function Header({ restaurantName = "ชื่อร้าน", tableNumber = 1 }) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">{restaurantName}</h1>
        <p className="text-sm text-gray-500 mt-0.5">โต๊ะ {tableNumber}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <IconButton><ClocheIcon /></IconButton>
        <IconButton><BellIcon /></IconButton>
        <IconButton><GlobeIcon /></IconButton>
      </div>
    </div>
  );
}
