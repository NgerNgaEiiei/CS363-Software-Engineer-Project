import { useState } from "react";
import { MENU_ITEMS } from "../data/menuData";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import SearchBar from "../components/SearchBar";
import MenuCard from "../components/MenuCard";
import CartPanel from "../components/CartPanel";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("เมนูขายดี");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ── Cart helpers ──────────────────────────────────────────────────────────
  const addToCart = (item) =>
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      return existing
        ? prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { ...item, qty: 1 }];
    });

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((c) => c.id !== id));

  const handleOrder = () => {
    setCart([]);
    setShowCart(false);
    alert("สั่งอาหารสำเร็จ!");
  };

  const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  // ── Filter ────────────────────────────────────────────────────────────────
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchTab = activeTab === "เมนูทั้งหมด" || item.category === activeTab;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <>
      {/* Keyframe for cart slide-in animation */}
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#d4c4a8]">
        <Header restaurantName="ชื่อร้าน" tableNumber={1} />

        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSearchToggle={() => setShowSearch((v) => !v)}
        />

        {showSearch && (
          <SearchBar value={search} onChange={setSearch} />
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5
                        gap-5 px-6 pt-5 pb-28 max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 py-16 text-base">
              ไม่พบเมนูที่ค้นหา
            </p>
          ) : (
            filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addToCart} />
            ))
          )}
        </div>

        {/* Cart FAB */}
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-7 right-7 w-20 h-20 flex items-center justify-center
                     hover:scale-105 active:scale-95 transition-transform z-40 cursor-pointer bg-transparent border-none outline-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          <img src="/cart-button.png" alt="Cart Button" className="w-full h-full object-contain" />
          {totalQty > 0 && (
            <span className="absolute top-1 right-2 w-6 h-6 flex items-center justify-center
                             bg-red-500 text-white text-xs font-extrabold rounded-full border-2 border-white shadow-sm">
              {totalQty}
            </span>
          )}
        </button>

        {/* Cart Side Panel */}
        {showCart && (
          <CartPanel
            cart={cart}
            totalQty={totalQty}
            totalPrice={totalPrice}
            onClose={() => setShowCart(false)}
            onRemove={removeFromCart}
            onOrder={handleOrder}
          />
        )}
      </div>
    </>
  );
}
