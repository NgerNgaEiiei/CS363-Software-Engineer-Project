export default function IconButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-teal-400
                 text-gray-800 bg-transparent hover:bg-teal-100 transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}
