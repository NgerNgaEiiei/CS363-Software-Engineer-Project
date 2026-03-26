export default function IconButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl border border-[#005c6a]
                 text-[#005c6a] bg-white hover:bg-teal-50 transition-colors cursor-pointer shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}
