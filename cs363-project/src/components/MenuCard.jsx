import { PlusIcon } from "./icons";

export default function MenuCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1
                    hover:shadow-xl transition-all duration-200 cursor-pointer">
      <img
        src={item.img}
        alt={item.name}
        className="w-full aspect-[4/3] object-cover block"
      />
      <div className="p-3.5 pb-4">
        <p className="text-base font-extrabold text-gray-900 mb-2">{item.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-gray-900">฿ {item.price}</span>
          <button
            onClick={() => onAdd(item)}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-teal-400
                       text-white border-none cursor-pointer hover:bg-teal-500
                       active:scale-95 transition-all"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
