import { DragIcon, EditIcon, TrashIcon } from "./icons";

/**
 * AdminMenuCard — matches the visual style of MenuCard but adds:
 *  - Drag handle (top-centre)
 *  - Edit / Delete action buttons (revealed on hover)
 */
export default function AdminMenuCard({
  item,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onEdit,
  onDelete,
  isDragging,
  isOver,
}) {
  return (
    <div
      className={`relative bg-white rounded-2xl overflow-visible
                  transition-all duration-200 cursor-default
                  group
                  ${isDragging ? "scale-[1.03] rotate-[1.5deg] opacity-60 shadow-2xl" : "scale-100 opacity-100"}
                  ${isOver ? "ring-[2.5px] ring-teal-400 shadow-xl" : "shadow-md hover:-translate-y-1 hover:shadow-xl"}`}
      onDragOver={(e) => { e.preventDefault(); onDragOver(index); }}
      onDrop={(e) => { e.preventDefault(); onDrop(index); }}
    >
      {/* ── Drag handle ─────────────────────────────────────────── */}
      <div
        draggable
        onDragStart={() => onDragStart(index)}
        onDragEnd={onDragEnd}
        title="ลากเพื่อเปลี่ยนลำดับ"
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-10
                    w-9 h-9 rounded-[10px] border-2 border-white
                    flex items-center justify-center
                    cursor-grab select-none
                    shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                    transition-colors duration-200
                    ${isOver
                      ? "bg-teal-400 text-white"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    }`}
      >
        <DragIcon />
      </div>

      {/* ── Image + overlay actions ──────────────────────────────── */}
      <div className="relative pt-2">
        <img
          src={item.img}
          alt={item.name}
          className="w-full aspect-[4/3] object-cover block rounded-t-2xl pointer-events-none"
          draggable={false}
        />

        {/* Edit / Delete — visible on group-hover */}
        <div className="absolute top-5 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(item)}
            title="แก้ไข"
            className="bg-white/90 border-none rounded-lg p-1.5 cursor-pointer
                       flex items-center text-teal-500 hover:text-teal-700
                       shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-colors"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            title="ลบ"
            className="bg-white/90 border-none rounded-lg p-1.5 cursor-pointer
                       flex items-center text-red-400 hover:text-red-600
                       shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* ── Info ────────────────────────────────────────────────── */}
      <div className="p-3.5 pb-4">
        <p className="text-base font-extrabold text-gray-900 mb-2">{item.name}</p>
        <span className="text-[15px] font-bold text-gray-900">฿ {item.price.toLocaleString()}</span>
      </div>
    </div>
  );
}
